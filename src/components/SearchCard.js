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
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2-adults');

  const guestOptions = [
    { value: '1-adult', label: '1 adult' },
    { value: '2-adults', label: '2 adults' },
    { value: '3-adults', label: '3 adults' },
    { value: 'family', label: 'Family' },
  ];

  const handleSearch = () => {
    if (!destination) {
      alert('Please select a destination');
      return;
    }
    onSearch({
      destination,
      checkIn,
      checkOut,
      guests: guests.split('-')[0], // Extract number
      rooms: 1
    });
  };

  const isCompact = variant === 'compact';

  return (
    <div className={`bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 rounded-2xl shadow-2xl ${isCompact ? 'py-4 px-6' : 'p-8'} max-w-7xl mx-auto ${className}`}>
      <div className={`grid gap-4 ${isCompact ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-4'} items-end`}>
        <div className={isCompact ? 'md:col-span-1' : 'md:col-span-2'}>
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

        <div>
          <label className={`block text-white font-semibold mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={`w-full rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300 ${isCompact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
          />
        </div>

        <div>
          <label className={`block text-white font-semibold mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={`w-full rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300 ${isCompact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
          />
        </div>

        <div>
          <label className={`block text-white font-semibold mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={`w-full rounded-lg text-gray-800 font-medium outline-none focus:ring-2 focus:ring-purple-300 ${isCompact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
          >
            {guestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`flex justify-center ${isCompact ? 'md:col-span-1' : ''}`}>
          <button
            onClick={handleSearch}
            className={`flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition ${isCompact ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
          >
            <Search className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}