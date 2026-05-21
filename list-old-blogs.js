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

    const blogs = await blogsCollection.find({}, { projection: { slug: 1, title: 1, content: 1 } }).toArray();
    console.log(JSON.stringify(blogs.map(b => ({ slug: b.slug, title: b.title, len: b.content?.length || 0 })), null, 2));

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
