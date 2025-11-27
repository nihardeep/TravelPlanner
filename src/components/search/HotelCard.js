import React from 'react';
import { MapPin, Heart, Star } from 'lucide-react';
import Button from '../ui/button';

export default function HotelCard({ hotel, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[2fr,3fr,1.5fr]">
        <div className="relative">
          <img
            src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt={hotel.name}
            className="h-48 w-full object-cover rounded-t-3xl"
          />
          <button
            className="absolute top-3 right-3 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            onClick={() => onToggleFavorite(hotel.id)}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-[#e85d75]' : ''}`}
            />
          </button>

          {hotel.newBadge && (
            <div className="absolute top-3 left-3 bg-[#e85d75] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {hotel.newBadge}
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {hotel.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 text-white px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-[#fcd34d] mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-white/80 mt-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e879f9]" />
              {hotel.location}
            </p>
            {hotel.description && (
              <p className="text-sm text-white/70 mt-2 line-clamp-2">
                {hotel.description}
              </p>
            )}
          </div>

          <p className="text-sm text-[#f87171] font-semibold">
            {hotel.booked}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-green-500/10 text-green-300 text-xs px-3 py-1">
              {hotel.discountBadge}
            </span>
            <span className="rounded-full bg-[#ff8b5f]/10 text-[#ff8b5f] text-xs px-3 py-1">
              Rs. {hotel.discountAmount} applied
            </span>
          </div>
        </div>

        <div className="p-6 border-l border-white/10 flex flex-col justify-between bg-white/5">
          <div className="text-right space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-semibold text-white">
              {hotel.rating.score} <span>{hotel.rating.label}</span>
            </div>
            <p className="text-xs text-white/70">{hotel.rating.reviews} reviews</p>
            {hotel.hasActivity && hotel.hotelPrice && (
              <p className="text-sm text-white/50 line-through">
                Hotel: Rs. {hotel.hotelPrice.toLocaleString('en-IN')}
              </p>
            )}
            <p className="text-3xl font-bold text-white">{hotel.finalPrice}</p>
            <p className="text-xs text-white/60">
              {hotel.hasActivity ? 'Package price' : 'Per night'} before taxes and fees
            </p>
          </div>

          <Button variant="primary" className="w-full mt-6">
            View availability
          </Button>
        </div>
      </div>
    </div>
  );
}

