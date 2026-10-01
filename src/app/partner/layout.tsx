import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with AMS Civil | For Architects & Interior Designers',
  description: 'Are you an Architect or Interior Designer in Mumbai? Partner with AMS Civil Construction for flawless execution of your designs. Reliable, transparent, and high-quality civil work.',
  keywords: ['architect partner civil contractor', 'interior designer civil contractor Mumbai', 'turnkey execution partner', 'B2B civil contractor Mumbai'],
  alternates: {
    canonical: 'https://www.amscivilwork.in/partner',
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
