import React from 'react';
import Checkbox from '../ui/checkbox';
import PriceRangeSlider from './PriceRangeSlider';
import ScrollArea from '../ui/scroll-area';
import { cn } from '../../lib/utils';

const POPULAR_FILTERS = [
  { key: 'rating7', label: 'Guest rating: 7+ Very good' },
  { key: 'location9', label: 'Location: 9+ Exceptional' },
  { key: 'washingMachine', label: 'Washing machine' },
];

const PROPERTY_TYPES = [
  { key: 'apartment', label: 'Apartment / Flat (4583)' },
  { key: 'serviced', label: 'Serviced apartment (443)' },
  { key: 'hotel', label: 'Hotels (1112)' },
  { key: 'villa', label: 'Villas (238)' },
];

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  filters,
  onToggleFilter,
  className = '',
}) {
  return (
    <aside
      className={cn(
        'bg-white rounded-3xl p-6 shadow-2xl w-full lg:w-80 h-fit sticky top-32',
        className
      )}
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Your budget</h3>
          <p className="text-sm text-gray-500 mb-4">Per night</p>
          <PriceRangeSlider value={priceRange} onChange={onPriceRangeChange} />
        </div>

        <ScrollArea className="max-h-[60vh] pr-2 space-y-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Your filters</h4>
            <Checkbox
              label="Pay at the hotel"
              checked={filters.payAtHotel}
              onChange={(checked) => onToggleFilter('payAtHotel', checked)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Popular filters for Kuala Lumpur
            </h4>
            {POPULAR_FILTERS.map((filter) => (
              <Checkbox
                key={filter.key}
                label={filter.label}
                checked={filters[filter.key]}
                onChange={(checked) => onToggleFilter(filter.key, checked)}
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Property type</h4>
              <span className="text-sm text-gray-500">
                ({PROPERTY_TYPES.length})
              </span>
            </div>

            {PROPERTY_TYPES.map((type) => (
              <Checkbox
                key={type.key}
                label={type.label}
                checked={filters[type.key]}
                onChange={(checked) => onToggleFilter(type.key, checked)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}

