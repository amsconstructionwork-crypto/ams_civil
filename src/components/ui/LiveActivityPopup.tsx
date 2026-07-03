'use client';

import { useState, useEffect } from 'react';
import { MapPin, X, CheckCircle } from 'lucide-react';

const activities = [
  { name: "Rahul", location: "Andheri", action: "just requested a free estimate", time: "2 mins ago" },
  { name: "Priya", location: "Bandra", action: "booked a site visit", time: "15 mins ago" },
  { name: "Suresh", location: "Powai", action: "completed a 3BHK Renovation", time: "2 days ago" },
  { name: "Amit", location: "Navi Mumbai", action: "requested a quote for Bungalow", time: "1 hour ago" },
  { name: "Neha", location: "Thane", action: "started a kitchen renovation", time: "5 hours ago" },
];

export default function LiveActivityPopup() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first popup after 5 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || !isVisible) return;

    // Hide after 6 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Setup next popup after 15 seconds
      setTimeout(() => {
        if (!isDismissed) {
          setCurrentIdx((prev) => (prev + 1) % activities.length);
          setIsVisible(true);
        }
      }, 15000);
      
    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const activity = activities[currentIdx];

  return (
    <div 
      className={`fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#050914]/95 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(249,115,22,0.15)] rounded-2xl p-4 pr-10 flex items-start gap-4 max-w-[320px]">
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
        
        <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 border border-orange-500/20">
          <CheckCircle size={18} className="text-orange-500" />
        </div>
        
        <div>
          <p className="text-white text-sm font-medium mb-1 leading-snug">
            <span className="font-bold">{activity.name}</span> from {activity.location}
          </p>
          <p className="text-slate-400 text-xs">{activity.action}</p>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-orange-400 font-mono uppercase tracking-widest">
            <MapPin size={10} /> {activity.time}
          </div>
        </div>
      </div>
    </div>
  );
}
