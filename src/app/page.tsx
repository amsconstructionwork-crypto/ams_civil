'use client';
// src/app/page.tsx  –  Home Page
// FIXES: FAQ useState (was require bug), projects fetched from MongoDB API,
//        carousel scroll, new navy/orange palette, fast CSS animations

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Star, CheckCircle, ChevronDown, ChevronLeft, ChevronRight,
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
  Shield, Clock, Award, Users, MapPin,
  Waves, LayoutTemplate, Fence, Hammer,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { services, stats, testimonials, faqs } from '@/data/siteData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import CountUp from '@/components/ui/CountUp';
import GalleryCarouselSection from '@/components/ui/GalleryCarousel';
import ModernCTA from '@/components/ui/ModernCTA';

/* ── Icon map ───────────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
  Waves, LayoutTemplate, Fence, Hammer,
};

/* ── Scroll-reveal hook ─────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const io  = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  useScrollReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <TickerSection />
      <IntroSection />
      <ServicesSection />
      <ProjectsCarousel />
      <GalleryCarouselSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <NetworkSection />
      <ModernCTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   NETWORK / TOP CITIES
─────────────────────────────────────────────────────────────── */
function NetworkSection() {
  const topCities = [
    { name: 'Ranchi',      slug: 'ranchi',      zone: 'Jharkhand' },
    { name: 'Bangalore',   slug: 'bangalore',   zone: 'Karnataka' },
    { name: 'Kolkata',     slug: 'kolkata',     zone: 'West Bengal' },
    { name: 'Panjim',      slug: 'panjim',      zone: 'Goa' },
    { name: 'Pune',        slug: 'pune',        zone: 'Maharashtra' },
    { name: 'Nagpur',      slug: 'nagpur',      zone: 'Maharashtra' },
    { name: 'Jamshedpur',  slug: 'jamshedpur',  zone: 'Jharkhand' },
    { name: 'Mysore',      slug: 'mysore',      zone: 'Karnataka' },
    { name: 'Asansol',     slug: 'asansol',     zone: 'West Bengal' },
    { name: 'Dhanbad',     slug: 'dhanbad',     zone: 'Jharkhand' },
    { name: 'Siliguri',    slug: 'siliguri',    zone: 'West Bengal' },
  ];

  const featuredLinks = [
    { label: 'Bathroom Renovation', slug: 'bathroom-renovation' },
    { label: 'Bungalow Construction', slug: 'bungalow-construction' },
    { label: 'Modular Kitchen', slug: 'kitchen-work' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 360; // Adjusted for wider cards
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#080D1A] border-t border-white/5 relative group">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="section-label">National Presence</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mt-4">
              Expanding Across <span className="text-gradient">Major Cities</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              AMS Civil Construction is now active in top metropolitan areas. We bring the same 
              Mumbai-quality civil expertise to Jharkhand, Karnataka, Goa, and West Bengal.
            </p>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div ref={scrollRef} className="flex overflow-x-auto pb-8 gap-4 sm:gap-6 no-scrollbar snap-x scroll-smooth px-4 sm:px-0">
          {topCities.map(city => (
            <div key={city.slug} 
                 className="flex-shrink-0 w-[calc(100vw-64px)] sm:w-[300px] lg:w-[280px] snap-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group/card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover/card:bg-orange-500 group-hover/card:text-white transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover/card:text-orange-400 transition-colors">{city.name}</h3>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">{city.zone}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {featuredLinks.map(link => (
                  <Link key={`${city.slug}-${link.slug}`} 
                        href={`/areas/${city.slug}/${link.slug}`}
                        className="flex items-center justify-between text-[13px] text-slate-400 hover:text-orange-400 transition-colors group/link">
                    {link.label} 
                    <ArrowRight size={14} className="opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-white/5 mt-2">
                  <Link href={`/areas/${city.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
                    Explore All Work in {city.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* See More Card at the end */}
          <Link href="/areas" 
                className="flex-shrink-0 w-[200px] snap-start rounded-2xl bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 flex flex-col items-center justify-center text-center p-6 transition-all group/more">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4 group-hover/more:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <p className="text-white font-bold mb-1">View All Areas</p>
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              80+ Locations <ArrowRight size={12} />
            </p>
          </Link>

          {/* End Spacer to prevent clipping */}
          <div className="flex-shrink-0 w-10 md:w-20" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080D1A 0%, #0B1120 50%, #0A1628 100%)' }}>

      {/* Animated glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] opacity-20 animate-pulse2"
        style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-10%', right: '-5%' }} />
      <div className="glow-orb w-[400px] h-[400px] opacity-10 animate-pulse2"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)', bottom: '-5%', left: '-5%', animationDelay: '1.2s' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Hero content */}
      <div className="relative container-custom pt-36 pb-20">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="section-label animate-fadeIn">
              Mumbai&apos;s Trusted Construction Partner Since 2001
            </div>

            {/* Headline (LCP Element - no artificial delays) */}
            <h1 className="font-display font-black text-white leading-[1.08] text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] mt-2 mb-6">
              Mumbai&apos;s Best <br />
              <span className="text-gradient">Civil Contractors</span>
            </h1>

            {/* Sub */}
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8 animate-fadeUp">
              The #1 choice for <strong className="text-orange-400">best civil work in Mumbai</strong>. 
              Expert in bungalow construction, bathroom renovation, kitchen work, and premium interior civil work across Mumbai, Navi Mumbai, and Thane.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fadeUp">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={openQuotePopup} 
                className="btn-primary text-base px-8 py-4"
              >
                Get Free Quote <ArrowRight size={18} />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects" className="btn-ghost text-base px-8 py-4 h-full flex items-center">
                  View Projects
                </Link>
              </motion.div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 animate-fadeIn" style={{ animationDelay: '.85s', opacity: 0 }}>
              {['350+ Projects Done', '50+ Skilled Team', 'Free Consultation', '1-Year Warranty'].map(b => (
                <span key={b} className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <CheckCircle size={12} style={{ color: '#F97316' }} />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Stat cards — repositioned to prevent overlap */}
          <div className="grid grid-cols-2 gap-4 animate-fadeIn"
            style={{ animationDelay: '1s', opacity: 0 }}>
            {stats.map((s, i) => (
              <div key={s.label} className="glass px-5 py-6 flex flex-col items-center text-center animate-floatY"
                style={{ animationDelay: `${i * 0.4}s` }}>
                <div className="font-display font-black text-3xl text-gradient mb-1">
                  <CountUp value={s.value} />
                </div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24"
        style={{ background: 'linear-gradient(to top, #080D1A, transparent)' }} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER
─────────────────────────────────────────────────────────────── */
function TickerSection() {
  const items = ['✦ Bungalow Construction', '✦ Full Interior Civil Work', '✦ Swimming Pool Work',
    '✦ Compound Wall & Gates', '✦ Building Repair', '✦ Bathroom Renovation', '✦ Kitchen Work',
    '✦ Tiles & Flooring', '✦ POP Ceilings', '✦ Plaster Work', '✦ Wall Finishes'];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap overflow-hidden py-3.5"
      style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-mono font-semibold text-sm uppercase tracking-widest px-8 whitespace-nowrap opacity-95">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTRO + STATS
─────────────────────────────────────────────────────────────── */
function IntroSection() {
  return (
    <section className="section-y" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label animate-on-scroll">About Us</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-6 animate-on-scroll">
              Premium Bungalow Construction & <br/>
              <span className="text-gradient">Civil Work in Mumbai</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4 animate-on-scroll">
              As the leading <strong className="text-white">building contractor in Mumbai</strong>, AMS Civil Construction
              has been executing premium real estate and residential projects for over 25 years. We are the top-rated choice for civil work in Mumbai, Navi Mumbai, and Thane.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 animate-on-scroll">
              We specialise in <strong className="text-white">bungalow construction</strong>, luxury bathroom &amp; modular kitchen renovations, tiles, flooring,
              POP false ceilings, and all interior structural work — delivered with personal attention, expert engineers, and backed by a comprehensive quality guarantee.
            </p>
            <div className="flex gap-4 animate-on-scroll">
              <Link href="/about" className="btn-primary">Our Story <ArrowRight size={16} /></Link>
              <Link href="/services" className="btn-outline">All Services</Link>
            </div>
          </div>

          {/* About Banner Image — Adjusted aspect ratio to remove empty space */}
          <div className="relative aspect-[1.35/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-on-scroll">
            <Image 
              src="/images/aboutbenner.png" 
              alt="About AMS Civil Construction" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICES — horizontal scroll on mobile, grid on desktop
─────────────────────────────────────────────────────────────── */
function ServicesSection() {
  return (
    <section className="section-y stripe-bg" style={{ background: '#101827' }}>
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-label justify-center animate-on-scroll">What We Do</div>
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-3 animate-on-scroll">
            Our <span className="text-gradient">Construction Services</span>
          </h2>
          <p className="text-slate-400 animate-on-scroll text-sm">
            From the foundation to the finest interior details — every service under one roof.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] ?? Wrench;
            return (
              <Link key={svc.id} href={`/services#${svc.slug}`}
                className="group relative h-64 overflow-hidden rounded-xl border border-slate-800/50 flex flex-col justify-end p-5 animate-on-scroll"
                style={{ transitionDelay: `${i * 45}ms` }}>
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0 watermark-container">
                  <Image 
                    src={svc.image} 
                    alt={`${svc.title} Contractor in Mumbai — AMS Civil Construction`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />
                  {/* Gradient Overlay - Reduced opacity so realistic images are visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 z-10" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 group-hover:bg-orange-500 group-hover:border-transparent">
                    <Icon size={18} className="text-orange-500 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="text-white font-display font-bold text-lg leading-tight mb-1 transition-colors duration-300 group-hover:text-orange-400">
                    {svc.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {svc.shortDesc}
                  </p>

                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-orange-500">
                    Learn More <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10 animate-on-scroll">
          <Link href="/services" className="btn-primary">
            All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS CAROUSEL — fetches from MongoDB via /api/projects
─────────────────────────────────────────────────────────────── */
interface Project {
  id: string; title: string; category: string; location: string;
  status: 'ongoing' | 'completed'; description: string; images: string[];
  completedDate?: string;
}

function ProjectsCarousel() {
  const [projects,  setProjects]  = useState<Project[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState<'all' | 'ongoing' | 'completed'>('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef  = useRef<HTMLDivElement>(null);
  const timerRef  = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => { if (j.success) setProjects(j.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  /* Scroll the TRACK div horizontally — never moves the page */
  const scrollToIdx = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (card) {
      // Use scrollLeft on the container, NOT scrollIntoView (which scrolls the whole page)
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
    setActiveIdx(idx);
  }, []);

  const prev = useCallback(() => scrollToIdx(Math.max(0, activeIdx - 1)),
    [activeIdx, scrollToIdx]);
  const next = useCallback(() => scrollToIdx(Math.min(filtered.length - 1, activeIdx + 1)),
    [activeIdx, filtered.length, scrollToIdx]);

  /* Auto-advance every 5s using scrollLeft — never jumps the page */
  useEffect(() => {
    if (filtered.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => {
        const nextIdx = (prev + 1) % filtered.length;
        const track = trackRef.current;
        if (track) {
          const card = track.children[nextIdx] as HTMLElement | undefined;
          if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        }
        return nextIdx;
      });
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [filtered.length]);

  /* Reset on filter change */
  useEffect(() => {
    setActiveIdx(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [filter]);

  return (
    <section className="section-y" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-label animate-on-scroll">Our Work</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight animate-on-scroll">
              Featured <span className="text-gradient">Civil Work Projects</span>
            </h2>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-2 animate-on-scroll">
            {(['all','ongoing','completed'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                style={filter === f
                  ? { background: '#F97316', color: '#fff' }
                  : { border: '1px solid #1E2D45', color: '#94A3B8' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-400">
            <span className="w-5 h-5 border-2 border-slate-600 border-t-orange-500 rounded-full animate-spin1" />
            Loading projects…
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="card p-12 text-center text-slate-400">
            No projects yet. Add your first project from the{' '}
            <Link href="/admin" className="underline" style={{ color: '#F97316' }}>Admin Dashboard</Link>.
          </div>
        )}

        {/* Carousel track */}
        {!loading && filtered.length > 0 && (
          <>
            <div ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-snap-x"
              onScroll={e => {
                const el = e.currentTarget;
                const cardW = el.scrollWidth / filtered.length;
                setActiveIdx(Math.round(el.scrollLeft / cardW));
              }}>
              {filtered.map((project, i) => (
                <div key={project.id}
                  className="scroll-snap-start flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[380px]
                             card group relative overflow-hidden transition-all duration-300"
                  style={{ transform: activeIdx === i ? 'scale(1.02)' : 'scale(0.98)', opacity: activeIdx === i ? 1 : 0.75 }}>

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden watermark-container">
                    {project.images?.[0] ? (
                      <Image src={project.images[0]} alt={`${project.title} — Construction Project in ${project.location}`} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: '#161F2E' }}>
                        <span className="text-slate-500 text-sm">No image</span>
                      </div>
                    )}

                    {/* Status badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                      style={project.status === 'ongoing'
                        ? { background: 'rgba(59,130,246,0.9)', color: '#fff' }
                        : { background: 'rgba(249,115,22,0.9)', color: '#fff' }}>
                      {project.status === 'ongoing' ? <Clock size={10} /> : <CheckCircle size={10} />}
                      {project.status}
                    </span>

                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(11,17,32,0.95) 0%, rgba(11,17,32,0.1) 60%, transparent 100%)' }} />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#F97316' }}>
                      {project.category}
                    </span>
                    <h3 className="text-white font-semibold text-base mt-1 mb-2 leading-snug">{project.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <MapPin size={11} style={{ color: '#F97316' }} />
                      {project.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {filtered.map((_, i) => (
                  <button key={i} onClick={() => scrollToIdx(i)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: activeIdx === i ? '24px' : '8px',
                      height: '8px',
                      background: activeIdx === i ? '#F97316' : '#1E2D45',
                    }} />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button onClick={prev} disabled={activeIdx === 0}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#F97316')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E2D45')}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next} disabled={activeIdx === filtered.length - 1}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#F97316')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E2D45')}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        <div className="text-center mt-8 animate-on-scroll">
          <Link href="/projects" className="btn-outline">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US
─────────────────────────────────────────────────────────────── */
function WhyUsSection() {
  const reasons = [
    { icon: Shield, title: 'Quality Guaranteed',   desc: 'Premium materials, skilled workers, 1-year workmanship warranty on all projects.' },
    { icon: Clock,  title: 'Milestone Payments',   desc: 'Pay only as you see progress. Milestone-based payments ensure your money is safe.' },
    { icon: Award,  title: '25+ Years Legacy',    desc: 'Over 25 years of building homes and trust across Mumbai, Navi Mumbai, and Thane.' },
    { icon: Users,  title: 'Senior Supervision',   desc: 'Senior experts personally oversee every detail on-site. No middlemen, just expertise.' },
  ];

  return (
    <section className="section-y relative overflow-hidden" style={{ background: '#101827' }}>
      {/* Orange glow */}
      <div className="glow-orb w-[500px] h-[500px] opacity-10"
        style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-20%', right: '-10%' }} />

      <div className="relative container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-label justify-center animate-on-scroll">Why Choose Us</div>
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white mb-3 animate-on-scroll">
            Why Families Trust <span className="text-gradient">AMS Civil</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="card group p-7 flex flex-col gap-4 animate-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
─────────────────────────────────────────────────────────────── */
interface Testimonial {
  id: string; name: string; location: string; rating: number; text: string;
  service: string; avatar: string;
}

function TestimonialsSection() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(j => { if (j.success) setData(j.data); })
      .catch(err => console.error('Failed to fetch testimonials:', err))
      .finally(() => setLoading(false));
  }, []);

  /* Auto-advance every 4.5s */
  useEffect(() => {
    if (data.length <= 1) return;
    
    timerRef.current = setInterval(() => {
      const track = trackRef.current;
      if (track) {
        let cardW = track.children[0]?.clientWidth || 0;
        let gap = 20; // gap-5 is 20px
        let scrollAmt = cardW + gap;
        let maxScroll = track.scrollWidth - track.clientWidth;
        
        // If we are at the end, rewind smoothly to the start
        if (track.scrollLeft >= maxScroll - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [data.length]);

  if (!loading && data.length === 0) return null;

  return (
    <section className="section-y" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-label justify-center animate-on-scroll">Happy Clients</div>
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white mb-3 animate-on-scroll">
            What Our Clients <span className="text-gradient">Say</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3 text-slate-500">
            <span className="w-5 h-5 border-2 border-slate-700 border-t-orange-500 rounded-full animate-spin" />
            Loading reviews...
          </div>
        ) : (
          <div className="relative group">
            {/* Scroll Left Button */}
            <button onClick={() => {
                const track = trackRef.current;
                if (track) {
                  let cardW = track.children[0]?.clientWidth || 0;
                  track.scrollBy({ left: -(cardW + 20), behavior: 'smooth' });
                }
              }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center bg-[#1E2D45] text-white hover:bg-[#F97316] transition-colors shadow-lg hidden md:flex border border-slate-700 opacity-0 group-hover:opacity-100">
              <ChevronLeft size={20} />
            </button>

            {/* Scroll Right Button */}
            <button onClick={() => {
                const track = trackRef.current;
                if (track) {
                  let cardW = track.children[0]?.clientWidth || 0;
                  track.scrollBy({ left: (cardW + 20), behavior: 'smooth' });
                }
              }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center bg-[#1E2D45] text-white hover:bg-[#F97316] transition-colors shadow-lg hidden md:flex border border-slate-700 opacity-0 group-hover:opacity-100">
              <ChevronRight size={20} />
            </button>

            {/* Track */}
            <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-snap-x items-stretch">
              {data.map((t, i) => (
                <div key={t.id} className="scroll-snap-start flex-shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] card p-6 flex flex-col gap-4 animate-fadeUp opacity-0 h-auto"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'forwards' }}>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} style={{ fill: '#F97316', color: '#F97316' }} />
                    ))}
                  </div>

                  {/* Opening quote mark */}
                  <div className="text-4xl font-display leading-none" style={{ color: '#F97316', opacity: 0.4 }}>&ldquo;</div>

                  <p className="text-slate-400 text-sm leading-relaxed flex-1 -mt-4">{t.text}</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: '#1E2D45' }}>
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.location} · {t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ — FIXED: uses top-level useState, NOT require()
─────────────────────────────────────────────────────────────── */
function FAQSection() {
  // ✅ Correct — useState from module-level import, not require()
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  return (
    <section className="section-y" style={{ background: '#101827' }}>
      <div className="container-custom max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label justify-center animate-on-scroll">FAQ</div>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-2 animate-on-scroll">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div key={i} className="animate-on-scroll overflow-hidden transition-all duration-200"
              style={{
                transitionDelay: `${i * 40}ms`,
                border: `1px solid ${open === i ? '#F97316' : '#1E2D45'}`,
                background: open === i ? 'rgba(249,115,22,0.04)' : '#161F2E',
              }}>

              {/* Question button */}
              <button onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left group">
                <span className="font-medium text-sm transition-colors duration-150"
                  style={{ color: open === i ? '#F97316' : '#CBD5E1' }}>
                  {faq.question}
                </span>
                <ChevronDown size={17} className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: open === i ? '#F97316' : '#475569',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }} />
              </button>

              {/* Answer — animated expand */}
              <div style={{
                maxHeight: open === i ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <div className="px-5 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT CTA
─────────────────────────────────────────────────────────────── */
