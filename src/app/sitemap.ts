// src/app/sitemap.ts
// Auto-generates /sitemap.xml — submitted to Google Search Console

import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';
import { locations } from '@/data/locations';
import { services } from '@/data/siteData';

const BASE = 'https://www.amscivilwork.in';
// Use a fixed date — not `new Date()` — so Google sees stable lastModified
const SITE_UPDATED = new Date('2026-05-02');

/* ── Zone-based priority tiers for crawl budget optimization ── */
const CORE_ZONES = ['South Mumbai', 'Western Line', 'Central Line', 'Navi Mumbai'];

function getLocationPriority(zone: string): number {
  if (CORE_ZONES.includes(zone)) return 0.85;
  if (zone === 'Maharashtra') return 0.7;
  return 0.6; // Jharkhand, West Bengal, Karnataka
}

function getLocationServicePriority(zone: string): number {
  if (CORE_ZONES.includes(zone)) return 0.8;
  if (zone === 'Maharashtra') return 0.65;
  return 0.55;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /* ── Static pages ──────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gallery`,  lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,  lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,     lastModified: SITE_UPDATED, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/areas`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
  ];

  /* ── Individual service pages /services/[slug] ──────────── */
  const servicePages: MetadataRoute.Sitemap = services.map(svc => ({
    url:             `${BASE}/services/${svc.slug}`,
    lastModified:    SITE_UPDATED,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  /* ── Location pages & Location × Service pages ────────────── */
  const locationPages: MetadataRoute.Sitemap = [];
  locations.forEach(loc => {
    // Always include the main location page
    locationPages.push({
      url:             `${BASE}/areas/${loc.slug}`,
      lastModified:    SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority:        getLocationPriority(loc.zone),
    });
    
    // ANTI-BLOAT FIX: Only generate the granular Location × Service pages for Core Zones
    // This forces Google to focus its crawl budget on high-value Mumbai/Thane/Navi Mumbai areas
    if (CORE_ZONES.includes(loc.zone)) {
      services.forEach(svc => {
        locationPages.push({
          url:             `${BASE}/areas/${loc.slug}/${svc.slug}`,
          lastModified:    SITE_UPDATED,
          changeFrequency: 'weekly' as const,
          priority:        getLocationServicePriority(loc.zone),
        });
      });
    }
  });

  /* ── Dynamic Blogs ─────────────────────────────────────── */
  const db = await getDb();
  const blogs = await db.collection('blogs').find({
    published: true,
    $or: [{ publishDate: { $lte: new Date() } }, { publishDate: { $exists: false } }]
  }).toArray();
  const blogPages: MetadataRoute.Sitemap = blogs.map(blog => ({
    url: `${BASE}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}

