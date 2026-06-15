'use client';

import { useState } from 'react';
import { PhoneLogo } from '@/components/ui/BrandIcons';
import { Home, PaintRoller, Droplet, Hammer, ArrowRight, ShieldCheck, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('1BHK');
  const [services, setServices] = useState<string[]>([]);
  const [condition, setCondition] = useState('Standard');
  
  // Lead Capture State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const propertyOptions = [
    { id: '1RK', label: '1 RK / Studio', icon: Home, basePrice: 150000 },
    { id: '1BHK', label: '1 BHK Flat', icon: Home, basePrice: 250000 },
    { id: '2BHK', label: '2 BHK Flat', icon: Home, basePrice: 400000 },
    { id: '3BHK', label: '3 BHK Flat', icon: Home, basePrice: 650000 },
    { id: 'Bungalow', label: 'Villa / Bungalow', icon: Home, basePrice: 1200000 },
  ];

  const serviceOptions = [
    { id: 'full', label: 'Full Home Renovation', icon: Hammer, desc: 'A to Z Civil & Interior' },
    { id: 'bathroom', label: 'Bathroom Only', icon: Droplet, desc: 'Waterproofing & Tiling' },
    { id: 'kitchen', label: 'Kitchen Only', icon: Hammer, desc: 'Platform & Modular' },
    { id: 'painting', label: 'Painting & POP', icon: PaintRoller, desc: 'False Ceiling & Paint' },
  ];

  const conditionOptions = [
    { id: 'Standard', label: 'Standard', multiplier: 1.0, desc: 'Good quality standard materials' },
    { id: 'Premium', label: 'Premium', multiplier: 1.3, desc: 'Branded premium materials' },
    { id: 'Luxury', label: 'Luxury', multiplier: 1.8, desc: 'Imported luxury finish' },
  ];

  const toggleService = (id: string) => {
    if (id === 'full') {
      setServices(['full']);
      return;
    }
    const newServices = services.includes('full') ? [] : [...services];
    if (newServices.includes(id)) {
      setServices(newServices.filter(s => s !== id));
    } else {
      setServices([...newServices, id]);
    }
  };

  const calculateEstimate = () => {
    const base = propertyOptions.find(p => p.id === propertyType)?.basePrice || 250000;
    const condMult = conditionOptions.find(c => c.id === condition)?.multiplier || 1.0;
    
    let total = 0;
    if (services.includes('full')) {
      total = base;
    } else {
      if (services.includes('bathroom')) total += 65000;
      if (services.includes('kitchen')) total += 45000;
      if (services.includes('painting')) total += (base * 0.25);
    }

    if (total === 0) total = base;
    total = total * condMult;

    const min = Math.floor(total * 0.9);
    const max = Math.floor(total * 1.15);

    return {
      min: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(min),
      max: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(max),
      rawTotal: total
    };
  };

  const estimate = calculateEstimate();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          propertyType,
          services,
          condition,
          estimateMin: estimate.min,
          estimateMax: estimate.max
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Something went wrong.');
        setIsSubmitting(false);
      } else {
        // Unlock the result!
        setIsSubmitting(false);
        setStep(5);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi AMS Civil! I just checked the calculator on your website.\n\n*Property:* ${propertyType}\n*Quality:* ${condition}\n*Estimated Range:* ${estimate.min} - ${estimate.max}\n\nI need an exact quote and free site visit.`;
    window.open(`https://wa.me/918779391690?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080D1A] pt-32 pb-24 selection-orange relative">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Renovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Cost Calculator</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select your requirements to get an instant estimated cost for your home renovation in Mumbai.
            </p>
          </div>

          <div className="bg-[#101827] border border-[#1E2D45] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[400px]">
            {/* Progress Bar - Only show for first 4 steps */}
            {step < 5 && (
              <div className="flex items-center justify-between mb-10 relative px-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1E2D45] -z-10" />
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 -z-10 transition-all duration-500" 
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-[#1E2D45] text-slate-400'}`}>
                    {step > num ? <CheckCircle2 size={20} /> : num === 4 ? <Lock size={16} /> : num}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">1. What is your property type?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {propertyOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPropertyType(opt.id)}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${propertyType === opt.id ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-[#1E2D45] bg-white/5 text-slate-300 hover:border-orange-500/50 hover:bg-white/10'}`}
                    >
                      <opt.icon size={32} className={propertyType === opt.id ? 'text-orange-500' : 'text-slate-500'} />
                      <span className="font-medium text-center">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">2. What services do you need?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      className={`p-5 rounded-xl border text-left flex items-start gap-4 transition-all ${services.includes(opt.id) ? 'border-orange-500 bg-orange-500/10' : 'border-[#1E2D45] bg-white/5 hover:border-orange-500/50 hover:bg-white/10'}`}
                    >
                      <div className={`p-3 rounded-lg ${services.includes(opt.id) ? 'bg-orange-500 text-white' : 'bg-[#1E2D45] text-slate-400'}`}>
                        <opt.icon size={24} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg mb-1 ${services.includes(opt.id) ? 'text-orange-400' : 'text-white'}`}>{opt.label}</h3>
                        <p className="text-slate-400 text-sm">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg font-bold text-slate-400 hover:text-white transition-colors">
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={services.length === 0}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">3. Select Finish Quality</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {conditionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCondition(opt.id)}
                      className={`p-5 rounded-xl border text-center transition-all ${condition === opt.id ? 'border-orange-500 bg-orange-500/10' : 'border-[#1E2D45] bg-white/5 hover:border-orange-500/50 hover:bg-white/10'}`}
                    >
                      <h3 className={`font-bold text-xl mb-2 ${condition === opt.id ? 'text-orange-400' : 'text-white'}`}>{opt.label}</h3>
                      <p className="text-slate-400 text-sm">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg font-bold text-slate-400 hover:text-white transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep(4)} className="btn-primary flex items-center gap-2 px-8">
                    Calculate Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in max-w-md mx-auto py-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                    <Lock className="w-8 h-8 text-orange-500" />
                  </div>
                  <h2 className="text-2xl text-white font-bold mb-2">Your Estimate is Ready!</h2>
                  <p className="text-slate-400 text-sm">Enter your details to unlock the complete cost breakdown instantly.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#060B14] border border-[#1E2D45] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
                    <div className="flex relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                      <input 
                        type="tel" 
                        required 
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#060B14] border border-[#1E2D45] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || phone.length !== 10 || !name}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking...</>
                    ) : (
                      <>Unlock My Estimate <Lock size={16} className="ml-1" /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} className="text-green-500" /> Your information is 100% secure.
                  </p>
                </form>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-in">
                <div className="bg-gradient-to-br from-[#1E2D45] to-[#0B1120] border border-green-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/40">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>

                  <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-3">Estimated Cost Range</p>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                    {estimate.min} <span className="text-slate-600 text-3xl font-light mx-2">to</span> {estimate.max}
                  </div>
                  
                  <div className="inline-block bg-[#080D1A] border border-[#1E2D45] rounded-xl px-6 py-4 mb-8 text-left mt-2 shadow-inner">
                    <p className="text-slate-300 text-sm mb-1"><span className="text-slate-500 w-24 inline-block">Property:</span> <strong className="text-white">{propertyType}</strong></p>
                    <p className="text-slate-300 text-sm mb-1"><span className="text-slate-500 w-24 inline-block">Quality:</span> <strong className="text-white">{condition} Finish</strong></p>
                    <p className="text-slate-300 text-sm"><span className="text-slate-500 w-24 inline-block">Services:</span> <strong className="text-white">{services.length} selected</strong></p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleWhatsApp} className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                      <PhoneLogo className="w-6 h-6 fill-white" /> Request Free Site Visit
                    </button>
                    <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white font-medium px-6 py-4 transition-colors">
                      Start Over
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-6">*This is a rough estimate. Final quotation will be provided after physical site inspection by our engineers.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
