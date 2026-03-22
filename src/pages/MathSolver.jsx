import React from "react";
import ChatLayout from "../components/chat/chatlayout";
import API_URL from "../config";

export default function MathSolver() {
  const handleSend = async ({ text, file }) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/solve-math-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data.solution;
    } else {
      const res = await fetch(`${API_URL}/solve-math`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: text }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data.solution;
    }
  };

  return (
    <ChatLayout
      title="AI Math Solver"
      subtitle="Type a math problem or upload an image for step-by-step solution"
      placeholder="Type your math problem... (e.g. Solve: x² - 5x + 6 = 0)"
      inputType="both"
      acceptFiles="image/*"
      onSend={handleSend}
      suggestions={[
        "Solve: x² - 5x + 6 = 0",
        "Differentiate: f(x) = 3x³ + 2x²",
        "Integrate: ∫(2x + 3) dx",
        "Simplify: (x² - 4)/(x - 2)",
      ]}
    />
  );
}