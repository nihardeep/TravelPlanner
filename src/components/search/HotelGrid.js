import React from 'react';
import HotelCard from './HotelCard';

export default function HotelGrid({ hotels, favorites, onToggleFavorite }) {
  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isFavorite={Boolean(favorites[hotel.id])}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

