'use client';
// src/components/layout/Footer.tsx — SEO-rich footer with service areas

import Link from 'next/link';
import Image from 'next/image';
import { HardHat, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '../ui/BrandIcons';

const serviceLinks = [
  { label: 'Bungalow Construction',   href: '/services#bungalow-construction' },
  { label: 'Full Interior Civil Work',href: '/services#interior-civil-work'   },
  { label: 'Swimming Pool Work',      href: '/services#swimming-pool-work'    },
  { label: 'Compound Wall & Gates',   href: '/services#compound-wall-work'    },
  { label: 'Building Repair',         href: '/services#building-repair-work'  },
  { label: 'Bathroom Renovation',     href: '/services#bathroom-renovation'   },
  { label: 'Kitchen Work',            href: '/services#kitchen-work'          },
  { label: 'Tiles Work',              href: '/services#tiles-work'            },
  { label: 'Flooring Work',           href: '/services#flooring-work'         },
  { label: 'POP Work',                href: '/services#pop-work'              },
  { label: 'Plaster Work',            href: '/services#plaster-work'          },
  { label: 'Wall Work',               href: '/services#wall-work'             },
];

const quickLinks = [
  { label: 'Home',          href: '/'         },
  { label: 'About Us',      href: '/about'    },
  { label: 'Services',      href: '/services' },
  { label: 'Projects',      href: '/projects' },
  { label: 'Gallery',       href: '/gallery'  },
  { label: 'Blog',          href: '/blog'     },
  { label: 'Contact',       href: '/contact'  },
  { label: 'Service Areas', href: '/areas'    },
];

const areaLinks = [
  { label: 'Borivali',    href: '/areas/borivali'    },
  { label: 'Andheri',     href: '/areas/andheri'     },
  { label: 'Bandra',      href: '/areas/bandra'      },
  { label: 'Kandivali',   href: '/areas/kandivali'   },
  { label: 'Malad',       href: '/areas/malad'       },
  { label: 'Thane',       href: '/areas/thane'       },
  { label: 'Dadar',       href: '/areas/dadar'       },
  { label: 'Worli',       href: '/areas/worli'       },
  { label: 'Mira Road',   href: '/areas/mira-road'   },
  { label: 'Vashi',       href: '/areas/vashi'       },
  { label: 'Nerul',       href: '/areas/nerul'       },
  { label: 'Kalyan',      href: '/areas/kalyan'      },
  { label: 'Ranchi',      href: '/areas/ranchi'      },
  { label: 'Bangalore',   href: '/areas/bangalore'   },
  { label: 'Pune',        href: '/areas/pune'        },
  { label: 'Nagpur',      href: '/areas/nagpur'      },
];

const socialLinks = [
  { Icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61570712849063', label: 'Facebook'  },
  { Icon: Instagram, href: 'https://www.instagram.com/ams.constructionwork/', label: 'Instagram' },
  { Icon: Youtube,   href: '#', label: 'YouTube'   },
];

export default function Footer() {
  return (
    <footer style={{ background: '#080D1A', borderTop: '1px solid #1E2D45' }}>

      {/* CTA Banner */}
      <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }} className="py-12 relative overflow-hidden">
        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <div className="container-custom relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="font-display text-white text-3xl sm:text-4xl font-black leading-tight">Ready to Start Your Project?</h3>
            <p className="text-white/80 text-base sm:text-lg mt-3 font-medium">Free consultation from our expert team within 24 hours.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            {/* Call Buttons */}
            <div className="flex flex-col gap-3">
              <a href="tel:+918779391690"
                className="flex items-center justify-center gap-3 px-8 py-4 font-bold text-[13px] tracking-widest uppercase bg-[#080D1A] text-white rounded-xl shadow-xl hover:bg-[#0B1120] hover:-translate-y-1 transition-all duration-300">
                <PhoneLogo className="w-5 h-5 fill-orange-500" /> 87793 91690
              </a>
              <a href="tel:+919004298911"
                className="flex items-center justify-center gap-3 px-8 py-4 font-bold text-[13px] tracking-widest uppercase bg-[#080D1A] text-white rounded-xl shadow-xl hover:bg-[#0B1120] hover:-translate-y-1 transition-all duration-300">
                <PhoneLogo className="w-5 h-5 fill-orange-500" /> 90042 98911
              </a>
            </div>

            {/* WhatsApp Buttons */}
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/918779391690" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 font-bold text-[13px] tracking-widest uppercase bg-white text-[#EA580C] rounded-xl shadow-xl hover:bg-orange-50 hover:-translate-y-1 transition-all duration-300">
                <WhatsAppLogo className="w-5 h-5 fill-[#25D366]" /> Consultation
              </a>
              <a href="https://wa.me/919004298911" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 font-bold text-[13px] tracking-widest uppercase bg-white text-[#EA580C] rounded-xl shadow-xl hover:bg-orange-50 hover:-translate-y-1 transition-all duration-300">
                <WhatsAppLogo className="w-5 h-5 fill-[#25D366]" /> Chat Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — 5 columns */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 1 col */}
          <div className="lg:col-span-1 text-left flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative w-10 h-10 overflow-hidden rounded-sm">
                <Image 
                  src="/logo.png" 
                  alt="AMS Civil Construction Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-display font-bold text-base">AMS Civil</span>
                <span className="block text-[10px] font-mono tracking-[0.18em] uppercase -mt-0.5" style={{ color: '#F97316' }}>Construction</span>
              </div>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed mb-5">
              India&apos;s trusted construction partner for 20+ years. 
              We strictly follow all government rules and regulations to deliver excellence in every project.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="w-8 h-8 flex items-center justify-center footer-social">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-2 items-start">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-orange-400 transition-colors group">
                    <span className="w-2.5 h-px bg-slate-700 group-hover:w-4 group-hover:bg-orange-400 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-left">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Services</h4>
            <ul className="flex flex-col gap-2 items-start">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-orange-400 transition-colors group">
                    <span className="w-2.5 h-px bg-slate-700 group-hover:w-4 group-hover:bg-orange-400 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Areas — SEO backlinks */}
          <div className="text-left">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Top Areas</h4>
            <ul className="flex flex-col gap-2 items-start">
              {areaLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-orange-400 transition-colors group">
                    <MapPin size={10} className="flex-shrink-0" style={{ color: '#F97316' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/areas" className="inline-flex items-center gap-1 text-xs mt-3" style={{ color: '#F97316' }}>
              View all 40+ areas →
            </Link>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Contact</h4>
            <ul className="flex flex-col gap-4 items-start text-left">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#F97316' }} />
                <span className="text-slate-500 text-xs leading-relaxed">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316] flex-shrink-0" />
                  <a href="tel:+918779391690" className="text-slate-500 hover:text-orange-400 text-xs transition-colors">
                    +91 87793 91690
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316] flex-shrink-0" />
                  <a href="tel:+919004298911" className="text-slate-500 hover:text-orange-400 text-xs transition-colors">
                    +91 90042 98911
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="flex-shrink-0" style={{ color: '#F97316' }} />
                <a href="mailto:ams.constructionwork@gmail.com"
                  className="text-slate-500 hover:text-orange-400 text-xs transition-colors break-all">
                  ams.constructionwork@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO keyword area row */}
      <div style={{ borderTop: '1px solid #1E2D45', background: '#060B14' }} className="py-4">
        <div className="container-custom">
          <p className="text-slate-700 text-[10px] leading-relaxed text-center">
            AMS Civil Construction - Top Rated Civil Contractor (2026) · Best Construction Company in Mumbai · Turnkey Bungalow Builders ·
            Service Areas: South Mumbai · Western Line · Central Line · Navi Mumbai · Thane · Palghar · Pune · Nagpur · Nasik · 
            Kolkata · Asansol · Siliguri · Ranchi · Jamshedpur · Dhanbad · Bangalore · Mysore · Panjim · Margao. 
            Services: Bungalow Construction · Bathroom Renovation · Modular Kitchen · Tiles & Flooring · POP Ceiling · Plaster Work ·
            Waterproofing · Painting · Interior Structural Work · Compound Wall · Swimming Pool Contractor · Cost of Civil Work.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4" style={{ borderTop: '1px solid #0E1827' }}>
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-700 text-xs text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <p>
              © {new Date().getFullYear()} AMS Civil Construction. All rights reserved. A Mandal Group Venture
              <Link href="/admin" className="ml-1 text-slate-700 hover:text-orange-500 transition-colors cursor-default" title="Admin">.</Link>
            </p>
            <p className="text-[10px] text-slate-500">
              Developed by: <a href="https://www.webxcrafting.in/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">WebX Crafting</a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
