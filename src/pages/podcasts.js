// src/components/Podcasts.jsx
import React, { useState, useEffect } from "react";
import { useTask } from "../TaskContext";
import { Loader2, Play, Pause, Volume2, Clock, Download, FileText } from "lucide-react";

const API_BASE = "http://localhost:8000";

export default function Podcasts() {
  const { taskId } = useTask();

  const [isGenerating, setIsGenerating] = useState(false);
  const [podTaskId, setPodTaskId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioElement, setAudioElement] = useState(null);

  // 1) Kick off podcast generation
  const handleGeneratePodcast = async () => {
    if (!taskId) {
      setError("Please process a video before generating a podcast.");
      return;
    }
    setError("");
    setIsGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/api/podcast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: taskId,
          style: "medium", // Default to medium length
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }
      const { podcast_task_id } = await res.json();
      setPodTaskId(podcast_task_id);
      setStatus("processing");
    } catch (e) {
      setError(e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2) Poll status → fetch result & transcript on completion
  useEffect(() => {
    if (!podTaskId) return;
    const interval = setInterval(async () => {
      try {
        const st = await fetch(
          `${API_BASE}/api/podcast/status/${podTaskId}`
        ).then((r) => r.json());
        setStatus(st.status);

        if (st.status === "completed") {
          clearInterval(interval);
          const res = await fetch(
            `${API_BASE}/api/podcast/result/${podTaskId}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setResult(data);

          if (data.transcript_url) {
            const txtRes = await fetch(`${API_BASE}${data.transcript_url}`);
            if (txtRes.ok) {
              setTranscriptText(await txtRes.text());
            }
          }
        }

        if (st.status === "failed") {
          clearInterval(interval);
          setError(st.error || "Podcast generation failed.");
        }
      } catch (e) {
        clearInterval(interval);
        setError(e.message);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [podTaskId]);

  // Custom audio player controls
  useEffect(() => {
    if (result?.audio_url) {
      const audio = new Audio(`${API_BASE}${result.audio_url}`);
      setAudioElement(audio);
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
        audio.currentTime = 0;
      });
      
      return () => {
        audio.pause();
        audio.src = '';
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
      };
    }
  }, [result?.audio_url]);

  const togglePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!audioElement) return;
    const seekTime = (e.target.value / 100) * duration;
    audioElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-gradient-to-b from-[#1a1c2e] to-[#121320] min-h-screen text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
          <span className="text-[#9d4edd]">Podcasts</span>
        </h1>
        <p className="text-gray-400 mt-2">Listen to your notes and bring them to life.</p>
      </div>

      {error && (
        <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!result && !status && (
        <div className="bg-[#252942] rounded-xl p-8 shadow-lg border border-[#3d3f5c] mb-8">
          <p className="text-gray-300 mb-6">
            Generate an AI podcast from your processed video content with a single click.
          </p>

          <button
            onClick={handleGeneratePodcast}
            disabled={isGenerating || !taskId}
            className="w-full bg-[#9d4edd] hover:bg-[#b44afc] text-white font-medium py-4 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span className="inline-flex items-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating...
              </span>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Generate Podcast
              </>
            )}
          </button>

          {!taskId && (
            <p className="text-gray-400 mt-4 text-center text-sm">
              You need to process a video first before generating a podcast.
            </p>
          )}
        </div>
      )}

      {status === "processing" && (
        <div className="bg-[#252942] rounded-xl p-8 shadow-lg border border-[#3d3f5c] flex flex-col items-center justify-center text-center">
          <Loader2 className="animate-spin w-12 h-12 text-[#9d4edd] mb-4" />
          <h3 className="text-xl font-medium mb-2">Creating your podcast</h3>
          <p className="text-gray-400">
            We're transforming your content into an engaging audio experience...
          </p>
        </div>
      )}

      {result && (
        <div className="space-y-8">
          {/* Spotify-like Player */}
          <div className="bg-gradient-to-r from-[#252942] to-[#1e1f35] rounded-xl shadow-xl p-6 border border-[#3d3f5c]">
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#9d4edd] to-[#7b2cbf] rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{result.title}</h2>
                <p className="text-gray-400">
                  Hosts: {result.hosts.join(", ")} · {result.duration_minutes.toFixed(1)} min
                </p>
              </div>
            </div>

            {/* Custom Player Controls */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-[#9d4edd] hover:bg-[#b44afc] rounded-full flex items-center justify-center flex-shrink-0 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                
                <div className="text-gray-400 text-sm">
                  {formatTime(currentTime)}
                </div>

                <div className="relative flex-1">
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / (duration || 1)) * 100}
                    onChange={handleSeek}
                    className="w-full h-1 bg-[#3d3f5c] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <div 
                    className="absolute top-0 left-0 h-1 bg-[#9d4edd] rounded-full pointer-events-none"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  ></div>
                </div>

                <div className="text-gray-400 text-sm">
                  {formatTime(duration)}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <a
                  href={`${API_BASE}${result.audio_url}`}
                  className="inline-flex items-center text-gray-400 hover:text-[#9d4edd] text-sm transition"
                  download
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Transcript Section */}
          {transcriptText && (
            <div className="bg-[#252942] rounded-xl p-6 shadow-lg border border-[#3d3f5c]">
              <h3 className="flex items-center gap-2 font-medium text-white text-xl mb-4">
                <FileText className="h-5 w-5 text-[#9d4edd]" />
                Transcript
              </h3>
              <div className="border border-[#3d3f5c] rounded-lg p-4 max-h-64 overflow-auto bg-[#1e1f35] whitespace-pre-wrap text-gray-300 text-sm">
                {transcriptText}
              </div>
              <a
                href={`${API_BASE}${result.transcript_url}`}
                className="inline-flex items-center mt-4 text-[#9d4edd] hover:text-[#b44afc] transition"
                download
              >
                <Download className="w-4 h-4 mr-1" />
                Download Transcript
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}