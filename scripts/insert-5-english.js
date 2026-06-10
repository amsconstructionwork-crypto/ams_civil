/**
 * insert-5-english.js
 * 5 Massive High-SEO Blogs in English (Scheduled for upcoming days)
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

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

const uri = getMongoUri();
const SITE = 'https://www.amscivilwork.in';

const blogs = [
  // English 1
  {
    title: "Top 20 Modular Wardrobe Designs 2026: Cost, Materials & Space Saving Ideas",
    slug: "top-modular-wardrobe-designs-cost-materials-guide",
    excerpt: "Upgrade your bedroom storage! Explore the 20 best modular wardrobe designs for 2026, including sliding doors, walk-in closets, acrylic finishes, and pricing estimates.",
    seoKeywords: "modular wardrobe cost india, sliding wardrobe design, bedroom cupboard ideas, acrylic wardrobe price, walk in closet design, space saving wardrobe, best wardrobe materials",
    author: "AMS Interior Team",
    locationTags: ["Global", "India", "Mumbai", "Pune"],
    published: true,
    publishDate: new Date("2026-06-13T00:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
<h2>The Ultimate Modular Wardrobe Guide 2026 👗👔</h2>
<p>A bedroom is incomplete without a functional and stunning wardrobe. In 2026, bulky wooden cupboards have been entirely replaced by sleek, ceiling-high <strong>Modular Wardrobes</strong>. They save space, look luxurious, and are highly customizable. Whether you have a compact 1BHK in Mumbai or a spacious villa, a well-designed wardrobe can double your storage capacity.</p>
<p>At <a href="${SITE}">AMS Civil Construction</a>, we design and build premium modular wardrobes. In this 2000-word guide, we explore the best designs, materials, and exact costs.</p>

<h2>1. Sliding vs. Openable (Hinged) Wardrobes</h2>
<h3>Sliding Door Wardrobes</h3>
<p>Sliding wardrobes are the standard in 2026 for apartments where space is limited. Since the doors slide sideways on tracks, you don't need empty space in front of the wardrobe to open it.</p>
<ul>
<li><strong>Pros:</strong> Highly space-saving. Can be made massive (up to 8-10 feet wide). Looks very sleek with floor-to-ceiling mirrors or lacquered glass.</li>
<li><strong>Cons:</strong> You can only access one side of the wardrobe at a time. The channels (Hettich/Hafele) are expensive and require occasional maintenance.</li>
</ul>

<h3>Hinged (Openable) Door Wardrobes</h3>
<p>These are traditional wardrobes where doors open outwards at a 90-degree angle. They are perfect for larger bedrooms.</p>
<ul>
<li><strong>Pros:</strong> You can open all doors simultaneously to see your entire collection. You can hang accessories (belts, ties, mirrors) on the inside of the doors.</li>
<li><strong>Cons:</strong> Requires at least 2 to 3 feet of empty space in front to open comfortably.</li>
</ul>

<h2>2. Best Materials for Modular Wardrobes</h2>
<p>Just like modular kitchens, wardrobes consist of a core structure (the box) and the external finish (the shutter).</p>
<h3>Core Material:</h3>
<p>Always use <strong>BWR (Boiling Water Resistant) or MR (Moisture Resistant) Plywood</strong>. MDF or Particle Board might be cheaper, but they bend over time and their hinges become loose very quickly.</p>
<h3>External Finishes:</h3>
<ul>
<li><strong>Laminate:</strong> The most practical and durable. Costs ₹1,200 - ₹2,000 per sq.ft. Scratch-resistant and available in thousands of matte and gloss colors.</li>
<li><strong>Acrylic:</strong> Highly reflective and luxurious. Gives a mirror-like finish but gets scratched easily. Costs ₹1,800 - ₹3,000 per sq.ft.</li>
<li><strong>Lacquered Glass (Toughened):</strong> The most premium look in 2026. Colored glass is pasted onto an aluminum profile. It reflects light, making the room look double its size.</li>
</ul>

<h2>3. Internal Accessories That Change The Game</h2>
<p>A modular wardrobe is defined by its smart interiors. A simple rod and shelf won't cut it anymore.</p>
<ul>
<li><strong>Pull-out Hanger Systems:</strong> For very tall wardrobes, a hydraulic rod pulls down to eye level so you can easily hang your clothes.</li>
<li><strong>Trouser Pull-outs:</strong> Separate racks that slide out to keep 10-15 trousers perfectly ironed without wrinkling.</li>
<li><strong>Jewelry Organizers:</strong> Velvet-lined shallow drawers divided into small compartments for watches, rings, and ties.</li>
<li><strong>Sensor Profile Lighting:</strong> LED strips inside the wardrobe that automatically turn on when you open the door!</li>
</ul>

<h2>4. Cost Estimate in India (2026)</h2>
<p>Wardrobe costs are calculated per square foot (Height × Width).</p>
<ul>
<li><strong>Standard Laminate (Hinged):</strong> ₹1,200 to ₹1,500 per sq.ft. (E.g., A 7x6 ft wardrobe costs approx. ₹50,000 to ₹65,000).</li>
<li><strong>Premium Sliding with Glass/Acrylic:</strong> ₹1,800 to ₹2,500 per sq.ft.</li>
<li><strong>Walk-in Closet (Luxury):</strong> Starts from ₹3,000+ per sq.ft.</li>
</ul>

<h2>Conclusion</h2>
<p>Investing in a custom modular wardrobe solves your storage nightmares forever. Avoid ready-made MDF cupboards that rot during the monsoons. <a href="${SITE}/contact">Contact AMS Civil Construction</a> today to get a 3D wardrobe design tailored perfectly to your bedroom layout!</p>
    `
  },
  // English 2
  {
    title: "A Homeowner's Guide to Civil Engineering: Reading Floor Plans and Structures",
    slug: "homeowner-civil-engineering-floor-plans-structure",
    excerpt: "Learn how to read architectural floor plans, understand RCC structures, and identify load-bearing walls before starting your home renovation.",
    seoKeywords: "read architectural floor plans, what is RCC structure, load bearing wall vs partition, civil engineering basics for homeowners, home construction guide india, civil contractor tips",
    author: "AMS Tech Team",
    locationTags: ["Global", "India"],
    published: true,
    publishDate: new Date("2026-06-14T00:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
<h2>Be the Boss of Your Own Construction Project 🏗️📐</h2>
<p>When renovating or building a house, most homeowners leave everything to the contractor. While hiring a reliable agency like <a href="${SITE}">AMS Civil Construction</a> is the best route, having a basic understanding of civil engineering ensures nobody can cheat you with substandard materials or dangerous structural changes.</p>
<p>In this guide, we simplify complex civil engineering terms so you can confidently supervise your own project.</p>

<h2>1. How to Read a Floor Plan (Blueprint)</h2>
<p>A floor plan is a top-down, 2D view of your house. It shows where the walls, doors, windows, and fixtures will be placed. Here is how to decode it:</p>
<ul>
<li><strong>Thick Solid Lines:</strong> These indicate exterior walls or load-bearing walls. They are usually 9-inch thick brick walls.</li>
<li><strong>Thin Solid Lines:</strong> These are interior partition walls. They are usually 4-inch or 4.5-inch thick half-brick walls.</li>
<li><strong>Arcs / Quarter Circles:</strong> These represent doors. The arc shows the direction the door swings. If it swings out into the hallway, you need to ask the architect to change it so it swings into the room.</li>
<li><strong>Double Lines on a Wall:</strong> This indicates a window.</li>
<li><strong>Dotted Lines:</strong> These indicate something above you, like a false ceiling boundary or an overhead beam.</li>
</ul>

<h2>2. Understanding the RCC Structure (Skeleton of the House)</h2>
<p>RCC stands for <strong>Reinforced Cement Concrete</strong>. It is the combination of concrete (Cement, Sand, Gravel) and steel bars (TMT bars). Concrete is great at handling compression (weight pushing down), but very weak against tension (bending). Steel is highly tensile. Together, they make buildings earthquake-resistant.</p>
<h3>Key Components:</h3>
<ul>
<li><strong>Footing/Foundation:</strong> The feet of the building buried deep in the soil.</li>
<li><strong>Columns:</strong> The vertical pillars that carry the load of the building down to the foundation. <strong>NEVER cut or drill heavily into a column during interior renovation!</strong></li>
<li><strong>Beams:</strong> The horizontal members connecting the columns. They carry the load of the slab and walls above them.</li>
<li><strong>Slab (Lenter):</strong> The roof/floor.</li>
</ul>

<h2>3. Load-Bearing Walls vs. RCC Framed Structures</h2>
<p>It is critical to know what type of building you live in before breaking any walls.</p>
<ul>
<li><strong>Load-Bearing Structure:</strong> Mostly used in old houses or 1-2 story village homes. The walls themselves carry the weight of the roof. There are no columns. If you break a wall, the roof collapses.</li>
<li><strong>RCC Framed Structure:</strong> 99% of modern apartments are built this way. The entire weight is carried by the Columns and Beams. The brick walls are merely "partitions" to divide rooms. You can safely remove these partition walls to combine rooms (after society permission and engineer check).</li>
</ul>

<h2>4. The Importance of Curing (Watering the Concrete)</h2>
<p>Homeowners often complain about cracks in newly plastered walls. This happens because the contractor rushed the "curing" process. Cement needs water for 14 to 28 days to complete a chemical reaction called 'hydration'. If it dries out too fast under the sun, it shrinks and cracks. Always ensure your walls and roof are kept wet continuously using jute bags (gunny bags) or ponding.</p>

<h2>Conclusion</h2>
<p>A little knowledge goes a long way in ensuring your home is built to last 100 years safely. If you want a highly professional team that follows exact IS (Indian Standard) engineering codes, <a href="${SITE}/contact">reach out to AMS Civil Construction</a>. We build with transparency, strength, and precision.</p>
    `
  },
  // English 3
  {
    title: "Latest Bathroom Fitting Trends 2026: Luxury Designs & Renovation Guide",
    slug: "bathroom-fitting-trends-renovation-guide-2026",
    excerpt: "Upgrade to a 5-star hotel-like bathroom! Explore the latest 2026 trends including concealed flush tanks, thermostatic showers, large format tiles, and smart toilets.",
    seoKeywords: "bathroom fitting trends 2026, luxury bathroom renovation, concealed flush tank, thermostatic shower, bathroom remodeling cost india, wall hung toilet, jaquar fittings price",
    author: "AMS Interior Team",
    locationTags: ["Global", "India", "Mumbai"],
    published: true,
    publishDate: new Date("2026-06-15T00:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
<h2>Turn Your Bathroom into a Spa Experience 🛁🚿</h2>
<p>Bathrooms are no longer just functional spaces; they are personal sanctuaries for relaxation. In 2026, bathroom design is all about minimalism, high technology, and easy maintenance. If you are renovating your home in Mumbai or anywhere in India, upgrading your bathroom should be your top priority.</p>
<p>At <a href="${SITE}">AMS Civil Construction</a>, we specialize in high-end bathroom remodeling. Let's look at the top fitting trends that are dominating 2026.</p>

<h2>1. Concealed Flush Tanks & Wall-Hung Toilets</h2>
<p>The bulky, noisy floor-mounted toilets are completely outdated. In 2026, <strong>Wall-Hung WCs with Concealed Cisterns</strong> (flush tanks hidden inside the wall) are the standard.</p>
<ul>
<li><strong>Benefits:</strong> Since the toilet is mounted on the wall, cleaning the floor underneath is incredibly easy. It saves up to 6 inches of space, making small bathrooms feel much larger.</li>
<li><strong>Top Brands:</strong> Grohe, Geberit, and Jaquar make the best concealed tanks that never leak.</li>
</ul>

<h2>2. Thermostatic Shower Systems (Rain Showers)</h2>
<p>Taking a shower is now a luxury experience. Thermostatic shower mixers allow you to set the exact temperature of the water (e.g., 38°C). The system automatically mixes hot and cold water to maintain that exact temperature, even if someone else turns on a tap in the house and the pressure drops!</p>
<p>Combine this with a massive 12-inch or 16-inch Ceiling-Mounted Rain Shower, and you have a 5-star hotel experience at home.</p>

<h2>3. Large Format Bathroom Tiles (Seamless Look)</h2>
<p>Gone are the days of small 1x1 ft tiles with hundreds of dirty grout lines. The 2026 trend is <strong>Large Format Slabs</strong> (2x4 ft or even 4x8 ft) for bathroom walls.</p>
<ul>
<li><strong>Design Trend:</strong> Statuario (White marble with grey veins) or Armani Brown.</li>
<li><strong>Benefit:</strong> Fewer joints mean less dirt and fungus buildup, making the bathroom extremely easy to clean and visually massive.</li>
</ul>

<h2>4. Smart Toilets & Sensor Taps</h2>
<p>Hygiene is paramount. Sensor-operated washbasin taps (which turn on automatically when you put your hands under them) save massive amounts of water. Smart toilets featuring heated seats, automatic lid opening, and integrated bidet washing features (like Japanese Toto toilets) are highly popular in luxury renovations.</p>

<h2>5. Niche Shelves (Built-in Storage)</h2>
<p>Instead of drilling ugly steel racks into the wall to hold your shampoo bottles, modern bathrooms feature a <strong>"Niche"</strong>. A niche is a recessed box built directly into the shower wall during the civil construction phase. It is tiled seamlessly and fitted with a hidden LED profile light, giving a super-premium look.</p>

<h2>Cost of Luxury Bathroom Renovation (India 2026)</h2>
<ul>
<li><strong>Standard Modern Bathroom:</strong> ₹1.2 Lakhs to ₹1.8 Lakhs (Includes Jaquar fittings, anti-skid tiles, new plumbing, and waterproofing).</li>
<li><strong>Luxury Spa Bathroom:</strong> ₹2.5 Lakhs to ₹5 Lakhs+ (Includes Grohe/Kohler thermostatic showers, Italian marble finish PGVT, smart toilet, and glass shower enclosures).</li>
</ul>

<h2>Conclusion</h2>
<p>Bathroom renovation requires extremely precise plumbing, laser-leveled tiling, and hardcore 100% waterproofing. A small mistake here will ruin your entire house with seepage. <a href="${SITE}/contact">Trust AMS Civil Construction</a> to build you a leak-proof, stunning luxury bathroom with a 10-year warranty!</p>
    `
  },
  // English 4
  {
    title: "Balcony Garden Setup & Civil Work: Waterproofing and Tile Selection",
    slug: "balcony-garden-civil-work-waterproofing-tiles",
    excerpt: "Turn your balcony into a lush green garden safely. Learn about the civil work required, terrace waterproofing, artificial grass installation, and anti-skid wooden tiles.",
    seoKeywords: "balcony garden setup india, terrace waterproofing for garden, artificial grass installation, wooden finish tiles for balcony, apartment balcony design, civil work for garden",
    author: "AMS Tech Team",
    locationTags: ["Global", "India", "Mumbai", "Pune"],
    published: true,
    publishDate: new Date("2026-06-16T00:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
<h2>Bring Nature into Your Apartment 🌿🌇</h2>
<p>Living in a concrete jungle like Mumbai or Delhi makes you crave a touch of nature. Converting your apartment balcony or open terrace into a beautiful garden is the perfect solution. However, placing dozens of heavy, wet plant pots directly on your balcony floor is a recipe for disaster. It causes immense structural damage and severe water seepage into the flat below.</p>
<p>At <a href="${SITE}">AMS Civil Construction</a>, we specialize in safe terrace garden setups. In this guide, we detail the civil preparation needed to build a balcony garden that lasts a lifetime.</p>

<h2>1. Waterproofing: The Non-Negotiable Step 💧</h2>
<p>Before you place a single plant on your balcony, the floor MUST be chemically waterproofed. Watering plants daily means your balcony floor will be constantly wet.</p>
<ul>
<li><strong>How it's done:</strong> The original tiles must be removed. A polymer-modified cementitious waterproof coating (like Dr. Fixit Pidifin 2K) is applied directly onto the concrete slab. It must be applied up to 1 foot high on the surrounding walls as well to prevent side-seepage.</li>
<li><strong>The Test:</strong> After waterproofing, the balcony is filled with water for 48 hours to check for any leaks. Only after this test passes should new tiles be laid.</li>
</ul>

<h2>2. Proper Slopes and Drainage (Crucial!)</h2>
<p>Water must never stagnate in a garden. The contractor must ensure an aggressive slope (gradient) towards the drain pipe. A larger diameter PVC drain pipe (at least 3 to 4 inches) should be installed, fitted with a grating that stops mud and dry leaves from choking the plumbing system.</p>

<h2>3. Selecting the Best Balcony Tiles</h2>
<p>You cannot use highly polished, glossy tiles on a balcony; they become dangerously slippery when wet.</p>
<ul>
<li><strong>Wooden Finish Ceramic/Vitrified Tiles:</strong> These are the #1 choice in 2026. They look exactly like real wooden deck planks but do not rot, warp, or get eaten by termites. They feature a heavily textured, anti-skid surface.</li>
<li><strong>Natural Stone (Kota or Slate):</strong> Highly durable and provides a beautiful rustic, earthy vibe that complements green plants perfectly.</li>
</ul>

<h2>4. Artificial Grass (Turf) Installation 🍃</h2>
<p>If you want a lush green floor without the mess of real mud, High-Density Artificial Grass is excellent. Ensure you buy grass with a pile height of at least 35mm to 40mm for a soft, realistic feel. Good quality artificial grass comes with small drainage holes at the bottom so water passes right through to the tiles beneath.</p>

<h2>5. Vertical Gardens & Lighting 💡</h2>
<p>If your balcony is small, use the walls! Vertical green walls (using real creepers or UV-resistant artificial foliage panels) save floor space.</p>
<p><strong>Lighting:</strong> Do not use normal indoor lights. Since the balcony faces rain, you must install <strong>IP65-rated waterproof outdoor lights</strong>. Warm-white (3000K) focus lights hidden behind the plant pots create a stunning, dramatic silhouette effect at night.</p>

<h2>Conclusion</h2>
<p>A balcony garden requires professional civil and plumbing preparation to ensure it doesn't damage the building structure. If you want to transform your barren balcony into a gorgeous, leak-proof outdoor retreat, <a href="${SITE}/contact">contact AMS Civil Construction</a> today for a site evaluation!</p>
    `
  },
  // English 5
  {
    title: "How to Soundproof Your Home in Mumbai: Windows, Walls & Civil Solutions",
    slug: "soundproof-home-mumbai-windows-walls-doors",
    excerpt: "Tired of traffic noise? Discover the most effective civil engineering and interior solutions to completely soundproof your apartment in India, from UPVC windows to acoustic panels.",
    seoKeywords: "soundproof room india, upvc double glazed windows, reduce traffic noise home, acoustic panels cost, soundproof doors, civil contractor mumbai, noise reduction interior",
    author: "AMS Tech Team",
    locationTags: ["India", "Mumbai", "Delhi", "Bangalore"],
    published: true,
    publishDate: new Date("2026-06-17T00:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
<h2>Silence the Chaos: Soundproofing Your Apartment 🔇🏙️</h2>
<p>Living in metropolitan cities like Mumbai, Delhi, or Bangalore comes with a massive downside: <strong>Constant Noise Pollution.</strong> Honking cars, ongoing metro construction, and loud neighbors can severely affect your sleep and mental health. Normal brick walls and sliding glass windows do very little to stop low-frequency noise.</p>
<p>As experts in premium civil construction, <a href="${SITE}">AMS Civil Construction</a> frequently receives requests to create pin-drop silent bedrooms and home theaters. Here is our comprehensive guide to scientifically soundproofing your home in 2026.</p>

<h2>1. The Biggest Culprit: Windows (Fix This First!)</h2>
<p>Sound travels through air. If air can enter your room, sound will enter. Standard aluminum sliding windows have huge gaps between the tracks, making them useless against traffic noise.</p>
<h3>The Solution: UPVC Double Glazed Windows</h3>
<ul>
<li><strong>UPVC Profile:</strong> Unplasticized Polyvinyl Chloride (UPVC) window frames are extremely thick and feature rubber gaskets that seal airtight when closed.</li>
<li><strong>Double Glazing (DGU):</strong> Instead of one glass pane, DGU uses two panes of glass (e.g., 6mm and 8mm thick) with a vacuum or Argon gas trapped between them. Sound waves lose their energy trying to pass through the gas layer.</li>
<li><strong>Result:</strong> Installing high-quality UPVC DGU windows (from Fenesta or Lingel) instantly blocks 70% to 80% of outside street noise.</li>
</ul>

<h2>2. Soundproofing the Doors 🚪</h2>
<p>If you live in an apartment and hear the elevator ding or neighbors talking in the corridor, your main door is the problem. A hollow flush door offers zero acoustic insulation.</p>
<ul>
<li><strong>Solid Wood Doors:</strong> Replace hollow doors with heavy, solid teak or engineered wood doors. Mass blocks sound.</li>
<li><strong>Acoustic Door Seals:</strong> Install rubber weather-stripping seals all around the door frame. Attach an "Automatic Door Bottom Sweep" that drops down and seals the gap between the door and the floor when closed.</li>
</ul>

<h2>3. Soundproofing the Walls (Acoustic Insulation) 🧱</h2>
<p>If you share a common wall with a noisy neighbor or an elevator shaft, you need structural soundproofing.</p>
<ul>
<li><strong>Acoustic Drywall System:</strong> We construct an independent metal frame 2 inches away from your existing wall. Inside the gap, we stuff high-density <strong>Rockwool or Glasswool</strong> insulation pads. Finally, we cover it with two layers of Gypsum board. This traps and absorbs the sound vibration entirely.</li>
<li><strong>Acoustic Foam Panels:</strong> While they don't block noise from entering, placing aesthetic acoustic wooden slats or foam panels inside the room stops echoes, making the room feel dead-silent (perfect for home offices or home theaters).</li>
</ul>

<h2>4. Ceiling and Floor Soundproofing</h2>
<p>Are the footsteps of the kids in the flat above you driving you crazy?</p>
<ul>
<li><strong>False Ceiling Insulation:</strong> A standard POP ceiling won't help. We insert thick Rockwool acoustic slabs in the gap between your concrete roof and the Gypsum false ceiling to absorb impact noise from above.</li>
<li><strong>Flooring:</strong> To prevent your noise from traveling down, lay thick rugs or wall-to-wall carpets. If renovating, installing a rubber acoustic underlay beneath wooden laminate flooring works wonders.</li>
</ul>

<h2>Conclusion</h2>
<p>Soundproofing is a precise science. Buying cheap foam online won't stop traffic noise. You need heavy mass and airtight seals. If you are fed up with city noise and want to transform your bedroom into a silent sanctuary, <a href="${SITE}/contact">contact AMS Civil Construction</a>. Our acoustic engineering team will execute the perfect soundproofing upgrade for your home!</p>
    `
  }
];

async function insertBlogs() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    for (const blog of blogs) {
      const existing = await collection.findOne({ slug: blog.slug });
      if (existing) {
        console.log(`⏭️  Already exists: ${blog.slug}`);
        continue;
      }
      await collection.insertOne(blog);
      console.log(`✅ Inserted: ${blog.title.substring(0, 60)}...`);
    }

    console.log(`\n🎉 Done! ${blogs.length} English blogs processed.`);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
  }
}

insertBlogs();
