import React from 'react';

export default function DestinationCard({ name, image, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-4 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-lg text-center">
        {name}
      </div>
    </div>
  );
}