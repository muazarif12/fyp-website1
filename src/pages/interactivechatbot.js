// src/components/InteractiveChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useTask } from "../TaskContext";       // ← pull taskId (and title) from context

const API_BASE = "http://localhost:8000";

export default function InteractiveChatBot() {
  // grab our TaskContext
  const { taskId, videoTitle } = useTask();

  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]); // { id, sender, text, timestamps, clipUrl, clipTitle }
  const [loading, setLoading] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  // auto-scroll on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // helper to call our interactive-qa API
  async function askQuestion(text) {
    if (!taskId) {
      throw new Error("No task ID available — please upload/process a video first.");
    }

    // 1) POST to create a QA task
    const post = await fetch(`${API_BASE}/api/interactive-qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: taskId,
        question: text,
        generate_clip: proMode,
      }),
    });
    if (!post.ok) {
      const e = await post.json().catch(() => ({}));
      throw new Error(e.detail || `HTTP ${post.status}`);
    }
    const { qa_task_id } = await post.json();

    // 2) poll status
    let status = "";
    while (status !== "completed") {
      const stat = await fetch(
        `${API_BASE}/api/interactive-qa/status/${qa_task_id}`
      ).then((r) => r.json());
      status = stat.status;
      if (status === "failed") throw new Error("Q&A processing failed");
      if (status !== "completed") await new Promise((r) => setTimeout(r, 2000));
    }

    // 3) fetch result
    const result = await fetch(
      `${API_BASE}/api/interactive-qa/result/${qa_task_id}`
    );
    if (!result.ok) throw new Error(`HTTP ${result.status}`);
    return result.json();
  }

  const handleSend = async () => {
    const text = userMessage.trim();
    if (!text) return;

    // add user bubble
    setMessages((m) => [
      ...m,
      { id: Date.now(), sender: "user", text },
    ]);
    setUserMessage("");
    setError("");
    setLoading(true);
    
    // Add a temporary loading message from the bot
    const loadingMsgId = Date.now() + 1;
    setMessages((m) => [
      ...m,
      {
        id: loadingMsgId,
        sender: "bot",
        text: "",
        loading: true,
      },
    ]);

    try {
      const { answer, timestamps, clip_url, clip_title } = await askQuestion(text);

      // Replace the loading message with the actual response
      setMessages((m) => m.map(msg => 
        msg.id === loadingMsgId 
          ? {
              id: loadingMsgId,
              sender: "bot",
              text: answer,
              timestamps,
              clipUrl: clip_url,
              clipTitle: clip_title,
              loading: false,
            }
          : msg
      ));
    } catch (err) {
      console.error(err);
      // Replace loading message with error
      setMessages((m) => m.filter(msg => msg.id !== loadingMsgId));
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  // Loading dots animation component
  const LoadingDots = () => {
    return (
      <div className="flex space-x-1 items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen p-4 max-w-screen-2xl mx-auto">
      <div className="flex-1 overflow-auto mb-4 bg-white rounded-lg shadow p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">
            Chat about: <span className="text-purple-600">{videoTitle || "Your Video"}</span>
          </h1>
          {!taskId && (
            <p className="text-red-600 mt-1">
              No active task — process a video first.
            </p>
          )}
        </header>

        {messages.length === 0 && (
          <div className="text-center text-gray-400 italic">
            Ask a question to get started…
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg) =>
            msg.sender === "user" ? (
              <div key={msg.id} className="text-right">
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                  {msg.text}
                </span>
              </div>
            ) : (
              <div key={msg.id} className="text-left space-y-2">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                  {msg.loading ? (
                    <LoadingDots />
                  ) : (
                    msg.text.split("\n\n").map((p, i) => (
                      <p key={i} className="mb-2">{p}</p>
                    ))
                  )}
                </div>
                {!msg.loading && msg.timestamps?.length > 0 && (
                  <ul className="pl-4 list-disc text-sm text-gray-600">
                    {msg.timestamps.map((ts, i) => (
                      <li key={i}>{ts}</li>
                    ))}
                  </ul>
                )}
                {!msg.loading && msg.clipUrl && (
                  <div className="mt-2">
                    <h4 className="font-semibold">{msg.clipTitle}</h4>
                    <video
                      src={`${API_BASE}${msg.clipUrl}`}
                      controls
                      className="w-full rounded mt-1 shadow"
                    />
                  </div>
                )}
              </div>
            )
          )}
          <div ref={endRef} />
        </div>
      </div>

      {error && (
        <div className="text-red-600 mb-2">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-full p-3"
          placeholder={
            taskId
              ? "Type your question..."
              : "Cannot ask until a video is processed"
          }
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={!taskId || loading}
        />
        <button
          onClick={handleSend}
          disabled={!taskId || loading}
          className={`p-3 rounded-full ${
            loading
              ? "bg-gray-300"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <Send size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-center text-sm text-gray-600">
        <input
          type="checkbox"
          id="proMode"
          checked={proMode}
          onChange={() => setProMode((pm) => !pm)}
          disabled={!taskId}
          className="mr-2 h-4 w-4 text-purple-600 rounded"
        />
        <label htmlFor="proMode">Pro Mode (generate clip)</label>
      </div>
    </div>
  );
}