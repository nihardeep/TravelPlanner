import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

export default function SearchResults({
  destinations,
  searchParams,
  setSearchParams,
  selectedDestination,
  chatProps,
}) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(50);

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-sm font-semibold hover:text-purple-200 transition"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-black bg-opacity-40 rounded-2xl p-6 w-full md:w-[250px] space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-purple-200 mb-2">
                Filters
              </p>
              <h2 className="text-2xl font-bold text-white">
                {selectedDestination || searchParams.destination || "Select a destination"}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Destination
                </label>
                <select
                  value={searchParams.destination}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, destination: e.target.value })
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
                  Price range
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <p className="text-purple-200 text-sm mt-2">Budget: ${price * 50}+ per night</p>
              </div>

              <button className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-purple-50 transition">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-black bg-opacity-20 rounded-2xl h-96 border border-dashed border-purple-300 flex items-center justify-center text-purple-100 text-lg">
              Search results will appear here.
            </div>
          </div>
        </div>
      </main>

      <ChatBot {...chatProps} />
    </div>
  );
}

