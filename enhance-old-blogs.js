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

const mySlugs = [
  "mumbai-mein-ghar-banane-ka-kharcha-2026",
  "bathroom-renovation-cost-mumbai-tiles",
  "waterproofing-solutions-mumbai-monsoon",
  "ultimate-guide-bungalow-construction-mumbai",
  "bathroom-renovation-ideas-small-apartments",
  "checklist-hiring-civil-contractor-mumbai",
  "vitrified-vs-ceramic-tiles-comparison",
  "terrace-waterproofing-guide-leakage-prevention",
  "modular-vs-carpenter-made-kitchen-comparison",
  "importance-of-quality-plaster-work-walls",
  "pop-false-ceiling-designs-cost-guide",
  "building-approvals-permissions-guide-mumbai",
  "italian-vs-indian-marble-flooring-guide",
  "why-civil-work-critical-home-interior-design",
  "safe-legal-structural-alterations-mumbai",
  "cost-to-paint-2bhk-flat-mumbai",
  "benefits-turnkey-construction-services",
  "soundproofing-home-materials-civil-work",
  "common-plumbing-mistakes-during-renovation",
  "role-curing-concrete-strength-water",
  "best-materials-boundary-walls-compound-construction",
  "eco-friendly-construction-practices-mumbai",
  "maximizing-natural-light-structural-changes"
];

const linkDictionary = [
  { regex: /bungalow construction/gi, link: '/services/bungalow-construction', text: 'Bungalow Construction' },
  { regex: /bathroom renovation/gi, link: '/services/bathroom-renovation', text: 'Bathroom Renovation' },
  { regex: /waterproofing/gi, link: '/services/waterproofing', text: 'Waterproofing' },
  { regex: /tiles|flooring/gi, link: '/services/tiles-work', text: 'Tiles & Flooring' },
  { regex: /painting|asian paints/gi, link: '/services/painting', text: 'Painting Work' },
  { regex: /false ceiling|pop/gi, link: '/services/pop-work', text: 'POP & False Ceiling' },
  { regex: /plaster|brickwork/gi, link: '/services/plaster-work', text: 'Plaster & Brickwork' },
  { regex: /kitchen/gi, link: '/services/kitchen-work', text: 'Kitchen Work' }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');

    const oldBlogs = await blogsCollection.find({ slug: { $nin: mySlugs } }).toArray();
    console.log(`Found ${oldBlogs.length} old blogs to enhance.`);

    let count = 0;
    for (const blog of oldBlogs) {
      if (blog.enhanced) continue; // skip if already enhanced

      let content = blog.content;

      // 1. Inject internal links into existing text intelligently
      for (const item of linkDictionary) {
        // Only replace the FIRST occurrence to avoid spamming the same link
        let replaced = false;
        content = content.replace(item.regex, (match) => {
          if (!replaced && !match.includes('<a')) {
            replaced = true;
            return `<a href="${item.link}" style="color: #F97316; font-weight: bold; text-decoration: underline;" title="${item.text} in Mumbai">${match}</a>`;
          }
          return match;
        });
      }

      // 2. Build the SEO Enhancer Section
      const deepDiveContent = `
<br/><hr style="border-color: #1E2D45; margin: 30px 0;" />
<h2>Deep Dive: Why Quality Execution Matters in Mumbai</h2>
<p>In a coastal city like Mumbai, the high humidity, heavy monsoon rains, and saline air create a highly corrosive environment for buildings. Whether you are executing minor repairs or a full-scale <a href="/services/bungalow-construction" style="color: #F97316; font-weight: bold; text-decoration: underline;">turnkey construction</a>, the quality of civil execution dictates the lifespan of your property.</p>

<h3>The AMS Civil Advantage: Core Methodologies</h3>
<ul>
  <li><strong>Advanced Structural Integrity:</strong> We utilize high-grade TMT steel bars (Fe500D) and premium M20/M25 concrete grades to ensure our RCC structures can withstand seismic activities and coastal weather.</li>
  <li><strong>Multi-Layer Moisture Protection:</strong> A single layer of <a href="/services/waterproofing" style="color: #F97316; font-weight: bold; text-decoration: underline;">waterproofing</a> is never enough. We implement a multi-barrier approach using crystalline waterproofing chemicals, polymer coatings, and protective screeds, ensuring zero dampness.</li>
  <li><strong>Laser-Precision Tiling:</strong> Uneven floors lead to water pooling and grout damage. Our master craftsmen use laser levels for <a href="/services/tiles-work" style="color: #F97316; font-weight: bold; text-decoration: underline;">tiles and marble installation</a>, guaranteeing perfect slopes and zero-lip joints.</li>
  <li><strong>Acoustic & Thermal Insulation:</strong> Using aerated concrete blocks (AAC) and specialized <a href="/services/plaster-work" style="color: #F97316; font-weight: bold; text-decoration: underline;">plastering techniques</a>, we drastically reduce outside noise and heat transfer, lowering your cooling costs.</li>
</ul>

<h3>Checklist for a Successful Renovation</h3>
<p>Before you begin your next project, ensure you have ticked these boxes:</p>
<ol>
  <li><strong>Verified Approvals:</strong> Ensure you have the necessary NOCs from your housing society or the local municipal corporation (BMC/TMC).</li>
  <li><strong>Material Transparency:</strong> Demand a clear Bill of Quantities (BOQ) that specifies the brands of cement, steel, pipes, and wires being used.</li>
  <li><strong>Dedicated Supervision:</strong> Ensure your <a href="/services" style="color: #F97316; font-weight: bold; text-decoration: underline;">civil contractor</a> provides daily site supervision to prevent sub-standard workmanship.</li>
</ol>

<div style="background: rgba(249, 115, 22, 0.05); padding: 20px; border-left: 4px solid #F97316; margin-top: 30px; border-radius: 4px;">
  <h3 style="margin-top: 0; color: #fff;">Explore Our Service Locations</h3>
  <p style="margin-bottom: 0;">AMS Civil Construction proudly serves clients across the Mumbai Metropolitan Region. Check out our dedicated local service pages for tailored solutions: 
    <a href="/areas/navi-mumbai" style="color: #F97316; text-decoration: underline;">Navi Mumbai</a>, 
    <a href="/areas/thane" style="color: #F97316; text-decoration: underline;">Thane</a>, 
    <a href="/areas/south-mumbai" style="color: #F97316; text-decoration: underline;">South Mumbai</a>, and the 
    <a href="/areas" style="color: #F97316; text-decoration: underline;">Western Suburbs</a>.
  </p>
</div>

<p style="font-weight: bold; font-size: 1.1em; text-align: center; margin-top: 30px;">
  Ready to start your project? <a href="/contact" style="color: #F97316; text-decoration: underline; font-size: 1.2em;">Contact AMS Civil Construction for a Free Estimate Today!</a>
</p>
      `;

      // 3. Append the new massive section
      const finalContent = content + deepDiveContent;

      // 4. Update the DB with enhanced content, fresh publish date for indexing, and new seoKeywords
      await blogsCollection.updateOne(
        { _id: blog._id },
        { 
          $set: { 
            content: finalContent,
            enhanced: true,
            updatedAt: new Date(),
            // Push it to the top so Google indexes it fresh
            publishDate: new Date(),
            seoKeywords: (blog.seoKeywords || "") + ", best civil contractor in mumbai, turnkey construction company, home renovation expert"
          } 
        }
      );
      count++;
      console.log(`Enhanced blog: ${blog.title}`);
    }

    console.log(`Successfully enhanced ${count} old blogs with deep-dive content and internal links.`);

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
