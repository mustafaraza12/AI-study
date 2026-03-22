import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-20">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold text-white">404</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="text-sm text-gray-400 mt-2 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-semibold text-white bg-[#6C63FF] px-5 py-2.5 rounded-xl hover:bg-[#5750d8] transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}