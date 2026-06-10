'use client';

import { useEffect, useRef, useState } from 'react';

// Extend window type for Media.net globals
declare global {
  interface Window {
    _mNHandle?: {
      queue: Array<() => void>;
    };
  }
}

interface MediaNetAdProps {
  /** Unique div ID for this ad unit — must be unique across the page */
  adId: string;
  /** Ad size: 'responsive', '300x250', '300x600', '728x90', '970x90' */
  adSize?: string;
  /** Optional extra CSS class */
  className?: string;
}

/**
 * MediaNetAd — renders a single Media.net ad unit.
 *
 * Features:
 * - Lazy loads via Intersection Observer (ads init only when visible)
 * - CLS-safe with min-height placeholders
 * - Matches the site's dark theme
 * - Gracefully does nothing when Site ID isn't configured
 */
export default function MediaNetAd({
  adId,
  adSize = 'responsive',
  className = '',
}: MediaNetAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const siteId = process.env.NEXT_PUBLIC_MEDIANET_SITE_ID;

  // Don't render anything if no real Site ID
  const isConfigured = siteId && siteId !== '8XXXXXXXXX';

  // Parse dimensions for placeholder sizing
  const getDimensions = () => {
    if (adSize === 'responsive') return { width: '100%', minHeight: '90px' };
    const [w, h] = adSize.split('x').map(Number);
    return { width: `${w}px`, minHeight: `${h}px` };
  };

  // Lazy loading — observe when the ad container enters the viewport
  useEffect(() => {
    if (!isConfigured || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isConfigured]);

  // Initialize the ad unit when it becomes visible
  useEffect(() => {
    if (!isVisible || !isConfigured || adLoaded) return;

    try {
      if (window._mNHandle && window._mNHandle.queue) {
        window._mNHandle.queue.push(function () {
          setAdLoaded(true);
        });
      }
    } catch (e) {
      console.warn('[MediaNet] Ad initialization error:', e);
    }
  }, [isVisible, isConfigured, adLoaded]);

  // Don't render if not configured — keeps the page clean during dev
  if (!isConfigured) return null;

  const dims = getDimensions();

  return (
    <div
      ref={containerRef}
      className={`medianet-ad-container ${className}`}
      style={{
        width: dims.width,
        minHeight: dims.minHeight,
        maxWidth: '100%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* The actual ad div that Media.net targets */}
      <div
        id={adId}
        style={{
          width: dims.width,
          minHeight: dims.minHeight,
          maxWidth: '100%',
        }}
      >
        {/* Media.net fills this div with ad content */}
      </div>

      {/* Subtle ad label — required by most ad policies */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '10px',
          color: '#475569',
          marginTop: '4px',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Advertisement
      </div>
    </div>
  );
}
