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
  throw new Error('MONGODB_URI not found in process.env or any local .env file');
}

const uri = getMongoUri();

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const blogsCollection = db.collection('blogs');

    const blogs = [
      {
        title: "Why Civil Work is the Most Critical Aspect of Home Interior Design",
        slug: "why-civil-work-critical-home-interior-design",
        excerpt: "Interior design isn't just about beautiful furniture; it starts with solid civil work. Learn why wall alterations, plumbing, and tiling form the foundation of luxury interiors.",
        author: "Interior Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "interior civil contractor, civil work in interior design, home renovation experts, tiling, wall demolition",
        content: `
<h2>The Unseen Foundation of Luxury Interiors</h2>
<p>When most people think of interior design, they visualize plush sofas, elegant curtains, and beautiful woodwork. However, the true success of any high-end interior project rests entirely on the <a href="/services" style="color: #F97316; text-decoration: underline;">civil work</a> executed before the carpenter even steps into the house.</p>

<h3>What is Interior Civil Work?</h3>
<p>It encompasses structural changes, breaking and rebuilding walls, <a href="/services/bathroom-renovation" style="color: #F97316; text-decoration: underline;">bathroom plumbing</a>, electrical concealed wiring, leveling the floor for <a href="/services/tiles-work" style="color: #F97316; text-decoration: underline;">tiling</a>, and applying base coats of plaster and putty.</p>

<h3>Why it Matters</h3>
<ul>
  <li><strong>Alignment:</strong> If your walls are not perfectly plastered at a 90-degree angle, your expensive modular wardrobes will not fit flush against the wall, leaving ugly gaps.</li>
  <li><strong>Waterproofing:</strong> A leaking bathroom wall will destroy the expensive wooden paneling in the adjacent bedroom within months. Proper civil-stage waterproofing prevents this.</li>
  <li><strong>Floor Leveling:</strong> Uneven floors lead to doors scraping the ground and pooling water in wet areas.</li>
</ul>

<p>Do not compromise on the foundation of your interiors. Hire the <a href="/contact" style="color: #F97316; text-decoration: underline;">expert civil team at AMS Civil Construction</a> to ensure a flawless canvas for your interior designer.</p>
        `
      },
      {
        title: "A Guide to Safe and Legal Structural Alterations in Mumbai Flats",
        slug: "safe-legal-structural-alterations-mumbai",
        excerpt: "Want to merge two rooms or break a wall? Understand the difference between load-bearing columns and partition walls to ensure your building remains safe.",
        author: "Structural Engineer",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "structural alterations mumbai, breaking walls in flat, civil repair work, RCC column, load bearing wall",
        content: `
<h2>Renovating Safely: What You Can and Cannot Break</h2>
<p>Open floor plans are incredibly popular in modern Mumbai apartments. Achieving this often requires tearing down internal walls. While our <a href="/services/wall-work" style="color: #F97316; text-decoration: underline;">civil demolition teams</a> can break a wall in hours, doing it safely requires careful structural planning.</p>

<h3>Load-Bearing vs. Non-Load-Bearing</h3>
<p>In most modern RCC (Reinforced Cement Concrete) buildings, the weight of the building is carried entirely by the columns (vertical pillars) and beams (horizontal slabs). The brick walls between them are simply "filler" or partition walls. Breaking a 4-inch or 6-inch brick wall is generally safe.</p>
<p>However, <strong>never tamper with an RCC column or beam.</strong> Even drilling large holes into them for AC pipes can compromise the structural integrity of the entire high-rise.</p>

<h3>Legal Clearances</h3>
<p>In Mumbai, under the BMC regulations, minor internal alterations that do not affect the RCC structure do not require heavy paperwork, but you must still inform your housing society and get a basic clearance. Moving wet areas (like expanding a bathroom into a dry balcony) requires careful planning to ensure new plumbing doesn't leak into the neighbor's flat below.</p>

<p>Always hire an experienced <a href="/services" style="color: #F97316; text-decoration: underline;">civil contractor</a> who understands structural blueprints. <a href="/contact" style="color: #F97316; text-decoration: underline;">Consult AMS Civil Construction today.</a></p>
        `
      },
      {
        title: "How Much Does It Cost to Paint a 2BHK Flat in Mumbai?",
        slug: "cost-to-paint-2bhk-flat-mumbai",
        excerpt: "Budgeting for a fresh coat of paint? Learn about the costs of tractor emulsion, royale luxury paint, putty preparation, and labor charges in Mumbai.",
        author: "Interior Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "painting cost mumbai, house painting contractor, wall putty, interior painting rate, asian paints royale",
        content: `
<h2>The Cost of Refreshing Your Home</h2>
<p>A fresh coat of paint is the most cost-effective way to completely transform the vibe of your home. But how much should you budget for painting a standard 600-800 sq. ft. 2BHK in Mumbai?</p>

<h3>Step 1: Surface Preparation (The Civil Work)</h3>
<p>If your walls have dampness or peeling, painting directly over them is a waste of money. You first need <a href="/services/plaster-work" style="color: #F97316; text-decoration: underline;">plaster repair and waterproofing</a>. Once fixed, 2 coats of wall putty and 1 coat of primer are applied to create a glass-smooth surface. <strong>Cost of Putty + Primer: ₹15 to ₹25 per sq. ft.</strong></p>

<h3>Step 2: Choosing the Paint</h3>
<ul>
  <li><strong>Distemper / Tractor Emulsion:</strong> Best for rental properties. Highly affordable but not washable. <em>Cost (Material + Labor): ₹12 - ₹18 per sq. ft.</em></li>
  <li><strong>Premium Washable Emulsion (e.g., Apcolite):</strong> Great for average homes. Easy to wipe off minor stains. <em>Cost: ₹20 - ₹28 per sq. ft.</em></li>
  <li><strong>Luxury Paint (e.g., Royale, Velvet Touch):</strong> Gives a rich, soft-sheen finish and is highly durable. <em>Cost: ₹35 - ₹55 per sq. ft.</em></li>
</ul>

<h3>Total Estimate</h3>
<p>For a standard 2BHK, the total surface area to be painted (walls + ceiling) is roughly 3 times the carpet area. So, for a 700 sq. ft. flat, the paint area is ~2100 sq. ft. A good quality washable paint job will cost around ₹45,000 to ₹60,000.</p>

<p>For a flawless finish, trust the experts who handle everything from <a href="/services/pop-work" style="color: #F97316; text-decoration: underline;">POP false ceilings</a> to the final coat of paint. <a href="/contact" style="color: #F97316; text-decoration: underline;">Contact AMS Civil Construction.</a></p>
        `
      },
      {
        title: "The Benefits of Turnkey Construction Services for Busy Professionals",
        slug: "benefits-turnkey-construction-services",
        excerpt: "Don't have time to manage 10 different vendors? Discover why hiring a turnkey civil contractor is the smartest choice for your peace of mind.",
        author: "AMS Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "turnkey construction company, turnkey civil contractor, bungalow builders, house construction hassle free",
        content: `
<h2>What is Turnkey Construction?</h2>
<p>Building a home or executing a massive renovation involves coordinating with an architect, an RCC contractor, a plumber, an electrician, a <a href="/services/tiles-work" style="color: #F97316; text-decoration: underline;">tiles mistri</a>, and a painter. If you are a busy professional, doing this yourself is a recipe for extreme stress. This is where <strong>Turnkey Contracting</strong> comes in.</p>

<h3>The Benefits of a Single Point of Contact</h3>
<ul>
  <li><strong>Zero Coordination Headaches:</strong> With a turnkey company like AMS Civil Construction, you only deal with one project manager. We handle the 15 different teams required to build your <a href="/services/bungalow-construction" style="color: #F97316; text-decoration: underline;">dream bungalow</a>.</li>
  <li><strong>Fixed Timelines:</strong> When one vendor delays (e.g., the plumber is late), it delays the tile mason, pushing the project back by weeks. Turnkey contractors have in-house teams, ensuring synchronized, on-time delivery.</li>
  <li><strong>Cost Transparency:</strong> You agree on a final budget beforehand. There are no sudden surprises or blame games between the plumber and the mason regarding who broke the material.</li>
</ul>

<h3>Quality Assurance</h3>
<p>Since the turnkey contractor is responsible for the final outcome, they ensure that the base <a href="/services/plaster-work" style="color: #F97316; text-decoration: underline;">civil and plaster work</a> is flawless, as it directly impacts their own finishing teams.</p>

<p>Save your time, money, and sanity. <a href="/contact" style="color: #F97316; text-decoration: underline;">Book a free consultation with AMS Civil Construction today.</a></p>
        `
      },
      {
        title: "Soundproofing Your Home: Materials, Civil Work, and Costs",
        slug: "soundproofing-home-materials-civil-work",
        excerpt: "Tired of Mumbai's traffic noise? Learn how specialized windows, acoustic plaster, and double-wall civil construction can give you a pin-drop silent home.",
        author: "Acoustic & Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "soundproofing home mumbai, acoustic plaster, UPVC windows, civil contractor sound insulation, reduce traffic noise",
        content: `
<h2>Creating an Oasis of Calm in Mumbai</h2>
<p>Mumbai is the city that never sleeps, and sadly, neither do its horns. If you live near a busy road or railway track, soundproofing is an essential upgrade during your <a href="/services" style="color: #F97316; text-decoration: underline;">home renovation</a>.</p>

<h3>1. Upgrade Your Windows</h3>
<p>Traditional sliding aluminum windows leak sound like a sieve. Upgrade to heavy-duty UPVC or thermally broken aluminum frames with <strong>Double Glazed Units (DGU)</strong>. These windows have two panes of glass with an inert gas or vacuum between them, cutting noise by up to 70%.</p>

<h3>2. Acoustic Wall Treatments</h3>
<p>If the noise is coming from a shared wall with a noisy neighbor, your civil contractor can build a "room within a room". This involves erecting a secondary drywall structure filled with high-density acoustic rockwool, completely decoupled from the main wall.</p>

<h3>3. False Ceilings for Impact Noise</h3>
<p>If you hear footsteps or dragging furniture from the flat above, a <a href="/services/pop-work" style="color: #F97316; text-decoration: underline;">gypsum or POP false ceiling</a> combined with acoustic insulation can severely dampen impact vibrations.</p>

<h3>4. Solid Doors</h3>
<p>Hollow core doors do nothing to block sound. Replace them with solid wood or acoustically rated doors equipped with bottom drop-down seals.</p>

<p>Ready for a quieter life? Our <a href="/areas" style="color: #F97316; text-decoration: underline;">expert civil teams across Mumbai</a> can integrate these solutions seamlessly into your home. <a href="/contact" style="color: #F97316; text-decoration: underline;">Contact us today.</a></p>
        `
      },
      {
        title: "Common Plumbing Mistakes During Renovation and How to Avoid Them",
        slug: "common-plumbing-mistakes-during-renovation",
        excerpt: "A leaking pipe can destroy your luxury interiors. Read about the biggest plumbing blunders made during bathroom and kitchen renovations and how to avoid them.",
        author: "Plumbing Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "plumbing mistakes renovation, bathroom plumbing mumbai, CPVC pipes, concealed plumbing, civil contractor",
        content: `
<h2>Don't Let Plumbing Ruin Your Interiors</h2>
<p>During a <a href="/services/bathroom-renovation" style="color: #F97316; text-decoration: underline;">bathroom renovation</a>, homeowners often obsess over the choice of tiles and fixtures while completely ignoring the concealed plumbing. This is a fatal error.</p>

<h3>Mistake 1: Using the Wrong Pipes</h3>
<p>Never use standard PVC pipes for hot water lines; they will melt and burst under pressure. Always use <strong>CPVC (Chlorinated Polyvinyl Chloride)</strong> for hot water and UPVC for cold water. In premium projects, composite PEX pipes are becoming the gold standard.</p>

<h3>Mistake 2: Poor Sloping for Drainage</h3>
<p>If your bathroom floor doesn't slope perfectly towards the drain, water will pool, leading to mold and eventual seepage. This requires a highly skilled <a href="/services/tiles-work" style="color: #F97316; text-decoration: underline;">mason</a> who understands how to lay tiles with a laser-precise gradient.</p>

<h3>Mistake 3: Skipping the Pressure Test</h3>
<p>Before closing the walls with <a href="/services/plaster-work" style="color: #F97316; text-decoration: underline;">plaster</a> and tiles, the entire plumbing system MUST be pressure-tested using a hydrostatic pump. This identifies any minor leaks in the joints while they are still exposed.</p>

<h3>Mistake 4: Not Installing a P-Trap</h3>
<p>If your bathroom smells like a sewer, the plumber likely missed installing a proper P-Trap or U-Trap under the floor drain, which uses a water seal to block foul gases from coming back up the pipe.</p>

<p>At AMS Civil Construction, our plumbing work is executed by certified experts and rigorously tested before tiling begins. <a href="/contact" style="color: #F97316; text-decoration: underline;">Hire the best for your home.</a></p>
        `
      },
      {
        title: "The Role of Curing in Concrete Strength: Why Water is Essential",
        slug: "role-curing-concrete-strength-water",
        excerpt: "Why do masons spray water on newly built walls for days? Discover the science of concrete curing and why it is the secret to a crack-free building.",
        author: "Structural Engineer",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "concrete curing process, watering plaster, civil construction quality, brickwork strength, building contractor",
        content: `
<h2>The Secret to Unbreakable Walls</h2>
<p>If you've ever walked past a <a href="/services/bungalow-construction" style="color: #F97316; text-decoration: underline;">bungalow construction</a> site, you've likely seen workers spraying water on newly built brick walls and concrete slabs. This process is called <strong>Curing</strong>, and it is the single most important factor in construction strength.</p>

<h3>The Science of Hydration</h3>
<p>Cement does not dry; it cures. When water is mixed with cement, a chemical reaction called 'hydration' begins, forming the strong crystals that bind sand and stones together. This reaction needs continuous moisture to complete. If the water evaporates too quickly due to the sun, the hydration stops, and the concrete becomes weak and brittle.</p>

<h3>How Long Should You Cure?</h3>
<ul>
  <li><strong>RCC Slabs & Columns:</strong> Minimum 14 to 21 days. Often, contractors build small mud borders on the roof and fill them with water (ponding) to ensure continuous moisture.</li>
  <li><strong>Brickwork & Masonry:</strong> 7 to 10 days of regular water spraying.</li>
  <li><strong><a href="/services/plaster-work" style="color: #F97316; text-decoration: underline;">Plaster Work</a>:</strong> At least 7 days to prevent hairline shrinkage cracks.</li>
</ul>

<h3>The AMS Quality Promise</h3>
<p>Many amateur contractors rush the job and skip curing to save time. At AMS Civil Construction, we never compromise on structural integrity. We follow strict, supervised curing protocols for every project. <a href="/contact" style="color: #F97316; text-decoration: underline;">Contact us for reliable construction.</a></p>
        `
      },
      {
        title: "Best Materials for Boundary Walls and Compound Construction",
        slug: "best-materials-boundary-walls-compound-construction",
        excerpt: "Secure your property with a strong, aesthetically pleasing boundary wall. Compare red bricks, AAC blocks, and precast concrete walls.",
        author: "AMS Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "compound wall construction, boundary wall contractor, brickwork, AAC blocks, civil contractor mumbai",
        content: `
<h2>Securing Your Property with Style</h2>
<p>The boundary wall is the first thing visitors see, and the first line of defense for your property. Whether you are building a new <a href="/services/bungalow-construction" style="color: #F97316; text-decoration: underline;">bungalow</a> or securing an open plot, choosing the right material for your compound wall is critical.</p>

<h3>1. Traditional Red Clay Bricks</h3>
<p>The classic choice. Red bricks offer excellent compressive strength and a timeless look. When paired with high-quality <a href="/services/plaster-work" style="color: #F97316; text-decoration: underline;">plaster and painting</a>, they provide a very solid, traditional boundary. However, construction is slow and labor-intensive.</p>

<h3>2. AAC Blocks (Autoclaved Aerated Concrete)</h3>
<p>These are the large, light-grey blocks you see in modern construction. They are lightweight, highly uniform, and speed up construction significantly. They also require much less mortar than traditional bricks.</p>

<h3>3. Precast Concrete Walls</h3>
<p>For large plots or factory compounds, precast walls are the fastest and most cost-effective solution. They consist of RCC pillars and textured concrete panels that slide into place like Lego bricks. They can be installed in a matter of days.</p>

<h3>Aesthetic Finishes</h3>
<p>A bare wall is boring. Elevate your boundary with <a href="/services/wall-work" style="color: #F97316; text-decoration: underline;">stone cladding, exterior textured paint, or specialized tile work</a> to give your property a premium facade.</p>

<p>Need a robust and beautiful compound wall built in Mumbai or Navi Mumbai? <a href="/contact" style="color: #F97316; text-decoration: underline;">Get a quote from AMS Civil Construction.</a></p>
        `
      },
      {
        title: "Eco-Friendly Construction Practices Every Mumbai Builder Should Follow",
        slug: "eco-friendly-construction-practices-mumbai",
        excerpt: "Learn how to build sustainably. From fly-ash bricks to rainwater harvesting, discover civil construction methods that protect the environment and lower your bills.",
        author: "Green Building Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "eco-friendly construction, green building mumbai, sustainable civil contractor, fly ash bricks, rainwater harvesting",
        content: `
<h2>Building for a Sustainable Future</h2>
<p>As the construction industry accounts for a massive percentage of global carbon emissions, it is our responsibility to adopt green building practices. If you are planning a <a href="/services/bungalow-construction" style="color: #F97316; text-decoration: underline;">new construction project</a>, here are eco-friendly practices you should demand from your contractor.</p>

<h3>1. Using Fly-Ash Bricks instead of Red Bricks</h3>
<p>Traditional red clay bricks consume fertile topsoil and require burning coal in kilns. Fly-ash bricks are made from industrial waste (coal combustion residue). They are stronger, perfectly uniform, and significantly better for the environment.</p>

<h3>2. Rainwater Harvesting (RWH) Systems</h3>
<p>In a city that faces water cuts despite heavy monsoons, setting up an RWH system during the foundation stage is a no-brainer. The system captures roof runoff, filters it, and directs it either to a storage tank or into the ground to recharge the water table.</p>

<h3>3. Heat-Reflective Terrace Flooring</h3>
<p>By applying white reflective cooling tiles or specialized PU coatings during the <a href="/services/flooring-work" style="color: #F97316; text-decoration: underline;">terrace waterproofing stage</a>, you can bounce back the sun's heat. This drastically reduces the temperature of the top floor, lowering your air conditioning electricity bills.</p>

<h3>4. VOC-Free Paints</h3>
<p>Ensure your interior finishing team uses paints with low or zero Volatile Organic Compounds (VOCs) to maintain healthy indoor air quality.</p>

<p>At AMS Civil Construction, we are committed to modern, sustainable building methods. <a href="/contact" style="color: #F97316; text-decoration: underline;">Talk to us about building your green home.</a></p>
        `
      },
      {
        title: "Maximizing Natural Light in Your Home Through Structural Changes",
        slug: "maximizing-natural-light-structural-changes",
        excerpt: "Dark, gloomy apartment? Learn how strategic civil alterations, glass partitions, and window expansions can flood your home with natural sunlight.",
        author: "Interior Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "natural light home renovation, breaking walls for light, larger windows civil work, interior remodeling mumbai",
        content: `
<h2>Let the Sunshine In</h2>
<p>Natural light doesn't just make your home look bigger and more expensive; it also improves your mood and reduces daytime electricity consumption. If your Mumbai apartment feels dark, here are structural changes our <a href="/services" style="color: #F97316; text-decoration: underline;">civil teams</a> can execute to brighten it up.</p>

<h3>1. Knock Down Partition Walls</h3>
<p>The easiest way to let light flow from the living room into a dark dining area or kitchen is to remove non-load-bearing brick walls. Creating an open-plan layout instantly transforms the space.</p>

<h3>2. Expand Your Window Openings</h3>
<p>If you have small, old-fashioned windows, our <a href="/services/wall-work" style="color: #F97316; text-decoration: underline;">masonry experts</a> can safely widen the brickwork to accommodate modern floor-to-ceiling UPVC or aluminum sliding windows. <em>(Note: This requires checking the structural lintels above the window).</em></p>

<h3>3. Replace Solid Doors with Glass Partitions</h3>
<p>If you need to divide a space (like a home office) but don't want to block the light, replace solid walls with sleek, black-metal framed glass partitions.</p>

<h3>4. Glossy Flooring and Ceiling Tricks</h3>
<p>Reflective surfaces bounce light around the room. Opt for highly polished, light-colored <a href="/services/tiles-work" style="color: #F97316; text-decoration: underline;">vitrified tiles or Italian marble</a>. Pair this with a bright white <a href="/services/pop-work" style="color: #F97316; text-decoration: underline;">POP false ceiling</a> equipped with diffused cove lighting for cloudy days.</p>

<p>Ready for a brighter, more vibrant home? <a href="/contact" style="color: #F97316; text-decoration: underline;">Consult the renovation specialists at AMS Civil Construction today.</a></p>
        `
      }
    ];

    for (const blog of blogs) {
      const exists = await blogsCollection.findOne({ slug: blog.slug });
      if (!exists) {
        await blogsCollection.insertOne(blog);
        console.log("Inserted blog: " + blog.title);
      } else {
        console.log("Blog already exists: " + blog.title);
      }
    }
    console.log("Part 2 Seeding complete!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
