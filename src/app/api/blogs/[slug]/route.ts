// src/app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'blogs';

/* ── GET Single Blog by Slug (Public) ───────────────────────── */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const db = await getDb();
    const blog = await db.collection(COLLECTION).findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }

    const { _id, ...rest } = blog;
    return NextResponse.json({ success: true, data: { id: _id.toString(), ...rest } });
  } catch (error) {
    console.error('GET /api/blogs/[slug] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog.' }, { status: 500 });
  }
}

/* ── PUT Update Blog by ID (Admin Only) ────────────────────── */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // ── Auth check ──────────────────────────────────────────
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const id = params.slug; 

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid blog ID.' }, { status: 400 });
    }

    const body = await request.json();
    const { title, excerpt, content, featuredImage, seoKeywords, author, published, publishDate } = body;

    const db = await getDb();

    const slug = sanitizeInput(title).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const updateDoc = {
      title: sanitizeInput(title).trim(),
      slug: slug,
      excerpt: sanitizeInput(excerpt)?.trim() || '',
      content: content.trim(),
      featuredImage: featuredImage || null,
      seoKeywords: sanitizeInput(seoKeywords)?.trim() || '',
      author: sanitizeInput(author)?.trim() || 'AMS Civil Team',
      locationTags: body.locationTags || [], // Array of location strings
      published: Boolean(published),
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { id, ...updateDoc } });
  } catch (error) {
    console.error('PUT /api/blogs/[slug] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog.' }, { status: 500 });
  }
}

/* ── DELETE Blog by ID (Admin Only) ────────────────────────── */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // ── Auth check ──────────────────────────────────────────
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const id = params.slug;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid blog ID.' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/blogs/[slug] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog.' }, { status: 500 });
  }
}
