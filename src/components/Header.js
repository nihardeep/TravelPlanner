import React from 'react';
import { MapPin } from 'lucide-react';

export default function Header() {
  return (
    <nav className="bg-[#1a1530] border-b border-purple-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <MapPin className="w-8 h-8 text-[#e879f9]" />
            <h1 className="text-2xl font-bold text-[#e879f9]">
              TravelMate
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-purple-200 transition">
              Settings
            </button>
            <button className="bg-white bg-opacity-10 px-3 py-1 rounded text-white hover:bg-opacity-20 transition">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}