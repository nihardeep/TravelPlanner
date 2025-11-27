import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DESTINATIONS = [
  { name: "Bali", value: "bali" },
  { name: "Kuala Lumpur", value: "kuala-lumpur" },
  { name: "Bangkok", value: "bangkok" },
  { name: "Singapore", value: "singapore" },
];

export default function SearchCard({
  onSearch,
  variant = 'full', // 'full' or 'compact'
  className = ''
}) {
  const [destination, setDestination] = useState('');
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    if (!destination) {
      alert('Please select a destination');
      return;
    }
    onSearch({
      destination,
      adults: 2, // Default adults
      rooms: rooms
    });
  };

  const isCompact = variant === 'compact';

  return (
    <div className={`bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 rounded-2xl shadow-2xl ${isCompact ? 'py-4 px-6' : 'p-8'} max-w-7xl mx-auto ${className}`}>
      <div className={`flex gap-4 ${isCompact ? 'flex-col sm:flex-row' : 'flex-row'} items-end`}>
        <div className="flex-1">
          <label className={`block text-white font-semibold mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            Location
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`w-full rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300 ${isCompact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
          >
            <option value="">Select destination</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.name}
              </option>
            ))}
          </select>
          {!isCompact && (
            <p className="text-xs text-white/80 mt-1">9,778 choices</p>
          )}
        </div>

        <div className={isCompact ? 'w-full sm:w-32' : 'w-32 flex-shrink-0'}>
          <label className={`block text-white font-semibold mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            Rooms
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value) || 1)}
            className={`w-full rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300 ${isCompact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
          />
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={handleSearch}
            className={`flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition whitespace-nowrap ${isCompact ? 'px-4 py-2 text-sm w-full sm:w-auto' : 'px-6 py-3'}`}
          >
            <Search className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}