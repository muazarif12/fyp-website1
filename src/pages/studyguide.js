import { useState } from 'react';
import { BookOpen } from 'lucide-react';

const StudyGuide = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyGuideGenerated, setStudyGuideGenerated] = useState(false);

  // Example study guide content
  const studyGuideContent = {
    title: "Breaking Bad Habits: Mindfulness & Behavior Change",
    summary: "This study guide covers Judson Brewer's TED talk on breaking bad habits through mindfulness and understanding the reward-based learning process.",
    keyPoints: [
      "Habits form through reward-based learning: trigger, behavior, reward",
      "Mindfulness helps us observe cravings without acting on them",
      "Being curious about experiences can break the spell of habits",
      "Trying to force change often fails; curiosity is more effective"
    ],
    concepts: [
      {
        term: "Reward-based learning",
        definition: "An evolutionarily conserved process where behaviors that lead to rewards are repeated. Example: See food → Eat food → Feel good → Repeat"
      },
      {
        term: "Mindfulness",
        definition: "The practice of paying attention to the present moment with curiosity rather than judgment"
      },
      {
        term: "Craving",
        definition: "The urgent desire for a specific reward that can trigger habitual behavior"
      },
      {
        term: "Cognitive control",
        definition: "Using the prefrontal cortex to override automatic behaviors; often fails during stress"
      }
    ],
    practiceQuestions: [
      {
        question: "What is a common reason why people fail when trying to break habits?",
        answer: "They try to force themselves to change rather than becoming curious about their experiences"
      },
      {
        question: "How can mindfulness help with smoking cessation?",
        answer: "By encouraging smokers to be curious about the actual experience of smoking, which often reveals unpleasant sensations"
      },
      {
        question: "What happens to cognitive control when we're stressed?",
        answer: "The prefrontal cortex goes offline, making it harder to control our behavior"
      }
    ]
  };

  const handleGenerateStudyGuide = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setStudyGuideGenerated(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-10 w-10 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-800">Study Guide</h1>
      </div>

      {!studyGuideGenerated ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-8">Generate a comprehensive study guide based on your video content</p>
          <button
            onClick={handleGenerateStudyGuide}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
          >
            {isGenerating ? 'Generating...' : 'Generate Study Guide'}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{studyGuideContent.title}</h2>
          
          <div className="mb-6">
            <p className="text-gray-700">{studyGuideContent.summary}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Points</h3>
            <ul className="list-disc pl-5 space-y-2">
              {studyGuideContent.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Concepts</h3>
            <div className="space-y-4">
              {studyGuideContent.concepts.map((concept, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{concept.term}</p>
                  <p className="text-gray-700 mt-1">{concept.definition}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Practice Questions</h3>
            <div className="space-y-4">
              {studyGuideContent.practiceQuestions.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <p className="font-medium text-gray-800">{item.question}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default StudyGuide;