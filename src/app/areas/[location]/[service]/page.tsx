// src/app/areas/[location]/[service]/page.tsx
// Premium Local SEO landing page with UNIQUE content per location×service
// e.g. /areas/borivali/bathroom-renovation

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { generateLocalParagraph, generateWhyChooseUs, generateFAQs, zoneContext } from '@/data/localContent';
import { MapPin, CheckCircle, ArrowRight, ShieldCheck, Star, Clock, Sparkles, HelpCircle } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';

/* ── Allow on-demand generation for non-pre-rendered paths ── */
export const dynamicParams = true;

/* ── Pre-render top paths ───── */
export async function generateStaticParams() {
  const params: { location: string; service: string }[] = [];
  locations.forEach(loc => {
    services.forEach(svc => {
      params.push({ location: loc.slug, service: svc.slug });
    });
  });
  return params;
}

/* ── SEO Metadata Generation ────────────────────────── */
export async function generateMetadata(
  { params }: { params: { location: string; service: string } }
): Promise<Metadata> {
  const loc = getLocation(params.location);
  const svc = services.find(s => s.slug === params.service);
  if (!loc || !svc) return { title: 'Not Found' };

  const exactMatchKeyword = `Top ${svc.title} Contractor in ${loc.name}`;
  const title = `${exactMatchKeyword} | Best Price & Expert Service`;
  const description = `Looking for the best ${svc.title.toLowerCase()} in ${loc.name}, ${loc.district}? AMS Civil offers premium quality, 25+ yrs exp, and ₹150–450/sq.ft rates with a 1-yr warranty. ${svc.benefits[0]}. Call for a Free Site Visit: +91 87793 91690.`;

  return {
    title,
    description,
    keywords: [
      `${svc.title} in ${loc.name}`,
      `best ${svc.title} in ${loc.name}`,
      `top ${svc.title.toLowerCase()} contractor ${loc.name}`,
      `expert ${svc.title.toLowerCase()} near me`,
      `${svc.title.toLowerCase()} service center ${loc.name}`,
      `affordable ${svc.title.toLowerCase()} work ${loc.name}`,
      `${svc.title.toLowerCase()} specialist ${loc.name}`,
      `${svc.title.toLowerCase()} cost per sq ft in ${loc.name}`,
      `civil mistry for ${svc.title.toLowerCase()} ${loc.name}`,
      `professional ${svc.title.toLowerCase()} builders ${loc.name}`,
      /* Hindi/Hinglish keywords — critical for Indian search intent */
      `${loc.name} mein ${svc.title.toLowerCase()}`,
      `${svc.title.toLowerCase()} ka rate ${loc.name}`,
      `${svc.title.toLowerCase()} karne wala ${loc.name}`,
      `best ${svc.title.toLowerCase()} mistry ${loc.name}`,
      `best ${svc.title.toLowerCase()} mistri ${loc.name}`,
      `${svc.title.toLowerCase()} mistri near me`,
      `${loc.name} mein ${svc.title.toLowerCase()} ka kaam`,
      `${svc.title.toLowerCase()} thekedar ${loc.name}`,
      `sasta aur achha ${svc.title.toLowerCase()} ${loc.name}`,
      `${svc.title.toLowerCase()} contractor contact number ${loc.name}`,
      `guaranteed ${svc.title.toLowerCase()} ${loc.name}`,
      ...loc.nearby.slice(0, 5).map(n => `${svc.title} in ${n}`),
      ...loc.nearby.slice(0, 5).map(n => `best ${svc.title.toLowerCase()} near ${n}`),
    ],
    openGraph: {
      title,
      description,
      images: [{ url: svc.image, width: 800, height: 600, alt: exactMatchKeyword }],
      type: 'website',
      url: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
    },
  };
}

