'use client';

// src/components/tracking/PageTracker.tsx
// Lightweight invisible component that tracks page views
// Added to root layout — fires once per page navigation

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to not block page rendering
    const timer = setTimeout(() => {
      try {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || null,
            screenWidth: window.innerWidth,
          }),
        }).catch(() => {
          // Silently fail — tracking should never affect user experience
        });
      } catch {
        // Silently fail
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // This component renders nothing
  return null;
}
