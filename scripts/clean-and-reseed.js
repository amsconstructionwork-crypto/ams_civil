const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envPaths = [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '.env.local')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^MONGODB_URI\s*=\s*(.+)$/m);
      if (match) return match[1].trim();
    }
  }
  throw new Error('MONGODB_URI not found');
}

const filesToClean = [
  path.join(__dirname, '..', 'seed-blogs.js'),
  path.join(__dirname, '..', 'seed-blogs-part1.js'),
  path.join(__dirname, '..', 'seed-blogs-part2.js'),
  path.join(__dirname, '..', 'seed-blogs-part3.js'),
  path.join(__dirname, '..', 'seed-blogs-part4.js'),
  path.join(__dirname, 'insert-premium-seo-blogs.js'),
  path.join(__dirname, 'insert-location-blogs.js'),
  path.join(__dirname, 'insert-marathi-seo-blogs.js')
];

async function run() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');
    
    const allSlugs = [];
    
    for (const file of filesToClean) {
      if (!fs.existsSync(file)) {
        console.warn(`File not found: ${file}`);
        continue;
      }
      const content = fs.readFileSync(file, 'utf8');
      const regex = /slug:\s*["']([^"']+)["']/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        allSlugs.push(match[1]);
      }
    }
    
    const uniqueSlugs = [...new Set(allSlugs)];
    console.log(`Found ${uniqueSlugs.length} unique slugs to clean from the database.`);
    
    // Delete existing blogs with these slugs to allow clean reseeding
    const deleteResult = await blogsCollection.deleteMany({ slug: { $in: uniqueSlugs } });
    console.log(`Deleted ${deleteResult.deletedCount} potentially corrupted seeded blogs.`);
    
    // Now execute all the seed scripts to populate fresh, uncorrupted blogs!
    for (const file of filesToClean) {
      if (!fs.existsSync(file)) continue;
      console.log(`Running seed script: ${path.basename(file)}...`);
      try {
        const output = execSync(`node "${file}"`, { cwd: path.dirname(file), stdio: 'inherit' });
      } catch (err) {
        console.error(`Error running ${path.basename(file)}:`, err.message);
      }
    }
    
    console.log('\n🎉 Clean reseeding completed successfully!');
    
  } catch (e) {
    console.error('Error during clean and reseed:', e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
