import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getDb } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Reduced to 30s to save Vercel Fluid CPU

export async function GET(request: Request) {
  // Security check: Only allow requests from Vercel Cron or manual admin
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let authClient;

    // First try to load from Environment Variable (For Vercel Production)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      authClient = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });
    } else {
      // Fallback for Local Development (Reads local service-account.json)
      const keyPath = path.join(process.cwd(), 'service-account.json');
      if (fs.existsSync(keyPath)) {
        authClient = new google.auth.GoogleAuth({
          keyFile: keyPath,
          scopes: ['https://www.googleapis.com/auth/indexing'],
        });
      } else {
        return NextResponse.json({ error: 'Google Credentials not found. Set GOOGLE_SERVICE_ACCOUNT_JSON in Vercel env.' }, { status: 500 });
      }
    }

    const clientAuthed = await authClient.getClient();
    const db = await getDb();
    const collection = db.collection('blogs');

    // Find up to 40 published blogs (reduced from 100 to fit in 30s comfortably)
    const blogsToSubmit = await collection.find({
      published: true,
      googleIndexed: { $ne: true },
      $or: [
        { publishDate: { $lte: new Date() } },
        { publishDate: { $exists: false } }
      ]
    }).limit(40).toArray();

    if (blogsToSubmit.length === 0) {
      return NextResponse.json({ message: 'No new blogs to index today.' });
    }

    let successCount = 0;
    let failCount = 0;
    const indexedBlogIds: any[] = [];

    // Process in batches of 5 to save active CPU and execution time
    for (let i = 0; i < blogsToSubmit.length; i += 5) {
      const batch = blogsToSubmit.slice(i, i + 5);
      
      const batchPromises = batch.map(async (blog) => {
        const url = `https://www.amscivilwork.in/blog/${blog.slug}`;
        try {
          await clientAuthed.request({
            url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { url: url, type: 'URL_UPDATED' }
          });
          return { success: true, id: blog._id };
        } catch (err: any) {
          console.error(`Failed to submit ${url}:`, err?.response?.status || err.message);
          return { success: false, status: err?.response?.status };
        }
      });

      const results = await Promise.all(batchPromises);
      
      let quotaExceeded = false;
      for (const res of results) {
        if (res.success) {
          successCount++;
          indexedBlogIds.push(res.id);
        } else {
          failCount++;
          if (res.status === 429) quotaExceeded = true;
        }
      }

      if (quotaExceeded) {
        console.log('Quota exceeded. Stopping early.');
        break;
      }
      
      // Short delay between batches
      await new Promise(r => setTimeout(r, 200));
    }

    // Mark successful ones as indexed in MongoDB
    if (indexedBlogIds.length > 0) {
      await collection.updateMany(
        { _id: { $in: indexedBlogIds } },
        { $set: { googleIndexed: true, indexedAt: new Date() } }
      );
    }

    return NextResponse.json({
      success: true,
      submitted: successCount,
      failed: failCount,
      message: `Successfully indexed ${successCount} blogs.`
    });

  } catch (error: any) {
    console.error('Auto Indexing API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
