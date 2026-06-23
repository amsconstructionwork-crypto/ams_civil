import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AMS Civil Construction',
  description: 'Privacy Policy and Data Protection guidelines for AMS Civil Construction.',
  alternates: {
    canonical: 'https://www.amscivilwork.in/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
