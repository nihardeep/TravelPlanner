import React, { useEffect, useRef, useState } from "react";
import { Send, Loader2, MessageCircle, X } from "lucide-react";

export default function ChatBot({
  messages,
  input,
  setInput,
  loading,
  onSubmit,
  selectedDestination,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && isOpen) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-purple-500 transition z-40"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      <div
        className={`fixed bottom-4 right-4 w-full max-w-sm bg-black bg-opacity-90 rounded-2xl shadow-2xl border border-purple-500/40 p-4 flex flex-col transition-all duration-300 z-40 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-purple-200">
              TravelMate Assistant
            </p>
            <h2 className="text-xl font-semibold text-white">
              Chat — {selectedDestination || "General"}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-purple-200 hover:text-white transition"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 overflow-auto max-h-80 pr-2">
          {messages.map((m, idx) => (
            <div
              key={`${m.role}-${idx}-${m.content.slice(0, 8)}`}
              className={`p-3 rounded-lg text-sm whitespace-pre-line ${
                m.role === "assistant"
                  ? "bg-white text-black mr-auto"
                  : "bg-purple-700 text-white ml-auto"
              }`}
            >
              {m.content}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="mt-3 flex gap-2">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-3 py-2 rounded-lg resize-none focus:ring-2 focus:ring-purple-300 outline-none text-sm text-black bg-white"
          />

          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-60 flex items-center justify-center min-w-[3rem]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

