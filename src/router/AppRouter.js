import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/dashboard";
import FeatureCardsGrid from "../components/FeatureCard";
import ChatBot from '../pages/chatbot';
import Transcript from '../pages/transcript';
// import EnglishDub from './pages/EnglishDub';
// import EnglishSub from './pages/EnglishSub';
// import HighlightsReel from './pages/HighlightsReel';
// import MeetingMinutes from './pages/MeetingMinutes';
// import Podcasts from './pages/Podcasts';
// import StudyGuide from './pages/StudyGuide';
import Layout from '../components/layout';


const AppRouter = () => {
    return (
      <Router>
        <Layout>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/featuregrid" element={<FeatureCardsGrid/>}/>
          <Route path="/transcript" element={<Transcript />} />
          {/* <Route path="/englishdub" element={<EnglishDub />} />
          <Route path="/englishsub" element={<EnglishSub />} />
          <Route path="/highlights_reel" element={<HighlightsReel />} />
          <Route path="/meetingminutes" element={<MeetingMinutes />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/studyguide" element={<StudyGuide />} /> 
          <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
        </Layout>
      </Router>
    );
  };
  
  export default AppRouter;