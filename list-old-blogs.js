const { MongoClient } = require('mongodb');

const uri = "REDACTED_MONGODB_URI";

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
