import React from 'react';
import Header from '../components/Header';
import SearchCard from '../components/SearchCard';
import DestinationCard from '../components/DestinationCard';
import ChatBot from '../components/ChatBot';

const DESTINATIONS = [
  {
    name: "Trips to Bali",
    image: "https://images.pexels.com/photos/3714902/pexels-photo-3714902.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Tropical Paradise",
  },
  {
    name: "Trips to Kuala Lumpur",
    image: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Modern Metropolis",
  },
  {
    name: "Trips to Bangkok",
    image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "City of Angels",
  },
  {
    name: "Trips to Singapore",
    image: "https://images.pexels.com/photos/1534993/pexels-photo-1534993.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Lion City",
  },
];

export default function Home({ navigate }) {
  const [selectedDestination, setSelectedDestination] = React.useState('');
  const [searchParams, setSearchParams] = React.useState({
    destination: '',
    adults: 1,
    rooms: 1,
  });

  const handleSearch = async (searchData) => {
    // Send to n8n webhook
    const payload = {
      type: "search",
      destination: searchData.destination,
      adults: searchData.adults,
      rooms: searchData.rooms,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("https://ndsharma.app.n8n.cloud/webhook-test/travel-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("n8n webhook error:", err);
    }

    // Navigate to search page
    navigate('/search');
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    // For now, just navigate to search
    navigate('/search');
  };

  const handleChatSubmit = async (message) => {
    const payload = {
      type: "chat",
      message: message,
      destination: selectedDestination || null,
      timestamp: new Date().toISOString(),
    };

    try {
      console.log("Sending chat message to n8n:", payload);

      const response = await fetch("https://ndsharma.app.n8n.cloud/webhook-test/travel-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("n8n response status:", response.status);

      if (response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          // Try to parse as JSON
          try {
            const data = await response.json();
            console.log("n8n JSON response:", data);

            // Handle different possible response formats
            if (data.reply) return data.reply;
            if (data.response) return data.response;
            if (data.message) return data.message;
            if (data.output) return data.output;
            if (data.text) return data.text;
            if (typeof data === 'string') return data;

            // If it's an object, stringify it for display
            return JSON.stringify(data, null, 2);
          } catch (jsonError) {
            console.error("Failed to parse JSON response:", jsonError);
            return "Received response but couldn't parse it. Please check the server logs.";
          }
        } else {
          // Handle plain text response
          try {
            const text = await response.text();
            console.log("n8n text response:", text);
            return text || "Thank you for your message! Our travel assistant will respond shortly.";
          } catch (textError) {
            console.error("Failed to read text response:", textError);
            return "Thank you for your message! Our travel assistant will respond shortly.";
          }
        }
      } else {
        console.error("n8n webhook returned error status:", response.status);
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error("Chat n8n webhook error:", err);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1b69] to-[#1a1530]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Explore Southeast Asia
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Discover, Plan, and Experience Amazing Destinations
          </p>

          <SearchCard onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {DESTINATIONS.map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              image={dest.image}
              description={dest.description}
              onClick={() => handleDestinationClick(dest.name)}
            />
          ))}
        </div>
      </main>

      <ChatBot onChatSubmit={handleChatSubmit} />
    </div>
  );
}