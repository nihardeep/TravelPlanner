import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

export default function SearchResults({
  chatProps,
  selectedDestination,
  onToggleSettings,
}) {
  const navigate = useNavigate();

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <button
          onClick={() => navigate("/")}
          className="text-white text-sm font-semibold hover:text-purple-200 transition"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black bg-opacity-40 rounded-2xl p-6 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-purple-200 mb-2">
                Filters
              </p>
              <h2 className="text-2xl font-bold text-white">
                {selectedDestination || "Select a destination"}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-black bg-opacity-30 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Price</h3>
                <div className="h-10 rounded-lg bg-black bg-opacity-30 border border-dashed border-purple-300" />
              </div>

              <div className="bg-black bg-opacity-30 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Destination</h3>
                <div className="h-10 rounded-lg bg-black bg-opacity-30 border border-dashed border-purple-300" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-black bg-opacity-20 rounded-2xl h-96 border border-dashed border-purple-300" />
          </div>
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ChatBot {...chatProps} />
      </div>
    </div>
  );
}

