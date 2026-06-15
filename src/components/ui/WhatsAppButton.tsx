'use client';
import { useState } from 'react';
import { WhatsAppLogo } from './BrandIcons';
import { X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { name: 'Admin 1', phone: '918779391690' },
    { name: 'Admin 2', phone: '919004298911' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options Menu */}
      <div className={`flex flex-col gap-3 transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'}`}>
        {contacts.map((contact, idx) => {
          const currentUrl = typeof window !== 'undefined' ? window.location.href : 'your website';
          const message = encodeURIComponent(`Hi AMS Civil! I am looking at your page: ${currentUrl} and I want a quote.`);
          
          return (
            <a
              key={idx}
              href={`https://wa.me/${contact.phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#F97316] text-white shadow-lg hover:scale-105 transition-transform"
            >
              <span className="text-xs font-bold font-mono tracking-tight">{contact.phone.slice(2)}</span>
              <WhatsAppLogo className="w-5 h-5 fill-white" />
            </a>
          );
        })}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle WhatsApp Menu"
        className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-xl hover:scale-110 active:scale-95"
        style={{ 
          background: isOpen ? '#1E2D45' : '#F97316',
          boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(249,115,22,0.4)' 
        }}
      >
        {!isOpen && <span className="absolute inset-0 rounded-full bg-[#F97316] animate-pulse opacity-40" />}
        {isOpen ? (
          <X className="text-white relative z-10" size={24} />
        ) : (
          <WhatsAppLogo className="w-7 h-7 fill-white relative z-10" />
        )}
      </button>
    </div>
  );
}
