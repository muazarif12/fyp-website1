import React, { useState } from 'react';
import { Youtube, ChevronRight, X } from 'lucide-react';

const YouTubeCardWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setYoutubeLink('');
  };

  const handleSubmit = () => {
    // Handle the YouTube link submission here
    console.log('YouTube link submitted:', youtubeLink);
    // After handling, you might want to close the modal
    closeModal();
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
              />
              
              {/* Generate Notes button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                Generate Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeCardWithModal;