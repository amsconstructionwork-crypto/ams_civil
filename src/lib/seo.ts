export async function pingSearchEngines() {
  const SITEMAP_URL = 'https://www.amscivilwork.in/sitemap.xml';
  const urls = [
    `https://www.google.com/ping?sitemap=${SITEMAP_URL}`,
    `https://www.bing.com/ping?sitemap=${SITEMAP_URL}`,
  ];

  for (const url of urls) {
    try {
      await fetch(url, { method: 'GET' });
      console.log(`[SEO] Successfully pinged: ${url}`);
    } catch (error) {
      console.error(`[SEO] Failed to ping ${url}:`, error);
    }
  }
}
