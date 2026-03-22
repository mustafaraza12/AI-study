import React from "react";
import ChatLayout from "../components/Chat/ChatLayout";
import axios from "axios";
import API_URL from "../config"

export default function CodeExplainer() {
  const handleSend = async ({ text }) => {
    const res = await axios.post(`${API_URL}/explain-code`, { code: text });
    return res.data.explanation;
  };

  return (
    <ChatLayout
      title="Code Explainer"
      subtitle="Paste any code and get a plain-English breakdown instantly"
      placeholder="Paste your code here..."
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "def fibonacci(n):\n  if n <= 1: return n\n  return fibonacci(n-1) + fibonacci(n-2)",
        "SELECT * FROM users WHERE age > 18 ORDER BY name",
        "const arr = [1,2,3]; const doubled = arr.map(x => x * 2);",
      ]}
    />
  );
}