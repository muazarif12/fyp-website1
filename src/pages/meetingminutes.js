import { useState } from 'react';

const MeetingMinutes = () => {
  const [podcastLanguage, setPodcastLanguage] = useState('English');
  const [podcastLength, setPodcastLength] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePodcast = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Handle success
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span className="text-2xl">⭐</span> 
          Welcome to MeetingMinutes 
          <span className="text-2xl">⭐</span>
        </h1>
        <p className="text-gray-600 mt-2">Meeting Minutes for your meetings in seconds</p>
      </div>

      <div className="space-y-6">
        {/* Podcast Language */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Podcast Language:
          </label>
          <select
            value={podcastLanguage}
            onChange={(e) => setPodcastLanguage(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div> */}

        {/* Speaker Selection
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              Choose Speaker 1
            </button>
          </div>
          <div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              Choose Speaker 2
            </button>
          </div>
        </div> */}

        {/* Podcast Length
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Podcast Length
          </label>
          <select
            value={podcastLength}
            onChange={(e) => setPodcastLength(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value="" disabled>Select length</option>
            <option value="short">Short (5-10 minutes)</option>
            <option value="medium">Medium (10-20 minutes)</option>
            <option value="long">Long (20-30 minutes)</option>
          </select>
        </div> */}

        {/* Special Instructions
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Describe what you want your podcast to focus on, or leave blank to cover the full notes..."
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] resize-none"
          />
        </div> */}

        {/* Generate Button */}
        <button
          onClick={handleGeneratePodcast}
          disabled={isGenerating}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
        >
          {isGenerating ? 'Generating...' : 'Generate Minutes'}
        </button>
      </div>
    </div>
  );
};

export default MeetingMinutes;