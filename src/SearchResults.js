import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

export default function SearchResults({ chatProps }) {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center space-y-6 text-purple-100">
        <button
          onClick={() => navigate(-1)}
          className="self-start text-white text-sm font-semibold hover:text-purple-200 transition"
        >
          ← Back
        </button>
        <div className="bg-black bg-opacity-30 rounded-2xl px-8 py-16 shadow-2xl border border-purple-500/40 w-full">
          <h2 className="text-3xl font-semibold mb-4">It will be updated soon</h2>
          <p className="text-purple-200">
            We are working on bringing curated results for your search. Please check back shortly.
          </p>
        </div>
      </main>

      <ChatBot {...chatProps} />
    </div>
  );
}

