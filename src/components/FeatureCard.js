import React from 'react';
import { 
  MessageSquare, 
  Bot, 
  BookOpen, 
  Headphones, 
  Film, 
  Globe, 
  FileText, 
  FileTerminal,
  ClipboardList,
  ChevronRight
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Icon size={20} className="text-blue-600" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );
};

const FeatureCardsGrid = () => {
  const features = [
    {
      icon: Bot,
      title: "Interactive Chatbot",
      description: "Have a conversation about the video",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Study Guide",
      description: "Get a comprehensive learning guide",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Headphones,
      title: "Podcasts",
      description: "Listen to audio version",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Film,
      title: "Highlights / Reels",
      description: "See the most important moments",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: Globe,
      title: "English Dub",
      description: "Watch with dubbed audio",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      icon: FileText,
      title: "English Sub",
      description: "Watch with subtitles",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600"
    },
    {
      icon: FileTerminal,
      title: "Transcript",
      description: "Read the complete text",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: ClipboardList,
      title: "Meeting Minutes",
      description: "Get a summary of key points",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    }
  ];

  const handleCardClick = (title) => {
    console.log(`${title} card clicked`);
    // You can add your modal opening logic here
  };

  // Function to apply different colors to each card
  const getIconStyles = (index) => {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-600" },
      { bg: "bg-purple-100", text: "text-purple-600" },
      { bg: "bg-green-100", text: "text-green-600" },
      { bg: "bg-yellow-100", text: "text-yellow-600" },
      { bg: "bg-pink-100", text: "text-pink-600" },
      { bg: "bg-indigo-100", text: "text-indigo-600" },
      { bg: "bg-teal-100", text: "text-teal-600" },
      { bg: "bg-orange-100", text: "text-orange-600" },
      { bg: "bg-red-100", text: "text-red-600" }
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const colors = getIconStyles(index);
          return (
            <div key={index} className="feature-card">
              <div 
                className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleCardClick(feature.title)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <feature.icon size={20} className={colors.text} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureCardsGrid;