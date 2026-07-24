// src/app/api/indexnow/route.ts
// IndexNow integration — instantly notifies Bing, Yandex, and other search engines
// about new or updated pages. These engines feed data to ChatGPT and Copilot.

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0amscivilwork';
const SITE_URL = 'https://www.amscivilwork.in';

export async function POST(request: NextRequest) {
  // Admin only
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Provide an array of URLs to submit.' },
        { status: 400 }
      );
    }

    // Format URLs with full domain
    const fullUrls = urls.map((u: string) =>
      u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`
    );

    // Submit to IndexNow (Bing + Yandex + other participating engines)
    const indexNowPayload = {
      host: 'www.amscivilwork.in',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls.slice(0, 10000), // IndexNow max 10k URLs per request
    };

    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload),
    });

    const statusCode = response.status;
    
    // IndexNow returns 200 or 202 on success
    if (statusCode === 200 || statusCode === 202) {
      console.log(`✅ IndexNow: Submitted ${fullUrls.length} URLs successfully`);
      return NextResponse.json({
        success: true,
        message: `Submitted ${fullUrls.length} URLs to IndexNow (Bing/Yandex)`,
        statusCode,
      });
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow error: ${statusCode}`, errorText);
      return NextResponse.json({
        success: false,
        error: `IndexNow returned ${statusCode}`,
        details: errorText,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit to IndexNow.' },
      { status: 500 }
    );
  }
}
