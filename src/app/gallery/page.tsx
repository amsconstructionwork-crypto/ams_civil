// src/app/gallery/page.tsx
// SSG Server Component — data fetched at build time, client component handles interactivity.
// Cache purged on-demand via revalidateGallery() when admin adds/removes images.
import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Our Construction Gallery | AMS Civil Construction Mumbai',
  description: 'Browse our completed projects — bungalows, kitchens, bathrooms, tiles, flooring & interiors across Mumbai.',
  alternates: { canonical: 'https://www.amscivilwork.in/gallery' },
};

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export default async function GalleryPage() {
  let images: GalleryImage[] = [];
  try {
    const db = await getDb();
    
    // Fetch manual gallery images
    const docs = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
    const manualImages = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      src: (rest.src as string) || '',
      alt: (rest.alt as string) || (rest.title as string) || 'AMS Civil Construction',
      category: (rest.category as string) || 'General',
    }));

    // Fetch project images automatically
    const projectDocs = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    const projectImages: GalleryImage[] = [];
    
    projectDocs.forEach((proj) => {
      if (Array.isArray(proj.images)) {
        proj.images.forEach((imgSrc: string, index: number) => {
          if (imgSrc) {
            projectImages.push({
              id: `${proj._id.toString()}-img-${index}`,
              src: imgSrc,
              alt: (proj.title as string) || 'Project Image',
              category: (proj.category as string) || 'Projects',
            });
          }
        });
      }
    });

    // Combine both sets of images
    images = [...projectImages, ...manualImages];

  } catch (err) {
    console.error('[Gallery SSG] Failed to fetch gallery:', err);
  }

  return <GalleryGrid images={images} />;
}
