import React, { useState } from "react";
import ChatLayout from "../components/chat/chatlayout";
import API_URL from "../config";

function FlashcardDisplay({ content }) {
  const [flipped, setFlipped] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "study"
  const [current, setCurrent] = useState(0);

  let cards = [];
  try {
    cards = JSON.parse(content);
  } catch {
    return <p className="text-gray-600 text-sm">{content}</p>;
  }

  // ── Study Mode ──
  if (viewMode === "study") {
    return (
      <div className="w-full space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500">
            Card {current + 1} of {cards.length}
          </p>
          <button
            onClick={() => { setViewMode("grid"); setFlipped({}); }}
            className="text-xs text-[#6C63FF] border border-[#D4D0FF] px-3 py-1 rounded-lg hover:bg-[#EDEDFF] transition-colors"
          >
            ← Back to Grid
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full">
          <div
            className="h-1.5 bg-[#6C63FF] rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / cards.length) * 100}%` }}
          />
        </div>

        {/* Big flip card */}
        <div
          onClick={() => setFlipped((p) => ({ ...p, [current]: !p[current] }))}
          style={{ perspective: "1000px", height: "220px" }}
          className="cursor-pointer w-full"
        >
          <div style={{
            position: "relative", width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease",
            transform: flipped[current] ? "rotateY(180deg)" : "rotateY(0deg)",
          }}>
            {/* Front */}
            <div
              style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden" }}
              className="bg-white border-2 border-purple-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            >
              <span className="text-xs font-bold text-[#6C63FF] bg-purple-50 px-3 py-1 rounded-full mb-4">
                Question {current + 1}
              </span>
              <p className="text-base font-semibold text-gray-800 leading-relaxed">
                {cards[current]?.question}
              </p>
              <p className="text-xs text-gray-400 mt-4">Click to reveal answer</p>
            </div>
            {/* Back */}
            <div
              style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className="bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            >
              <span className="text-xs font-bold text-white bg-white bg-opacity-20 px-3 py-1 rounded-full mb-4">
                Answer
              </span>
              <p className="text-base font-medium text-white leading-relaxed">
                {cards[current]?.answer}
              </p>
              <p className="text-xs text-white text-opacity-60 mt-4">Click to flip back</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => { setCurrent((p) => Math.max(p - 1, 0)); setFlipped({}); }}
            disabled={current === 0}
            className="px-5 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-400">{current + 1} / {cards.length}</span>
          <button
            onClick={() => { setCurrent((p) => Math.min(p + 1, cards.length - 1)); setFlipped({}); }}
            disabled={current === cards.length - 1}
            className="px-5 py-2 bg-[#6C63FF] text-white rounded-xl text-sm font-semibold hover:bg-[#5750d8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Finished */}
        {current === cards.length - 1 && flipped[current] && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
            <p className="text-sm font-bold text-green-700">🎉 You've completed all cards!</p>
            <button
              onClick={() => { setCurrent(0); setFlipped({}); }}
              className="mt-1 text-xs text-green-600 underline"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Grid Mode ──
  return (
    <div className="w-full space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">
          {cards.length} Flashcards
          <span className="text-xs font-normal text-gray-400 ml-2">click any card to flip</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const csv = ["Question,Answer", ...cards.map((c) => `"${c.question}","${c.answer}"`)].join("\n");
              const a = document.createElement("a");
              a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
              a.download = "flashcards.csv";
              a.click();
            }}
            className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:text-[#6C63FF] hover:border-purple-300 transition-colors"
          >
            ↓ CSV
          </button>
          <button
            onClick={() => { setViewMode("study"); setCurrent(0); setFlipped({}); }}
            className="text-xs text-white bg-[#6C63FF] px-3 py-1 rounded-lg hover:bg-[#5750d8] transition-colors"
          >
            Study Mode →
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
            style={{ perspective: "1000px", height: "160px" }}
            className="cursor-pointer"
          >
            <div style={{
              position: "relative", width: "100%", height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.5s ease",
              transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
            }}>
              {/* Front */}
              <div
                style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6C63FF] bg-purple-50 px-2 py-0.5 rounded-full">
                    Q{i + 1}
                  </span>
                  <span className="text-xs text-gray-300">click to flip</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-relaxed flex-1 flex items-center mt-2">
                  {card.question}
                </p>
              </div>

              {/* Back */}
              <div
                style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                    Answer
                  </span>
                  <span className="text-xs text-white text-opacity-50">click to flip</span>
                </div>
                <p className="text-sm font-medium text-white leading-relaxed flex-1 flex items-center mt-2">
                  {card.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FlashcardGenerator() {
  const [cardCount, setCardCount] = useState(10);

const handleSend = async ({ text, file }) => {
  let cards;
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("cardCount", cardCount);
    const res = await fetch(`${API_URL}/generate-flashcards-file`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    cards = data.flashcards;
  } else {
    const res = await fetch(`${API_URL}/generate-flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, cardCount }),
    });
      const data = await res.json();
      cards = data.flashcards;
    }
    if (!cards) throw new Error("No flashcards returned");
    return JSON.stringify(cards);
  };

  return (
    <ChatLayout
      title="Flashcard Generator"
      subtitle="Paste text or upload a document to generate study flashcards"
      placeholder="Paste your notes or topic... (e.g. Topic: Photosynthesis)"
      inputType="both"
      acceptFiles=".pdf,.doc,.docx,.txt"
      onSend={handleSend}
      renderMessage={(content) => <FlashcardDisplay content={content} />}
      suggestions={[
        "Topic: Human heart and circulatory system",
        "Topic: Photosynthesis",
        "Topic: World War 2 key events",
        "Topic: Python programming basics",
      ]}
      extraControls={
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">Cards:</span>
          <div className="flex gap-1.5">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setCardCount(n)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all
                  ${cardCount === n
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