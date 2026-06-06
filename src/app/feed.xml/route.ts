import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const blogs = await db.collection('blogs').find({
      published: true,
      $or: [{ publishDate: { $lte: new Date() } }, { publishDate: { $exists: false } }]
    }).sort({ publishDate: -1, createdAt: -1 }).limit(20).toArray();

    const SITE_URL = 'https://www.amscivilwork.in';

    let rssItemsXml = '';

    blogs.forEach((blog) => {
      const url = `${SITE_URL}/blog/${blog.slug}`;
      const pubDate = new Date(blog.publishDate || blog.createdAt).toUTCString();
      
      rssItemsXml += `
        <item>
          <title><![CDATA[${blog.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${blog.excerpt || ''}]]></description>
          ${blog.author ? `<author>${blog.author}</author>` : ''}
        </item>`;
    });

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>AMS Civil Construction Blog</title>
          <link>${SITE_URL}</link>
          <description>Expert tips, cost guides, and interior design inspiration for your home and office in Mumbai.</description>
          <language>en-in</language>
          <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
          ${rssItemsXml}
        </channel>
      </rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to generate RSS feed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
