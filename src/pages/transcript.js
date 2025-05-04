import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

export default function Transcript() {
  const location = useLocation();
  const [videoTitle, setVideoTitle] = useState('Transcript');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTranscript() {
      setLoading(true);
      setError(null);

      try {
        const state = location.state || {};
        const videoInfo = state.videoInfo;
        const transcriptInfo = state.transcriptInfo;

        // 1) use title if passed in
        if (videoInfo && videoInfo.title) {
          setVideoTitle(videoInfo.title);
        }

        // 2) use in-memory transcript if available
        if (transcriptInfo && transcriptInfo.full_text) {
          setTranscript(transcriptInfo.full_text);
          return;
        }

        // 3) otherwise fetch the single static file
        const resp = await fetch(`${API_BASE}/downloads/full_transcript.txt`);
        if (!resp.ok) {
          throw new Error(`Could not fetch transcript (HTTP ${resp.status})`);
        }
        const text = await resp.text();
        setTranscript(text);

      } catch (err) {
        console.error('Error loading transcript:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadTranscript();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="ml-4">Loading transcript…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p className="font-medium">Error loading transcript</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{videoTitle}</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        {transcript
          .split('\n\n')
          .map((para, idx) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {para}
            </p>
          ))}
      </div>
    </div>
  );
}
