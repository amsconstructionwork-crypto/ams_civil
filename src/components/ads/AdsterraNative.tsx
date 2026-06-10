'use client';

import { useEffect, useRef } from 'react';

/**
 * AdsterraNative — Renders the Adsterra Native Banner ad.
 * Blends naturally with blog content for better engagement.
 */
export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://pl29699949.effectivecpmnetwork.com/b60f4da11318790438c74e70fe8140d6/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div id="container-b60f4da11318790438c74e70fe8140d6"></div>';
      }
      loadedRef.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '250px', overflow: 'hidden' }}>
      <div id="container-b60f4da11318790438c74e70fe8140d6"></div>
    </div>
  );
}
