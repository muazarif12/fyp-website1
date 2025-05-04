// import React, { useState } from 'react';
// import { Youtube, ChevronRight, X, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTask } from '../TaskContext';

// // Define API base URL - can be moved to environment variables
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// // More comprehensive YouTube URL validation
// const isValidYouTubeUrl = (url) => {
//   const patterns = [
//     /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
//     /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/,
//     /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/)[a-zA-Z0-9_-]{11}$/
//   ];
//   return patterns.some(pattern => pattern.test(url));
// };

// const YouTubeCardWithModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [youtubeLink, setYoutubeLink] = useState('');
//   const { setTaskId } = useTask();  // Access the setTaskId function from context
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setYoutubeLink('');
//     setError(null);
//     setProgress(0);
//   };

//   const processYouTubeVideo = async (url) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/process-youtube`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `Server error: ${response.status}`);
//       }

//       const data = await response.json();
      
//       // Validate response structure
//       if (!data.task_id) {
//         throw new Error('Invalid response: missing task ID');
//       }
//       if (!data.status) {
//         throw new Error('Invalid response: missing status');
//       }
      
//       return data;
//     } catch (err) {
//       console.error('Error processing video:', err);
//       setError(err.message || 'Failed to process YouTube video');
//       throw err;
//     }
//   };

//   const pollStatus = async (taskId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/status/${taskId}`);
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Status check failed: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Update progress if available
//       if (data.progress) {
//         setProgress(data.progress);
//       }
      
//       // Only validate that status field exists - other fields may not exist until processing completes
//       if (!data.status) {
//         throw new Error('Invalid status response: missing status');
//       }
      
//       // Only validate video_info and transcript_info when status is completed
//       if (data.status === 'completed' && (!data.video_info || !data.transcript_info)) {
//         throw new Error('Invalid complete response: missing video or transcript info');
//       }
      
//       return data;
//     } catch (err) {
//       console.error('Error polling status:', err);
//       throw err;
//     }
//   };

//   // Implements exponential backoff for polling
//   const pollWithBackoff = async (taskId, maxAttempts = 40, initialInterval = 1000) => {
//     let attempts = 0;
//     let interval = initialInterval;
//     let result = null;

//     while (!result && attempts < maxAttempts) {
//       try {
//         const status = await pollStatus(taskId);
        
//         if (status.status === 'completed') {
//           // Additional check to make sure we have all required data
//           if (!status.video_info || !status.transcript_info) {
//             console.error('Response marked as completed but missing required data', status);
//             throw new Error('Server returned incomplete data. Please try again.');
//           }
//           return status;
//         } else if (status.status === 'failed') {
//           throw new Error(status.message || 'Video processing failed');
//         } else {
//           // Still processing, wait and try again
//           await new Promise(resolve => setTimeout(resolve, interval));
//           // Increase interval with each attempt (exponential backoff)
//           interval = Math.min(interval * 1.5, 10000); // Cap at 10 seconds
//           attempts++;
//         }
//       } catch (err) {
//         console.error('Polling error:', err);
//         attempts++;
//         if (attempts >= maxAttempts) throw err;
//         // Wait before retrying
//         await new Promise(resolve => setTimeout(resolve, interval));
//         // Increase interval with each failed attempt
//         interval = Math.min(interval * 2, 10000); // Cap at 10 seconds
//       }
//     }

//     throw new Error('Video processing timed out. Please try again later.');
//   };

//   const handleSubmit = async () => {
//     if (!youtubeLink) {
//       setError('Please enter a YouTube URL');
//       return;
//     }

//     try {
//       // Validate YouTube URL format
//       if (!isValidYouTubeUrl(youtubeLink)) {
//         throw new Error('Please enter a valid YouTube URL');
//       }

//       // 1. Start processing the video
//       const response = await processYouTubeVideo(youtubeLink);
//       const taskId = response.task_id;
      
//       // Set taskId in context
//       setTaskId(taskId);
//       console.log('Processing started, task ID:', taskId);

//       // 2. Poll for completion status with exponential backoff
//       const result = await pollWithBackoff(taskId);

//       // 3. Navigate to chatbot with all the results
//       navigate('/chatbot', { 
//         state: { 
//           youtubeLink,
//           taskId,
//           videoInfo: result.video_info,
//           transcriptInfo: result.transcript_info,
//           progress: result.progress,
//           message: result.message,
//           youtubeVideo: true
//         } 
//       });

//       closeModal();
//     } catch (err) {
//       console.error('Error:', err);
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="font-sans">
//       {/* YouTube card */}
//       <div 
//         className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
//         onClick={openModal}
//       >
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
//             <Youtube size={20} className="text-red-600" />
//           </div>
//           <div className="ml-3">
//             <h3 className="font-medium">YouTube video</h3>
//             <p className="text-sm text-gray-500">Paste a YouTube link</p>
//           </div>
//         </div>
//         <ChevronRight size={20} className="text-gray-400" />
//       </div>

