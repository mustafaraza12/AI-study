import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    label: "Assignment Solver",
    path: "/assignment-solver",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    label: "Document Summarizer",
    path: "/document-summarizer",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    label: "Quiz Generator",
    path: "/quiz-generator",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    label: "AI Math Solver",
    path: "/math-solver",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "AI Essay Writer",
    path: "/essay-writer",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    badge: "New",
  },
  {
    label: "Flashcard Generator",
    path: "/flashcard-generator",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="10" height="7" rx="1"/>
        <rect x="12" y="3" width="10" height="7" rx="1"/>
        <rect x="2" y="14" width="10" height="7" rx="1"/>
        <rect x="12" y="14" width="10" height="7" rx="1"/>
      </svg>
    ),
    badge: "New",
  },
  {
    label: "Slide Explainer",
    path: "/slide-explainer",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: "Code Explainer",
    path: "/code-explainer",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: "YouTube Explainer",
    path: "/youtube-explain",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: "AI Humanizer",
    path: "/ai-humanizer",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const sections = [
  { label: "Main",        items: navItems.slice(0, 2) },
  { label: "Study Tools", items: navItems.slice(2, 8) },
  { label: "Explainers",  items: navItems.slice(8, 11) },
  { label: "Writing",     items: navItems.slice(11) },
];

export default function Sidebar({ messages = [], onselectchange, onCollapse }) {
  const location                  = useLocation();
  const navigate                  = useNavigate();
  const { user, logout }          = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // ← mobile drawer
  const [search, setSearch]       = useState("");

  const handleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (onCollapse) onCollapse(next);
  };

  const filteredSections = sections.map((sec) => ({
    ...sec,
    items: sec.items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((sec) => sec.items.length > 0);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo + Collapse */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6C63FF] flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-base font-bold text-[#6C63FF]">AI Study</span>
          </div>
        )}
        {/* Desktop collapse button */}
        <button
          onClick={handleCollapse}
          className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors ml-auto"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
          </svg>
        </button>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 ml-auto"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <svg width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none flex-1"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {filteredSections.map((sec) => (
          <div key={sec.label}>
            {!collapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                {sec.label}
              </p>
            )}
            {sec.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : ""}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? "bg-[#EDEDFF] text-[#6C63FF]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-[#6C63FF]" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="truncate flex-1 text-sm">{item.label}</span>
                  )}
                  {!collapsed && item.badge && !isActive && (
                    <span className="text-xs bg-green-100 text-green-600 font-semibold px-1.5 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                  {!collapsed && isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6C63FF] shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Chat History */}
      {!collapsed && messages.length > 0 && (
        <div className="border-t border-gray-100 px-3 py-3 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Chat History
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                onClick={() => onselectchange(index)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="truncate">{msg.question?.slice(0, 25)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Login / User */}
      <div className="px-3 py-3 border-t border-gray-100 shrink-0">
        {user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-[#6C63FF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">{user.name || "User"}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors w-full ${collapsed ? "justify-center" : ""}`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6C63FF] hover:bg-[#5750d8] transition-colors w-full ${collapsed ? "justify-center" : ""}`}
          >
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            {!collapsed && <span>Login</span>}
          </Link>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6C63FF] flex items-center justify-center">
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-base font-bold text-[#6C63FF]">AI Study</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <SidebarContent />
      </div>

      {/* ── Desktop Sidebar ── */}
      <div className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}>
        <SidebarContent />
      </div>
    </>
  );
}