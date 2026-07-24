export const dynamic = 'force-dynamic';
// src/app/api/enquiries/route.ts
// GET  /api/enquiries  — list all enquiries (admin)
// PATCH /api/enquiries?id=xxx — update status

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db   = await getDb();
    const docs = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).limit(100).toArray();
    const data = docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id     = request.nextUrl.searchParams.get('id');
    const body   = await request.json();
    const status = body.status;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('enquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Update failed.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    console.log('[API] DELETE enquiry request for ID:', id);

    if (!id || !ObjectId.isValid(id)) {
      console.warn('[API] Invalid ID provided for deletion:', id);
      return NextResponse.json({ success: false, error: 'Invalid ID format.' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('enquiries').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.warn('[API] No enquiry found with ID:', id);
      return NextResponse.json({ success: false, error: 'Enquiry not found in database.' }, { status: 404 });
    }

    console.log('[API] Successfully deleted enquiry:', id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API] Delete enquiry error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error during deletion.' }, { status: 500 });
  }
}
