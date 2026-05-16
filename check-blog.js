const { MongoClient } = require('mongodb');

const uri = "REDACTED_MONGODB_URI";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');

    const blog = await blogsCollection.findOne({ slug: "bungalow-construction-cost-in-mumbai-2026-a-complete-guide" });
    console.log(blog.content);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
