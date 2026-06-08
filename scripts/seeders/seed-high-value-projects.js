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
    const projectsCollection = db.collection('projects');

    const highValueProjects = [
      {
        title: "Luxury 4BHK Penthouse Renovation (₹65 Lakhs)",
        slug: "luxury-4bhk-penthouse-renovation-bandra",
        category: "Complete Renovation",
        location: "Bandra West, Mumbai",
        status: "completed",
        description: "A complete structural overhaul and ultra-luxury interior finishing for a 2,500 sq ft penthouse overlooking the Arabian Sea. The project included breaking down non-load-bearing walls for an open floor plan, importing Italian marble flooring, and installing smart-home automation. Advanced chemical waterproofing was done on the private terrace to prevent monsoon leakages. Completed in 4.5 months.",
        images: ["/images/projects/p1.jpg", "/images/projects/p2.jpg"],
        completedDate: "Jan 2026",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Commercial Office Civil Setup (₹42 Lakhs)",
        slug: "commercial-office-setup-bkc",
        category: "Commercial Civil Work",
        location: "BKC, Mumbai",
        status: "completed",
        description: "Transforming a raw 3,000 sq ft commercial gala into a premium corporate office. AMS Civil Construction handled the entire heavy civil work, including constructing soundproof partition walls, a central HVAC ducting framework, and heavy-duty vitrified tile flooring. Project was delivered 2 weeks ahead of schedule.",
        images: ["/images/projects/p3.jpg"],
        completedDate: "Oct 2025",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Bungalow Structural Expansion & Repair (₹55 Lakhs)",
        slug: "bungalow-structural-expansion-juhu",
        category: "Structural Repairs",
        location: "Juhu, Mumbai",
        status: "ongoing",
        description: "A highly complex engineering project involving the structural retrofitting and expansion of a 30-year-old heritage bungalow. Our team used micro-concrete and polymer-modified mortar to strengthen the existing RCC columns, adding a completely new floor on top without compromising the foundation's load-bearing capacity.",
        images: [],
        completedDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Premium 3BHK Smart Home Upgrade (₹38 Lakhs)",
        slug: "premium-3bhk-smart-home-andheri",
        category: "Interior Civil Work",
        location: "Andheri West, Lokhandwala",
        status: "completed",
        description: "Total dismantling of existing flooring and bathrooms. We implemented end-to-end concealed CPVC plumbing, massive electrical rewiring for home automation, and POP false ceiling with cove lighting. The kitchen was redesigned with a modern island counter, utilizing high-grade quartz and marine ply.",
        images: [],
        completedDate: "Mar 2026",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Society Heavy Structural Repair & Waterproofing (₹85 Lakhs)",
        slug: "society-heavy-structural-repair-thane",
        category: "Waterproofing & Repair",
        location: "Majiwada, Thane",
        status: "ongoing",
        description: "A large-scale society contract involving the repair of exposed reinforced steel, anti-corrosive treatment, external crack filling, and 100% terrace waterproofing for a 7-story residential building. This extensive civil maintenance will extend the building's lifespan by at least 15 years.",
        images: [],
        completedDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    console.log("Seeding high-value project portfolios...");
    for (const project of highValueProjects) {
      const exists = await projectsCollection.findOne({ slug: project.slug });
      if (!exists) {
        await projectsCollection.insertOne(project);
        console.log("✅ Inserted High-Value Project:", project.title);
      } else {
        console.log("⚠️ Project already exists:", project.title);
      }
    }
    console.log("Project seeding complete!");

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
