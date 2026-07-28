const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const envPath = path.join(__dirname, '../../.env.local');
const envStr = fs.readFileSync(envPath, 'utf8');
const match = envStr.match(/MONGODB_URI=(.+)/);
const uri = match ? match[1].trim() : null;

if (!uri) {
  console.error('MONGODB_URI not found');
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogs = await db.collection('blogs').find({}, { projection: { title: 1, slug: 1 } }).toArray();
    console.log(JSON.stringify(blogs, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
