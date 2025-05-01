import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/dashboard";
import FeatureCardsGrid from "../components/FeatureCard";
import ChatBot from '../pages/chatbot';
import Transcript from '../pages/transcript';
import StudyGuide from "../pages/studyguide";
import HighlightsReel from '../pages/highlights_reels';
import MeetingMinutes from '../pages/meetingminutes';
import Podcasts from '../pages/podcasts';
import Layout from '../components/layout';
import InteractiveChatBot from '../pages/interactivechatbot';



const AppRouter = () => {
    return (
      <Router>
        <Layout>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/interactivechatbot" element={<InteractiveChatBot />} />
          <Route path="/featuregrid" element={<FeatureCardsGrid/>}/>
          <Route path="/transcript" element={<Transcript />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/meetingminutes" element={<MeetingMinutes />}/>
          <Route path="/studyguide" element={<StudyGuide/>}/>
          <Route path="/highlights_reel" element={<HighlightsReel/>}/>
          
        </Routes>
        </Layout>
      </Router>
    );
  };
  
  export default AppRouter;