import React from "react";
import ChatLayout from "../components/chat/chatlayout";
import axios from "axios";
import API_URL from "../config";

export default function YoutubeExplainer() {
  const handleSend = async ({ text }) => {
    const res = await axios.post(`${API_URL}/explain-youtube`, { url: text });
    return res.data.explanation;
  };

  return (
    <ChatLayout
      title="YouTube Explainer"
      subtitle="Paste a YouTube URL and get a full AI explanation of the video"
      placeholder="Paste YouTube URL... (e.g. https://youtube.com/watch?v=...)"
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        "https://www.youtube.com/watch?v=kqtD5dpn9C8",
      ]}
    />
  );
}