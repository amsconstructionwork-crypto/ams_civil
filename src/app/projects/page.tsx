// src/app/projects/page.tsx
// SSG Server Component — data fetched at build time, client component handles interactivity.
// Cache purged on-demand via revalidateProjects() when admin adds/updates/deletes a project.
import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Our Construction Projects | AMS Civil Construction Mumbai',
  description: 'Real construction projects by AMS Civil — bungalows, renovations, interiors across Mumbai, Navi Mumbai, and Thane.',
  alternates: { canonical: 'https://www.amscivilwork.in/projects' },
};

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  status: 'ongoing' | 'completed';
  description: string;
  images: string[];
  completedDate?: string;
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    const db = await getDb();
    const docs = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    projects = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      title:         (rest.title as string)       || '',
      slug:          (rest.slug as string)        || '',
      category:      (rest.category as string)    || 'General',
      location:      (rest.location as string)    || '',
      status:        (rest.status as 'ongoing' | 'completed') || 'completed',
      description:   (rest.description as string) || '',
      images:        Array.isArray(rest.images) ? rest.images as string[] : [],
      completedDate: rest.completedDate as string | undefined,
    }));
  } catch (err) {
    console.error('[Projects SSG] Failed to fetch projects:', err);
  }

  return <ProjectsGrid projects={projects} />;
}
