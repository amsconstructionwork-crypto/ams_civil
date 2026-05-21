// src/app/api/gallery/route.ts
// GET  /api/gallery  — fetch all gallery items (public)
// POST /api/gallery  — save a new gallery item (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'gallery';

/* ── GET (Public) ──────────────────────────────────────────── */
export async function GET() {
  try {
    const db   = await getDb();
    const docs = await db.collection(COLLECTION).find({}).sort({ createdAt: -1 }).toArray();

    const images = docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('GET /api/gallery error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery.' }, { status: 500 });
  }
}

/* ── POST (Admin Only) ─────────────────────────────────────── */
export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { src, title, category } = body;

    if (!src || !category) {
      return NextResponse.json({ success: false, error: 'Image URL and category are required.' }, { status: 400 });
    }

    // Validate image URL format
    if (!src.startsWith('https://') && !src.startsWith('/images/')) {
      return NextResponse.json({ success: false, error: 'Invalid image URL.' }, { status: 400 });
    }

    const db = await getDb();
    const newItem = {
      src: sanitizeInput(src),
      title:     sanitizeInput(title)?.trim() || 'AMS Civil Construction Project',
      alt:       sanitizeInput(title)?.trim() || 'AMS Civil Construction Project',
      category:  sanitizeInput(category),
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(newItem);

    return NextResponse.json({ 
      success: true, 
      data: { id: result.insertedId.toString(), ...newItem } 
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/gallery error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save gallery item.' }, { status: 500 });
  }
}
