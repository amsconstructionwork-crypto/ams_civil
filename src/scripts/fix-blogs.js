const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const envPath = path.join(__dirname, '../../.env.local');
const envStr = fs.readFileSync(envPath, 'utf8');
const match = envStr.match(/MONGODB_URI=(.+)/);
const uri = match ? match[1].trim() : null;

if (!uri) process.exit(1);

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogs = db.collection('blogs');

    const now = new Date();
    
    await blogs.updateOne(
      { slug: 'ceramic-vs-vitrified-tiles' },
      { $set: { 
          publishDate: now, 
          author: 'AMS Civil Team',
          excerpt: 'Confused between ceramic and vitrified tiles? Read our complete comparison guide to make the best choice for your home.'
        } 
      }
    );

    await blogs.updateOne(
      { slug: 'italian-marble-vs-indian-marble' },
      { $set: { 
          publishDate: now, 
          author: 'AMS Civil Team',
          excerpt: 'Discover the key differences between Italian and Indian marble, including cost, durability, and aesthetics for Indian homes.'
        } 
      }
    );

    console.log('Fixed blogs sorting fields');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
