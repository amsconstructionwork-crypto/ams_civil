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

async function updatePenthouse() {
  console.log("Updating Luxury 4BHK Penthouse Renovation image...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const projects = db.collection('projects');

    await projects.updateOne(
      { slug: "luxury-4bhk-penthouse-renovation-bandra" },
      { $set: { images: ["/real-projects/Luxury 4BHK Penthouse Renovation.png"] } }
    );
    
    console.log("✅ Successfully updated the Penthouse project with the new image!");
  } catch (error) {
    console.error("Error updating project:", error);
  } finally {
    await client.close();
  }
}

updatePenthouse();
