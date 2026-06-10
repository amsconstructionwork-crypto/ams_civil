'use client';

import Script from 'next/script';

/**
 * MediaNetScript — loads the Media.net contextual ad library globally.
 * Place this once in the root layout <head>.
 *
 * It reads the Site ID from NEXT_PUBLIC_MEDIANET_SITE_ID env variable.
 * When the placeholder value '8XXXXXXXXX' is detected, it skips loading
 * to avoid errors during development.
 */
export default function MediaNetScript() {
  const siteId = process.env.NEXT_PUBLIC_MEDIANET_SITE_ID;

  // Don't load if no real Site ID is configured
  if (!siteId || siteId === '8XXXXXXXXX') {
    return null;
  }

  return (
    <>
      {/* Media.net Header Bidding / Contextual Ad Script */}
      <Script
        id="medianet-global"
        strategy="afterInteractive"
        src={`https://contextual.media.net/dmedianet.js?cid=${siteId}`}
      />
      {/* Initialize Media.net queue */}
      <Script
        id="medianet-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._mNHandle = window._mNHandle || {};
            window._mNHandle.queue = window._mNHandle.queue || [];
            window.mediapolygon = window.mediaPolygon || "";
          `,
        }}
      />
    </>
  );
}
