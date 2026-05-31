// src/app/api/track/route.ts
// POST /api/track — Records a page view in MongoDB for analytics
// Lightweight, non-blocking, no user-facing delay

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer, screenWidth } = body as {
      page: string;
      referrer?: string;
      screenWidth?: number;
    };

    if (!page) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // ── Extract service & area from URL path ──
    let service: string | null = null;
    let area: string | null = null;

    const pathParts = page.replace(/^\//, '').split('/');

    if (pathParts[0] === 'areas' && pathParts[1]) {
      area = pathParts[1].replace(/-/g, ' ');
      if (pathParts[2]) {
        service = pathParts[2].replace(/-/g, ' ');
      }
    } else if (pathParts[0] === 'services' && pathParts[1]) {
      service = pathParts[1].replace(/-/g, ' ');
    } else if (pathParts[0] === 'blog') {
      service = 'Blog';
    } else if (pathParts[0] === 'contact') {
      service = 'Contact Page';
    } else if (pathParts[0] === 'gallery') {
      service = 'Gallery';
    } else if (pathParts[0] === 'projects') {
      service = 'Projects';
    } else if (pathParts[0] === 'about') {
      service = 'About';
    } else if (pathParts[0] === '' || page === '/') {
      service = 'Home Page';
    }

    // ── Visitor geo info from Vercel headers ──
    const city = request.headers.get('x-vercel-ip-city') || null;
    const region = request.headers.get('x-vercel-ip-country-region') || null;
    const country = request.headers.get('x-vercel-ip-country') || null;

    // ── Device type ──
    const device = (screenWidth && screenWidth < 768) ? 'Mobile' : 'Desktop';

    // ── Save to MongoDB ──
    const db = await getDb();
    await db.collection('page_views').insertOne({
      page,
      service,
      area,
      city: city ? decodeURIComponent(city) : null,
      region: region ? decodeURIComponent(region) : null,
      country,
      device,
      referrer: referrer || null,
      timestamp: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silently fail — tracking should never break the website
    console.error('Track API error:', error);
    return NextResponse.json({ ok: true });
  }
}
