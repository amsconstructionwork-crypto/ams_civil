'use client';

import { usePathname } from 'next/navigation';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  topBanner: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  floatingElements: React.ReactNode;
}

export default function ConditionalLayout({
  children,
  topBanner,
  navbar,
  footer,
  floatingElements,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      {topBanner}
      {navbar}
      <main>{children}</main>
      {footer}
      {floatingElements}
    </>
  );
}
