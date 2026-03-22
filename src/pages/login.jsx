import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import API_URL from "../config";

export default function Login() {
  const [isLogin,  setIsLogin]  = useState(true);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const { login }         = useAuth();
  const navigate          = useNavigate();
  const googleInitialized = useRef(false);

  useEffect(() => {
    setError("");
  }, []);

  useEffect(() => {
    if (googleInitialized.current) {
      const btnEl = document.getElementById("google-btn");
      if (btnEl && window.google) {
        btnEl.innerHTML = "";
        window.google.accounts.id.renderButton(btnEl, {
          theme: "outline",
          size:  "large",
          width: "400",
          text:  isLogin ? "signin_with" : "signup_with",
          shape: "rectangular",
        });
      }
      return;
    }

    const googleCallback = async (credentialResponse) => {
      console.log("Google callback fired:", credentialResponse);

      if (!credentialResponse?.credential) {
        setError("Google login failed — no credential received.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        // ✅ URL 1 — Google login
        const res = await fetch(`${API_URL}/auth/google-login`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ token: credentialResponse.credential }),
        });

        const data = await res.json();
        console.log("Backend response:", data);

        if (!res.ok) {
          setError(data.error || "Google login failed.");
          return;
        }

        login(data.user, data.token);
        navigate("/dashboard");

      } catch (err) {
        console.error("Google error:", err);
        setError("Google login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const initGoogle = () => {
      if (!window.google) return;

      googleInitialized.current = true;

      window.google.accounts.id.initialize({
        client_id:             import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback:              googleCallback,
        auto_select:           false,
        cancel_on_tap_outside: true,
      });

      const btnEl = document.getElementById("google-btn");
      if (btnEl) {
        btnEl.innerHTML = "";
        window.google.accounts.id.renderButton(btnEl, {
          theme: "outline",
          size:  "large",
          width: "400",
          text:  isLogin ? "signin_with" : "signup_with",
          shape: "rectangular",
        });
      }
    };

    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initGoogle();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isLogin, login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email)              { setError("Email is required."); return; }
    if (!password)           { setError("Password is required."); return; }
    if (!isLogin && !name)   { setError("Please enter your name."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      // ✅ URL 2 — Email/password login and register
      const res = await fetch(`${API_URL}${endpoint}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      login(data.user, data.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Network error. Make sure your server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex-col items-center justify-center px-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">AI Study</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Study Smarter<br />with AI
          </h1>
          <p className="text-white text-opacity-80 text-base leading-relaxed mb-10 max-w-sm">
            Your all-in-one AI study assistant. Summarize, solve, generate quizzes and more.
          </p>
          <div className="space-y-3 text-left">
            {[
              "📄 Document Summarizer",
              "🧮 AI Math Solver",
              "📝 Essay Writer",
              "🎴 Flashcard Generator",
              "🎯 Quiz Generator",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl px-4 py-2.5">
                <span className="text-sm text-white">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center">
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-[#6C63FF]">AI Study</span>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(""); setEmail(""); setPassword(""); setName(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all
                ${isLogin ? "bg-white text-[#6C63FF] shadow-sm" : "text-gray-500"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); setEmail(""); setPassword(""); setName(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all
                ${!isLogin ? "bg-white text-[#6C63FF] shadow-sm" : "text-gray-500"}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {isLogin ? "Sign in to your account to continue" : "Start studying smarter today"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name — signup only */}
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-[#FAFAFA] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-[#FAFAFA] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-xs text-[#6C63FF] hover:underline font-medium">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-[#FAFAFA] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-purple-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C63FF] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#5750d8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"/>
                  </svg>
                  {isLogin ? "Signing in…" : "Creating account…"}
                </span>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <div id="google-btn" className="w-full flex justify-center" />

          {/* Toggle link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); setEmail(""); setPassword(""); setName(""); }}
              className="text-[#6C63FF] font-semibold hover:underline"
            >
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}