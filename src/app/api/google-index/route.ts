// src/app/api/google-index/route.ts
// Google Indexing API Integration — Instantly requests Google to crawl new or updated pages

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { requireAuth } from '@/lib/auth'; // Ensure only admin can trigger

const SITE_URL = 'https://www.amscivilwork.in';

export async function POST(request: NextRequest) {
  // Only admins can trigger Google Indexing API
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { url, type = 'URL_UPDATED' } = body; 
    // type can be 'URL_UPDATED' or 'URL_DELETED'

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    const targetUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

    // Get Service Account JSON from environment variables
    const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
    
    if (!serviceAccountBase64) {
      return NextResponse.json({ 
        success: false, 
        error: 'GOOGLE_SERVICE_ACCOUNT_BASE64 is not set in environment variables. See documentation to set it up.' 
      }, { status: 500 });
    }

    const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf-8'));

    // Authenticate with Google
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      undefined,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      undefined
    );

    await jwtClient.authorize();

    // Call the Indexing API
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtClient.credentials.access_token}`,
      },
      body: JSON.stringify({
        url: targetUrl,
        type: type,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `Successfully requested Google to index: ${targetUrl}`,
        data,
      });
    } else {
      console.error('Google Indexing API Error:', data);
      return NextResponse.json({ success: false, error: data.error?.message || 'Failed to ping Google' }, { status: response.status });
    }
  } catch (error: any) {
    console.error('Error in google-index route:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
