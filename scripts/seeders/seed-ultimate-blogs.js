const fs = require('fs');
const { MongoClient } = require('mongodb');

// Simple .env.local parser
const envConfig = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
  return acc;
}, {});

const uri = envConfig.MONGODB_URI || process.env.MONGODB_URI;

if (!uri) {
  console.error("Please add your Mongo URI to .env.local");
  process.exit(1);
}

const blogs = [
  {
    title: "1 BHK & 2 BHK Renovation Cost in Mumbai (2024 Detailed Breakdown)",
    slug: "renovation-cost-mumbai-1bhk-2bhk",
    excerpt: "Planning to renovate your flat in Mumbai? Get the exact per sq ft cost breakdown for flooring, painting, plumbing, and interior design for 1 BHK and 2 BHK apartments in 2024.",
    category: "Renovation",
    views: 890,
    readTime: "8 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>1 BHK & 2 BHK Renovation Cost in Mumbai (2024 Guide)</h2>
<p>Renovating a home in Mumbai requires careful planning and budgeting. Whether you own a compact 1 BHK in Virar or a spacious 2 BHK in Andheri, understanding the hidden costs can save you lakhs of rupees. In this ultimate guide, we provide a realistic, itemized breakdown of renovation costs in Mumbai for 2024.</p>

<h3>Average Cost per Square Foot</h3>
<p>As a general rule of thumb, a basic to moderate renovation in Mumbai costs between <strong>₹1,200 to ₹1,800 per sq. ft.</strong> For premium finishes, it can go up to ₹2,500 to ₹3,500 per sq. ft. Let's break this down by apartment size.</p>

<h3>1 BHK Renovation Cost Breakdown (Assuming 400 - 500 Sq Ft)</h3>
<ul>
  <li><strong>Civil Work & Demolition:</strong> ₹40,000 - ₹60,000</li>
  <li><strong>Flooring & Tiling (Vitrified tiles):</strong> ₹70,000 - ₹90,000</li>
  <li><strong>Bathroom Renovation (Plumbing, Waterproofing, CP fittings):</strong> ₹80,000 - ₹1,20,000</li>
  <li><strong>Kitchen Remodeling (Granite top, Trolleys, Dado tiles):</strong> ₹1,00,000 - ₹1,50,000</li>
  <li><strong>Electrical Rewiring:</strong> ₹35,000 - ₹50,000</li>
  <li><strong>Painting (Asian Paints Royale/Tractor Emulsion):</strong> ₹30,000 - ₹50,000</li>
  <li><strong>Total Estimated Cost:</strong> <strong>₹3.5 Lakhs to ₹5 Lakhs</strong></li>
</ul>

<h3>2 BHK Renovation Cost Breakdown (Assuming 700 - 900 Sq Ft)</h3>
<ul>
  <li><strong>Civil Work & Demolition:</strong> ₹70,000 - ₹1,00,000</li>
  <li><strong>Flooring & Tiling:</strong> ₹1,20,000 - ₹1,80,000</li>
  <li><strong>Bathrooms (x2):</strong> ₹1,50,000 - ₹2,20,000</li>
  <li><strong>Kitchen Remodeling:</strong> ₹1,50,000 - ₹2,50,000</li>
  <li><strong>Electrical Rewiring:</strong> ₹60,000 - ₹80,000</li>
  <li><strong>Painting:</strong> ₹60,000 - ₹90,000</li>
  <li><strong>Total Estimated Cost:</strong> <strong>₹6 Lakhs to ₹9 Lakhs</strong></li>
</ul>

<h3>Hidden Costs You Must Consider</h3>
<p>When creating your budget, always set aside 10-15% as a contingency fund. Common hidden costs include building society permission fees, debris removal (which is very strict in BMC areas), and waterproofing old, damaged walls that are only discovered after demolition.</p>

<h3>Why Hire AMS Civil Works for Your Renovation?</h3>
<p>At AMS Civil Works, we provide complete turnkey solutions from 3D design to final execution. We ensure zero hidden costs, timely delivery, and the highest quality materials. Contact us today for a free site visit and exact quotation.</p>
`
  },
  {
    title: "House Construction Cost per Sq Ft in Mumbai & Thane (2024)",
    slug: "house-construction-cost-mumbai-thane",
    excerpt: "What is the exact cost to build a house or bungalow in Mumbai, Thane, or Palghar? Learn about the cost of materials, labor, and permissions per square foot.",
    category: "Construction",
    views: 1240,
    readTime: "10 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1541888081622-1d5b3d64c017?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>House Construction Cost per Sq Ft in Mumbai & Thane (2024 Guide)</h2>
<p>Building your dream house or bungalow in the Mumbai Metropolitan Region (MMR) is an exciting journey. However, fluctuations in raw material prices like cement, steel, and sand have changed the construction landscape in 2024. Here is the ultimate guide to construction costs in Mumbai, Thane, Navi Mumbai, and Palghar districts.</p>

<h3>Construction Cost Categories (Per Sq. Ft. of Built-up Area)</h3>
<p>Construction costs are generally divided into three categories based on the quality of materials and finishes used:</p>
<ol>
  <li><strong>Economy Class (Basic Standard):</strong> ₹1,400 to ₹1,600 per sq. ft.</li>
  <li><strong>Premium Class (Medium Standard):</strong> ₹1,700 to ₹2,000 per sq. ft.</li>
  <li><strong>Luxury Class (High Standard):</strong> ₹2,200 to ₹3,000+ per sq. ft.</li>
</ol>

<h3>Material Cost Breakdown (What eats your budget?)</h3>
<p>In a typical turnkey construction project, here is where your money goes:</p>
<ul>
  <li><strong>Cement:</strong> 15-16% of total cost</li>
  <li><strong>Steel (TMT Bars):</strong> 20-22% of total cost</li>
  <li><strong>Sand & Aggregate:</strong> 10-12% of total cost</li>
  <li><strong>Bricks/Blocks:</strong> 5-7% of total cost</li>
  <li><strong>Finishing Materials (Tiles, Paint, Wood):</strong> 15-20% of total cost</li>
  <li><strong>Labor Cost:</strong> 25-30% of total cost</li>
</ul>

<h3>Key Differences: Mumbai City vs. Outer Areas (Virar, Palghar, Kalyan)</h3>
<p>While material costs remain largely similar across MMR, labor and logistics costs vary significantly. In South Mumbai and western suburbs like Andheri and Borivali, you might pay a premium due to strict timings, heavy traffic rules for trucks (no entry during the day), and expensive labor. In contrast, construction in Virar, Palghar, or Kalyan is generally 10-15% cheaper due to easier logistics and locally available labor.</p>

<h3>How to Reduce Construction Costs without Compromising Quality?</h3>
<p>1. <strong>Opt for AAC Blocks instead of Red Bricks:</strong> They are lighter, reduce the dead load on the structure (saving steel), and require less plastering.</p>
<p>2. <strong>Simple Elevations:</strong> Highly complex, curved modern facades require expensive formwork and skilled labor. Keep the structure simple.</p>
<p>3. <strong>Hire a Turnkey Contractor:</strong> Instead of managing separate masons, plumbers, and electricians, a single turnkey contractor like AMS Civil Works saves time, reduces material wastage, and guarantees quality.</p>
`
  },
  {
    title: "Best Waterproofing Solutions for Mumbai Rains (With Pricing)",
    slug: "best-waterproofing-mumbai-monsoon",
    excerpt: "Mumbai monsoons can destroy your walls. Discover the best chemical waterproofing solutions for terraces, bathrooms, and external walls to stop leakage permanently.",
    category: "Waterproofing",
    views: 1050,
    readTime: "7 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>Best Waterproofing Solutions for Mumbai Rains (With Pricing)</h2>
<p>If you live in Mumbai, you know the devastating effect the four-month-long torrential monsoons can have on your home. Dampness, peeling paint, and ceiling leakages are common nightmares. Here is your complete guide to solving leakage problems permanently.</p>

<h3>1. Terrace Waterproofing</h3>
<p>The terrace is the most vulnerable part of any building. The traditional brickbat coba method is becoming obsolete due to its heavy weight and tendency to crack.</p>
<ul>
  <li><strong>Modern Solution:</strong> Polyurethane (PU) or Acrylic liquid-applied membranes. Brands like Dr. Fixit or Fosroc provide excellent elastomeric coatings.</li>
  <li><strong>Estimated Cost:</strong> ₹60 to ₹120 per sq. ft. depending on the number of coats and surface preparation.</li>
</ul>

<h3>2. External Wall Waterproofing</h3>
<p>Driving rain constantly hitting external walls leads to damp patches inside the house.</p>
<ul>
  <li><strong>Modern Solution:</strong> Elastomeric exterior waterproof paints (e.g., Asian Paints Damp Proof). These paints stretch up to 400% and bridge hairline cracks.</li>
  <li><strong>Estimated Cost:</strong> ₹25 to ₹45 per sq. ft.</li>
</ul>

<h3>3. Bathroom/Sunken Area Waterproofing</h3>
<p>Seepage from an upper floor bathroom can ruin your ceiling.</p>
<ul>
  <li><strong>Modern Solution:</strong> Two-component acrylic polymer coatings mixed with cement, applied before laying tiles. Epoxy grouting for tile joints is also mandatory.</li>
  <li><strong>Estimated Cost:</strong> ₹10,000 to ₹15,000 lump sum per standard bathroom.</li>
</ul>

<h3>Why Delaying Waterproofing is Expensive</h3>
<p>Water seepage doesn't just ruin your paint. It corrodes the steel rebars inside your RCC slabs and columns. Over time, the steel expands and breaks the concrete (spalling), threatening the structural integrity of your entire building.</p>

<p><strong>Need expert waterproofing before the next monsoon?</strong> AMS Civil Works provides guaranteed waterproofing services with modern chemicals and trained applicators across Mumbai, Thane, and Palghar.</p>
`
  },
  {
    title: "घर बनाने का खर्च 2024: प्रति स्क्वायर फीट की पूरी जानकारी (मुंबई और महाराष्ट्र)",
    slug: "ghar-banane-ka-kharcha-2024-mumbai",
    excerpt: "2024 में मुंबई, ठाणे या विरार में अपना घर या बंगला बनाने का सही खर्च जानें। सीमेंट, सरिया, और लेबर का पूरा हिसाब हिंदी में।",
    category: "Construction",
    views: 1560,
    readTime: "6 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>घर बनाने का खर्च 2024: प्रति स्क्वायर फीट की पूरी जानकारी</h2>
<p>अगर आप 2024 में मुंबई, ठाणे या महाराष्ट्र के किसी अन्य हिस्से में अपना घर बनाने की सोच रहे हैं, तो सबसे पहला सवाल मन में आता है - "कुल कितना खर्चा आएगा?"। इस आर्टिकल में हम आपको घर बनाने के खर्च का पूरा गणित समझाएंगे।</p>

<h3>प्रति स्क्वायर फीट निर्माण (Construction) का रेट</h3>
<p>आजकल कंस्ट्रक्शन का काम आमतौर पर 'टर्नकी' (Turnkey) या 'विद मटेरियल' (With Material) बेसिस पर दिया जाता है। क्वालिटी के हिसाब से इसके रेट इस प्रकार हैं:</p>
<ul>
  <li><strong>बेसिक / साधारण काम:</strong> ₹1,400 से ₹1,600 प्रति स्क्वायर फीट। (इसमें सामान्य टाइल्स, बेसिक वायरिंग और नार्मल फिटिंग्स का इस्तेमाल होता है।)</li>
  <li><strong>मीडियम / अच्छा काम:</strong> ₹1,700 से ₹2,000 प्रति स्क्वायर फीट। (इसमें विट्रीफाइड टाइल्स, ब्रांडेड पेंट, और अच्छी क्वालिटी के प्लंबिंग फिटिंग्स शामिल हैं।)</li>
  <li><strong>प्रीमियम / लग्जरी काम:</strong> ₹2,200+ प्रति स्क्वायर फीट। (इसमें इटैलियन मार्बल, मॉडर्न एलिवेशन, और हाई-एंड जैगुआर/कोहलर फिटिंग्स होती हैं।)</li>
</ul>

<h3>मटेरियल और लेबर का खर्चा (प्रतिशत में)</h3>
<p>आपके कुल बजट का पैसा कहाँ खर्च होता है?</p>
<ul>
  <li><strong>सरिया (Steel):</strong> 20%</li>
  <li><strong>सीमेंट (Cement):</strong> 15%</li>
  <li><strong>ईंट / ब्लॉक (Bricks/AAC Blocks):</strong> 7%</li>
  <li><strong>रेत और गिट्टी (Sand & Aggregate):</strong> 12%</li>
  <li><strong>फिनिशिंग (टाइल्स, पेंट, दरवाजे, खिड़कियां):</strong> 20%</li>
  <li><strong>लेबर (मजदूरी):</strong> 26%</li>
</ul>

<h3>पैसे कैसे बचाएं?</h3>
<p>लाल ईंटों की जगह <strong>AAC Blocks (राख की ईंटें)</strong> का उपयोग करें। ये हल्की होती हैं, जिससे घर के पिलर (कॉलम) पर कम भार पड़ता है और सरिये का खर्चा बचता है। साथ ही, हमेशा किसी अनुभवी कॉन्ट्रैक्टर को काम दें।</p>

<p><strong>AMS Civil Works</strong> मुंबई और विरार में सालों से भरोसेमंद घर बनाने का काम कर रहे हैं। बिना किसी छिपे हुए खर्च के, सही कीमत पर मजबूत घर बनवाने के लिए आज ही संपर्क करें।</p>
`
  },
  {
    title: "1 BHK आणि 2 BHK घराच्या नूतनीकरणाचा (Renovation) खर्च किती येतो? (मुंबई)",
    slug: "renovation-cost-marathi-mumbai",
    excerpt: "तुमच्या 1 BHK किंवा 2 BHK फ्लॅटचे रिनोव्हेशन करायचे आहे का? मुंबई आणि ठाण्यातील घराच्या दुरुस्तीचा सविस्तर खर्च मराठीत जाणून घ्या.",
    category: "Renovation",
    views: 1120,
    readTime: "6 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>घराच्या नूतनीकरणाचा (Renovation) खर्च किती येतो?</h2>
<p>मुंबई, ठाणे, किंवा विरारमध्ये नवीन घर घेण्यापेक्षा जुन्या घराचे नूतनीकरण (Renovation) करणे अधिक फायदेशीर ठरते. पण रिनोव्हेशन सुरु करण्यापूर्वी बजेट ठरवणे खूप गरजेचे असते. या मार्गदर्शकामध्ये आपण 1 BHK आणि 2 BHK घराच्या रिनोव्हेशनचा खर्च पाहणार आहोत.</p>

<h3>1 BHK रिनोव्हेशनचा खर्च (अंदाजे)</h3>
<p>जर तुमचे घर 400 ते 500 चौरस फुटांचे असेल, तर संपूर्ण नूतनीकरणासाठी <strong>₹3.5 लाख ते ₹5 लाख</strong> खर्च येऊ शकतो.</p>
<ul>
  <li><strong>फरशी (Flooring):</strong> ₹70,000 - ₹90,000</li>
  <li><strong>बाथरूम आणि प्लंबिंग:</strong> ₹80,000 - ₹1,20,000</li>
  <li><strong>स्वयंपाकघर (Modular Kitchen):</strong> ₹1,00,000 - ₹1,50,000</li>
  <li><strong>इलेक्ट्रिकल काम:</strong> ₹35,000 - ₹50,000</li>
  <li><strong>कलरिंग (Painting):</strong> ₹30,000 - ₹45,000</li>
</ul>

<h3>2 BHK रिनोव्हेशनचा खर्च (अंदाजे)</h3>
<p>जर तुमचे घर 700 ते 900 चौरस फुटांचे असेल, तर एकूण खर्च <strong>₹6 लाख ते ₹9 लाख</strong> च्या दरम्यान असू शकतो.</p>
<ul>
  <li><strong>फरशी बदलणे:</strong> ₹1,20,000 - ₹1,80,000</li>
  <li><strong>दोन बाथरूमचे काम:</strong> ₹1,50,000 - ₹2,20,000</li>
  <li><strong>मॉड्युलर किचन:</strong> ₹1,50,000 - ₹2,50,000</li>
  <li><strong>इलेक्ट्रिकल आणि कलरिंग:</strong> ₹1,20,000 - ₹1,60,000</li>
</ul>

<h3>काही महत्त्वाच्या टिप्स</h3>
<p>कधीही सर्वात स्वस्त कॉन्ट्रॅक्टर निवडू नका. अनेकदा कमी बजेट देणारे कॉन्ट्रॅक्टर हलक्या दर्जाचे मटेरियल वापरतात किंवा अर्धवट काम सोडून देतात. एक अनुभवी आणि विश्वासार्ह कॉन्ट्रॅक्टर निवडा जो तुम्हाला लेखी करार (Agreement) करून देईल.</p>

<p><strong>AMS Civil Works</strong> कडून मोफत कोटेशन (Free Quote) मिळवण्यासाठी आजच संपर्क करा!</p>
`
  },
  {
    title: "AAC Blocks vs Red Bricks: Which is Better for Construction?",
    slug: "aac-blocks-vs-red-bricks-mumbai",
    excerpt: "Should you use traditional Red Bricks or modern AAC blocks for your new house? We compare cost, strength, and cooling properties.",
    category: "Construction",
    views: 950,
    readTime: "5 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1518640026210-67c4692ce01c?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>AAC Blocks vs Red Bricks: The Ultimate Comparison</h2>
<p>When constructing a new home or building in Mumbai, one of the biggest decisions a homeowner faces is choosing the right masonry material. The debate between traditional Red Clay Bricks and modern Autoclaved Aerated Concrete (AAC) Blocks is ongoing. Here is a detailed comparison to help you decide.</p>

<h3>1. Weight and Dead Load</h3>
<p><strong>AAC Blocks</strong> are nearly 3 to 4 times lighter than red bricks. This drastically reduces the dead load on the building's RCC frame (columns and beams), which in turn saves up to 15% of the structural steel requirement.</p>

<h3>2. Thermal Insulation (Cooling)</h3>
<p>Mumbai's summers are notoriously hot and humid. <strong>AAC Blocks</strong> have tiny air pockets inside them, providing excellent thermal insulation. Homes built with AAC blocks remain significantly cooler in summer, reducing your AC electricity bills.</p>

<h3>3. Speed of Construction</h3>
<p>Because AAC blocks are larger in size (typically equivalent to 6-7 red bricks), the speed of wall construction is much faster. This reduces the total labor days required for masonry.</p>

<h3>4. Plastering Requirement</h3>
<p>AAC blocks have a highly uniform and smooth surface. You can directly apply a thin layer of gypsum plaster on the inside, eliminating the need for a thick layer of sand-cement plaster. Red bricks, being uneven, require thick double-coat plastering.</p>

<h3>Conclusion</h3>
<p>For modern multi-story buildings and even bungalows, <strong>AAC Blocks are clearly the superior choice</strong>. They are eco-friendly, reduce structural costs, and offer better cooling. Red bricks are only recommended for very small load-bearing structures where RCC columns are not used.</p>
`
  },
  {
    title: "Top 5 Warning Signs You Need Building Repair Immediately",
    slug: "building-repair-warning-signs",
    excerpt: "Is your building safe? Look out for these 5 critical warning signs of structural damage that require immediate building repair services.",
    category: "Building Repair",
    views: 810,
    readTime: "4 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>Top 5 Warning Signs You Need Building Repair Immediately</h2>
<p>Living in older buildings in Mumbai comes with maintenance challenges. The salty, humid air accelerates corrosion. If your housing society ignores these 5 warning signs, it could lead to catastrophic structural failure.</p>

<h3>1. Spalling Concrete (Concrete falling off)</h3>
<p>If you see chunks of concrete falling from the ceiling or columns, exposing the rusted steel rods inside, this is an extreme emergency. It means water has reached the reinforcement steel, causing it to rust, expand, and break the concrete. This requires immediate polymer modified mortar repair.</p>

<h3>2. Deep Diagonal Cracks in Walls</h3>
<p>While hairline cracks on plaster are usually harmless shrinkage cracks, deep diagonal cracks spanning from windows to the floor or ceiling indicate foundational movement or structural stress.</p>

<h3>3. Heavy Water Seepage and Dampness</h3>
<p>If your walls feel perpetually wet, or if there is heavy dripping during monsoons, the water is slowly degrading the cement bond inside the walls. Continuous dampness breeds mold and weakens the structure.</p>

<h3>4. Sagging Balconies or Floors</h3>
<p>Balconies that appear to dip or slant downwards are a massive red flag. The cantilever beams supporting the balcony may be failing.</p>

<h3>5. Doors and Windows Not Closing Properly</h3>
<p>If your doors suddenly start jamming and windows don't latch, it might not be a woodwork issue. It could mean the building frame has shifted or settled unevenly.</p>

<p><strong>Don't risk your life.</strong> If your society building exhibits these signs, contact AMS Civil Works for a professional structural audit and complete building repair services.</p>
`
  },
  {
    title: "Types of Paint for Indian Homes: Emulsion vs Enamel vs Distemper",
    slug: "types-of-paint-for-home",
    excerpt: "Confused about which paint to choose for your walls? Understand the difference between Emulsion, Enamel, and Distemper paints.",
    category: "Painting",
    views: 740,
    readTime: "5 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>Types of Paint for Indian Homes: A Complete Guide</h2>
<p>Choosing the right paint for your home is more than just picking a color. The type of paint you choose dictates how long it will last, how easily you can clean it, and how rich your walls look. Let's break down the three most common types of paint used in India.</p>

<h3>1. Distemper Paint</h3>
<p>Distemper is the oldest and cheapest type of paint (often called 'whitewash' or 'chuna').</p>
<ul>
  <li><strong>Pros:</strong> Very inexpensive. Good for temporary accommodations or rental properties.</li>
  <li><strong>Cons:</strong> It cannot be washed. If you wipe it with a wet cloth, the color comes off. It has a dull, chalky finish and fades quickly.</li>
</ul>

<h3>2. Emulsion Paint (Plastic Paint)</h3>
<p>Emulsion is a water-based paint mixed with acrylic resins. This is the standard choice for modern homes.</p>
<ul>
  <li><strong>Pros:</strong> It is highly durable and washable. Stains can be wiped off with a damp cloth. It comes in various finishes like matte, satin, and silk (e.g., Asian Paints Royale).</li>
  <li><strong>Cons:</strong> More expensive than distemper. Requires a highly smooth wall surface (putty and primer) for best results.</li>
</ul>

<h3>3. Enamel Paint</h3>
<p>Enamel paint is an oil-based paint that provides a hard, glossy finish.</p>
<ul>
  <li><strong>Pros:</strong> Extremely tough, waterproof, and long-lasting.</li>
  <li><strong>Cons:</strong> Takes a long time to dry and has a strong chemical smell. </li>
  <li><strong>Where to use:</strong> Enamel is rarely used for large walls. It is used for painting wooden doors, windows, and metal grills.</li>
</ul>

<p><strong>Recommendation:</strong> For living rooms and bedrooms, always choose a premium Acrylic Emulsion paint for a luxurious, washable finish.</p>
`
  },
  {
    title: "प्लंबिंग (Plumbing) के काम में इन 5 गलतियों से बचें",
    slug: "plumbing-mistakes-to-avoid-hindi",
    excerpt: "घर बनाते समय प्लंबिंग में की गई छोटी सी गलती बाद में लाखों का नुकसान कर सकती है। जानें कौन सी गलतियों से बचना चाहिए।",
    category: "Plumbing",
    views: 920,
    readTime: "4 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>प्लंबिंग (Plumbing) के काम में इन 5 गलतियों से बचें</h2>
<p>प्लंबिंग घर की नसों (veins) की तरह होती है। अगर यह दीवार के अंदर लीक होने लगे, तो आपके महंगे टाइल्स और पेंट दोनों बर्बाद हो जाते हैं। रिनोवेशन या नया घर बनाते समय इन गलतियों से हमेशा बचें:</p>

<h3>1. गलत पाइप का चुनाव (CPVC vs UPVC)</h3>
<p>गर्म पानी के लिए हमेशा <strong>CPVC (पीले रंग के)</strong> पाइप का इस्तेमाल करें। ठंडे पानी के लिए UPVC (सफ़ेद) पाइप ठीक हैं। अगर गीजर के पानी में UPVC पाइप लगा दिया गया, तो वह पिघल कर फट जाएगा।</p>

<h3>2. वॉटरप्रूफिंग न करना</h3>
<p>प्लंबिंग के पाइप बिछाने के बाद और टाइल्स लगाने से पहले बाथरूम के फर्श की वॉटरप्रूफिंग करना सबसे ज्यादा जरूरी है। इसके बिना नीचे वाले फ्लोर की छत टपकने लगेगी।</p>

<h3>3. ड्रेनेज पाइप में सही ढलान (Slope) न देना</h3>
<p>बाथरूम के फर्श और ड्रेनेज (नाली) के पाइप में सही ढलान न होने पर पानी फर्श पर जमा रहता है, जिससे फंगस और लीकेज की समस्या होती है।</p>

<h3>4. सस्ते सॉल्वेंट (गोंद) का इस्तेमाल</h3>
<p>पाइप्स को जोड़ने वाला सॉल्वेंट (Solvent Cement) हमेशा अच्छी कंपनी (जैसे Astral या Ashirvad) का लें। 90% लीकेज घटिया गोंद के कारण जोड़ों (joints) से होती है।</p>

<h3>5. काम के बाद प्रेशर टेस्टिंग न करना</h3>
<p>पाइप दीवार में छुपाने (Conceal) से पहले, पानी चालू करके 'प्रेशर टेस्टिंग' जरूर करवाएं। इससे अगर कोई लीकेज होगी तो दीवार प्लास्टर होने से पहले ही पता चल जाएगी।</p>
`
  },
  {
    title: "Why Hire a Turnkey Civil Contractor Instead of Local Masons?",
    slug: "turnkey-contractor-vs-local-mason",
    excerpt: "Should you manage labor and materials yourself or hire a turnkey contractor? Understand the massive difference in quality, peace of mind, and hidden costs.",
    category: "Construction",
    views: 1100,
    readTime: "6 min read",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    content: `
<h2>Why Hire a Turnkey Civil Contractor Instead of Local Masons?</h2>
<p>Many homeowners in India believe they can save money by purchasing materials themselves and hiring daily-wage laborers (masons, plumbers, electricians) independently. While this might seem cheaper on paper, the reality is often a stressful nightmare filled with hidden costs and delayed timelines.</p>

<h3>1. Single Point of Responsibility</h3>
<p>When you hire separate teams, they blame each other when things go wrong. The painter blames the plaster mason for uneven walls, and the mason blames the plumber for leakages. With a turnkey contractor like AMS Civil Works, one project manager is solely responsible for the entire project's quality.</p>

<h3>2. Material Wastage and Theft</h3>
<p>If you don't know the exact quantities required, you will over-order cement, sand, and tiles. Daily wage workers often waste materials carelessly because they aren't paying for it. Turnkey contractors optimize material usage and bear the cost of any wastage.</p>

<h3>3. Time is Money</h3>
<p>Coordinating between the electrician, plumber, and carpenter is a full-time job. A turnkey contractor has dedicated teams that work in tandem, adhering to a strict timeline, meaning you get your house delivered months earlier.</p>

<h3>4. Guaranteed Quality and Warranty</h3>
<p>Local labor disappears after the job is done. If a pipe leaks three months later, you have to find a new plumber. Turnkey contractors provide warranties on their work (especially on waterproofing and plumbing).</p>

<h3>Conclusion</h3>
<p>While managing construction yourself might save you 5-10% in contractor margins, the massive loss of your personal time, material wastage, and lack of professional finishing makes it a poor choice. Choose peace of mind—choose a professional turnkey contractor.</p>
`
  }
];

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    const db = client.db('mandal_civil_works');
    const collection = db.collection('blogs');

    let added = 0;
    for (const blog of blogs) {
      const exists = await collection.findOne({ slug: blog.slug });
      if (!exists) {
        await collection.insertOne(blog);
        added++;
        console.log(`Added: ${blog.title}`);
      } else {
        console.log(`Skipped (already exists): ${blog.title}`);
      }
    }
    console.log(`\nSuccessfully added ${added} new Ultimate Guide blogs!`);

  } catch (err) {
    console.error("Error connecting to database:", err);
  } finally {
    await client.close();
  }
}

main();
