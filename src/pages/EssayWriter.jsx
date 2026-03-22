import React, { useState } from "react";
import ChatLayout from "../components/chat/chatlayout";
import API_URL from "../config";

export default function EssayWriter() {
  const [essayType,  setEssayType]  = useState("argumentative");
  const [tone,       setTone]       = useState("Academic");
  const [wordCount,  setWordCount]  = useState(500);
  const [language,   setLanguage]   = useState("English");

  const handleSend = async ({ text }) => {
    const res = await fetch(`${API_URL}/write-essay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: text, essayType, tone, wordCount, language }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.essay;
  };

  return (
    <ChatLayout
      title="AI Essay Writer"
      subtitle="Enter a topic and get a full AI-written essay instantly"
      placeholder="Enter your essay topic... (e.g. Impact of social media on mental health)"
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "Impact of social media on mental health",
        "Climate change and its effects",
        "Benefits of artificial intelligence",
        "The importance of education",
      ]}
      extraControls={
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={essayType}
            onChange={(e) => setEssayType(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:border-purple-400"
          >
            {["argumentative","descriptive","expository","persuasive","compare_contrast","narrative"].map((t) => (
              <option key={t} value={t}>{t.replace("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}</option>
            ))}
          </select>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:border-purple-400"
          >
            {["Academic","Formal","Casual","Professional","Creative"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:border-purple-400"
          >
            {[150,300,500,750,1000,1500,2000].map((w) => (
              <option key={w} value={w}>{w} words</option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:border-purple-400"
          >
            {["English","Urdu","Arabic","French","Spanish","German","Turkish","Hindi"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      }
    />
  );
}