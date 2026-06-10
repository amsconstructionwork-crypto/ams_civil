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
  throw new Error('MONGODB_URI not found');
}

async function fixDates() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    // Update all future blogs to the current date so they become visible
    const result = await collection.updateMany(
      { publishDate: { $gt: new Date() } },
      { $set: { publishDate: new Date() } }
    );

    console.log(`Updated ${result.modifiedCount} blogs to be visible immediately.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

fixDates();
