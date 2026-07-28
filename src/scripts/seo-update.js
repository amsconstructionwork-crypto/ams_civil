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
    const blogs = db.collection('blogs');

    // 1. Title updates
    await blogs.updateOne(
      { slug: 'bathroom-renovation-cost-mumbai' },
      { $set: { title: 'Bathroom Renovation Cost in Mumbai | Price Factors & Guide' } }
    );

    await blogs.updateOne(
      { slug: 'smart-home-automation-wiring-cost-mumbai' },
      { $set: { title: 'Smart Home Wiring Renovation Ideas & Costs | Upgrade Your Home' } }
    );

    // Fetch current blogs to append content properly
    const brBlog = await blogs.findOne({ slug: 'bathroom-renovation-cost-mumbai' });
    if (brBlog) {
      const brCostTable = `\n\n## Bathroom Renovation Cost Factors\nWhile exact fixed prices are impossible without a site visit, here are the main factors that influence the cost across Mumbai, Pune, and Thane:\n\n| Cost Factor | Description | Impact on Price |\n|-------------|-------------|-----------------|\n| **Tiles** | Ceramic vs Vitrified vs Imported | High |\n| **Plumbing** | CPVC vs UPVC, concealed vs open | Medium |\n| **Fittings** | Jaquar vs Kohler vs Local | High |\n| **Waterproofing** | Basic chemical vs Epoxy | Critical |\n\n*City Note:* Material transport costs may vary slightly between Mumbai, Pune, and Thane depending on the exact location of the site.`;
      await blogs.updateOne({ slug: 'bathroom-renovation-cost-mumbai' }, { $set: { content: brBlog.content + brCostTable } });
    }

    const paintsBlog = await blogs.findOne({ slug: 'asian-paints-vs-jotun-vs-dulux-india' });
    if (paintsBlog) {
      const paintExpansion = `\n\n## Frequently Asked Questions & Comparison\n\n### Which paint is best for exterior walls?\nJotun and Asian Paints both offer premium exterior options, but Jotun is often preferred for extreme weather resistance.\n\n### Comparison Table\n| Feature | Asian Paints | Jotun |\n|---------|--------------|-------|\n| Variety | High | Medium |\n| Price | Budget to Premium | Premium |\n| Finish | Excellent | Exceptional |`;
      await blogs.updateOne({ slug: 'asian-paints-vs-jotun-vs-dulux-india' }, { $set: { content: paintsBlog.content + paintExpansion } });
    }

    const leakBlog = await blogs.findOne({ slug: 'upper-floor-flat-leakage-rules' });
    if (leakBlog) {
      const linkStr = `\n\nIf you are dealing with a severe leakage issue, you might want to learn more about [bathroom leakage from upper floor](/blog/stop-wall-dampness-peeling-paint-permanently).`;
      await blogs.updateOne({ slug: 'upper-floor-flat-leakage-rules' }, { $set: { content: leakBlog.content + linkStr } });
    }

    // 3. New Content Creation (Group C)
    const ceramicBlog = {
      title: 'Ceramic vs Vitrified Tiles: What is the Difference?',
      slug: 'ceramic-vs-vitrified-tiles',
      category: 'Materials',
      published: true,
      createdAt: new Date(),
      content: `# Ceramic vs Vitrified Tiles\n\nChoosing the right flooring is a critical decision. What is the difference between ceramic and vitrified tiles?\n\n## Comparison Table\n| Feature | Ceramic Tiles | Vitrified Tiles |\n|---------|--------------|-----------------|\n| Porosity | High | Low |\n| Durability | Moderate | Very High |\n| Cost | Budget-friendly | Premium |\n| Usage | Walls, low-traffic floors | High-traffic floors |\n\n## FAQ\n\n**Which is better for living rooms?**\nVitrified tiles are recommended due to their high durability and premium glossy finish.\n\nContact us for the best flooring installation.`
    };
    await blogs.updateOne({ slug: ceramicBlog.slug }, { $set: ceramicBlog }, { upsert: true });

    const marbleBlog = {
      title: 'Italian Marble vs Indian Marble: Complete Guide',
      slug: 'italian-marble-vs-indian-marble',
      category: 'Materials',
      published: true,
      createdAt: new Date(),
      content: `# Italian Marble vs Indian Marble\n\nWhat is Italian marble? It is a highly lustrous, premium stone sourced from Italy, whereas Indian marble is known for its incredible strength and durability.\n\n## Comparison Table\n| Feature | Italian Marble | Indian Marble |\n|---------|----------------|---------------|\n| Luster | High (Crystal clear) | Medium |\n| Strength | Softer, prone to scratches | Hard and durable |\n| Cost | Very High | Moderate to High |\n| Colors | White, Beige, Light hues | Green, White, Pink, Black |\n\n## FAQ\n\n**Which is better for Indian homes?**\nIndian marble is preferred for high-traffic areas, while Italian marble is used for luxury aesthetic spaces like the living room.`
    };
    await blogs.updateOne({ slug: marbleBlog.slug }, { $set: marbleBlog }, { upsert: true });

    console.log('SEO updates completed successfully');

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
