'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    name: "Vikram Mehta",
    date: "2 weeks ago",
    content: "AMS Civil Construction did an incredible job with our bungalow in Bandra. They were transparent about pricing from day one and finished the work right on schedule. The finishing quality is absolutely premium.",
    initials: "VM"
  },
  {
    name: "Anjali Desai",
    date: "1 month ago",
    content: "We hired them for a complete flat renovation in Andheri West. Their team is highly professional and handled everything from plumbing to false ceilings. Very happy with the final result!",
    initials: "AD"
  },
  {
    name: "Rohan Kapoor",
    date: "3 months ago",
    content: "Best civil contractor in Mumbai! Kedar sir personally supervised our site. They use only branded materials and the structural work is top-notch. Highly recommended.",
    initials: "RK"
  }
];

export default function GoogleReviewsWidget() {
  return (
    <section className="section-y bg-[#050914] border-t border-white/5 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <div className="text-center md:text-left">
            <div className="section-label justify-center md:justify-start">Client Testimonials</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mt-4">
              Trusted by Families <br className="hidden md:block" />
              Across <span className="text-gradient">Mumbai</span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 backdrop-blur-sm shrink-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-white font-bold text-4xl leading-none">4.9</span>
                <div className="flex flex-col text-yellow-400">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-2">Based on 124 reviews</p>
            </div>
            
            <div className="w-[1px] h-12 bg-white/10 mx-2" />
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1">
                <span className="font-bold text-xl" style={{ color: '#4285F4' }}>G</span>
              </div>
              <p className="text-slate-400 text-xs font-bold">Google</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors animate-fadeUp"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-slate-500 text-xs">{review.date}</p>
                </div>
                <div className="ml-auto w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <span className="font-bold text-sm" style={{ color: '#4285F4' }}>G</span>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-3 gap-0.5">
                {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "{review.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
