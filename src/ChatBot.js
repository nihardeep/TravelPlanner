import React, { useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatBot({
  messages,
  input,
  setInput,
  loading,
  onSubmit,
  selectedDestination,
}) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-black bg-opacity-40 rounded-2xl p-6 min-h-[50vh]">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white">
          Chat — {selectedDestination || "General"}
        </h2>
        <p className="text-sm text-gray-300">
          Ask me about itineraries, hotels, flights, and local tips.
        </p>
      </div>

      <div className="space-y-4 overflow-auto max-h-[55vh] pr-2">
        {messages.map((m, idx) => (
          <div
            key={`${m.role}-${idx}`}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === "assistant"
                ? "bg-white text-black ml-0"
                : "bg-purple-700 text-white ml-auto"
            }`}
          >
            <div className="text-sm whitespace-pre-line">{m.content}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="mt-4 flex gap-3 items-center">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question or request..."
          className="flex-1 px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-purple-300 outline-none"
        />

        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-purple-600 px-4 py-3 rounded-lg text-white font-semibold disabled:opacity-60 flex items-center justify-center min-w-[3rem]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

