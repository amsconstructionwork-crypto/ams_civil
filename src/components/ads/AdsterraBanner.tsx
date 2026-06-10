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
  const config = variant === '728x90' 
    ? { key: '985c6bd067e80a5bc1665bdbde582fbe', width: 728, height: 90 }
    : { key: 'a8b6657c4a4d93f627ca0a990c9ad5ac', width: 300, height: 250 };

  // To prevent the global `atOptions` variable from colliding when multiple ads
  // are on the same page, we isolate each ad inside its own iframe using srcDoc.
  const adHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <script>
        var atOptions = {
          'key' : '${config.key}',
          'format' : 'iframe',
          'height' : ${config.height},
          'width' : ${config.width},
          'params' : {}
        };
      </script>
      <script async="async" data-cfasync="false" src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
    </body>
    </html>
  `;

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
      <iframe
        srcDoc={adHtml}
        width={config.width}
        height={config.height}
        style={{ border: 'none', overflow: 'hidden', backgroundColor: 'transparent' }}
        scrolling="no"
        title={`Adsterra Banner ${variant}`}
      />
    </div>
  );
}
