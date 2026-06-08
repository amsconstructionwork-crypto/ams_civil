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

async function checkJune8BlogsDates() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    
    const recentBlogs = await db.collection('blogs').find({
      slug: { $regex: /5-years-ago/i }
    }).toArray();
    
    recentBlogs.forEach(b => {
      console.log(`Slug: ${b.slug}`);
      console.log(`- publishDate: ${b.publishDate} (Type: ${typeof b.publishDate})`);
      console.log(`- createdAt: ${b.createdAt}`);
      console.log(`- published: ${b.published}`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

checkJune8BlogsDates();
