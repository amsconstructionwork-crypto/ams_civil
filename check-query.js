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

async function checkQuery() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    
    const countTotal = await db.collection('blogs').countDocuments();
    console.log('Total blogs:', countTotal);

    const matchQuery = { 
      published: true, 
      $or: [
        { publishDate: { $lte: new Date() } },
        { publishDate: { $exists: false } }
      ]
    };
    const countMatch = await db.collection('blogs').countDocuments(matchQuery);
    console.log('Matching frontend query:', countMatch);

    // Let's see how many blogs have published = true
    const countPub = await db.collection('blogs').countDocuments({ published: true });
    console.log('Published = true:', countPub);

    // Let's print some slugs of the matched ones
    const matchedDocs = await db.collection('blogs').find(matchQuery).limit(10).toArray();
    console.log('Sample matched slugs:', matchedDocs.map(d => d.slug).join(', '));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

checkQuery();
