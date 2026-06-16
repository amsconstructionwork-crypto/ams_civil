// src/app/hi/areas/[location]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { MapPin, CheckCircle, ArrowRight, Star, ShieldCheck, Clock, Users, HardHat } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';
import { getDb } from '@/lib/mongodb';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const loc = getLocation(params.location);
  if (!loc) return { title: 'Not Found' };

  const title = `✓ ${loc.name} में सर्वश्रेष्ठ सिविल ठेकेदार (Contractor) [2026] | मुफ्त विजिट`;
  const description = `⭐ 4.9/5 रेटिंग। ${loc.name}, ${loc.district} में नंबर 1 सिविल कंस्ट्रक्शन कंपनी। घर बनाने, रिनोवेशन और इंटीरियर के लिए संपर्क करें। 100% गारंटीड क्वालिटी।`;

  return {
    title,
    description,
    keywords: [
      `${loc.name} me civil contractor`,
      `${loc.name} mein civil work`,
      `${loc.name} mein thekedar`,
      `ghar banane wala contractor ${loc.name}`,
      `best mistry in ${loc.name}`,
      `plaster mistri ${loc.name}`,
      `tiles mistri ${loc.name}`,
      `${loc.name} construction company`,
      `sasta aur achha contractor ${loc.name}`
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.amscivilwork.in/hi/areas/${loc.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${loc.name} में निर्माण कार्य` }],
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/hi/areas/${loc.slug}`,
    },
  };
}

export default async function LocationPageHindi({ params }: { params: { location: string } }) {
  const loc = getLocation(params.location);
  if (!loc) notFound();

  let localProjects: any[] = [];
  try {
    const db = await getDb();
    localProjects = await db.collection('projects').find({ 
      location: { $regex: new RegExp(loc.name, 'i') },
      status: 'completed'
    }).limit(3).toArray();
  } catch (e) {
    console.error(e);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `AMS Civil Construction — ${loc.name} (Hindi)`,
    description: `${loc.name} में सबसे भरोसेमंद सिविल ठेकेदार।`,
    telephone: ['+918779391690'],
    url: `https://www.amscivilwork.in/hi/areas/${loc.slug}`,
    areaServed: [loc.name, ...loc.nearby],
  };

  const trustStats = [
    { icon: Clock, label: '25+ वर्ष', desc: 'अनुभव' },
    { icon: CheckCircle, label: '350+', desc: 'प्रोजेक्ट्स' },
    { icon: Users, label: '500+', desc: 'खुश ग्राहक' },
    { icon: Star, label: '4.9/5', desc: 'रेटिंग' },
  ];

  return (
    <main className="min-h-screen bg-[#080D1A] font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px]" />
        <div className="relative z-10 container-custom">
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-orange-400">मुख्य पृष्ठ (Home)</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link href="/areas" className="hover:text-orange-400">सेवा क्षेत्र</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">{loc.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-6">
              <MapPin size={14} /> सर्विस क्षेत्र: {loc.zone}
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6">
              {loc.name} में #1 सिविल <br />
              <span className="text-gradient">ठेकेदार (Contractor)</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              AMS Civil Construction {loc.name} में बेहतरीन निर्माण और रिनोवेशन सेवाएँ प्रदान करता है।
              बंगला बनाने से लेकर मॉड्यूलर किचन तक, हम 25+ सालों के अनुभव के साथ काम करते हैं।
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="tel:+918779391690" className="btn-primary px-8 py-4 gap-3">
                <PhoneLogo className="w-5 h-5 fill-white" /> कॉल करें
              </a>
              <a href={`https://wa.me/918779391690?text=Hi! I need construction work in ${loc.name}.`} target="_blank" rel="noopener noreferrer" className="btn-outline px-8 py-4 gap-3 bg-white/5 group">
                <WhatsAppLogo className="w-5 h-5 fill-[#F97316] group-hover:fill-white transition-colors" /> व्हाट्सएप (WhatsApp)
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {trustStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-orange-400 mb-2" />
                  <span className="text-white font-bold text-xl">{stat.label}</span>
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">{loc.name} में सिविल वर्क</div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mt-4 mb-6">
                हमें क्यों चुनें? <span className="text-gradient">AMS Civil</span>
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  {loc.name} में एक भरोसेमंद ठेकेदार खोजना मुश्किल हो सकता है। AMS Civil Construction आपको 100% पारदर्शी कीमत पर क्वालिटी काम देता है।
                  चाहे प्लास्टर करना हो, टाइल्स लगानी हों या नया बंगला बनाना हो, हमारी टीम हर काम में माहिर है।
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> 100% असली मटेरियल</div>
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> कुशल मिस्त्री</div>
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> तय समय पर काम पूरा</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-[#080D1A]">
        <div className="container-custom relative z-10">
          <ModernCTA 
            title={`क्या आप ${loc.name} में घर बनवाना या रिनोवेट करना चाहते हैं?`}
            subtitle={`आज ही मुफ्त साइट विजिट और एस्टीमेट के लिए हमें कॉल करें।`}
            description={`हमारी टीम ${loc.district} में काम करती है और म्युनिसिपल नियमों को अच्छी तरह समझती है। बिना किसी छिपे हुए खर्च के अपना बजट जानें।`}
          />
        </div>
      </section>
    </main>
  );
}