//       {/* Modal overlay */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           {/* Modal content */}
//           <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
//             {/* Close button */}
//             <button 
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//               disabled={isLoading}
//             >
//               <X size={20} />
//             </button>
            
//             {/* Modal header */}
//             <div className="flex flex-col items-center mb-8">
//               <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-3">
//                 <Youtube size={28} className="text-white" />
//               </div>
//               <h2 className="text-white text-xl font-semibold">YouTube video</h2>
//             </div>
            
//             {/* YouTube link input */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Paste a YouTube link"
//                 className="w-full bg-gray-800 text-white rounded-lg border border-gray-700 p-3 mb-4 focus:outline-none focus:border-purple-500"
//                 value={youtubeLink}
//                 onChange={(e) => setYoutubeLink(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 disabled={isLoading}
//               />
              
//               {/* Error message */}
//               {error && (
//                 <p className="text-red-500 text-sm mb-4">{error}</p>
//               )}
              
//               {/* Progress indicator (when processing) */}
//               {isLoading && progress > 0 && (
//                 <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
//                   <div 
//                     className="bg-purple-500 h-2 rounded-full" 
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//               )}
              
//               {/* Generate Notes button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading || !youtubeLink}
//                 className={`w-full font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
//                   isLoading 
//                     ? 'bg-purple-700 text-white' 
//                     : youtubeLink 
//                       ? 'bg-purple-600 hover:bg-purple-700 text-white' 
//                       : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     {progress > 0 ? `Processing... ${progress}%` : 'Processing...'}
//                   </>
//                 ) : (
//                   'Generate Notes'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeCardWithModal;

import React, { useState } from 'react';
import { Youtube, ChevronRight, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../TaskContext';

// Define API base URL - can be moved to environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// More comprehensive YouTube URL validation
const isValidYouTubeUrl = (url) => {
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/,
    /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/)[a-zA-Z0-9_-]{11}$/
  ];
  return patterns.some(pattern => pattern.test(url));
};

const YouTubeCardWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const { setTaskId } = useTask();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setYoutubeLink('');
    setError(null);
    setProgress(0);
  };

  const processYouTubeVideo = async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/process-youtube`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.task_id) throw new Error('Invalid response: missing task ID');
      if (!data.status)  throw new Error('Invalid response: missing status');

      return data;
    } catch (err) {
      console.error('Error processing video:', err);
      setError(err.message || 'Failed to process YouTube video');
      throw err;
    }
  };

  const pollStatus = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status/${taskId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Status check failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.progress) setProgress(data.progress);
      if (!data.status) throw new Error('Invalid status response: missing status');
      if (data.status === 'completed' && (!data.video_info || !data.transcript_info)) {
        throw new Error('Invalid complete response: missing video or transcript info');
      }

      return data;
    } catch (err) {
      console.error('Error polling status:', err);
      throw err;
    }
  };

  // Implements exponential backoff for polling (now up to 50 tries)
  const pollWithBackoff = async (taskId, maxAttempts = 50, initialInterval = 1000) => {
    let attempts = 0;
    let interval = initialInterval;
    let result = null;

    while (!result && attempts < maxAttempts) {
      try {
        const status = await pollStatus(taskId);

        if (status.status === 'completed') {
          if (!status.video_info || !status.transcript_info) {
            console.error('Response marked as completed but missing required data', status);
            throw new Error('Server returned incomplete data. Please try again.');
          }
          return status;
        } else if (status.status === 'failed') {
          throw new Error(status.message || 'Video processing failed');
        } else {
          await new Promise(resolve => setTimeout(resolve, interval));
          interval = Math.min(interval * 1.5, 10000);
          attempts++;
        }
      } catch (err) {
        console.error('Polling error:', err);
        attempts++;
        if (attempts >= maxAttempts) throw err;
        await new Promise(resolve => setTimeout(resolve, interval));
        interval = Math.min(interval * 2, 10000);
      }
    }

    throw new Error('Video processing timed out. Please try again later.');
  };

  const handleSubmit = async () => {
    if (!youtubeLink) {
      setError('Please enter a YouTube URL');
      return;
    }

    try {
      if (!isValidYouTubeUrl(youtubeLink)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      const response = await processYouTubeVideo(youtubeLink);
      const taskId = response.task_id;
      setTaskId(taskId);

      console.log('Processing started, task ID:', taskId);
      const result = await pollWithBackoff(taskId);

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
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-3">
                <Youtube size={28} className="text-white" />
              </div>
              <h2 className="text-white text-xl font-semibold">YouTube video</h2>
            </div>
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
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {isLoading && progress > 0 && (
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
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
                    {progress > 0 ? `Processing... ${progress}%` : 'Processing...'}
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
