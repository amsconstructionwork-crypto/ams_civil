// src/data/localContent.ts
// Generates unique, varied content for area×service pages
// Each combination produces different text to avoid thin/duplicate content penalties

import type { LocationData } from './locations';

interface ServiceInfo {
  title: string;
  slug: string;
  description: string;
  benefits: string[];
}

/* ── Zone-specific context ────────────────────────────────────── */
const zoneContext: Record<string, string> = {
  'South Mumbai':   'one of Mumbai\'s most prestigious and historically rich neighbourhoods',
  'Western Line':   'a rapidly developing residential corridor along Mumbai\'s western suburbs',
  'Central Line':   'a thriving commercial-residential hub in Mumbai\'s central suburbs',
  'Navi Mumbai':    'a modern planned city with contemporary infrastructure and growing residential demand',
  'Maharashtra':    'a key city in Maharashtra with a booming real estate and construction sector',
  'Jharkhand':      'a growing urban centre with increasing demand for quality residential construction',
  'West Bengal':    'a vibrant metropolitan region with a rich architectural heritage',
  'Karnataka':      'a fast-growing Indian city with high demand for premium construction and interior work',
  'Goa':            'a coastal paradise with unique architectural styles and high demand for luxury villas and renovation work',
};

/* ── Service-specific deep paragraphs ─────────────────────────── */
const serviceDeepContent: Record<string, (loc: LocationData) => string> = {
  'bungalow-construction': (loc) =>
    `Building a bungalow in ${loc.name} requires deep understanding of the local soil conditions, municipal building codes in ${loc.district}, and weather patterns specific to the ${loc.zone} region. Our structural engineers design foundations tailored to the terrain around ${loc.landmarks[0] || loc.name}, ensuring your home stands strong for generations. We handle everything from architectural planning to the final coat of paint, including RCC framework, electrical layouts, plumbing networks, and premium external finishes.`,

  'full-interior-work': (loc) =>
    `Full interior civil work in ${loc.name} demands precision and a thorough understanding of the building structures typical to ${loc.district}. Whether it's a flat near ${loc.landmarks[0] || loc.name} or a row house in the ${loc.zone} belt, our teams manage internal demolition, wall partitioning, ceiling work, electrical re-routing, and finishing — all coordinated to minimise disruption to your daily life. We work closely with interior designers and architects to ensure the civil backbone matches the aesthetic vision perfectly.`,

  'swimming-pool-work': (loc) =>
    `Swimming pool construction in ${loc.name} involves specialised excavation, heavy-duty RCC shell building, multi-layer waterproofing, and premium tile/mosaic finishing. Our team considers the local water table levels near ${loc.landmarks[0] || loc.name} and the soil composition in ${loc.district} to engineer a pool structure that remains leak-proof for decades. We also install filtration systems, underwater lighting, and safety features compliant with national standards.`,

  'compound-wall-work': (loc) =>
    `A sturdy compound wall is essential for property security in ${loc.name}. Our teams build RCC-reinforced compound walls with deep foundations suited to the soil type found in ${loc.district}. From brick masonry to stone cladding and decorative finishes, we ensure your boundary wall is both imposing and attractive. We also install custom-designed gates — MS grills, wrought iron, or automated sliding gates — perfectly fitted for properties near ${loc.landmarks[0] || loc.name}.`,

  'building-repair-work': (loc) =>
    `Older buildings in ${loc.name} often face structural fatigue, waterseepage, and plaster deterioration — especially in the ${loc.zone} climate. Our repair and restoration teams conduct thorough structural audits before recommending solutions. We specialise in jacketing, crack injection using epoxy resins, external plaster restoration, anti-corrosion treatments for exposed rebar, and comprehensive damp-proofing — extending building life by 20+ years for properties around ${loc.landmarks[0] || loc.name}.`,

  'bathroom-renovation': (loc) =>
    `Bathroom renovation in ${loc.name} goes beyond aesthetics — it requires expert waterproofing, precise plumbing rerouting, and knowledge of local water pressure conditions in ${loc.district}. Our renovation specialists near ${loc.landmarks[0] || loc.name} handle complete bathroom overhauls including demolition of old fixtures, multi-layer waterproofing with a 5-year guarantee, modern sanitary ware installation, anti-skid tile flooring, concealed plumbing, and LED-integrated false ceilings.`,

  'tiles-work': (loc) =>
    `Professional tiles work in ${loc.name} requires laser-level precision and expertise with a wide range of materials — from imported Italian porcelain to local vitrified tiles. Our tiling specialists working near ${loc.landmarks[0] || loc.name} use diamond-cut tools for seamless joints, premium adhesives for long-lasting bonds, and colour-matched grout that stays clean for years. Whether it's a geometric pattern for a living room or anti-skid tiles for a bathroom in ${loc.district}, we deliver flawless installations.`,

  'kitchen-work': (loc) =>
    `Kitchen renovation in ${loc.name} combines functionality with modern design. Our teams near ${loc.landmarks[0] || loc.name} specialise in modular kitchen installation, granite/quartz countertop fitting, backsplash tile work, plumbing for sink and dishwasher connections, and chimney/hood installation. We consider the kitchen layout patterns popular in ${loc.district} homes and optimise for maximum storage and work triangle efficiency.`,

  'flooring-work': (loc) =>
    `Flooring installation in ${loc.name} demands expertise with the material you choose — whether it's Italian marble, Indian granite, vitrified tiles, wooden laminate, or epoxy coating. Our flooring specialists near ${loc.landmarks[0] || loc.name} begin with thorough sub-floor levelling, apply industrial-grade adhesives, and finish with diamond polishing for a mirror-smooth surface. In ${loc.district}, we've completed 100+ flooring projects across residential and commercial properties.`,

  'wall-work': (loc) =>
    `Wall treatments in ${loc.name} range from structural brick masonry to decorative stone cladding, textured paints, and dado tile installations. Our wall work specialists near ${loc.landmarks[0] || loc.name} understand the moisture conditions in ${loc.district} and apply damp-proof courses where needed. We also offer premium exterior wall finishes including weather-shield paints, exposed brick aesthetics, and natural stone veneer installations.`,

  'pop-work': (loc) =>
    `POP (Plaster of Paris) false ceiling and cornice work in ${loc.name} adds elegance and conceals wiring in one step. Our POP artisans near ${loc.landmarks[0] || loc.name} craft intricate designs — from simple cove ceilings with LED strips to elaborate multi-level designs with dome features. For homes in ${loc.district}, we use crack-resistant POP formulations and ensure smooth, paint-ready surfaces that last for years without maintenance.`,

  'plaster-work': (loc) =>
    `Professional plastering in ${loc.name} is the foundation of every great finish. Our plasterers near ${loc.landmarks[0] || loc.name} apply both internal gypsum plaster (for faster drying and smooth finish) and external cement-sand plaster (for weather resistance) with proper curing cycles. In ${loc.district}, where humidity and monsoon conditions vary, we adjust mix ratios and curing times to prevent cracking and ensure long-term adhesion.`,

  'painting': (loc) =>
    `Professional painting services in ${loc.name} cover both interior and exterior surfaces with premium brands like Asian Paints, Berger, and Nerolac. Our painters near ${loc.landmarks[0] || loc.name} begin with thorough surface preparation — filling cracks, applying putty, sanding smooth, and priming — before the first coat goes on. In ${loc.district}, we consider the local climate and humidity levels to select paint formulations that resist peeling, fading, and dampness for years.`,

  'waterproofing': (loc) =>
    `Waterproofing in ${loc.name} is critical for protecting your property against the ${loc.zone} monsoon and water seepage. Our waterproofing specialists near ${loc.landmarks[0] || loc.name} use multi-layer systems from Dr. Fixit, Fosroc, and Sika — including cementitious coating, liquid membrane application, and crystalline waterproofing. Whether it's a terrace, bathroom, basement, or water tank in ${loc.district}, we deliver a 5-year leak-proof guarantee backed by thorough post-application flood testing.`,
};

