import React from "react";
import ChatLayout from "../components/chat/chatlayout";
import API_URL from "../config";

export default function DocumentSummarizer() {
  const handleSend = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_URL}/summarize-document`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.summary;
  };

  return (
    <ChatLayout
      title="Document Summarizer"
      subtitle="Upload any document and get a clear AI-powered summary instantly"
      placeholder="Upload a document to summarize..."
      inputType="file"
      acceptFiles=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.txt"
      onSend={handleSend}
    />
  );
}