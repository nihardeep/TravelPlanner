import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults";

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

      const params = new URLSearchParams({
        destination: searchParams.destination,
        adults: String(searchParams.adults),
        rooms: String(searchParams.rooms),
      });

      navigate(`/search?${params.toString()}`);
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            destinations={DESTINATIONS}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            handleSearch={handleSearch}
            handleDestinationClick={handleDestinationClick}
            chatProps={sharedChatProps}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchResults
            destinations={DESTINATIONS}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedDestination={selectedDestination}
            chatProps={sharedChatProps}
          />
        }
      />
    </Routes>
  );
}
