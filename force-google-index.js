const { google } = require('googleapis');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// 1. Get MongoDB URI
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

// 2. Setup Google Auth
const keyPath = path.join(__dirname, 'service-account.json');
if (!fs.existsSync(keyPath)) {
  console.error("❌ service-account.json not found! Cannot force indexing.");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({
  version: 'v3',
  auth: auth,
});

async function forceIndexUrls() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    
    // Fetch all published blogs
    const blogs = await db.collection('blogs').find({ published: true }).toArray();
    
    if (blogs.length === 0) {
      console.log("No blogs found to index.");
      return;
    }

    console.log(`Found ${blogs.length} blogs. Pushing to Google Indexing API...`);

    let successCount = 0;
    
    for (const blog of blogs) {
      const url = `https://www.amscivilwork.in/blog/${blog.slug}`;
      
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        
        console.log(`✅ Pushed to Google: ${url}`);
        successCount++;
        
        // Slight delay to avoid hitting rate limits too quickly
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.error(`❌ Failed to push ${url}:`, err.message);
      }
    }
    
    // Push the main pages too
    const mainUrls = [
      'https://www.amscivilwork.in/',
      'https://www.amscivilwork.in/free-consultation',
      'https://www.amscivilwork.in/blog',
    ];

    for (const url of mainUrls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: { url: url, type: 'URL_UPDATED' },
        });
        console.log(`✅ Pushed to Google: ${url}`);
      } catch (err) {}
    }

    console.log(`\n🎉 Google Indexing API execution complete! Force-indexed ${successCount} URLs.`);
    console.log("Google will now crawl these pages within a few hours instead of weeks.");

  } catch (error) {
    console.error('Error during indexing:', error);
  } finally {
    await client.close();
  }
}

forceIndexUrls();
