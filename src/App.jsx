import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import ProtectedRoute from "./components/protectedroutes";

import Home               from "./pages/Home";
import Dashboard          from "./pages/Dashboard";
import AssignmentSolver   from "./pages/AssignmentSolver";
import QuizGenerator      from "./pages/QuizGenerator";
import CodeExplainer      from "./pages/CodeExplainer";
import SlideExplain       from "./pages/SlideExplainer";
import Login              from "./pages/login";
import Humanizer          from "./pages/Humanize";
import YoutubeExplain     from "./pages/YoutubeExplainer";
import DocumentSummarizer from "./pages/DocumentSummarizer";
import MathSolver         from "./pages/MathSolver";
import EssayWriter        from "./pages/EssayWriter";
import FlashcardGenerator from "./pages/FlashCard";

function App() {
  const [collapsed,  setCollapsed]  = useState(false);
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const marginLeft = isMobile ? 0 : collapsed ? 64 : 256;

  return (
    <Router>
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/login" element={<Login />} />

        {/* ── Protected Routes ── */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">

                {/* Sidebar */}
                <Sidebar onCollapse={setCollapsed} />

                {/* Main content */}
                <div
                  style={{ marginLeft: `${marginLeft}px`,   height: "100dvh",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",}}
                  className="flex flex-col flex-1 h-screen overflow-hidden transition-all duration-300 pt-14 md:pt-0"
                >
                  <Routes>
                    <Route path="/"                    element={<Home />} />
                    <Route path="/dashboard"           element={<Dashboard />} />
                    <Route path="/assignment-solver"   element={<AssignmentSolver />} />
                    <Route path="/document-summarizer" element={<DocumentSummarizer />} />
                    <Route path="/quiz-generator"      element={<QuizGenerator />} />
                    <Route path="/code-explainer"      element={<CodeExplainer />} />
                    <Route path="/slide-explainer"     element={<SlideExplain />} />
                    <Route path="/ai-humanizer"        element={<Humanizer />} />
                    <Route path="/youtube-explain"     element={<YoutubeExplain />} />
                    <Route path="/math-solver"         element={<MathSolver />} />
                    <Route path="/essay-writer"        element={<EssayWriter />} />
                    <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
                    <Route path="*"                    element={<Navigate to="/" replace />} />
                  </Routes>
                </div>

              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;