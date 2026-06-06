import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection('page_views');

    // Total Views
    const totalViews = await collection.countDocuments();

    // Top Pages
    const topPages = await collection.aggregate([
      { $group: { _id: "$page", views: { $sum: 1 }, service: { $first: "$service" } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Top Cities
    const topCities = await collection.aggregate([
      { $match: { city: { $ne: null } } },
      { $group: { _id: "$city", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 }
    ]).toArray();

    // Device Breakdown
    const devices = await collection.aggregate([
      { $match: { device: { $ne: null } } },
      { $group: { _id: "$device", count: { $sum: 1 } } }
    ]).toArray();

    // Today's Views
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayViews = await collection.countDocuments({
      timestamp: { $gte: todayStart }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalViews,
        todayViews,
        topPages: topPages.map(p => ({ url: p._id, views: p.views, service: p.service })),
        topCities: topCities.map(c => ({ city: c._id, views: c.views })),
        devices: devices.map(d => ({ device: d._id, count: d.count }))
      }
    });

  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