/* ── Generate unique paragraph based on location seed ──────── */
function generateLocalParagraph(loc: LocationData, svc: ServiceInfo): string {
  const generator = serviceDeepContent[svc.slug];
  if (generator) return generator(loc);

  // Fallback for any new services not yet in the map
  return `AMS Civil Construction brings specialised ${svc.title.toLowerCase()} expertise to ${loc.name}, ${loc.district}. Our experienced teams near ${loc.landmarks[0] || loc.name} understand the specific construction requirements of ${loc.zone} and deliver premium results with locally sourced materials and proven techniques.`;
}

/* ── Generate varied "why choose us" points per combo ─────── */
function generateWhyChooseUs(loc: LocationData, svc: ServiceInfo): { title: string; desc: string }[] {
  const zone = zoneContext[loc.zone] || 'a growing region with construction demand';
  const nearbyList = loc.nearby.slice(0, 3).join(', ');

  return [
    {
      title: `Local Expertise in ${loc.name}`,
      desc: `We've been serving ${loc.name} — ${zone} — for years. Our teams know the municipal regulations of ${loc.district} and deliver projects that sail through approvals.`,
    },
    {
      title: `${svc.title} Specialists`,
      desc: `Unlike general contractors, we have dedicated ${svc.title.toLowerCase()} specialists who focus exclusively on this craft. Every project near ${loc.landmarks[0] || loc.name} gets a senior supervisor.`,
    },
    {
      title: `Quick Response in ${loc.zone}`,
      desc: `With active teams across ${nearbyList}, and ${loc.name}, we respond within 24 hours for site visits. Emergency structural repairs get same-day attention.`,
    },
    {
      title: 'Transparent Pricing',
      desc: `Every ${svc.title.toLowerCase()} project in ${loc.name} gets an itemized quote before we start. No hidden charges, no surprise add-ons. What we quote is what you pay.`,
    },
  ];
}

