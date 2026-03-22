import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Document Summarizer",
    desc: "Upload any format of document and get a clear, concise AI summary in seconds.",
    route: "/document-summarizer",
    color: "bg-violet-100 text-violet-600",
    badge: "Popular",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: "Assignment Solver",
    desc: "Ask any question and get detailed AI-powered answers instantly.",
    route: "/assignment-solver",
    color: "bg-indigo-100 text-indigo-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "Quiz Generator",
    desc: "Turn any topic into a full MCQ quiz with answers in one click.",
    route: "/quiz-generator",
    color: "bg-purple-100 text-purple-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    title: "AI Math Solver",
    desc: "Type or upload a math problem and get a full step-by-step solution.",
    route: "/math-solver",
    color: "bg-amber-100 text-amber-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title: "AI Essay Writer",
    desc: "Generate full essays instantly with custom tone, type and word count.",
    route: "/essay-writer",
    color: "bg-pink-100 text-pink-600",
    badge: "New",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="10" height="7" rx="1"/>
        <rect x="12" y="3" width="10" height="7" rx="1"/>
        <rect x="2" y="14" width="10" height="7" rx="1"/>
        <rect x="12" y="14" width="10" height="7" rx="1"/>
      </svg>
    ),
    title: "Flashcard Generator",
    desc: "Paste text or upload a document and get AI-generated study flashcards.",
    route: "/flashcard-generator",
    color: "bg-cyan-100 text-cyan-600",
    badge: "New",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Code Explainer",
    desc: "Paste any code snippet and get a plain-English breakdown instantly.",
    route: "/code-explainer",
    color: "bg-blue-100 text-blue-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Slide Explainer",
    desc: "Upload your presentation and get a full slide-by-slide explanation.",
    route: "/slide-explainer",
    color: "bg-teal-100 text-teal-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "AI Humanizer",
    desc: "Convert AI-generated writing into natural, human-sounding text.",
    route: "/ai-humanizer",
    color: "bg-emerald-100 text-emerald-600",
    badge: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    title: "YouTube Explainer",
    desc: "Paste a YouTube URL and get a full AI explanation of the video.",
    route: "/youtube-explain",
    color: "bg-red-100 text-red-500",
    badge: null,
  },
];

const stats = [
  { value: "10K+", label: "Students Using" },
  { value: "10",   label: "AI Tools" },
  { value: "99%",  label: "Accuracy Rate" },
  { value: "24/7", label: "Always Available" },
];

const steps = [
  {
    step: "01",
    title: "Choose a Tool",
    desc: "Pick from Document Summarizer, Quiz Generator, Math Solver and more.",
  },
  {
    step: "02",
    title: "Upload or Type",
    desc: "Upload your file or type in your topic, question, or code snippet.",
  },
  {
    step: "03",
    title: "Get AI Results",
    desc: "Receive instant, accurate AI-generated answers, summaries, or quizzes.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-br from-[#6C63FF] via-[#7C74FF] to-[#9B8FFF] px-10 py-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs text-[#6C63FF] font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full mb-4 tracking-wide">
              🎓 AI-Powered Learning Platform
            </span>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Study Smarter,<br />Not Harder
            </h1>
            <p className="text-white text-opacity-80 text-base mb-8 leading-relaxed">
              Your all-in-one AI study assistant. Summarize documents, solve assignments,
              generate quizzes, write essays — all in one place.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/assignment-solver")}
                className="bg-white text-[#6C63FF] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/document-summarizer")}
                className="border hover:text-[#6C63FF] border-white border-opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Try Document Summarizer →
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white hover:text-[#6C63FF] border-opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Login →
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border-b border-gray-200">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-5 text-center">
              <p className="text-2xl font-extrabold text-[#6C63FF]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-10 py-10 space-y-12">

          {/* ── Features ── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">All AI Tools</h2>
                <p className="text-sm text-gray-400 mt-0.5">Everything you need to study smarter</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-600 font-semibold px-3 py-1 rounded-full">
                {features.length} Tools
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  onClick={() => navigate(f.route)}
                  className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                      {f.icon}
                    </div>
                    {f.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                        ${f.badge === "New"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-500"
                        }`}>
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#6C63FF] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── How it works ── */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">How It Works</h2>
              <p className="text-sm text-gray-400 mt-0.5">Get results in 3 simple steps</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <div key={s.step} className="bg-white border border-gray-200 rounded-2xl p-6 relative">
                  <span className="text-4xl font-extrabold text-gray-100 absolute top-4 right-5 select-none">
                    {s.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Study Workflow Banner ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Complete Study Workflow</h2>
            <p className="text-sm text-gray-400 mb-6">Use these tools together for a full study session</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Document Summarizer", route: "/document-summarizer", color: "bg-violet-100 text-violet-600" },
                { label: "→", route: null, color: "" },
                { label: "Flashcard Generator", route: "/flashcard-generator", color: "bg-cyan-100 text-cyan-600" },
                { label: "→", route: null, color: "" },
                { label: "Quiz Generator",      route: "/quiz-generator",      color: "bg-purple-100 text-purple-600" },
                { label: "→", route: null, color: "" },
                { label: "Essay Writer",        route: "/essay-writer",        color: "bg-pink-100 text-pink-600" },
                { label: "→", route: null, color: "" },
                { label: "AI Humanizer",        route: "/ai-humanizer",        color: "bg-emerald-100 text-emerald-600" },
              ].map((item, i) =>
                item.route ? (
                  <button
                    key={i}
                    onClick={() => navigate(item.route)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${item.color} hover:opacity-80 transition-opacity`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span key={i} className="text-gray-400 font-bold text-sm">{item.label}</span>
                )
              )}
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Ready to study smarter?</h3>
              <p className="text-white text-opacity-80 text-sm">
                Join thousands of students already using AI Study.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap shrink-0">
              <button
                onClick={() => navigate("/assignment-solver")}
                className="bg-white text-[#6C63FF] font-bold px-8 py-3 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap"
              >
                Start for Free →
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white border-opacity-60 text-white font-bold px-8 py-3 rounded-xl hover:text-[#6C63FF] text-sm hover:bg-white hover:bg-opacity-10 transition-all whitespace-nowrap"
              >
                Login
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}