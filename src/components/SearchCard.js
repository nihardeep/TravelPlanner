import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DESTINATIONS = [
  { name: "Trips to Bali", value: "bali" },
  { name: "Trips to Kuala Lumpur", value: "kuala-lumpur" },
  { name: "Trips to Bangkok", value: "bangkok" },
  { name: "Trips to Singapore", value: "singapore" },
];

export default function SearchCard({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    if (!destination) {
      alert('Please select a destination');
      return;
    }
    onSearch({ destination, adults, rooms });
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-white text-sm font-semibold mb-2">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="">Select Destination</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.name}
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
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value) || 1)}
            className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-semibold mb-2">
            Rooms
          </label>
          <input
            type="number"
            min={1}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value) || 1)}
            className="w-full px-4 py-3 rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-50 transition shadow-lg"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}