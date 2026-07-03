const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const index = line.indexOf('=');
    if (index > 0) {
      const key = line.substring(0, index).trim();
      const value = line.substring(index + 1).trim();
      acc[key] = value;
    }
    return acc;
  }, {});

const uri = envConfig.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const imagesDir = path.resolve(__dirname, '../public/real-projects');
const imageFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
const imageUrls = imageFiles.map(f => `/real-projects/${f}`);

const projects = [
  {
    title: "Luxury Marble Staircase",
    slug: "luxury-marble-staircase",
    category: "Interior Design",
    location: "Bandra West",
    status: "completed",
    description: "Premium dark marble staircase with intricate veining, providing a grand entrance to this luxury villa.",
    images: imageUrls.slice(0, 2),
    completedDate: "2026-05-10",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Modern Kitchen Utility Area",
    slug: "modern-kitchen-utility",
    category: "Renovation",
    location: "Andheri East",
    status: "completed",
    description: "Clean, spacious utility area featuring granite countertops, marble-finish walls, and ample natural light.",
    images: imageUrls.slice(2, 4),
    completedDate: "2026-06-01",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Curved Wall Living Room",
    slug: "curved-wall-living-room",
    category: "Architecture",
    location: "Juhu",
    status: "ongoing",
    description: "Architectural masterpiece featuring a curved dividing wall, bespoke wooden shelving, and abstract marble flooring.",
    images: imageUrls.slice(4, 6),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Book-matched Accent Wall",
    slug: "book-matched-accent-wall",
    category: "Interior Design",
    location: "Powai",
    status: "completed",
    description: "Stunning dark marble accent wall book-matched to perfection, paired with an elegant glass and metal partition.",
    images: imageUrls.slice(6, 8),
    completedDate: "2026-06-15",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Night Terrace Landscaping",
    slug: "night-terrace-landscaping",
    category: "Exterior",
    location: "Worli",
    status: "completed",
    description: "Beautiful outdoor terrace at night with artificial grass, modern warm lighting, and contemporary planters.",
    images: imageUrls.slice(8, 10),
    completedDate: "2026-06-20",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const galleryItems = imageUrls.map((src, i) => ({
  src,
  title: `Project Highlight ${i + 1}`,
  category: i % 2 === 0 ? "Interior" : "Civil Work",
  createdAt: new Date()
}));

async function seedDB() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db('mandal_civil');
    
    console.log("Clearing old projects...");
    await db.collection('projects').deleteMany({});
    
    console.log("Inserting new real projects...");
    await db.collection('projects').insertMany(projects);
    
    console.log("Clearing old gallery...");
    await db.collection('gallery').deleteMany({});
    
    console.log("Inserting new gallery images...");
    await db.collection('gallery').insertMany(galleryItems);
    
    console.log("Real images seeded successfully!");
  } catch (error) {
    console.error("Error seeding DB:", error);
  } finally {
    await client.close();
  }
}

seedDB();
