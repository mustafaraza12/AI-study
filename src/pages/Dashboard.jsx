import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const tools = [
  {
    name: "Assignment Solver",
    path: "/assignment-solver",
    desc: "Ask any question and get detailed AI-powered answers instantly.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    color: "bg-indigo-100 text-indigo-600",
    badge: null,
  },
  {
    name: "Document Summarizer",
    path: "/document-summarizer",
    desc: "Upload PDF, Word, PPT, Excel or TXT and get a clear AI summary.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    color: "bg-violet-100 text-violet-600",
    badge: "Popular",
  },
  {
    name: "Quiz Generator",
    path: "/quiz-generator",
    desc: "Turn any topic into a full MCQ quiz with answers in one click.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    color: "bg-purple-100 text-purple-600",
    badge: null,
  },
  {
    name: "AI Math Solver",
    path: "/math-solver",
    desc: "Type or upload a math problem and get a full step-by-step solution.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    color: "bg-amber-100 text-amber-600",
    badge: null,
  },
  {
    name: "AI Essay Writer",
    path: "/essay-writer",
    desc: "Generate full essays instantly with custom tone, type and word count.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    color: "bg-pink-100 text-pink-600",
    badge: "New",
  },
  {
    name: "Flashcard Generator",
    path: "/flashcard-generator",
    desc: "Generate smart flashcards from any text or document to study faster.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="10" height="7" rx="1"/>
        <rect x="12" y="3" width="10" height="7" rx="1"/>
        <rect x="2" y="14" width="10" height="7" rx="1"/>
        <rect x="12" y="14" width="10" height="7" rx="1"/>
      </svg>
    ),
    color: "bg-orange-100 text-orange-600",
    badge: "New",
  },
  {
    name: "Code Explainer",
    path: "/code-explainer",
    desc: "Paste any code snippet and get a plain-English breakdown instantly.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: "bg-blue-100 text-blue-600",
    badge: null,
  },
  {
    name: "Slide Explainer",
    path: "/slide-explainer",
    desc: "Upload your presentation and get a full slide-by-slide explanation.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: "bg-teal-100 text-teal-600",
    badge: null,
  },
  {
    name: "AI Humanizer",
    path: "/ai-humanizer",
    desc: "Convert AI-generated writing into natural human-sounding text.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "bg-emerald-100 text-emerald-600",
    badge: null,
  },
  {
    name: "YouTube Explainer",
    path: "/youtube-explain",
    desc: "Paste a YouTube URL and get a full AI explanation of the video.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    color: "bg-red-100 text-red-500",
    badge: null,
  },
];

const stats = [
  { label: "AI Tools",         value: "10",   icon: "⚡" },
  { label: "Always Available", value: "24/7", icon: "🕐" },
  { label: "Accuracy",         value: "99%",  icon: "🎯" },
  { label: "Students Using",   value: "10K+", icon: "🎓" },
];

export default function Dashboard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">

      <div className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Welcome back! Choose a tool to get started.
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow">
            AI
          </div>
        </div>

        <div className="px-4 md:px-10 py-8 space-y-8">

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-xl font-extrabold text-[#6C63FF]">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Grid */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">All Tools</h2>
                <p className="text-sm text-gray-400 mt-0.5">Click any tool to open it</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-600 font-semibold px-3 py-1 rounded-full">
                {tools.length} Tools
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color}`}>
                      {tool.icon}
                    </div>
                    {tool.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                        ${tool.badge === "New"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-500"
                        }`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#6C63FF] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {tool.desc}
                  </p>

                  <Link to={tool.path}>
                    <button className="w-full bg-[#F3F2FF] text-[#6C63FF] text-sm font-semibold py-2 rounded-xl hover:bg-[#6C63FF] hover:text-white transition-all">
                      Open Tool →
                    </button>
                  </Link>

                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Need help getting started?</h3>
              <p className="text-white text-opacity-80 text-sm">
                Try the Assignment Solver — just type your question and get an instant answer.
              </p>
            </div>
            <Link to="/assignment-solver">
              <button className="bg-white text-[#6C63FF] font-bold px-8 py-3 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap shrink-0">
                Try Now →
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
