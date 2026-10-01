'use client';
// src/app/partner/page.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Handshake, CheckCircle, Shield, Clock, Users, Zap, Building2, Paintbrush, Briefcase, ArrowRight, Phone
} from 'lucide-react';
import ModernCTA from '@/components/ui/ModernCTA';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function PartnerPage() {
  useScrollReveal();
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: 'B2B Partner / Architect Connect' }),
      });
      if (!response.ok) throw new Error('Failed to submit');
      
      setSubmitted(true);
      toast.success('Details submitted! We will connect with you shortly.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#080D1A]">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 animate-fadeUp">
              <Handshake size={14} /> B2B Partnership Program
            </div>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fadeUp">
              For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Architects</span> & Designers
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto animate-fadeUp" style={{ animationDelay: '100ms' }}>
              You focus on the brilliant designs and client relationships. Let AMS Civil Construction handle the flawless execution. White-label civil contracting for Mumbai's top creative minds.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content Section ────────────────────────────────── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Benefits */}
            <div>
              <p className="section-label">Why Partner With Us?</p>
              <h2 className="font-display font-black text-white text-3xl sm:text-4xl mb-6">
                Your Vision, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Our Execution.</span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Finding reliable civil contractors who understand architectural drawings and respect the designer's vision is hard. With 25+ years of experience, we bridge the gap between design and reality.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'White-Label Execution', desc: 'We work as your extended team. Your client remains YOUR client.' },
                  { icon: Zap, title: 'Flawless Drawing Reading', desc: 'Our senior engineers understand detailed architectural and structural AutoCAD drawings.' },
                  { icon: Clock, title: 'On-Time Delivery', desc: 'Strict milestone tracking ensures your project is handed over exactly when promised.' },
                  { icon: Users, title: 'Dedicated Project Manager', desc: 'A single point of contact for you. No dealing with multiple messy contractors.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Connect Form */}
            <div className="bg-[#101827] border border-[#1E2D45] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <h3 className="font-display text-2xl font-bold text-white mb-2">Let's Work Together</h3>
              <p className="text-slate-400 text-sm mb-8">Drop your details below and our founder will personally connect with you.</p>

              {submitted ? (
                <div className="flex flex-col items-center py-10 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500/15">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h4 className="font-display text-xl text-white font-bold">Request Received!</h4>
                  <p className="text-slate-400 text-sm">We're excited to connect with you. We'll be in touch within 24 hours to discuss synergies.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1.5">Your Name *</label>
                    <input {...register('name', { required: true })} className="form-input" placeholder="e.g. Ar. Rajesh Sharma" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1.5">Phone *</label>
                      <input {...register('phone', { required: true })} className="form-input" placeholder="10-digit number" />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1.5">Email *</label>
                      <input {...register('email', { required: true })} type="email" className="form-input" placeholder="you@studio.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1.5">Firm Name / Studio *</label>
                    <input {...register('firmName', { required: true })} className="form-input" placeholder="e.g. Space & Form Architects" />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1.5">Message (Optional)</label>
                    <textarea {...register('message')} rows={3} className="form-input resize-none" placeholder="Tell us about your upcoming projects..." />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-70">
                    {isSubmitting ? 'Submitting...' : 'Connect With Us'} <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <ModernCTA
        title="Looking for a reliable execution partner?"
        subtitle="Call us directly to schedule a meeting at your studio or site."
        description="We respect your designs and your clients. Partnering with AMS Civil ensures your vision is executed flawlessly, safely, and on time. Let's build something great together."
      />
    </main>
  );
}
