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

  const processYouTubeVideo = async (url) => {
    setIsLoading(true);
    setError(null);
    
    // Mock response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Mocking API response for development');
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        
        // Return mock data matching the API schema
        const mockResponse = {
          task_id: `mock-task-${Math.random().toString(36).substring(2, 9)}`,
          status: "processing",
          message: "Video processing started successfully"
        };
        
        return mockResponse;
      } catch (err) {
        setError('Mock processing failed');
        throw err;
      }
    }

    // Real API call for production
    // try {
    //   const response = await fetch('/api/process-youtube', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ url }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || `Error: ${response.status}`);
    //   }

    //   const data = await response.json();
      
    //   // Validate response structure
    //   if (!data.task_id || !data.status) {
    //     throw new Error('Invalid API response structure');
    //   }
      
    //   return data;
    // } catch (err) {
    //   setError(err.message || 'Failed to process YouTube video');
    //   throw err;
    // }
  };

  const pollStatus = async (taskId) => {
    // Mock polling in development
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
      return {
        status: 'completed',
        progress: 100,
        video_info: {
          path: `downloads/temp/${taskId}_downloaded_video.mp4`,
          title: `${taskId}_downloaded_video.mp4`,
          description: "",
          youtube_id: null
        },
        transcript_info: {
          segments: [
            { start: 0, end: 1.82, text: "Leonardo Silva Reviewer" },
            { start: 12.36, end: 16.78, text: "I dedicated the past years to understanding how people achieve their dreams." }
          ],
          full_text: "00:00:00 - 00:00:01: Leonardo Silva Reviewer\n\n00:00:12 - 00:00:16: I dedicated the past years to understanding how people achieve their dreams.",
          language: "en"
        },
        message: "Video processing completed successfully"
      };
    }

    // // Real API call for production
    // try {
    //   const response = await fetch(`/api/status/${taskId}`);
    //   if (!response.ok) throw new Error('Failed to fetch status');
      
    //   const data = await response.json();
      
    //   // Validate response structure
    //   if (!data.status || !data.video_info || !data.transcript_info) {
    //     throw new Error('Invalid status response structure');
    //   }
      
    //   return data;
    // } catch (err) {
    //   console.error('Error polling status:', err);
    //   throw err;
    // }
  };

  const handleSubmit = async () => {
    if (!youtubeLink) {
      setError('Please enter a YouTube URL');
      return;
    }

    try {
      // Validate YouTube URL format
      if (!youtubeLink.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      // 1. Start processing the video
      const response = await processYouTubeVideo(youtubeLink);
      const taskId = response.task_id;
      
      console.log('Processing started, task ID:', taskId);

      // 2. Poll for completion status
      let result = null;
      const maxAttempts = 10;
      const interval = 3000; // 3 seconds
      let attempts = 0;

      while (!result && attempts < maxAttempts) {
        try {
          const status = await pollStatus(taskId);
          
          if (status.status === 'completed') {
            result = status;
          } else if (status.status === 'failed') {
            throw new Error('Video processing failed');
          } else {
            // Still processing
            await new Promise(resolve => setTimeout(resolve, interval));
            attempts++;
          }
        } catch (err) {
          console.error('Polling error:', err);
          attempts++;
          if (attempts >= maxAttempts) throw err;
        }
      }

      if (!result) {
        throw new Error('Video processing timed out. Please try again later.');
      }

      // 3. Navigate to chatbot with all the results
      navigate('/chatbot', { 
        state: { 
          youtubeLink,
          taskId,
          videoInfo: result.video_info,
          transcriptInfo: result.transcript_info,
          progress: result.progress,
          message: result.message,
          youtubeVideo: true
        } 
      });

      closeModal();
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
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
                disabled={isLoading || !youtubeLink}
                className={`w-full font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-purple-700 text-white' 
                    : youtubeLink 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
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