'use client';

// src/components/ui/SocialProofStrip.tsx
// Real-time social proof strip showing follower counts
import { Instagram, Facebook, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SocialProofStrip() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`w-full bg-[#0B1120] border-y border-white/5 py-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          <div className="flex items-center gap-3 text-slate-300">
            <Users className="text-orange-500" size={20} />
            <span className="text-sm font-semibold">Join our growing community:</span>
          </div>
          
          <a 
            href="https://www.instagram.com/amscivilwork/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
              <Instagram size={16} className="text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-bold">2.5K+ Followers</span>
          </a>
          
          <a 
            href="https://www.facebook.com/profile.php?id=61570712849063" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
              <Facebook size={16} className="text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-bold">500+ Followers</span>
          </a>
        </div>
      </div>
    </div>
  );
}
