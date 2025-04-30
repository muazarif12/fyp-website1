import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/dashboard";
import FeatureCardsGrid from "../components/FeatureCard";



const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/featurecard" element={<FeatureCardsGrid/>}/>
          {/* <Route path="/chatbot" element={<Chatbot/>} /> */}
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;