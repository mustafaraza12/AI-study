import React, { useState } from "react";
import ChatLayout from "../components/chat/chatlayout";
import axios from "axios";
import API_URL from "../config";

export default function QuizGenerator() {
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSend = async ({ text }) => {
    const res = await fetch(`${API_URL}/generate-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        num_question: numQuestions,
      }),
    });

    const data = await res.json();
    console.log("Quiz response:", data);

    if (data.error) throw new Error(data.error);

    const quiz = data.quiz;

    if (!quiz || quiz.length === 0) throw new Error("No quiz returned");

    return quiz.map((q, i) => {
      const opts = q.options
        .map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`)
        .join("\n");
      return `**${i + 1}. ${q.question}**\n\n${opts}\n\n✅ **Answer:** ${q.answer}`;
    }).join("\n\n---\n\n");
  };

  return (
    <ChatLayout
      title="Quiz Generator"
      subtitle="Enter a topic and get a full MCQ quiz instantly"
      placeholder="Enter a topic... (e.g. Photosynthesis, World War 2)"
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "Photosynthesis",
        "French Revolution",
        "Python programming basics",
        "Human digestive system",
      ]}
      extraControls={
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">
            Number of questions:
          </span>
          <div className="flex gap-1.5">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setNumQuestions(n)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all
                  ${numQuestions === n
                    ? "bg-[#6C63FF] text-white border-[#6C63FF]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}