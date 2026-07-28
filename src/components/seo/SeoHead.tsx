'use client';

// src/components/seo/SeoHead.tsx
import { usePathname } from 'next/navigation';
import StructuredDataManager from './StructuredDataManager';

export default function SeoHead() {
  const pathname = usePathname();
  
  // Don't add breadcrumbs schema for homepage
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbData = [
    { name: 'Home', url: 'https://www.amscivilwork.in/' }
  ];

  let currentUrl = 'https://www.amscivilwork.in';
  
  paths.forEach(path => {
    currentUrl += `/${path}`;
    const label = path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    breadcrumbData.push({ name: label, url: currentUrl });
  });

  return (
    <StructuredDataManager 
      type="BreadcrumbList" 
      data={breadcrumbData} 
    />
  );
}