/* ── Generate unique FAQs per combo (includes Hindi/Hinglish) ── */
function generateFAQs(loc: LocationData, svc: ServiceInfo): { q: string; a: string }[] {
  const base = [
    {
      q: `What is the cost of ${svc.title.toLowerCase()} in ${loc.name}?`,
      a: `The cost of ${svc.title.toLowerCase()} in ${loc.name} (${loc.district}) varies based on area size, material grade, and design complexity. Standard projects start at ₹150/sq.ft. and premium work goes up to ₹450+/sq.ft. We provide free site visits near ${loc.landmarks[0] || loc.name} for accurate estimates. Call +91 87793 91690 for a no-obligation quote.`,
    },
    {
      q: `How long does ${svc.title.toLowerCase()} take in ${loc.name}?`,
      a: `Project timelines for ${svc.title.toLowerCase()} in ${loc.name} depend on scope. A standard residential project takes 7–30 days, while larger works can take 2–6 months. We provide a detailed milestone schedule and our ${loc.zone} teams ensure on-time delivery with weekly progress updates.`,
    },
    {
      q: `Do you serve areas near ${loc.name} for ${svc.title.toLowerCase()}?`,
      a: `Yes! Besides ${loc.name}, our ${svc.title.toLowerCase()} teams actively serve ${loc.nearby.join(', ')}. We maintain dedicated crews across ${loc.district} so you get fast response and consistent quality regardless of the exact location.`,
    },
    {
      q: `Why is AMS the best ${svc.title.toLowerCase()} contractor in ${loc.name}?`,
      a: `AMS Civil Construction has 25+ years of construction expertise, 350+ completed projects, and a 4.9/5 client satisfaction rating. In ${loc.name}, we combine deep local knowledge of ${loc.district} building codes with premium materials and skilled craftsmen. Our ${loc.pincode ? `teams near PIN ${loc.pincode}` : `local teams`} are available for same-week site visits.`,
    },
    /* Hindi/Hinglish FAQs — matches real Indian search queries */
    {
      q: `${loc.name} mein ${svc.title.toLowerCase()} ka rate kya hai?`,
      a: `${loc.name} mein ${svc.title.toLowerCase()} ka rate project ke size aur material pe depend karta hai. Standard kaam ₹150/sq.ft. se shuru hota hai aur premium quality ka ₹450+/sq.ft. tak jata hai. Exact rate ke liye AMS Civil Construction ko call karein: +91 87793 91690. Hum ${loc.name} mein free site visit provide karte hain.`,
    },
    {
      q: `${loc.name} mein best ${svc.title.toLowerCase()} contractor kaun hai?`,
      a: `${loc.name} aur ${loc.district} mein AMS Civil Construction sabse trusted ${svc.title.toLowerCase()} contractor hai. 25+ saal ka experience, 350+ completed projects, aur 4.9/5 rating. Hum ${loc.nearby.slice(0, 3).join(', ')} mein bhi service dete hain. Abhi call karein: +91 87793 91690.`,
    },
    {
      q: `What warranty does AMS provide for ${svc.title.toLowerCase()} in ${loc.name}?`,
      a: `AMS Civil Construction provides a comprehensive 1-year workmanship warranty on all ${svc.title.toLowerCase()} projects in ${loc.name}. Waterproofing work comes with a 5-year guarantee. All materials used carry manufacturer warranties. We also offer post-completion support for any maintenance needs.`,
    },
  ];

  // Return 4 FAQs — vary selection based on location index for diversity
  const startIdx = loc.slug.charCodeAt(0) % 2;
  return [...base.slice(startIdx, startIdx + 3), base[4 + (loc.slug.charCodeAt(0) % 3)]];
}

export { generateLocalParagraph, generateWhyChooseUs, generateFAQs, zoneContext };
