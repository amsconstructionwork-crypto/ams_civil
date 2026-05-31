// src/app/api/analytics-report/route.ts
// GET /api/analytics-report — Generates daily analytics report and emails it
// Triggered by Vercel Cron at 8 PM IST daily, or manually via GET request
// Protected by CRON_SECRET to prevent unauthorized access

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import { analyticsReportHtml, AnalyticsData } from '@/lib/analyticsEmailTemplate';

/* ── Shared transporter ── */
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
  port:   Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const from = `"AMS Civil Construction" <${process.env.EMAIL_USER}>`;
const TO = 'ams.constructionwork@gmail.com';

export async function GET(request: NextRequest) {
  try {
    // ── Optional: Verify cron secret in production ──
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // In production, if CRON_SECRET is set, verify it
    if (process.env.NODE_ENV === 'production' && cronSecret) {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const db = await getDb();

    // ── Date ranges (IST) ──
    const now = new Date();
    
    // Today: Start of day IST (00:00 IST = 18:30 UTC previous day)
    const todayStartIST = new Date(now);
    todayStartIST.setUTCHours(0, 0, 0, 0);
    // Adjust for IST (UTC+5:30): IST midnight = UTC 18:30 previous day
    const todayStartUTC = new Date(todayStartIST.getTime() - (5.5 * 60 * 60 * 1000));

    const todayEndUTC = new Date(todayStartUTC.getTime() + (24 * 60 * 60 * 1000));
    
    // Yesterday range
    const yesterdayStartUTC = new Date(todayStartUTC.getTime() - (24 * 60 * 60 * 1000));
    const yesterdayEndUTC = todayStartUTC;

    // ── Today's page views ──
    const todayFilter = { timestamp: { $gte: todayStartUTC, $lt: todayEndUTC } };
    const yesterdayFilter = { timestamp: { $gte: yesterdayStartUTC, $lt: yesterdayEndUTC } };

    const totalViews = await db.collection('page_views').countDocuments(todayFilter);
    const yesterdayViews = await db.collection('page_views').countDocuments(yesterdayFilter);

    // ── Top Services ──
    const topServices = await db.collection('page_views').aggregate([
      { $match: { ...todayFilter, service: { $ne: null, $nin: ['Home Page', 'Contact Page', 'Gallery', 'Projects', 'About', 'Blog'] } } },
      { $group: { _id: '$service', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // ── Top Areas ──
    const topAreas = await db.collection('page_views').aggregate([
      { $match: { ...todayFilter, area: { $ne: null } } },
      { $group: { _id: '$area', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // ── Top Visitor Cities ──
    const topCities = await db.collection('page_views').aggregate([
      { $match: { ...todayFilter, city: { $ne: null } } },
      { $group: { _id: { $concat: [{ $ifNull: ['$city', ''] }, ', ', { $ifNull: ['$region', ''] }] }, views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // ── Top Blog Posts ──
    const topBlogs = await db.collection('page_views').aggregate([
      { $match: { ...todayFilter, page: { $regex: '^/blog/' } } },
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // Clean up blog names
    topBlogs.forEach(b => {
      b.name = b.name.replace('/blog/', '').replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    });

    // ── Device breakdown ──
    const mobileCount = await db.collection('page_views').countDocuments({ ...todayFilter, device: 'Mobile' });
    const desktopCount = await db.collection('page_views').countDocuments({ ...todayFilter, device: 'Desktop' });

    // ── Top Referrers ──
    const topReferrers = await db.collection('page_views').aggregate([
      { $match: { ...todayFilter, referrer: { $nin: [null, ''] } } },
      { $addFields: { 
        referrerDomain: { 
          $cond: {
            if: { $regexMatch: { input: '$referrer', regex: /^https?:\/\// } },
            then: { $arrayElemAt: [{ $split: [{ $arrayElemAt: [{ $split: ['$referrer', '//'] }, 1] }, '/'] }, 0] },
            else: '$referrer'
          }
        }
      }},
      { $group: { _id: '$referrerDomain', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // ── Top Pages (overall) ──
    const topPages = await db.collection('page_views').aggregate([
      { $match: todayFilter },
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, name: '$_id', views: 1 } },
    ]).toArray();

    // Format page names for readability
    topPages.forEach(p => {
      if (p.name === '/') p.name = 'Home Page';
      else p.name = p.name.replace(/^\//, '').replace(/-/g, ' ').replace(/\//g, ' → ');
    });

    // ── Format the date ──
    const dateStr = now.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    // Capitalize service/area names
    const capitalize = (items: any[]) => items.map(i => ({
      ...i,
      name: i.name.replace(/\b\w/g, (c: string) => c.toUpperCase()),
    }));

    const analyticsData: AnalyticsData = {
      date: dateStr,
      totalViews,
      yesterdayViews,
      topServices: capitalize(topServices) as any,
      topAreas: capitalize(topAreas) as any,
      topCities: topCities as any,
      topBlogs: topBlogs as any,
      mobileCount,
      desktopCount,
      topReferrers: topReferrers as any,
      topPages: topPages as any,
    };

    // ── Send Email ──
    const emailHtml = analyticsReportHtml(analyticsData);

    await transporter.sendMail({
      from,
      to: TO,
      subject: `📊 Daily Report — ${dateStr} | ${totalViews} Views | AMS Civil`,
      html: emailHtml,
    });

    console.log('✅ Analytics report email sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Analytics report sent!',
      summary: {
        date: dateStr,
        totalViews,
        yesterdayViews,
        topService: topServices[0]?.name || 'N/A',
        topArea: topAreas[0]?.name || 'N/A',
      },
    });

  } catch (error) {
    console.error('Analytics report error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics report.' },
      { status: 500 },
    );
  }
}
