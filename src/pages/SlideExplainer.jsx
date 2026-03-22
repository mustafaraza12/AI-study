import React from "react";
import ChatLayout from "../components/chat/chatlayout";
import API_URL from "../config";

export default function SlideExplainer() {
  const handleSend = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_URL}/explain-slide`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.explanation;
  };

  return (
    <ChatLayout
      title="Slide Explainer"
      subtitle="Upload your presentation and get a full slide-by-slide explanation"
      placeholder="Upload a presentation file..."
      inputType="file"
      acceptFiles=".ppt,.pptx,.pdf"
      onSend={handleSend}
    />
  );
}