import { useState } from 'react';
import { Highlighter, Video, Film, Clock } from 'lucide-react';

const HighlightsReel = () => {
  const [selectedOption, setSelectedOption] = useState('highlights');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [duration, setDuration] = useState('short');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent(selectedOption);
    }, 2000);
  };

  // Example video data
  const videoData = {
    title: "A Simple Way to Break a Bad Habit | Judson Brewer | TED",
    duration: "9:28",
    thumbnailUrl: "https://i.ytimg.com/vi/ADuSln1_Jq0/maxresdefault.jpg" // would use a placeholder in real app
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        {selectedOption === 'highlights' ? (
          <Highlighter className="h-10 w-10 text-yellow-500" />
        ) : (
          <Film className="h-10 w-10 text-blue-500" />
        )}
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedOption === 'highlights' ? 'Highlights' : 'Reels'}
        </h1>
      </div>

      {!generatedContent ? (
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">Generate concise video highlights or a dynamic reel from your content</p>
            
            {/* Video information */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-start mb-8">
              <div className="mr-4 w-1/4">
                <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
                  {/* In production, use an actual thumbnail */}
                  <Video className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{videoData.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{videoData.duration}</span>
                </div>
              </div>
            </div>
            
            {/* Option selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to generate?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`flex flex-col items-center p-4 rounded-lg border transition ${
                    selectedOption === 'highlights'
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOption('highlights')}
                >
                  <Highlighter className="h-6 w-6 mb-2" />
                  <span className="font-medium">Highlights</span>
                  <span className="text-xs text-gray-500 mt-1">Key moments from your video</span>
                </button>
                
                <button
                  className={`flex flex-col items-center p-4 rounded-lg border transition ${
                    selectedOption === 'reels'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOption('reels')}
                >
                  <Film className="h-6 w-6 mb-2" />
                  <span className="font-medium">Reels</span>
                  <span className="text-xs text-gray-500 mt-1">Short, engaging video clips</span>
                </button>
              </div>
            </div>
            
            {/* Duration selection
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="short">Short (30 seconds - 1 minute)</option>
                <option value="medium">Medium (1-2 minutes)</option>
                <option value="long">Long (2-3 minutes)</option>
              </select>
            </div>
             */}
            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            >
              {isGenerating ? 'Generating...' : `Generate ${selectedOption === 'highlights' ? 'Highlights' : 'Reel'}`}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
          {/* Show different content based on what was generated */}
          {selectedOption === 'highlights' ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Highlights</h2>
              
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-yellow-50 border-b px-4 py-2 flex justify-between items-center">
                    <span className="font-medium">Key Moment 1</span>
                    <span className="text-sm text-gray-500">0:45</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">Introduction to reward-based learning and why it's hard to pay attention</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-yellow-50 border-b px-4 py-2 flex justify-between items-center">
                    <span className="font-medium">Key Moment 2</span>
                    <span className="text-sm text-gray-500">2:18</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">How reward-based learning creates habits: trigger, behavior, reward</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-yellow-50 border-b px-4 py-2 flex justify-between items-center">
                    <span className="font-medium">Key Moment 3</span>
                    <span className="text-sm text-gray-500">4:57</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">Example of using mindfulness to help people quit smoking</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-yellow-50 border-b px-4 py-2 flex justify-between items-center">
                    <span className="font-medium">Key Moment 4</span>
                    <span className="text-sm text-gray-500">7:32</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">The importance of curiosity in breaking habits vs. forcing change</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setGeneratedContent(null)}
                className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg focus:outline-none"
              >
                Generate New Highlights
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Reel Generated</h2>
              
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                {/* In production, this would be a video player */}
                <div className="text-center p-4">
                  <Film className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Your {duration} reel is ready to view</p>
                  <p className="text-sm text-gray-500 mt-1">Breaking Bad Habits - The Science Behind It</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Reel Details</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium">Duration:</span> {duration === 'short' ? '45 seconds' : duration === 'medium' ? '1:30' : '2:45'}</li>
                  <li><span className="font-medium">Clips included:</span> 4</li>
                  <li><span className="font-medium">Background music:</span> Ambient</li>
                  <li><span className="font-medium">Caption style:</span> Modern</li>
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">
                  Download Reel
                </button>
                <button
                  onClick={() => setGeneratedContent(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg focus:outline-none"
                >
                  Create New Reel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HighlightsReel;