'use client';

import { useEffect, useRef } from 'react';

/**
 * AdsterraSocialBar — Loads the Adsterra Social Bar globally.
 * Shows a subtle notification-style ad bar at the bottom of the page.
 * Place this once in the root layout.
 */
export default function AdsterraSocialBar() {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://pl29699950.effectivecpmnetwork.com/53/66/79/536679683b75433b25787b02bb7594cf.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      loadedRef.current = false;
    };
  }, []);

  return null; // Social Bar renders itself as an overlay
}
