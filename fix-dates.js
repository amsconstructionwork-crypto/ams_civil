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
    
    // Find all blogs that don't have a publishDate or where it's null/undefined
    const blogsWithoutDate = await db.collection('blogs').find({
      $or: [
        { publishDate: { $exists: false } },
        { publishDate: null }
      ]
    }).toArray();
    
    console.log(`Found ${blogsWithoutDate.length} blogs missing publishDate.`);
    
    let updatedCount = 0;
    for (const blog of blogsWithoutDate) {
      if (blog.createdAt) {
        await db.collection('blogs').updateOne(
          { _id: blog._id },
          { $set: { publishDate: blog.createdAt } }
        );
        updatedCount++;
      }
    }
    
    console.log(`Successfully updated ${updatedCount} blogs to have publishDate = createdAt.`);
    
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

fixDates();
