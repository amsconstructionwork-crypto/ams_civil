// src/app/api/blogs/route.ts
// GET  /api/blogs          - Fetch all blogs (public)
// POST /api/blogs          - Create a new blog post (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'blogs';

/* ── GET (Public) ──────────────────────────────────────────── */
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published');

    const query = publishedOnly === 'true' ? { published: true } : {};
    const docs = await db.collection(COLLECTION).find(query).sort({ createdAt: -1 }).toArray();

    // Map `_id` to `id` for client components
    const blogs = docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs.' }, { status: 500 });
  }
}

/* ── POST (Admin Only) ─────────────────────────────────────── */
export async function POST(request: NextRequest) {
  // ── Auth check ──────────────────────────────────────────
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { title, excerpt, content, featuredImage, seoKeywords, author, published, publishDate } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required.' },
        { status: 400 },
      );
    }

    const db = await getDb();

    // Basic slugification - lowercase, replace spaces with hyphens, remove special characters
    const slug = sanitizeInput(title).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Ensure slug is unique
    const existing = await db.collection(COLLECTION).findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const newBlog = {
      title: sanitizeInput(title).trim(),
      slug: finalSlug,
      excerpt: sanitizeInput(excerpt)?.trim() || '',
      content: content.trim(), // Content may contain HTML (blog body)
      featuredImage: featuredImage || null,
      seoKeywords: sanitizeInput(seoKeywords)?.trim() || '',
      author: sanitizeInput(author)?.trim() || 'AMS Civil Team',
      locationTags: body.locationTags || [], // Array of location strings (e.g., ["Borivali", "Navi Mumbai"])
      published: Boolean(published),
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(newBlog);

    return NextResponse.json(
      { success: true, data: { id: result.insertedId.toString(), ...newBlog } },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog.' }, { status: 500 });
  }
}
