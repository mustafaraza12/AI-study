import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#6C63FF]">
        AI Study
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium">

        <Link
          to="/"
          className="hover:text-[#6C63FF] transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-[#6C63FF] transition"
        >
          Dashboard
        </Link>

        <Link
          to="/assignment-solver"
          className="hover:text-[#6C63FF] transition"
        >
          Assignment Solver
        </Link>

        <Link
          to="/pdf-summarizer"
          className="hover:text-[#6C63FF] transition"
        >
          PDF Summarizer
        </Link>

        <Link
          to="quiz-generator"
          className="hover:text-[#6C63FF] transition"
        >
          Quiz generator
        </Link>

        <Link
          to="/study-planner"
          className="hover:text-[#6C63FF] transition"
        >
          Study Planner
        </Link>

    
        <Link
          to="/code-explainer"
          className="hover:text-[#6C63FF] transition"
        >
          Code Explainer
        </Link>


      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <Link to="/login">
          <button className="text-gray-700 font-medium hover:text-[#6C63FF] transition">
            Login
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="bg-[#6C63FF] text-white px-5 py-2 rounded-lg hover:bg-[#5A52E0] transition shadow-md">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}