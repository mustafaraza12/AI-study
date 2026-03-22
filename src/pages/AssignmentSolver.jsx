import API_URL from "../config";
import axios from "axios";
import ChatLayout from "../components/Chat/ChatLayout";

export default function AssignmentSolver() {
  const handleSend = async ({ text }) => {
    const res = await axios.post(`${API_URL}/solve-assignment`, { question: text });
    return res.data.answer;
  };

  return (
    <ChatLayout
      title="Assignment Solver"
      subtitle="Ask any question and get a detailed AI-powered answer instantly"
      placeholder="Ask your assignment question... (e.g. What is Newton's second law?)"
      inputType="text"
      onSend={handleSend}
      suggestions={[
        "Explain the water cycle",
        "What caused World War 1?",
        "How does DNA replication work?",
        "Solve: if 2x + 5 = 13, find x",
      ]}
    />
  );
}