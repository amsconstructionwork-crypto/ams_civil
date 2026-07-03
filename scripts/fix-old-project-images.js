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

async function fixOldProjects() {
  console.log("Connecting to MongoDB to fix old project images...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const projects = db.collection('projects');

    // Assigning some real watermarked images to the old text-based projects
    
    await projects.updateOne(
      { slug: "luxury-4bhk-penthouse-renovation-bandra" },
      { $set: { images: ["/real-projects/IMG-20260515-WA0075.jpg", "/real-projects/IMG-20260515-WA0077.jpg"] } }
    );
    
    await projects.updateOne(
      { slug: "commercial-office-setup-bkc" },
      { $set: { images: ["/real-projects/IMG-20260611-WA0007.jpg", "/real-projects/IMG-20260611-WA0011.jpg"] } }
    );
    
    await projects.updateOne(
      { slug: "bungalow-structural-expansion-juhu" },
      { $set: { images: ["/real-projects/IMG-20260615-WA0003.jpg", "/real-projects/IMG-20260615-WA0007.jpg"] } }
    );
    
    await projects.updateOne(
      { slug: "premium-3bhk-smart-home-andheri" },
      { $set: { images: ["/real-projects/IMG-20260615-WA0015.jpg", "/real-projects/IMG-20260615-WA0016.jpg"] } }
    );
    
    await projects.updateOne(
      { slug: "society-heavy-structural-repair-thane" },
      { $set: { images: ["/real-projects/IMG-20260622-WA0007.jpg", "/real-projects/IMG-20260622-WA0010.jpg"] } }
    );

    console.log("Successfully added real photos to old projects!");
  } catch (error) {
    console.error("Error updating old projects:", error);
  } finally {
    await client.close();
  }
}

fixOldProjects();
