const https = require('https');

const SITE_URL = 'https://www.amscivilwork.in';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const searchEngines = [
  { name: 'Google', url: `https://www.google.com/ping?sitemap=${SITEMAP_URL}` },
  { name: 'Bing', url: `https://www.bing.com/ping?sitemap=${SITEMAP_URL}` },
];

console.log(`Starting sitemap ping for: ${SITEMAP_URL}\n`);

searchEngines.forEach((engine) => {
  https.get(engine.url, (res) => {
    if (res.statusCode === 200) {
      console.log(`✅ Successfully pinged ${engine.name} to index the website!`);
    } else {
      console.log(`❌ Failed to ping ${engine.name}. Status code: ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(`❌ Error pinging ${engine.name}: ${e.message}`);
  });
});
