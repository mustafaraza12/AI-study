import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function ChatLayout({
  title,
  subtitle,
  placeholder,
  inputType,
  acceptFiles,
  onSend,
  renderMessage,
  extraControls,
  suggestions,
}) {
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState("");
  const [file,      setFile]      = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [inputHeight, setInputHeight] = useState(80);
  const bottomRef                 = useRef();
  const fileInputRef              = useRef();
  const inputAreaRef              = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ✅ Track input area height dynamically
  useEffect(() => {
    if (inputAreaRef.current) {
      const observer = new ResizeObserver(() => {
        setInputHeight(inputAreaRef.current?.offsetHeight || 80);
      });
      observer.observe(inputAreaRef.current);
      return () => observer.disconnect();
    }
  }, [extraControls, file, error]);

  const handleSend = async () => {
    if (inputType === "file" && !file)                   { setError("Please upload a file."); return; }
    if (inputType === "text" && !input.trim())            { setError("Please enter a message."); return; }
    if (inputType === "both" && !input.trim() && !file)   { setError("Please enter a message or upload a file."); return; }

    const userContent = input.trim() || (file ? file.name : "");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: userContent, file: file?.name }]);
    setInput("");
    setFile(null);
    setLoading(true);

    try {
      const reply = await onSend({ text: input.trim(), file });
      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "ai",
        content: "Sorry, something went wrong. Please try again.",
        isError: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setError(""); }
  };

  return (
    <div
      className="relative bg-[#F8FAFC]"
      style={{ height: "100%", overflow: "hidden" }}
    >

      {/* ── Scrollable Messages Area ── */}
      <div
        className="absolute inset-x-0 top-0 overflow-y-auto px-3 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6"
        style={{ bottom: `${inputHeight}px` }}
      >

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full text-center gap-4 py-10">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shadow-lg">
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xs md:max-w-sm px-4">{subtitle}</p>
            </div>
            {suggestions && suggestions.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-xs md:max-w-lg px-4">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-xs text-[#6C63FF] border border-[#D4D0FF] bg-[#F8F7FF] px-3 py-1.5 rounded-xl hover:bg-[#EDEDFF] transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 md:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            )}

            <div className={`max-w-[85%] md:max-w-2xl rounded-2xl px-3 md:px-4 py-2.5 md:py-3 text-sm leading-relaxed
              ${msg.role === "user"
                ? "bg-[#6C63FF] text-white rounded-tr-sm"
                : msg.isError
                  ? "bg-red-50 border border-red-200 text-red-600 rounded-tl-sm"
                  : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.file && (
                <div className="flex items-center gap-1.5 mb-2 bg-white bg-opacity-20 rounded-lg px-2 py-1 w-fit">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span className="text-xs opacity-90 truncate max-w-[150px] md:max-w-xs">{msg.file}</span>
                </div>
              )}

              {msg.role === "user" ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : renderMessage ? (
                renderMessage(msg.content)
              ) : (
                <div className="
                  [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-gray-800 [&_h1]:mb-3 [&_h1]:mt-1
                  [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-gray-100
                  [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-purple-700 [&_h3]:mt-3 [&_h3]:mb-1
                  [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-2 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-2 [&_ol]:space-y-1
                  [&_li]:text-gray-600 [&_li]:leading-relaxed
                  [&_strong]:font-semibold [&_strong]:text-gray-800
                  [&_code]:bg-purple-50 [&_code]:text-purple-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono
                  [&_pre]:bg-gray-50 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:rounded-xl [&_pre]:p-3 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:text-xs
                  [&_p]:mb-2 [&_p]:text-gray-600
                  [&_.katex]:text-sm [&_.katex-display]:my-3 [&_.katex-display]:overflow-x-auto [&_.katex-html]:overflow-x-auto [&_.katex-html]:max-w-full
                ">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}

              {msg.role === "ai" && !msg.isError && (
                <button
                  onClick={() => navigator.clipboard.writeText(msg.content)}
                  className="mt-2 text-xs text-gray-400 hover:text-[#6C63FF] flex items-center gap-1 transition-colors"
                >
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy
                </button>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-gray-500">
                You
              </div>
            )}
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div className="flex gap-2 md:gap-3 justify-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Fixed Bottom Input ── */}
      <div
        ref={inputAreaRef}
        className="absolute inset-x-0 bottom-0 border-t border-gray-200 bg-white px-3 md:px-6 py-3 md:py-4"
        style={{ zIndex: 10 }}
      >
        {extraControls && (
          <div className="mb-3 overflow-x-auto">
            {extraControls}
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 mb-2 px-1">{error}</p>
        )}

        {file && (
          <div className="flex items-center gap-2 mb-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2 w-fit max-w-full">
            <svg width="13" height="13" fill="none" stroke="#6C63FF" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span className="text-xs font-medium text-purple-700 truncate max-w-[200px] md:max-w-xs">{file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="text-purple-400 hover:text-red-400 ml-1 transition-colors shrink-0"
            >
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 md:gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-3 md:px-4 py-2.5 md:py-3 focus-within:border-[#6C63FF] focus-within:ring-2 focus-within:ring-purple-100 transition-all">

          {(inputType === "file" || inputType === "both") && (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-gray-400 hover:text-[#6C63FF] transition-colors shrink-0 mb-0.5"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptFiles}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          )}

          {(inputType === "text" || inputType === "both") && (
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={placeholder || "Type a message..."}
              className="flex-1 bg-transparent resize-none focus:outline-none text-sm text-gray-700 placeholder-gray-400 max-h-32 md:max-h-40 leading-relaxed"
              style={{ minHeight: "24px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
              }}
            />
          )}

          {inputType === "file" && (
            <span
              className="flex-1 text-sm text-gray-400 cursor-pointer truncate"
              onClick={() => fileInputRef.current.click()}
            >
              {file ? file.name : placeholder || "Click the clip icon to upload..."}
            </span>
          )}

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-8 h-8 rounded-xl bg-[#6C63FF] hover:bg-[#5750d8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition-colors shadow-sm"
          >
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>

        </div>

        <p className="hidden md:block text-xs text-gray-400 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>

      </div>
    </div>
  );
}