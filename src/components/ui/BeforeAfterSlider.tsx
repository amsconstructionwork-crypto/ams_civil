'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-[#1E2D45]"
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Base Image (Before) */}
      <div className="absolute inset-0">
        <Image 
          src={beforeImage} 
          alt={beforeLabel} 
          fill 
          className="object-cover pointer-events-none grayscale opacity-80" 
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg border border-white/10">
          {beforeLabel}
        </div>
      </div>

      {/* Overlay Image (After) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={afterImage} 
          alt={afterLabel} 
          fill 
          className="object-cover pointer-events-none" 
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/90 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg border border-white/10"
             style={{ transform: `translateX(${sliderPosition > 85 ? '100px' : '0'})`, transition: 'transform 0.3s' }}>
          {afterLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.8)] border-2 border-orange-500 transform transition-transform duration-200"
             style={{ scale: isDragging ? '1.1' : '1' }}>
          <ArrowLeftRight size={16} className="text-orange-500" />
        </div>
      </div>
    </div>
  );
}
