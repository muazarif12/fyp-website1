// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';

// const API_BASE = 'http://localhost:8000';

// export default function Transcript() {
//   const location = useLocation();
//   const [videoTitle, setVideoTitle] = useState('Transcript');
//   const [transcript, setTranscript] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadTranscript() {
//       setLoading(true);
//       setError(null);

//       try {
//         const state = location.state || {};
//         const videoInfo = state.videoInfo;
//         const transcriptInfo = state.transcriptInfo;

//         // 1) use title if passed in
//         if (videoInfo && videoInfo.title) {
//           setVideoTitle(videoInfo.title);
//         }

//         // 2) use in-memory transcript if available
//         if (transcriptInfo && transcriptInfo.full_text) {
//           setTranscript(transcriptInfo.full_text);
//           return;
//         }

//         // 3) otherwise fetch the single static file
//         const resp = await fetch(`${API_BASE}/downloads/full_transcript.txt`);
//         if (!resp.ok) {
//           throw new Error(`Could not fetch transcript (HTTP ${resp.status})`);
//         }
//         const text = await resp.text();
//         setTranscript(text);

//       } catch (err) {
//         console.error('Error loading transcript:', err);
//         setError(err.message || 'Unknown error');
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadTranscript();
//   }, [location]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
//         <p className="ml-4">Loading transcript…</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 max-w-lg mx-auto">
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
//           <p className="font-medium">Error loading transcript</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-2">{videoTitle}</h1>
//       <div className="bg-white rounded-xl p-6 shadow-sm border">
//         {transcript
//           .split('\n\n')
//           .map((para, idx) => (
//             <p key={idx} className="mb-4 leading-relaxed">
//               {para}
//             </p>
//           ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, Copy, ArrowUp, Search, X, ChevronLeft } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

export default function Transcript() {
  const location = useLocation();
  const [videoTitle, setVideoTitle] = useState('Transcript');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);
  const searchInputRef = useRef(null);

  // Parse transcript into paragraphs and add timestamps if available
  const formatTranscript = (text) => {
    return text.split('\n\n').map((para) => {
      // Check if paragraph has timestamp pattern like [00:00:00]
      const timestampMatch = para.match(/^\[(\d{2}:\d{2}:\d{2})\]/);
      if (timestampMatch) {
        const timestamp = timestampMatch[1];
        const content = para.replace(/^\[\d{2}:\d{2}:\d{2}\]\s*/, '');
        return { timestamp, content };
      }
      return { timestamp: null, content: para };
    });
  };

  const parsedTranscript = formatTranscript(transcript);

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

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when search bar is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
    }
  };

  const highlightSearchMatches = (text) => {
    if (!searchQuery.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark> 
        : part
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-700">Loading transcript...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
          <h2 className="font-bold text-xl mb-2">Error Loading Transcript</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-red-700 hover:text-red-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Filter paragraphs if search is active
  const filteredTranscript = searchQuery.trim() 
    ? parsedTranscript.filter(para => 
        para.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : parsedTranscript;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()} 
              className="mr-4 text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold truncate">{videoTitle}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full ${showSearch ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Search transcript"
            >
              {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button 
              onClick={copyTranscript}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
              aria-label="Copy transcript"
            >
              <Copy className="w-5 h-5" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Search bar */}
        {showSearch && (
          <div className="bg-gray-50 border-b p-3">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in transcript..."
                  className="w-full py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-2">
                  {filteredTranscript.length} {filteredTranscript.length === 1 ? 'result' : 'results'} found
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6" ref={contentRef}>
        <div className="bg-white rounded-xl p-5 sm:p-8 shadow border">
          {filteredTranscript.length > 0 ? (
            <div className="space-y-6">
              {filteredTranscript.map((para, idx) => (
                <div key={idx} className="leading-relaxed">
                  {para.timestamp && (
                    <div className="text-xs font-medium text-gray-500 mb-1">{para.timestamp}</div>
                  )}
                  <p className="text-gray-800">
                    {searchQuery ? highlightSearchMatches(para.content) : para.content}
                  </p>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No matches found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No transcript content available</p>
          )}
        </div>
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}