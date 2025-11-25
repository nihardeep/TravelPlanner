import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import SearchResults from "./SearchResults";
import ChatBot from "./ChatBot";

const DESTINATIONS = [
  {
    name: "Trips to Bali",
    image:
      "https://images.pexels.com/photos/3714902/pexels-photo-3714902.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Tropical Paradise",
  },
  {
    name: "Trips to Kuala Lumpur",
    image:
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Modern Metropolis",
  },
  {
    name: "Trips to Bangkok",
    image:
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "City of Angels",
  },
  {
    name: "Trips to Singapore",
    image:
      "https://images.pexels.com/photos/1534993/pexels-photo-1534993.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Lion City",
  },
];

const INITIAL_ASSISTANT_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm your Trip Planner assistant. Tell me about your dream trip and I'll help you create the perfect itinerary!",
};

export default function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    adults: 1,
    rooms: 1,
  });
  const [selectedDestination, setSelectedDestination] = useState("");
  const [messages, setMessages] = useState([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setMessages([
      {
        role: "assistant",
        content: `Great choice! Let's plan your trip to ${destination}. Tell me your preferences, budget, and what activities interest you most.`,
      },
    ]);
  };

  const handleSearch = async () => {
    if (!searchParams.destination) {
      alert("Please select a destination before searching.");
      return;
    }

    const payload = {
      type: "travel_search",
      destination: searchParams.destination,
      adults: Number(searchParams.adults || 1),
      rooms: Number(searchParams.rooms || 1),
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("https://ndsharma.app.n8n.cloud/webhook/travel-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSelectedDestination(searchParams.destination);
      setMessages([
        {
          role: "assistant",
          content: `Great choice! Let's plan your trip to ${searchParams.destination}. Tell me your preferences, budget, and what activities interest you most.`,
        },
      ]);

      navigate("/results");
    } catch (err) {
      console.error("n8n webhook error:", err);
      alert("Error submitting search. Please try again.");
    }
  };

  const handleChatSubmit = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    fetch("https://ndsharma.app.n8n.cloud/webhook/travel-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "user_message",
        destination: selectedDestination,
        message: userMessage.content,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("n8n webhook error:", err));

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an expert travel planner. Help plan trips to ${selectedDestination}.`,
            },
            ...updatedMessages,
          ],
          selectedDestination,
        }),
      });

      if (!res.ok) {
        const fallback = {
          role: "assistant",
          content:
            "Sorry — the AI backend is not available right now. We'll respond manually or try again soon.",
        };
        setMessages((prev) => [...prev, fallback]);

        fetch("https://ndsharma.app.n8n.cloud/webhook/travel-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "assistant_message",
            destination: selectedDestination,
            message: fallback.content,
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.error("n8n webhook error:", err));
      } else {
        const data = await res.json();
        const assistantText =
          data?.choices?.[0]?.message?.content ??
          data?.output ??
          "Sorry, I couldn't generate a response.";

        const assistantMessage = { role: "assistant", content: assistantText };
        setMessages((prev) => [...prev, assistantMessage]);

        fetch("https://ndsharma.app.n8n.cloud/webhook/travel-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "assistant_message",
            destination: selectedDestination,
            message: assistantMessage.content,
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.error("n8n webhook error:", err));
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error contacting AI: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sharedChatProps = {
    messages,
    input,
    setInput,
    loading,
    onSubmit: handleChatSubmit,
    selectedDestination,
  };

  const handleSettingsToggle = () => setShowSettings((s) => !s);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            destinations={DESTINATIONS}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            handleSearch={handleSearch}
            handleDestinationClick={handleDestinationClick}
            chatProps={sharedChatProps}
            onToggleSettings={handleSettingsToggle}
          />
        }
      />
      <Route
        path="/results"
        element={
          <SearchResults
            chatProps={sharedChatProps}
            selectedDestination={selectedDestination}
            onToggleSettings={handleSettingsToggle}
          />
        }
      />
    </Routes>
  );
}

function HomePage({
  destinations,
  searchParams,
  setSearchParams,
  handleSearch,
  handleDestinationClick,
  chatProps,
  onToggleSettings,
}) {
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
            <div className="flex items-center gap-4">
              <button
                onClick={onToggleSettings}
                className="text-sm text-purple-200 hover:text-white"
              >
                Settings
              </button>
              <button
                onClick={() => alert("This is a demo site")}
                className="bg-white bg-opacity-10 px-3 py-1 rounded text-white text-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Explore Southeast Asia
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Discover, Plan, and Experience Amazing Destinations
          </p>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
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

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Adults
                </label>
                <input
                  type="number"
                  min={1}
                  value={searchParams.adults}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, adults: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium focus:ring-2 focus:ring-purple-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Rooms
                </label>
                <input
                  type="number"
                  min={1}
                  value={searchParams.rooms}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, rooms: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium focus:ring-2 focus:ring-purple-300 outline-none"
                />
              </div>

              <div className="flex items-center">
                <button
                  onClick={handleSearch}
                  className="ml-2 flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:opacity-95 shadow"
                >
                  <Search className="w-5 h-5" /> Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {destinations.map((d) => (
            <div
              key={d.name}
              onClick={() => handleDestinationClick(d.name)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-200"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${d.image})`,
                }}
              />
              <div className="p-4 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-lg text-center">
                {d.name.replace("Trips to ", "Trips to ")}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ChatBot {...chatProps} />
      </div>
    </div>
  );
}