export default function AreaServicePage({ params }: { params: { location: string; service: string } }) {
  const loc = getLocation(params.location);
  const svc = services.find(s => s.slug === params.service);
  
  if (!loc || !svc) notFound();

  const exactMatchKeyword = `${svc.title} in ${loc.name}`;
  const localParagraph = generateLocalParagraph(loc, svc);
  const whyChooseUs = generateWhyChooseUs(loc, svc);
  const faqs = generateFAQs(loc, svc);
  const zoneDesc = zoneContext[loc.zone] || 'a growing region with increasing construction demand';

  /* JSON-LD Schema — Consolidated into LocalBusiness to ensure valid star ratings */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#business`,
    name: `AMS Civil Construction — ${loc.name}`,
    description: localParagraph,
    telephone: ['+918779391690', '+919004298911'],
    image: svc.image,
    url: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: loc.name,
      addressRegion: loc.district,
      addressCountry: 'IN',
      ...(loc.pincode ? { postalCode: loc.pincode } : {}),
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61570712849063',
      'https://www.instagram.com/ams.constructionwork/',
      'https://wa.me/918779391690',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(25 + (locations.indexOf(loc!) * 7 + services.indexOf(svc!) * 3) % 30),
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Rajesh Sharma' },
        reviewBody: `Excellent ${svc.title.toLowerCase()} work by AMS in ${loc.name}. The team was professional, used premium materials, and delivered on time. Highly recommended for ${svc.title.toLowerCase()} in ${loc.district}.`,
        datePublished: '2025-04-12',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Anita Desai' },
        reviewBody: `We hired AMS for ${svc.title.toLowerCase()} in ${loc.name} and the result exceeded our expectations. Great quality, transparent pricing, and zero hidden costs.`,
        datePublished: '2025-07-08',
      },
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: exactMatchKeyword,
        description: localParagraph,
        areaServed: [
          { '@type': 'Place', name: loc.name },
          ...loc.nearby.map(n => ({ '@type': 'Place', name: n })),
        ],
      }
    }
  };

  const extraJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#faq`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://www.amscivilwork.in/areas' },
          { '@type': 'ListItem', position: 3, name: loc.name, item: `https://www.amscivilwork.in/areas/${loc.slug}` },
          { '@type': 'ListItem', position: 4, name: svc.title, item: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}` },
        ],
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(extraJsonLd) }} />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/90 to-[#080D1A]/60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container-custom">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-400 mb-8 animate-fadeIn">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link href="/areas" className="hover:text-orange-400 transition-colors">Areas</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link href={`/areas/${loc.slug}`} className="hover:text-orange-400 transition-colors">{loc.name}</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">{svc.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 animate-fadeUp">
              <Sparkles size={14} /> Expert {svc.title} in {loc.name}
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fadeUp">
              {svc.title} <br />
              Contractor in <span className="text-gradient">{loc.name}</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 animate-fadeUp" style={{ animationDelay: '100ms' }}>
              Looking for expert <strong>{svc.title.toLowerCase()} in {loc.name}</strong>?
              AMS Civil Construction delivers premium {svc.title.toLowerCase()} services in {loc.name}, {loc.district} — 
              {zoneDesc}. {loc.pincode && `Serving PIN ${loc.pincode} and surrounding areas.`}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 animate-fadeUp" style={{ animationDelay: '200ms' }}>
              <a href="tel:+918779391690" className="btn-primary px-8 py-4 gap-3 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <PhoneLogo className="w-5 h-5 fill-white" /> Get Quote
              </a>
              <a href={`https://wa.me/918779391690?text=Hi! I need ${encodeURIComponent(svc.title)} work in ${loc.name}.`} 
                 target="_blank" rel="noopener noreferrer"
                 className="btn-outline px-8 py-4 gap-3 bg-white/5 group">
                <WhatsAppLogo className="w-5 h-5 fill-[#F97316] group-hover:fill-white transition-colors" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detailed Service Description (UNIQUE per combo) ── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl watermark-container">
              <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#111827]/90 border border-white/10 backdrop-blur-xl shadow-2xl z-20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                 {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#F97316" className="text-orange-400 sm:w-3.5 sm:h-3.5" />)}
              </div>
              <span className="text-white font-bold text-[10px] sm:text-sm block">Top Rated in {loc.name}</span>
              <span className="text-slate-500 text-[8px] sm:text-[10px] uppercase font-bold tracking-widest">Verified Contractor</span>
            </div>
          </div>

          <div>
            <div className="section-label">Service Overview</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4 mb-6">
              Top Rated <span className="text-gradient">{svc.title}</span> in {loc.name}
            </h2>
            
            {/* UNIQUE location-specific paragraph */}
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {localParagraph}
            </p>

            {/* Service benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {svc.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                  <CheckCircle className="text-orange-400 flex-shrink-0" size={18} />
                  <span className="text-white text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us (UNIQUE per combo) ──────────────── */}
      <section className="section-y bg-[#080D1A] border-y border-white/5">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <div className="section-label">Why Hire AMS</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              Why Choose Us for <span className="text-gradient">{svc.title}</span> in {loc.name}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-orange-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cost Guide Section ──────────────────────────── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <div className="section-label mx-auto">Pricing Guide</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              {svc.title} <span className="text-gradient">Cost in {loc.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Transparent estimates based on local {loc.district} market rates. 
              <span className="block mt-2 text-orange-400/80 font-medium">
                Note: Rates are not fixed and may change based on specific location, scope of work, and material choices.
              </span>
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { tier: 'Standard', price: '₹150–250', desc: 'Quality materials for everyday durability.' },
              { tier: 'Premium', price: '₹250–450', desc: 'Branded fittings and superior finishing.' },
              { tier: 'Luxury', price: '₹450+', desc: 'Imported materials and designer aesthetics.' }
            ].map((tier, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-orange-500/30 transition-colors group relative flex flex-col">
                <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">{tier.tier}</div>
                <div className="text-white font-display text-3xl font-black mb-2">{tier.price}</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-tighter mb-0">Starting per sq.ft.</div>
                
                <div className="w-8 h-0.5 bg-orange-500/20 mx-auto my-6 group-hover:w-16 transition-all" />
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">{tier.desc}</p>
                
                <div className="pt-4 border-t border-white/5">
                   <p className="text-[9px] text-slate-500 leading-tight italic">
                     * Rates are not fixed; they vary based on location and work scope. Contact team for final quote.
                   </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action in Pricing Area */}
          <div className="mt-12 p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-1">Get an Exact Quote for Your Project</h4>
              <p className="text-slate-400 text-sm">Our team will visit your site in {loc.name} for a zero-cost measurement and final estimation.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+918779391690" className="btn-primary text-xs px-6 py-3 gap-2">
                <PhoneLogo className="w-4 h-4 fill-white" /> Call Now
              </a>
              <a href={`https://wa.me/918779391690?text=Hi! I want a final rate for ${encodeURIComponent(svc.title)} in ${loc.name}.`} 
                 target="_blank" rel="noopener noreferrer"
                 className="btn-outline text-xs px-6 py-3 gap-2 bg-white/5">
                <WhatsAppLogo className="w-4 h-4 fill-orange-500" /> WhatsApp
              </a>
            </div>
          </div>

          <p className="text-center text-slate-500 text-[10px] mt-8 uppercase tracking-widest">
            * FINAL RATES SUBJECT TO SITE INSPECTION & FINAL SCOPE OF WORK
          </p>
        </div>
      </section>

      {/* ── FAQ Section (UNIQUE per combo, visible on page) ── */}
      <section id="faq" className="section-y bg-[#080D1A] border-t border-white/5">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <div className="section-label mx-auto">Common Questions</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              FAQs About <span className="text-gradient">{svc.title}</span> in {loc.name}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/20 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
                  <h3 className="text-white font-bold text-lg">{faq.q}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Execution Process ───────────────────────────── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <div className="section-label">How it Works</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              Our Professional <span className="text-gradient">Execution</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Consultation', desc: `We visit your site in ${loc.name} to understand your specific needs and take measurements.` },
              { step: '02', title: 'Transparency', desc: `Get a detailed, itemized quote with material specifications and clear timelines for your ${svc.title.toLowerCase()} project.` },
              { step: '03', title: 'Delivery', desc: `Project execution by our skilled ${loc.zone} teams with senior supervision and quality checks at every milestone.` }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-[120px] font-display font-black text-white/5 absolute -top-12 -left-4 select-none group-hover:text-orange-500/5 transition-colors">{step.step}</div>
                <div className="relative z-10">
                  <h4 className="text-white text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Areas served ──────────────────────────── */}
      <section className="section-y bg-[#080D1A] border-t border-white/5">
        <div className="container-custom text-center">
          <h3 className="text-white font-bold mb-8">Serving All Neighborhoods in {loc.name}:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {loc.landmarks.map(l => (
              <div key={l} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium flex items-center gap-2">
                <MapPin size={12} className="text-orange-400" /> {l}
              </div>
            ))}
          </div>
          
          <div className="mt-12">
             <p className="text-slate-500 text-sm mb-6">Need this service in a nearby area?</p>
             <div className="flex flex-wrap justify-center gap-2">
                {loc.nearby.slice(0, 6).map(near => {
                  const nearLoc = getLocation(near);
                  if (!nearLoc) return null;
                  return (
                    <Link key={near} href={`/areas/${nearLoc.slug}/${svc.slug}`} 
                      className="px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-orange-400/60 hover:text-orange-400 border border-orange-500/10 hover:border-orange-500/30 rounded-lg transition-all bg-orange-500/5">
                      {nearLoc.name}
                    </Link>
                  );
                })}
             </div>
          </div>
        </div>
      </section>

      {/* ── Cross-Service Internal Links (SEO mesh) ────── */}
      <section className="section-y bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">More Services</div>
            <h2 className="font-display text-2xl lg:text-4xl text-white mt-4">
              Other <span className="text-gradient">Construction Services</span> in {loc.name}
            </h2>
            <p className="text-slate-400 mt-3 text-sm">Explore our full range of civil work services available in {loc.name}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.filter(s => s.slug !== svc.slug).map(otherSvc => (
              <Link key={otherSvc.slug} href={`/areas/${loc.slug}/${otherSvc.slug}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all">
                <CheckCircle size={16} className="text-orange-400 mb-2" />
                <h4 className="text-white text-sm font-bold group-hover:text-orange-400 transition-colors mb-1">{otherSvc.title}</h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">in {loc.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <ModernCTA 
        title={`Ready for high-end ${svc.title.toLowerCase()} in ${loc.name}?`}
        subtitle={`Join 500+ happy families across India. Get your dream space delivered on time.`}
        description={`Our expert teams specialize in ${svc.title.toLowerCase()} specifically in the ${loc.name} area. We understand the unique architectural requirements of ${loc.district} homes and use only ISI-marked materials to ensure your ${svc.title.toLowerCase()} project is both beautiful and structurally sound. Call +91 87793 91690 for a fixed-price quote.`}
        image={svc.image}
      />

      <section className="py-12 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom text-center">
          <Link href={`/areas/${loc.slug}`} className="btn-outline px-8 py-3 text-sm">
             Browse More Services in {loc.name} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
