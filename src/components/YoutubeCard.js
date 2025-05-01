import React, { useState } from 'react';
import { Youtube, ChevronRight, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YouTubeCardWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setYoutubeLink('');
    setError(null);
  };

  // use this with backend

  // const processYouTubeVideo = async (url) => {
  //   setIsLoading(true);
  //   setError(null);
    
  //   try {
  //     const response = await fetch('/api/process-youtube', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ url }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return data.taskId; // Assuming the API returns a task ID
  //   } catch (err) {
  //     setError(err.message || 'Failed to process YouTube video');
  //     throw err;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//// mocking the API response
const processYouTubeVideo = async (url) => {
  setIsLoading(true);
  setError(null);
  
  // Mock response in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Mocking API response for development');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return { taskId: 'mock-task-id-123' }; // Return mock data
  }

  // Real API call for production
  try {
    const response = await fetch('/api/process-youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (err) {
    setError(err.message || 'Failed to process YouTube video');
    throw err;
  } finally {
    setIsLoading(false);
  }
};

/////

  const handleSubmit = async () => {
    if (!youtubeLink) {
      setError('Please enter a YouTube URL');
      return;
    }

    try {
      const taskId = await processYouTubeVideo(youtubeLink);
      closeModal();
      // Navigate to chatbot with both the link and task ID
      navigate('/chatbot', { 
        state: { 
          youtubeLink,
          taskId // You can use this to check processing status
        } 
      });
    } catch (err) {
      // Error is already set by processYouTubeVideo
      console.error('API Error:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="font-sans">
      {/* YouTube card */}
      <div 
        className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={openModal}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Youtube size={20} className="text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">YouTube video</h3>
            <p className="text-sm text-gray-500">Paste a YouTube link</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal content */}
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
            
            {/* Modal header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-3">
                <Youtube size={28} className="text-white" />
              </div>
              <h2 className="text-white text-xl font-semibold">YouTube video</h2>
            </div>
            
            {/* YouTube link input */}
            <div>
              <input
                type="text"
                placeholder="Paste a YouTube link"
                className="w-full bg-gray-800 text-white rounded-lg border border-gray-700 p-3 mb-4 focus:outline-none focus:border-purple-500"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              
              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              
              {/* Generate Notes button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  'Generate Notes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeCardWithModal;