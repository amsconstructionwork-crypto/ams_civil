const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const envPath = path.join(__dirname, '../../.env.local');
const envStr = fs.readFileSync(envPath, 'utf8');
const match = envStr.match(/MONGODB_URI=(.+)/);
const uri = match ? match[1].trim() : null;

if (!uri) {
  process.exit(1);
}
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogs = db.collection('blogs');

    const bmcBlog = await blogs.findOne({ slug: 'bmc-rules-society-permissions' });
    if (bmcBlog && !bmcBlog.content.includes('bathroom leakage from upper floor')) {
      const linkStr = `\n\nIf you're dealing with neighborhood issues regarding leaks, read our guide on [bathroom leakage from upper floor](/blog/stop-wall-dampness-peeling-paint-permanently).`;
      await blogs.updateOne({ slug: 'bmc-rules-society-permissions' }, { $set: { content: bmcBlog.content + linkStr } });
    }

    const aacBlog = await blogs.findOne({ slug: 'eco-friendly-building-materials-future' });
    if (aacBlog && !aacBlog.content.includes('AAC Bricks deep dive')) {
      const aacStr = `\n\n## AAC Bricks deep dive\nAutoclaved Aerated Concrete (AAC) bricks are revolutionizing the Indian construction industry. They are lightweight, highly insulating, and environmentally friendly, reducing dead weight on the building structure.`;
      await blogs.updateOne({ slug: 'eco-friendly-building-materials-future' }, { $set: { content: aacBlog.content + aacStr } });
    }

    console.log('Final SEO updates completed');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
