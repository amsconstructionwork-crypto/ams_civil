'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// You can update this list every year with specific dates (MM-DD) for movable festivals like Diwali, Holi, etc.
const festivals = [
  { date: '01-01', title: 'Happy New Year', message: 'Welcome to the New Year! Let’s build your dream home and create beautiful spaces this year.', icon: '✨', gradient: 'from-blue-500/20 via-purple-500/10 to-pink-500/20' },
  { date: '01-14', title: 'Happy Makar Sankranti', message: 'May your life be filled with joy and your dreams fly as high as kites!', icon: '🪁', gradient: 'from-yellow-500/20 via-orange-500/10 to-red-500/20' },
  { date: '01-26', title: 'Happy Republic Day', message: 'Wishing you a very Happy Republic Day! Let us build a stronger, more beautiful nation together.', icon: '🇮🇳', gradient: 'from-orange-500/20 via-white/10 to-green-500/20' },
  { date: '02-14', title: 'Maha Shivaratri', message: 'May Lord Shiva bless you and your family with peace and prosperity.', icon: '🔱', gradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20' },
  { date: '03-04', title: 'Happy Holi', message: 'May your life and your beautiful home be filled with the most vibrant colors of joy and happiness!', icon: '🎨', gradient: 'from-pink-500/20 via-purple-500/10 to-indigo-500/20' },
  { date: '03-19', title: 'Happy Gudi Padwa', message: 'Wishing you a prosperous Gudi Padwa and a Happy Marathi New Year!', icon: '🚩', gradient: 'from-orange-500/20 via-yellow-500/10 to-red-500/20' },
  { date: '03-20', title: 'Eid Mubarak', message: 'May this beautiful occasion fill your home with peace, happiness, and prosperity.', icon: '🌙', gradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20' },
  { date: '08-15', title: 'Happy Independence Day', message: 'Wishing you a proud and Happy Independence Day! Building the foundations of a free India.', icon: '🇮🇳', gradient: 'from-orange-500/20 via-white/10 to-green-500/20' },
  { date: '08-28', title: 'Happy Raksha Bandhan', message: 'Celebrating the eternal bond of love and protection. Happy Raksha Bandhan!', icon: '🎀', gradient: 'from-pink-500/20 via-red-500/10 to-purple-500/20' },
  { date: '09-14', title: 'Happy Ganesh Chaturthi', message: 'Ganpati Bappa Morya! May Lord Ganesha remove all obstacles and bless your home with prosperity.', icon: '🐘', gradient: 'from-orange-500/20 via-yellow-500/10 to-red-500/20' },
  { date: '10-02', title: 'Happy Gandhi Jayanti', message: 'May the spirit of truth and non-violence guide us always. AMS Civil Construction wishes you a peaceful Gandhi Jayanti.', icon: '🕊️', gradient: 'from-orange-500/20 via-white/10 to-green-500/20' },
  { date: '10-20', title: 'Happy Dussehra', message: 'May truth always triumph! Wishing you a joyous and blessed Dussehra.', icon: '🏹', gradient: 'from-orange-500/20 via-red-500/10 to-yellow-500/20' },
  { date: '11-08', title: 'Happy Diwali', message: 'May the festival of lights bring endless joy, wealth, and prosperity to your beautiful home.', icon: '🪔', gradient: 'from-yellow-500/20 via-orange-500/10 to-red-500/20' },
  { date: '11-14', title: 'Happy Chhath Puja', message: 'May Chhathi Maiya bless your home with health, happiness, and prosperity. Chhath Puja ki hardik shubhkamnayein!', icon: '🌅', gradient: 'from-orange-500/20 via-yellow-500/10 to-red-500/20' },
  { date: '12-25', title: 'Merry Christmas', message: 'Wishing you a Merry Christmas! May your home be filled with joy, peace, and beautiful memories.', icon: '🎄', gradient: 'from-red-500/20 via-green-500/10 to-emerald-500/20' }
];

export default function FestivalPopup() {
  const [activeFestival, setActiveFestival] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get today's date in MM-DD format
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentMMDD = `${month}-${day}`;

    // Find if today is a festival
    const festivalToday = festivals.find(f => f.date === currentMMDD);

    if (festivalToday) {
      // Check if we already showed it today using localStorage
      const lastShownDate = localStorage.getItem('lastFestivalPopupDate');
      
      // If not shown today, show it
      if (lastShownDate !== currentMMDD) {
        setActiveFestival(festivalToday);
        // Add a slight delay so it feels premium and doesn't pop instantly on load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Mark as shown for today
    if (activeFestival) {
      localStorage.setItem('lastFestivalPopupDate', activeFestival.date);
    }
  };

  if (!activeFestival) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Premium Card / Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md aspect-[4/5] bg-[#0B1120] border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 flex flex-col justify-between"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activeFestival.gradient} opacity-80`} />
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="relative p-8 h-full flex flex-col items-center justify-between text-center">
              {/* Close Button */}
              <button 
                onClick={closePopup}
                className="absolute top-0 right-0 w-12 h-12 bg-black/20 hover:bg-black/40 rounded-bl-3xl flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Top Logo */}
              <div className="pt-2">
                <img src="/logo.png" alt="AMS Civil Construction" className="h-16 w-auto object-contain drop-shadow-lg" />
              </div>

              {/* Center Content */}
              <div className="flex flex-col items-center mt-4">
                <div className="text-7xl mb-6 drop-shadow-2xl animate-pulse" style={{ animationDuration: '3s' }}>
                  {activeFestival.icon}
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4 drop-shadow-lg">
                  {activeFestival.title}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed font-medium px-2 drop-shadow-md">
                  {activeFestival.message}
                </p>
              </div>

              {/* Bottom Brand */}
              <div className="w-full pb-2">
                <div className="w-12 h-1 bg-white/40 mx-auto rounded-full mb-4" />
                <p className="text-sm font-bold tracking-widest uppercase text-white drop-shadow-lg">
                  Building Dreams Since 25 Years
                </p>
                <p className="text-xs text-white/80 mt-1 font-mono tracking-widest">WWW.AMSCIVILWORK.IN</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
