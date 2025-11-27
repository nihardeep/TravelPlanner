import React, { useState } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import ChatMessageSkeleton from './ChatMessageSkeleton';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi! I'm your Trip Planner assistant. Tell me about your dream trip!",
  },
];

const createChatId = () =>
  `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export default function ChatBot({ onChatSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    console.log('ChatBot: Initializing with messages:', INITIAL_MESSAGES);
    return [...INITIAL_MESSAGES];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);

  const startNewChat = () => {
    console.log('ChatBot: Starting new chat with messages:', INITIAL_MESSAGES);
    const freshMessages = [...INITIAL_MESSAGES];
    console.log('ChatBot: Setting messages to:', freshMessages);
    setMessages(freshMessages);
    const nextId = createChatId();
    setChatId(nextId);
    setIsLoading(false);
    setInput('');
  };

  const handleOpenChat = () => {
    console.log('ChatBot: Opening chat');
    startNewChat();
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setChatId(null);
  };

  const ensureChatId = () => {
    if (chatId) return chatId;
    const nextId = createChatId();
    setChatId(nextId);
    return nextId;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const messageContent = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to n8n webhook and wait for response
      console.log("ChatBot: Sending message to n8n...");
      const assistantResponse = await onChatSubmit(messageContent);
      console.log("ChatBot: Received response from n8n:", assistantResponse);

      const assistantMessages = Array.isArray(assistantResponse)
        ? assistantResponse
        : [assistantResponse];

      const normalizedResponses = assistantMessages
        .filter((msg) => msg !== undefined && msg !== null && msg !== '')
        .map((msg) =>
          typeof msg === 'string' ? msg : JSON.stringify(msg, null, 2)
        );

      const repliesToDisplay = normalizedResponses.length
        ? normalizedResponses
        : ["I received your message but got an empty response."];

      // Display every response from n8n
      setMessages(prev => [
        ...prev,
        ...repliesToDisplay.map((content) => ({
          role: 'assistant',
          content,
        }))
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error sending your message.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-purple-500 transition z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plan Your Trip</h3>
            <button
              onClick={handleCloseChat}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {console.log('ChatBot: Rendering messages:', messages)}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-900 mr-auto'
                    : 'bg-purple-600 text-white ml-auto'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <ChatMessageSkeleton />
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}