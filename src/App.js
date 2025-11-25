import React, { useState } from "react";
import {
  Send,
  Loader2,
  MapPin,
  Home,
  Search,
  MessageCircle,
} from "lucide-react";

export default function TravelApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchParams, setSearchParams] = useState({
    destination: "",
    adults: 1,
    rooms: 1,
  });
  const [selectedDestination, setSelectedDestination] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Trip Planner assistant. Tell me about your dream trip and I'll help you create the perfect itinerary!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(""); // <-- Gemini key
  const [showSettings, setShowSettings] = useState(false);

  const destinations = [
    {
      name: "Trips to Bali",
      image:
        "https://images.pexels.com/photos/3714902/pexels-photo-3714902.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Tropical Paradise",
      color: "from-orange-400 to-red-500",
    },
    {
      name: "Trips to Kuala Lumpur",
      image:
        "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Modern Metropolis",
      color: "from-purple-400 to-pink-500",
    },
    {
      name: "Trips to Bangkok",
      image:
        "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "City of Angels",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Trips to Singapore",
      image:
        "https://images.pexels.com/photos/1534993/pexels-photo-1534993.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Lion City",
      color: "from-blue-400 to-cyan-500",
    },
  ];

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setCurrentPage("chatbot");
    setMessages([
      {
        role: "assistant",
        content: `Great choice! Let's plan your trip to ${destination}. Tell me your preferences, budget, and what activities interest you most.`,
      },
    ]);
  };

  const handleChatSubmit = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) {
      alert("Please enter your Gemini API Key first.");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      // Gemini API (Flash 1.5)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
You are an expert travel planner for ${selectedDestination}.
User message: ${input}

Conversation so far:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}
                  `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content:
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  // HOME PAGE UI
  if (currentPage === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black bg-opacity-60 backdrop-blur-md border-b border-purple-500 border-opacity-30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <MapPin className="w-8 h-8 text-purple-400" />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  TravelMate
                </h1>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Explore Southeast Asia
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Discover, Plan, and Experience Amazing Destinations
            </p>

            {/* Search Panel */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Destination
                  </label>
                  <select
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium focus:ring-2 focus:ring-purple-300 outline-none"
                  >
                    <option value="">Select Destination</option>
                    {destinations.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Adults */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Adults
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={searchParams.adults}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        adults: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium"
                  />
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Rooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={searchParams.rooms}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        rooms: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium"
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    onClick={() =>
                      alert(
                        `Searching hotels in ${searchParams.destination} for ${searchParams.adults} adults and ${searchParams.rooms} rooms.`
                      )
                    }
                    className="w-full flex justify-center items-center gap-2 bg-white text-purple-700 font-bold py-3 rounded-lg shadow-lg hover:bg-purple-50 transition"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {destinations.map((d) => (
                <div
                  key={d.name}
                  onClick={() => handleDestinationClick(d.name)}
                  className={`cursor-pointer group`}
                >
                  <div
                    className={`rounded-2xl overflow-hidden shadow-xl transition transform group-hover:scale-105 bg-gradient-to-br ${d.color}`}
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-full h-48 object-cover opacity-90"
                    />
                    <div className="p-4 text-center text-white font-semibold">
                      {d.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CHATBOT PAGE UI
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-black bg-opacity-60 backdrop-blur-md border-b border-purple-500 border-opacity-30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-2 text-purple-300"
            >
              <Home className="w-5 h-5" /> Home
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-purple-300"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {showSettings && (
        <div className="bg-slate-800 p-4">
          <label className="block mb-2">Gemini API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl ${
              msg.role === "assistant"
                ? "bg-purple-700 bg-opacity-40"
                : "bg-slate-700"
            }`}
          >
            {msg.content}
          </div>
        ))}

        <div className="flex gap-2 mt-4">
          <textarea
            rows="2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 rounded bg-slate-800 text-white"
            placeholder="Ask something…"
          ></textarea>

          <button
            onClick={handleChatSubmit}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
