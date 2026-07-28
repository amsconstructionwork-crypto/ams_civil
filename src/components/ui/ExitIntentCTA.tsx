'use client';

// src/components/ui/ExitIntentCTA.tsx
// Shown when user moves mouse to top of browser to leave
import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { openQuotePopup } from './QuotePopup';

export default function ExitIntentCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    
    // Check if already shown in session
    if (sessionStorage.getItem('exit-intent-shown')) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves up towards browser tabs/address bar
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#101827] border border-orange-500/30 rounded-2xl p-8 shadow-2xl animate-scaleIn">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
            <Gift size={32} className="text-orange-500" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-white mb-2">Wait!</h2>
          <p className="text-xl text-orange-400 font-semibold mb-4">
            Get 10% Off Your First Project
          </p>
          
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Don't leave without getting a free, no-obligation estimate for your construction or renovation project. Lock in your discount today.
          </p>
          
          <button 
            onClick={() => {
              setIsVisible(false);
              openQuotePopup();
            }}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Claim My Free Quote
          </button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="mt-4 text-slate-500 hover:text-white text-xs underline"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
