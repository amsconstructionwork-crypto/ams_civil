const { google } = require('googleapis');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Google Indexing API setup
const keyPath = path.join(__dirname, 'service-account.json');
let authClient;

try {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  authClient = auth;
} catch (e) {
  console.error("Could not load service-account.json", e);
  process.exit(1);
}

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

async function submitUrls() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    
    const blogs = await db.collection('blogs').find({ published: true }).toArray();
    console.log(`Found ${blogs.length} published blogs to submit.`);

    const clientAuthed = await authClient.getClient();
    console.log("Successfully authenticated with Google API.");

    let successCount = 0;
    let failCount = 0;

    for (const blog of blogs) {
      const url = `https://www.amscivilwork.in/blog/${blog.slug}`;
      const options = {
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          url: url,
          type: 'URL_UPDATED'
        }
      };

      try {
        await clientAuthed.request(options);
        successCount++;
        process.stdout.write('.'); // Simple progress indicator
      } catch (err) {
        failCount++;
        if (err.response && err.response.status === 403) {
          console.log(`\n[ERROR 403] Permission Denied for ${url}.`);
          console.log(`\nCRITICAL FIX REQUIRED: You must add ${require(keyPath).client_email} as an "Owner" in Google Search Console!`);
          break;
        } else if (err.response && err.response.status === 429) {
           console.log(`\n[ERROR 429] Quota exceeded. Stopping for today.`);
           break;
        } else {
           console.log(`\n[ERROR] Failed to submit ${url}:`, err.message);
        }
      }
      
      await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(`\nSubmission complete: ${successCount} successful, ${failCount} failed.`);

  } catch (error) {
    console.error("Script error:", error);
  } finally {
    await client.close();
  }
}

submitUrls();
