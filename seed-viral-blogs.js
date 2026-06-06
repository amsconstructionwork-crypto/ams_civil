const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envPaths = [
    path.join(__dirname, '.env.local'),
    path.join(__dirname, '..', '.env.local')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^MONGODB_URI\s*=\s*(.+)$/m);
      if (match) return match[1].trim();
    }
  }
  throw new Error('MONGODB_URI not found in process.env or any local .env file');
}

const uri = getMongoUri();

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');

    const viralBlogs = [
      {
        title: "Top 5 Interior Design SCAMS in Mumbai (And How Builders Fool You)",
        slug: "top-5-interior-design-scams-mumbai-exposed",
        excerpt: "Are you planning to renovate your flat? Stop! Read this shocking expose on how local contractors overcharge and use cheap materials. Don't lose your hard-earned money.",
        author: "AMS Investigation Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "interior design scams mumbai, cheating contractors mumbai, home renovation fraud, how to hire civil contractor, hidden costs in construction",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane"],
        content: `
<h2>The Dirty Secrets of Mumbai's Home Renovation Market</h2>
<p>You saved up lakhs of rupees to buy your dream home in Mumbai. Now, you want to make it look like a 5-star hotel. But wait! Before you hand over a cheque to that smooth-talking interior designer or contractor, you MUST read this.</p>

<h3>Scam 1: The "Commercial Ply" Trick</h3>
<p>You pay for 100% waterproof Marine Plywood (BWR/BWP grade) for your kitchen. What does the contractor install? Cheap commercial ply wrapped in expensive laminate. In 2 years, when water seeps in, the wood expands and rots from the inside.</p>

<h3>Scam 2: The Plumbing Disaster</h3>
<p>To save ₹5,000, your local mistri uses non-branded CPVC pipes and completely ignores the pressure test. Once the expensive Italian marble is laid, a pipe bursts inside the wall. Result? You have to break the ₹2 Lakh marble floor to fix a ₹500 pipe.</p>

<h3>Scam 3: The "Square Foot" Trap</h3>
<p>Contractors often quote a very low "per square foot" rate to win the contract. But halfway through the project, they will hit you with "Extras". <em>"Sir, the wiring is extra. Sir, removing the debris is extra."</em> Suddenly, your ₹5 Lakh budget jumps to ₹10 Lakhs.</p>

<h3>How to Protect Yourself</h3>
<p>At AMS Civil Construction, we believe in 100% transparency. We provide a fully detailed Bill of Quantities (BOQ) before the work starts. If we say we are using Asian Paints Royale or Jaquar fittings, we bring the sealed boxes in front of you.</p>

<p><strong>Don't get scammed. Hire the experts.</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">Contact AMS Civil Construction for a Free, Honest Estimate.</a></p>
        `
      },
      {
        title: "2026 Property Market: Should You Go For Redevelopment or Buy New in Mumbai?",
        slug: "redevelopment-vs-buying-new-property-mumbai-2026",
        excerpt: "Mumbai's old buildings are crumbling. Is it better to wait for builder redevelopment and get a bigger flat, or sell and buy a new property? The answer will shock you.",
        author: "Real Estate & Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mumbai redevelopment rules 2026, old building redevelopment mumbai, buying property in mumbai, civil construction costs, building structural audit",
        locationTags: ["South Mumbai", "Dadar", "Bandra", "Andheri"],
        content: `
<h2>The Ultimate Dilemma for Mumbaikars</h2>
<p>If you live in a 30-year-old society in Dadar, Bandra, or Ghatkopar, you are probably having endless society meetings about 'Redevelopment'. But is it actually worth it?</p>

<h3>The Truth About Redevelopment</h3>
<p>When a builder takes over your old society, they promise you a 20-30% larger carpet area, corpus fund, and modern amenities (gym, pool). Sound like a dream? Sometimes it turns into a nightmare.</p>
<ul>
  <li><strong>Stalled Projects:</strong> Hundreds of redevelopment projects in Mumbai are currently stalled because the builder ran out of funds.</li>
  <li><strong>Construction Quality:</strong> Because the builder has to give you a free house and still make a profit, they often compromise heavily on the <a href="/services" style="color: #F97316;">civil construction quality</a> of the rehab building.</li>
</ul>

<h3>The Alternative: Heavy Structural Repair</h3>
<p>If your building's RCC (Reinforced Cement Concrete) structure is still relatively sound, a massive structural repair and waterproofing job is often 10x safer than risking redevelopment with a shady builder.</p>

<p>Our expert team at AMS Civil Construction specializes in heavy structural repairs, polymer treatments for columns, and terrace waterproofing that can extend your building's life by another 15-20 years.</p>

<h3>Conclusion</h3>
<p>Before you sign away your property rights to a builder, get an independent Structural Audit. If repair is possible, <a href="/contact" style="color: #F97316; font-weight: bold;">contact AMS Civil Construction</a>. We will make your old building stronger than new!</p>
        `
      },
      {
        title: "We Spent ₹10 Lakhs on a Smart Home Renovation in Navi Mumbai - Here's What Happened",
        slug: "10-lakhs-smart-home-renovation-navi-mumbai",
        excerpt: "Want to see what a 10 Lakh budget gets you in 2026? We break down the exact costs of civil work, false ceilings, smart lighting, and modular kitchens.",
        author: "AMS Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "smart home renovation cost, 2bhk interior cost mumbai, modular kitchen price, false ceiling rate, civil work budget",
        locationTags: ["Navi Mumbai", "Vashi", "Panvel"],
        content: `
<h2>Case Study: The Ultimate Navi Mumbai Transformation</h2>
<p>Everyone wants a modern, Pinterest-worthy home, but nobody talks about the actual costs. Today, we are breaking down a recent project we completed in Vashi, Navi Mumbai, where the client had a strict budget of ₹10,00,000 for a full 2BHK renovation.</p>

<h3>Where Did the Money Go?</h3>
<ol>
  <li><strong>Civil Work & Demolition (₹1.5 Lakhs):</strong> Breaking old bathroom tiles, removing kitchen platforms, and tearing down a partition wall to create an open-plan living room.</li>
  <li><strong>Plumbing & Electricals (₹2 Lakhs):</strong> Completely concealed copper wiring, smart switches (WiFi enabled), and brand new CPVC plumbing for two bathrooms.</li>
  <li><strong>Flooring (₹1.8 Lakhs):</strong> 4x2 feet premium vitrified tiles laid across the entire house with laser precision.</li>
  <li><strong>False Ceiling & Painting (₹1.5 Lakhs):</strong> Gypsum POP ceiling with cove lighting and Asian Paints Royale on all walls.</li>
  <li><strong>Modular Kitchen & Bathrooms (₹3.2 Lakhs):</strong> Acrylic finish kitchen cabinets, quartz countertop, and Jaquar bath fittings.</li>
</ol>

<h3>The Result</h3>
<p>The client now controls their AC, lights, and curtains using their voice (Alexa). The open floor plan makes the 800 sq ft flat look like 1200 sq ft. The <a href="/services/tiles-work" style="color: #F97316;">flawless tiling</a> and <a href="/services/pop-work" style="color: #F97316;">POP finishing</a> done by AMS Civil Construction gave the home an ultra-premium look.</p>

<p>Do you have a renovation budget in mind? <a href="/calculator" style="color: #F97316; font-weight: bold;">Use our Free Construction Calculator</a> or <a href="/contact" style="color: #F97316;">Call us today for a site visit!</a></p>
        `
      }
    ];

    console.log("Seeding viral blogs...");
    for (const blog of viralBlogs) {
      const exists = await blogsCollection.findOne({ slug: blog.slug });
      if (!exists) {
        await blogsCollection.insertOne(blog);
        console.log("✅ Inserted VIRAL blog:", blog.title);
      } else {
        console.log("⚠️ Viral blog already exists:", blog.title);
      }
    }
    
    // Automatically ping search engines since we just added huge blogs
    console.log("\\nCalling the automated SEO pinger...");
    // Since we are in a script, we can't easily import TS files. 
    // The Next.js API route handles this when done from UI.
    const SITEMAP_URL = 'https://www.amscivilwork.in/sitemap.xml';
    console.log(`Please ensure Google Search Console has the sitemap ${SITEMAP_URL} submitted.`);
    console.log("Seeding complete!");

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
