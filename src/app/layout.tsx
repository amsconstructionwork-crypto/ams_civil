// src/app/layout.tsx
// Root layout with comprehensive SEO — targeting all Mumbai areas

import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import TopBanner from '@/components/layout/TopBanner';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import QuotePopup from '@/components/ui/QuotePopup';
import LeadGenPopup from '@/components/ui/LeadGenPopup';
import PageTracker from '@/components/tracking/PageTracker';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

/* ─────────────────────────────────────────────────────────────
   SEO METADATA
   Target: All Mumbai areas + every construction service keyword
─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Core ────────────────────────────────────────────────── */
  metadataBase: new URL('https://www.amscivilwork.in'),

  title: {
    default: 'Top Civil Contractor in Mumbai (2026) | Free Quote | AMS Civil',
    template: '%s | AMS Civil Construction',
  },

  description:
    '🏗️ Looking for the best civil contractor in Mumbai? AMS Civil offers premium bungalow construction & renovations. 25+ Yrs Exp. 100% Free Estimate! Call +91 87793 91690.',

  keywords: [
    /* ── Brand ──────────────────────────────────────────── */
    'AMS Civil Construction',
    'AMS construction Mumbai',
    'AMS civil contractor Mumbai',

    /* ── Services ────────────────────────────────────────── */
    'construction company Mumbai',
    'best construction company Mumbai',
    'building contractor Mumbai',
    'civil contractor Mumbai',
    'bungalow construction Mumbai',
    'bungalow builder Mumbai',
    'residential construction Mumbai',
    'bathroom renovation Mumbai',
    'bathroom remodeling Mumbai',
    'kitchen renovation Mumbai',
    'modular kitchen Mumbai',
    'tiles work Mumbai',
    'tiles laying contractor Mumbai',
    'flooring work Mumbai',
    'marble flooring Mumbai',
    'vitrified tiles Mumbai',
    'POP work Mumbai',
    'false ceiling Mumbai',
    'POP ceiling contractor Mumbai',
    'plaster work Mumbai',
    'interior construction Mumbai',
    'interior contractor Mumbai',
    'waterproofing Mumbai',
    'civil work Mumbai',

    /* ── South Mumbai ────────────────────────────────────── */
    'construction company Dadar',
    'construction company Lower Parel',
    'construction company Worli',
    'construction company Prabhadevi',
    'construction company Colaba',
    'construction company Marine Lines',
    'construction company Byculla',
    'construction company Mahalaxmi',
    'bungalow construction South Mumbai',
    'renovation contractor South Mumbai',

    /* ── Western Line ────────────────────────────────────── */
    'construction company Bandra',
    'construction company Khar',
    'construction company Santacruz',
    'construction company Vile Parle',
    'construction company Andheri',
    'construction company Jogeshwari',
    'construction company Goregaon',
    'construction company Malad',
    'construction company Kandivali',
    'construction company Borivali',
    'construction company Dahisar',
    'construction company Mira Road',
    'construction company Bhayandar',
    'construction company Vasai',
    'construction company Nalasopara',
    'construction company Virar',
    'bungalow construction Andheri',
    'kitchen renovation Bandra',
    'bathroom renovation Borivali',
    'tiles work Kandivali',
    'POP work Malad',
    'interior work Goregaon',
    'renovation contractor Mira Road',

    /* ── Central Line ────────────────────────────────────── */
    'construction company Sion',
    'construction company Kurla',
    'construction company Ghatkopar',
    'construction company Vikhroli',
    'construction company Bhandup',
    'construction company Mulund',
    'construction company Thane',
    'construction company Dombivli',
    'construction company Kalyan',
    'bathroom renovation Thane',
    'kitchen work Kalyan',
    'flooring work Ghatkopar',
    'tiles contractor Mulund',
    'construction company Dombivli',

    /* ── Navi Mumbai ─────────────────────────────────────── */
    /* ── Broad Intent ────────────────────────────────────── */
    'best construction company near me',
    'top rated civil contractor in my area',
    'reliable bungalow builders near me',
    'affordable renovation services near me',
    'construction cost per sq ft Mumbai',
    'civil engineer contact number',
    'building contractor contact number',
    'civil mistry near me',
    'civil mistri near me',
    'plaster mistri near me',
    'tiles mistri near me',
    'thekedar for home construction',
    'best civil work team',

    /* ── Hindi/Hinglish Intent (critical for Indian users) ── */
    'ghar banane wala Mumbai',
    'ghar banane ka kharcha Mumbai',
    'mistry ka number Mumbai',
    'civil mistry near me Mumbai',
    'construction ka rate Mumbai',
    'bathroom renovation ka rate Mumbai',
    'tiles lagane wala Mumbai',
    'POP ceiling wala Mumbai',
    'kitchen banane wala Mumbai',
    'thekedar Mumbai contact number',
    'sasta construction company Mumbai',
    'accha builder kaun hai Mumbai',
    'renovation kaise hota hai',
    'construction company ka number',
  ],

  /* ── Authors & Publisher ──────────────────────────────────── */
  authors: [{ name: 'AMS Civil Team', url: 'https://www.amscivilwork.in' }],
  creator: 'AMS Civil Team',
  publisher: 'AMS Civil Construction',

  /* ── Robots ───────────────────────────────────────────────── */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  /* ── Open Graph (Facebook, WhatsApp preview) ──────────────── */
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://www.amscivilwork.in',
    siteName:    'AMS Civil Construction',
    title:       'AMS Civil Construction | Best Construction Company in Mumbai',
    description: '20+ years of expert construction across all Mumbai areas. Bungalows, bathrooms, kitchens, tiles, POP, flooring & more. Free quote: +91 87793 91690 / +91 90042 98911',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'AMS Civil Construction Mumbai',
      },
    ],
  },

  /* ── Twitter / X Card ────────────────────────────────────── */
  twitter: {
    card:        'summary_large_image',
    title:       'AMS Civil Construction Mumbai',
    description: 'Expert construction services across all Mumbai areas. 20+ years experience. Call +91 87793 91690 or +91 90042 98911',
    images:      ['/og-image.jpg'],
  },

  /* ── Alternates / Canonical ──────────────────────────────── */
  alternates: {
    canonical: '/',
    languages: { 'en-IN': '/' },
  },

  /* ── Verification (add your codes from Google/Bing Search Console) */
  verification: {
    google: 'a-NPUUlhFt4ndck1sIedFhwSQG-oqFwumbqeujTHc-g',
    // bing: 'ADD_YOUR_BING_CODE_HERE',
  },

  /* ── App / PWA ───────────────────────────────────────────── */
  applicationName: 'AMS Civil Construction',
  category:        'Construction & Real Estate',

  /* ── Icons ────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   JSON-LD STRUCTURED DATA (Google Rich Results)
 ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Local Business ─────────────────────────────────── */
    {
      '@type':       'LocalBusiness',
      '@id':         'https://www.amscivilwork.in/#business',
      name:          'AMS Civil Construction',
      alternateName: 'AMS Construction',
      description:   'Mumbai\'s trusted construction company. Specialising in bungalow construction, bathroom renovation, kitchen work, tiles, flooring, POP & plaster work across all Mumbai areas.',
      url:           'https://www.amscivilwork.in',
      telephone:     ['+918779391690', '+919004298911'],
      email:         'ams.constructionwork@gmail.com',
      founder: {
        '@type': 'Person',
        name:    'AMS Civil Team',
        jobTitle:'Director',
        telephone:['+918779391690', '+919004298911'],
      },
      foundingDate: '2014',
      address: {
        '@type':           'PostalAddress',
        addressLocality:   'Mumbai',
        addressRegion:     'Maharashtra',
        addressCountry:    'IN',
        postalCode:        '400001',
      },
      geo: {
        '@type':     'GeoCoordinates',
        latitude:    '19.0760',
        longitude:   '72.8777',
      },
      areaServed: [
        /* South Mumbai */
        'Dadar','Lower Parel','Worli','Prabhadevi','Colaba','Marine Lines','Byculla','Mahalaxmi',
        /* Western Line */
        'Bandra','Khar','Santacruz','Vile Parle','Andheri','Jogeshwari','Goregaon',
        'Malad','Kandivali','Borivali','Dahisar','Mira Road','Bhayandar','Vasai','Nalasopara','Virar',
        /* Central Line */
        'Sion','Kurla','Ghatkopar','Vikhroli','Bhandup','Mulund','Thane','Dombivli','Kalyan',
        /* Navi Mumbai */
        'Vashi','Nerul','Belapur','Airoli','Ghansoli','Koparkhairane','Panvel',
        'Mumbai','Navi Mumbai','Thane',
      ],
      openingHoursSpecification: [
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens:       '09:00',
          closes:      '19:00',
        },
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Sunday'],
          opens:       '10:00',
          closes:      '14:00',
        },
      ],
      priceRange:       '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted:  'Cash, Bank Transfer, UPI',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Construction Services',
        itemListElement: [
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Bungalow Construction', areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Bathroom Renovation',   areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Kitchen Work',          areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Tiles Work',            areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Flooring Work',         areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'POP Work',              areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Plaster Work',          areaServed:'Mumbai' } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Wall Work',             areaServed:'Mumbai' } },
        ],
      },
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:   '4.9',
        reviewCount:   '142',
        bestRating:    '5',
        worstRating:   '1',
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61570712849063',
        'https://www.instagram.com/ams.constructionwork/',
        'https://wa.me/918779391690',
        'https://wa.me/919004298911',
      ],
    },

    /* ── Website ────────────────────────────────────────── */
    {
      '@type':          'WebSite',
      '@id':            'https://www.amscivilwork.in/#website',
      url:              'https://www.amscivilwork.in',
      name:             'AMS Civil Construction',
      description:      'Mumbai construction company — bungalows, bathrooms, kitchens, tiles, POP & more',
      publisher:        { '@id': 'https://www.amscivilwork.in/#business' },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════════════════ */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google AdSense Verification */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1153253906727408"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Preconnect for Cloudinary images */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region"      content="IN-MH" />
        <meta name="geo.placename"   content="Mumbai, Maharashtra, India" />
        <meta name="geo.position"    content="19.0760;72.8777" />
        <meta name="ICBM"            content="19.0760, 72.8777" />

        {/* Mobile / PWA */}
        <meta name="theme-color"     content="#F97316" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Language */}
        <meta httpEquiv="content-language" content="en-IN" />
      </head>

      <body className="antialiased" style={{ background: '#0B1120', color: '#CBD5E1' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161F2E',
              color:      '#CBD5E1',
              border:     '1px solid #F97316',
            },
          }}
        />
        <TopBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <QuotePopup />
        <LeadGenPopup />
        <PageTracker />
      </body>
    </html>
  );
}
