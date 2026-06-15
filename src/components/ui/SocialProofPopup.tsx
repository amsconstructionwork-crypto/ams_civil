'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, X } from 'lucide-react';

const locations = [
  'Bandra', 'Andheri', 'Thane', 'Navi Mumbai', 'Worli', 
  'Goregaon', 'Dadar', 'Borivali', 'Kandivali', 'Powai'
];

const services = [
  'booked a Free Site Visit',
  'inquired about Bungalow Construction',
  'requested a Bathroom Renovation quote',
  'started a Modular Kitchen project',
  'hired for Full Interior Civil Work',
  'booked a 3D Design Consultation'
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTime() {
  return Math.floor(Math.random() * 59) + 1; // 1 to 59 mins ago
}

export default function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ loc: '', svc: '', time: 0 });

  useEffect(() => {
    // Show first popup after 10 seconds
    const initialTimer = setTimeout(() => {
      triggerNewNotification();
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  const triggerNewNotification = () => {
    setNotification({
      loc: getRandomItem(locations),
      svc: getRandomItem(services),
      time: getRandomTime()
    });
    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Schedule next one between 15 to 30 seconds
      const nextDelay = Math.floor(Math.random() * 15000) + 15000;
      setTimeout(() => {
        triggerNewNotification();
      }, nextDelay);
      
    }, 6000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-24 left-4 z-[60] max-w-[300px] w-[calc(100vw-32px)] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.95))' }}
        >
          {/* Orange glow effect */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/20 blur-2xl rounded-full pointer-events-none" />

          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>

          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex flex-shrink-0 items-center justify-center relative border border-orange-500/30">
              <CheckCircle size={18} className="text-orange-500" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f172a] rounded-full animate-pulse" />
            </div>

            <div className="flex-1 pr-4">
              <p className="text-white text-[13px] leading-snug font-medium mb-1">
                Someone from <span className="text-orange-400">{notification.loc}</span> {notification.svc}.
              </p>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                <MapPin size={10} /> Mumbai • {notification.time} mins ago
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
