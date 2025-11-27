import React from 'react';
import HotelCard from './HotelCard';
import HotelCardSkeleton from './HotelCardSkeleton';

export default function HotelGrid({ hotels, favorites, onToggleFavorite, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <HotelCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

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

