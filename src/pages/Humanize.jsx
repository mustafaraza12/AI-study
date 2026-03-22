import React from "react";
import ChatLayout from "../components/chat/chatlayout";
import axios from "axios";
import API_URL from "../config";

export default function Humanizer() {
  const handleSend = async ({ text }) => {
    const res = await axios.post(`${API_URL}/humanize-text`, { text });
    return res.data.humanized;
  };

  return (
    <ChatLayout
      title="AI Humanizer"
      subtitle="Paste AI-generated text and get natural human-sounding writing"
      placeholder="Paste your AI-generated text here..."
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "Paste any ChatGPT output here to humanize it",
        "The implementation of artificial intelligence systems...",
      ]}
    />
  );
}