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

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');

    const oldBlogs = await blogsCollection.find({ slug: { $nin: mySlugs } }).toArray();
    console.log(JSON.stringify(oldBlogs.map(b => b.slug), null, 2));

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
