const fs = require('fs');
const path = require('path');
const https = require('https');

// NOTE: To run this script, you must first install the googleapis package:
// npm install googleapis
//
// You also need a 'service-account.json' file in your project root directory.
// Follow the instructions in the response to download this key from Google Cloud Console.

const KEY_FILE = path.join(__dirname, '..', 'service-account.json');
const SITEMAP_URL = 'https://www.amscivilwork.in/sitemap.xml';

async function fetchSitemapUrls(sitemapUrl) {
  return new Promise((resolve, reject) => {
    https.get(sitemapUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const regex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ ERROR: 'service-account.json' key file not found at: ${KEY_FILE}`);
    console.error('Please create a Google Cloud Service Account, download the JSON key, rename it to "service-account.json", and place it in the root folder.');
    process.exit(1);
  }

  let googleapis;
  try {
    googleapis = require('googleapis');
  } catch (e) {
    console.error('❌ ERROR: "googleapis" package is not installed.');
    console.error('Please run the following command first:');
    console.error('👉 npm install googleapis');
    process.exit(1);
  }

  const { google } = googleapis;

  console.log('🔄 Fetching sitemap URLs from live website...');
  let urls = [];
  try {
    urls = await fetchSitemapUrls(SITEMAP_URL);
    console.log(`✅ Successfully loaded ${urls.length} URLs from sitemap.`);
  } catch (err) {
    console.error('❌ Failed to fetch sitemap:', err.message);
    process.exit(1);
  }

  // Google Indexing API has a default daily quota of 200 URLs.
  // We will submit up to the first 200 URLs in this run.
  const limit = Math.min(urls.length, 200);
  const targetUrls = urls.slice(0, limit);

  console.log(`🚀 Starting submission of ${targetUrls.length} URLs to Google Indexing API...\n`);

  // Load service account credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const authClient = await auth.getClient();
  const indexer = google.indexing({
    version: 'v3',
    auth: authClient,
  });

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < targetUrls.length; i++) {
    const url = targetUrls[i];
    try {
      const response = await indexer.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      successCount++;
      console.log(`[${i + 1}/${targetUrls.length}] ✅ Submitted: ${url}`);
    } catch (error) {
      failCount++;
      console.error(`[${i + 1}/${targetUrls.length}] ❌ Failed: ${url} - Error: ${error.message}`);
      if (error.message.includes('quota')) {
        console.warn('\n⚠️ QUOTA EXCEEDED: You have hit the daily Google Indexing API limit (usually 200 requests/day).');
        break;
      }
    }
    // Subtle delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log('\n====================================');
  console.log(`🎉 Submission summary:`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('====================================');
}

run().catch(console.error);
