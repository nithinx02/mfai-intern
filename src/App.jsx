import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import DashBoard from "./pages/DashBoard";
import AnalysisReport from "./pages/AnalysisReport";
import MockInterview from "./pages/MockInterView";
import InterviewResult from "./pages/InterViewResult";
import UserInfo from "./pages/UserInfo";
import AccountInfo from "./pages/AccountInfo";
import NotFound from "./components/NotFound";
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-resume" element={<ResumeAnalyzer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/accountinfo" element={<AccountInfo />} />
        <Route path="/analysisReport" element={<AnalysisReport />} />
        <Route path="/mockinterview" element={<MockInterview />} />
        <Route path="/interviewresult" element={<InterviewResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
