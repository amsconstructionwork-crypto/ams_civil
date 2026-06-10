'use client';

import { useEffect, useRef } from 'react';

/**
 * AdsterraBanner — Renders an Adsterra banner ad (728x90 or 300x250).
 * Uses the atOptions + invoke.js pattern that Adsterra provides.
 */
export default function AdsterraBanner({ 
  variant 
}: { 
  variant: '728x90' | '300x250' 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  const config = variant === '728x90' 
    ? {
        key: '985c6bd067e80a5bc1665bdbde582fbe',
        width: 728,
        height: 90,
      }
    : {
        key: 'a8b6657c4a4d93f627ca0a990c9ad5ac',
        width: 300,
        height: 250,
      };

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    // Set atOptions before loading the script
    (window as any).atOptions = {
      key: config.key,
      format: 'iframe',
      height: config.height,
      width: config.width,
      params: {},
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      loadedRef.current = false;
    };
  }, [config.key, config.height, config.width]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: `${config.width}px`,
        minHeight: `${config.height}px`,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Adsterra injects the ad iframe here */}
    </div>
  );
}
