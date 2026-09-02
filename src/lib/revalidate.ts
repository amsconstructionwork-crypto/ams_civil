// src/lib/revalidate.ts
// Central on-demand ISR revalidation helper.
// Call from admin API routes AFTER a successful DB write.
// Pages use export const revalidate = false (never time-based).

import { revalidatePath, revalidateTag } from 'next/cache';

/** Purge a specific blog post + all aggregator pages */
export function revalidateBlog(slug: string) {
  revalidatePath(`/blog/${slug}`, 'page');
  revalidatePath('/blog', 'page');
  revalidatePath('/', 'page');
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');
  revalidateTag('blogs');
  revalidateTag(`blog-${slug}`);
}

/** Purge all blog-related pages (after new blog created) */
export function revalidateAllBlogs() {
  revalidatePath('/blog', 'page');
  revalidatePath('/', 'page');
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');
  revalidateTag('blogs');
}

/** Purge projects page + home carousel */
export function revalidateProjects() {
  revalidatePath('/projects', 'page');
  revalidatePath('/', 'page');
  revalidateTag('projects');
}

/** Purge gallery page + home gallery carousel */
export function revalidateGallery() {
  revalidatePath('/gallery', 'page');
  revalidatePath('/', 'page');
  revalidateTag('gallery');
}
