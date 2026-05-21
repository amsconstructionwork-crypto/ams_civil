'use client';

import React, { useRef, useEffect } from 'react';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';

export default function TopBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const updateHeight = () => {
      const height = banner.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(banner);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 z-50 relative shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="animate-pulse">🔥</span>
        <span>Special Offer: Get a FREE Site Visit & Consultation!</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="tel:+918779391690" className="flex items-center gap-1.5 hover:text-orange-100 transition-colors bg-white/20 px-3 py-1 rounded-full font-bold">
          <PhoneCall size={14} />
          +91 87793 91690
        </a>
        <button 
          onClick={openQuotePopup} 
          className="hidden sm:flex items-center gap-1 text-orange-950 font-bold hover:text-white transition-colors"
        >
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
