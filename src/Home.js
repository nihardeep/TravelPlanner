import React from "react";
import { MapPin, Search } from "lucide-react";
import ChatBot from "./ChatBot";

export default function Home({
  destinations,
  searchParams,
  setSearchParams,
  handleSearch,
  handleDestinationClick,
  chatProps,
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
                onClick={() => alert("Settings coming soon!")}
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
                    setSearchParams({
                      ...searchParams,
                      adults: Number(e.target.value) || 1,
                    })
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
                    setSearchParams({
                      ...searchParams,
                      rooms: Number(e.target.value) || 1,
                    })
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
                style={{ backgroundImage: `url(${d.image})` }}
              />
              <div className="p-4 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-lg text-center">
                {d.name.replace("Trips to ", "Trips to ")}
              </div>
            </div>
          ))}
        </div>
      </main>

      <ChatBot {...chatProps} forceOpen />
    </div>
  );
}

