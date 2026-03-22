// src/components/Layout/Layout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children, title = "", subtitle = "" }) {
  const navigate    = useNavigate();
  const [search, setSearch] = useState("");

  const tools = [
    { label: "Assignment Solver",    path: "/assignment-solver" },
    { label: "Document Summarizer",  path: "/document-summarizer" },
    { label: "Quiz Generator",       path: "/quiz-generator" },
    { label: "AI Math Solver",       path: "/math-solver" },
    { label: "AI Essay Writer",      path: "/essay-writer" },
    { label: "Flashcard Generator",  path: "/flashcard-generator" },
    { label: "Slide Explainer",      path: "/slide-explainer" },
    { label: "Code Explainer",       path: "/code-explainer" },
    { label: "YouTube Explainer",    path: "/youtube-explain" },
    { label: "AI Humanizer",         path: "/ai-humanizer" },
  ];

  const filtered = tools.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">

      {/* ── Sticky Top Bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shrink-0 sticky top-0 z-40">

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-purple-100 transition-all"
          />

          {/* Search Dropdown */}
          {search && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {filtered.map((t) => (
                <button
                  key={t.path}
                  onClick={() => { navigate(t.path); setSearch(""); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#6C63FF] transition-colors text-left"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {search && filtered.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 px-4 py-3">
              <p className="text-sm text-gray-400">No tools found for "{search}"</p>
            </div>
          )}
        </div>

        {/* Page Title */}
        {title && (
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-gray-700">{title}</h1>
            {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">

          {/* Keyboard shortcut hint */}
          <span className="hidden md:flex items-center gap-1 text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
            <kbd className="font-mono">⌘</kbd><kbd className="font-mono">K</kbd> to search
          </span>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm cursor-pointer">
            AI
          </div>

        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {children}
      </div>

    </div>
  );
}