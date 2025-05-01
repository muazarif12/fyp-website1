import React, { useState, useRef } from 'react';
import { Video, ChevronRight, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Note: For actual implementation

const LocalVideoCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  // In a real implementation, you'd use this:
  // const navigate = useNavigate();
  
  // Mock navigate function for this example
  const navigate = (path, params) => {
    console.log(`Navigating to ${path} with params:`, params);
    // In reality, this would use React Router's navigate
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setFileName('');
    setPreviewUrl('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setFileName(file.name);
      
      // Create a preview URL for the video
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setFileName(file.name);
        
        // Create a preview URL for the video
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a video file first');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload video');
      }
  
      const data = await response.json();
      console.log('Upload response:', data);
  
      // Navigate to chatbot or status page with task_id and video info
      navigate('/chatbot', {
        state: {
          localVideo: true,
          videoName: fileName,
          taskId: data.task_id, // This will be used to poll/check progress
          status: data.status,
          message: data.message
        }
      });
  
      closeModal();
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Upload failed. Please try again.');
    }
  };
  

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="font-sans">
      {/* Local Video card */}
      <div 
        className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={openModal}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Video size={20} className="text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Local Video</h3>
            <p className="text-sm text-gray-500">Upload from your device</p>
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
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Video size={28} className="text-white" />
              </div>
              <h2 className="text-white text-xl font-semibold">Upload Video</h2>
            </div>
            
            {/* File upload area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors ${
                previewUrl ? 'border-blue-500' : 'border-gray-600 hover:border-gray-400'
              } flex flex-col items-center justify-center text-center`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
              
              {previewUrl ? (
                <div className="w-full">
                  <video 
                    src={previewUrl} 
                    className="w-full h-48 object-cover rounded mb-2" 
                    controls
                  />
                  <p className="text-gray-300 text-sm truncate">{fileName}</p>
                </div>
              ) : (
                <>
                  <Upload size={40} className="text-gray-500 mb-2" />
                  <p className="text-gray-300 mb-1">
                    <span className="text-blue-400 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm">MP4, WebM, MOV, AVI (max 500MB)</p>
                </>
              )}
            </div>
            
            {/* Process Video button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`w-full font-medium py-3 px-4 rounded-lg transition ${
                selectedFile 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Process Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalVideoCard;