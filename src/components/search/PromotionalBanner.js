import React from 'react';
import { X, TicketPercent } from 'lucide-react';
import Button from '../ui/button';

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#fef3c7] rounded-2xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-inner border border-orange-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-lg">
          <TicketPercent />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500 mb-1">
            Instant savings
          </p>
          <h3 className="text-xl font-semibold text-[#92400e]">
            Looking for instant coupons?
          </h3>
          <p className="text-[#a16207]">
            Check out our Coupons & Deals page for today&apos;s discounts
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="accent" className="text-sm font-semibold">
          See all coupons
        </Button>
        <button
          className="text-[#92400e] hover:text-[#b45309]"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

