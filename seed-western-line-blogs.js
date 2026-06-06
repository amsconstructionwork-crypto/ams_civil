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
        title: "Borivali Real Estate 2026: Property Rates & Luxury Civil Work Guide",
        slug: "borivali-real-estate-property-rates-civil-work",
        excerpt: "Borivali West aur East mein naya flat kharidne ka soch rahe hain? Jaaniye current property rates aur kaise aap Mandal Civil Works se apne flat ko premium luxury look de sakte hain.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "borivali property rates, interior designer in borivali, civil contractor in borivali, borivali real estate, flat renovation cost",
        locationTags: ["Borivali", "Mumbai", "Western Line"],
        content: `
<h2>Borivali: The Premium Hub of Western Suburbs</h2>
<p>Borivali aaj ke time mein Western Suburbs ka sabse prime residential area ban chuka hai. Sanjay Gandhi National Park ki greenery aur excellent connectivity ki wajah se yahan log ghar lena pasand karte hain.</p>

<h3>Borivali Property Rates (2026)</h3>
<ul>
  <li><strong>Borivali West (IC Colony, Yogi Nagar):</strong> ₹18,000 to ₹25,000 per sq. ft. Yahan premium towers aur luxury apartments ki demand zyada hai.</li>
  <li><strong>Borivali East (Rajendra Nagar, Dattapada):</strong> ₹15,000 to ₹20,000 per sq. ft. Highway aur Metro se connectivity isko ek hot spot banati hai.</li>
</ul>

<h3>Borivali Mein Flat Renovation Ka Kharcha</h3>
<p>Agar aap Borivali mein second-hand (resale) flat le rahe hain, toh usko naya look dena zaroori hai. Ek standard 2BHK flat ka <strong>complete renovation cost</strong> Borivali mein ₹6 Lakh se ₹12 Lakh ke beech aata hai, jismein civil work, plumbing, aur interior shamil hai.</p>

<h4>Mandal Civil Works Kaise Help Kar Sakta Hai?</h4>
<p>Hum Borivali mein apne premium <a href="/services/full-interior-work">Full Interior Civil Work</a> ke liye jaane jaate hain. Naye Italian marble flooring se lekar, bathroom waterproofing aur designer POP false ceiling tak, sab kuch hum 100% guarantee ke sath banate hain.</p>
<p>Aapke budget ke hisaab se hum best materials suggest karte hain. Borivali mein free site visit ke liye aaj hi contact karein!</p>
        `
      },
      {
        title: "Dahisar Redevelopment Trends: Building & Renovation Cost 2026",
        slug: "dahisar-redevelopment-renovation-cost",
        excerpt: "Dahisar mein redevelopment ka boom chal raha hai. Agar aapka building redevelop ho raha hai ya aap naya flat renovate karana chahte hain, toh padhein yeh guide.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "dahisar property rates, redevelopment in dahisar, renovation contractor dahisar, flat repair cost, bathroom renovation",
        locationTags: ["Dahisar", "Mumbai", "Western Line"],
        content: `
<h2>Dahisar: The Redevelopment Capital of Mumbai</h2>
<p>Dahisar (East & West) mein pichle kuch saalon mein tezi se redevelopment projects aaye hain. Purani buildings toot kar naye towers ban rahe hain. Is area mein abhi property rates ₹12,000 se ₹17,000 per sq. ft. chal rahe hain.</p>

<h3>Naye Redeveloped Flat Ka Interior Kaise Karwayein?</h3>
<p>Jab aapko builder se naya flat milta hai (bare shell ya basic finish), toh sabse pehle aapko apne requirement ke hisaab se <strong>Civil Changes</strong> karne hote hain. Jaise ki wall tod kar room bada karna, ya kitchen platform ko shift karna.</p>

<h3>Top Civil Works for Dahisar Homes</h3>
<ul>
  <li><strong><a href="/services/kitchen-work">Modular Kitchen Work</a>:</strong> Naye flats mein space bachane ke liye modular kitchen bahut zaroori hai. (Cost: ₹1.5L to ₹3L)</li>
  <li><strong><a href="/services/bathroom-renovation">Bathroom Renovation</a>:</strong> Builders generally basic tiles lagate hain. Hum aapko luxury shower panels aur premium tiling lagakar de sakte hain.</li>
  <li><strong><a href="/services/tiles-work">Flooring Work</a>:</strong> Builder ki di hui tiles ke upar premium vitrified ya marble flooring lagwana.</li>
</ul>

<p><strong>Mandal Civil Works</strong> Dahisar mein kai saalon se trusted contractor hai. Chahe ek diwaar todni ho, ya pure flat ka makeover karna ho, hamari expert team hamesha ready hai.</p>
        `
      },
      {
        title: "Mira Road Property Investment: Buying & Bungalow Construction Guide",
        slug: "mira-road-property-bungalow-construction",
        excerpt: "Mira Road Mumbai ka sabse fast-growing suburb hai. Jaaniye Mira Road ke property rates aur yahan apna khud ka bungalow ya villa banane ka pura kharcha.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mira road property rates, bungalow construction in mira road, civil contractor mira road, mira road real estate, construction cost",
        locationTags: ["Mira Road", "Thane", "Western Line"],
        content: `
<h2>Mira Road: The Best Investment Destination</h2>
<p>Agar aap Mumbai mein budget mein bada ghar chahte hain, toh Mira Road (Kashimira, Beverly Park, Hatkesh) sabse best option hai. Yahan ka infrastructure, hospitals aur schools top class hain. Current property rates ₹8,000 se ₹11,000 per sq. ft. ke aas-paas hain.</p>

<h3>Mira Road Mein Bungalow Banane Ka Kharcha (2026)</h3>
<p>Kashimira aur as-paas ke areas mein log plot kharid kar apne bungalows banwana pasand karte hain. Ek standard <strong>Bungalow Construction</strong> ka kharcha lagbhag ₹1,600 se ₹2,200 per sq. ft. aata hai, depend karta hai material ki quality par.</p>

<h4>Bungalow Construction Mein Dhyan Rakhne Wali Baatein:</h4>
<ol>
  <li><strong>Solid Foundation (RCC):</strong> Mira Road ki mitti (soil) ke hisaab se foundation bahut strong honi chahiye.</li>
  <li><strong><a href="/services/waterproofing">Waterproofing</a>:</strong> Monsoons mein Mira Road mein kafi paani bharta hai, isliye plinth level aur terrace ki double-layer waterproofing mandatory hai.</li>
  <li><strong><a href="/services/compound-wall-work">Compound Wall</a>:</strong> Safety ke liye ek majboot RCC compound wall aur designer gate.</li>
</ol>

<p>Aap plot kharidiye, baaki construction ka tension <strong>Mandal Civil Works</strong> par chhod dijiye. Hum foundation se lekar finishing (Turnkey) tak ka pura contract lete hain.</p>
        `
      },
      {
        title: "Bhayandar Home Buyers Guide: Property Rates & Renovation Costs",
        slug: "bhayandar-property-rates-renovation",
        excerpt: "Bhayandar East aur West mein property kharidne ka sahi waqt aa gaya hai. Padhein property trends aur ghar ko saste mein premium look dene ke civil work tips.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "bhayandar property rates, renovation in bhayandar, civil contractor bhayandar east, tiles work bhayandar",
        locationTags: ["Bhayandar", "Thane", "Western Line"],
        content: `
<h2>Bhayandar: Budget-Friendly yet Connected</h2>
<p>Bhayandar Western Line ka ek bahut hi important junction hai. Bhayandar West (Jesal Park, Maxus Mall area) premium hai, jabki Bhayandar East budget-friendly homes ke liye jana jata hai. Rates generally ₹7,500 se ₹10,500 per sq. ft. ke beech vary karte hain.</p>

<h3>Old Flat Renovation in Bhayandar</h3>
<p>Agar aapne Bhayandar mein ek resale (purana) flat liya hai, toh sabse pehle aapko apne ghar ka <strong>Civil and Plumbing Check</strong> karwana chahiye.</p>

<ul>
  <li><strong>Seepage (Seelan) Problem:</strong> Purani buildings mein leakage common hai. Humein call karein <a href="/services/waterproofing">Waterproofing</a> services ke liye.</li>
  <li><strong>Kitchen Makeover:</strong> Purane style ke kitchen ko tod kar naya modular setup banwana, jismein <a href="/services/kitchen-work">civil platform</a> aur naye tiles lagana shamil hai.</li>
  <li><strong>Wall Crack Repair:</strong> Purani deewaron ke cracks ko fill karna aur naya <a href="/services/plaster-work">Plaster Work</a> karwana taaki paint aage chalkar kharab na ho.</li>
</ul>

<p><strong>Mandal Civil Works</strong> Bhayandar mein aapke budget ke andar ghar ko ek naya, modern look dene ki guarantee leta hai.</p>
        `
      },
      {
        title: "Naigaon Property Rates 2026: Investment & Interior Design Costs",
        slug: "naigaon-property-rates-interior-costs",
        excerpt: "Naigaon (East & West) affordable housing ka naya hub ban chuka hai. Sun City aur Juchandra mein property lene ke baad interior civil work ka kya cost aayega, jaaniye is blog mein.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "naigaon property rates, interior design naigaon, civil work naigaon, sun city naigaon, affordable housing mumbai",
        locationTags: ["Naigaon", "Palghar", "Western Line"],
        content: `
<h2>Naigaon: The Rising Star of Affordable Homes</h2>
<p>Agar aapka budget ₹30 Lakh se ₹50 Lakh ke beech hai, toh Naigaon (Sun City aur Juchandra areas) sabse best investment hai. Yahan bade complexes aur township projects ban rahe hain. Rates ₹5,500 se ₹7,500 per sq. ft. chal rahe hain.</p>

<h3>Naigaon Flats Ke Liye Interior & Civil Work Ideas</h3>
<p>Jab aap budget home lete hain, toh builder basic finishing deta hai. Thode se extra kharche se aap apne budget flat ko luxury feel de sakte hain:</p>

<ul>
  <li><strong><a href="/services/pop-work">POP False Ceiling</a>:</strong> Ek achhi POP ceiling aur LED lights aapke living room ka look completely change kar sakti hai. (Cost: ₹65 to ₹110 per sq. ft.)</li>
  <li><strong><a href="/services/painting">Texture Painting</a>:</strong> TV unit ke pichle wall par texture paint ya wallpaper lagwana.</li>
  <li><strong><a href="/services/tiles-work">Wall Cladding (Tiles)</a>:</strong> Balcony ya entrance area mein designer stone finish tiles lagana.</li>
</ul>

<p>Naigaon mein humare kaafi projects chal rahe hain. Agar aap bhi Naigaon mein apna ghar sajaana chahte hain, toh <strong>Mandal Civil Works</strong> se behtar aur sasta quote koi nahi dega!</p>
        `
      },
      {
        title: "Vasai Real Estate Trends 2026 & Civil Construction Estimates",
        slug: "vasai-real-estate-civil-construction",
        excerpt: "Vasai West ki heritage vibes aur Vasai East ka industrial/residential boom. Jaaniye Vasai mein property prices aur ghar banwane ka sahi kharcha.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "vasai property rates, civil contractor vasai, bungalow builder vasai, vasai west real estate, construction estimates",
        locationTags: ["Vasai", "Palghar", "Western Line"],
        content: `
<h2>Vasai: The Perfect Blend of Nature & City</h2>
<p>Vasai (Vasai Road) apne beaches, forts, aur khule areas ke liye famous hai. Vasai West mein log bade villas aur bungalows banwana pasand karte hain, jabki Vasai East mein high-rise apartments zyada hain. Property rates ₹6,000 se ₹9,000 per sq. ft. tak aate hain.</p>

<h3>Vasai West Mein Bungalow Banwana Hai?</h3>
<p>Vasai West mein open land easily mil jaati hai. Wahan <a href="/services/bungalow-construction">Bungalow Construction</a> karne ka trend bahut zyada hai. Lekin dhyan rahe, Vasai coastal area hone ki wajah se:</p>
<ol>
  <li>Building material (steel aur cement) corrosion-resistant use karna padta hai.</li>
  <li>Expert <a href="/services/waterproofing">Waterproofing</a> zaroori hai taaki baarish aur samundar ki hawa se ghar kharab na ho.</li>
  <li>Luxury feel ke liye <a href="/services/swimming-pool-work">Swimming Pool Work</a> bhi aap apne bungalow mein add karwa sakte hain.</li>
</ol>

<p><strong>Mandal Civil Works</strong> Vasai mein premium civil construction aur turnkey bungalow projects ke liye trusted naam hai. Aap land dijiye, hum sapno ka mahal banayenge!</p>
        `
      },
      {
        title: "Why Nalasopara is Best for Budget Homes & Renovation in 2026",
        slug: "nalasopara-budget-homes-renovation",
        excerpt: "Nalasopara Mumbai ka sabse densely populated aur affordable area hai. Nalasopara mein property kharidne ke fayde aur budget civil work ke baare mein jaaniye.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "nalasopara property rates, civil work nalasopara, flat repair nalasopara, renovation contractor",
        locationTags: ["Nalasopara", "Palghar", "Western Line"],
        content: `
<h2>Nalasopara: The Working Class Hub</h2>
<p>Nalasopara East aur West mein budget homes (1BHK aur 1RK) ki demand hamesha rehti hai. Yahan ke property rates ₹4,500 se ₹6,500 per sq. ft. ke aaspas hain, jo isko pehli baar ghar kharidne walon (First-time home buyers) ke liye best banata hai.</p>

<h3>Nalasopara Flats Ki Repair Aur Renovation</h3>
<p>Nalasopara mein purani buildings mein maintenance ki kaafi zaroorat padti hai. Agar aapka ghar yahan hai, toh in services par dhyan dein:</p>
<ul>
  <li><strong>Bathroom Leakage:</strong> Nalasopara ki kaafi buildings mein ek floor se dusre floor tak pani leak hone ki problem hai. Iska permanent solution hai <a href="/services/bathroom-renovation">Bathroom Renovation</a> aur chemical waterproofing.</li>
  <li><strong>Floor Tiling:</strong> Purani tiles toot gayi hain? Saste rate mein hum <a href="/services/flooring-work">Vitrified Tiling Work</a> karte hain jo flat ko clean aur naya dikhata hai.</li>
  <li><strong>Painting & Putty:</strong> Seelan se kharab hui deewaron ko scrap karke naya <a href="/services/plaster-work">Plaster</a> aur <a href="/services/painting">Painting</a> karwana zaroori hai.</li>
</ul>

<p>Kam budget ka matlab low quality nahi hota! <strong>Mandal Civil Works</strong> Nalasopara mein affordable budget mein high-quality civil repair aur painting work provide karta hai.</p>
        `
      },
      {
        title: "Virar Property Market 2026: Investment & Complete Construction Guide",
        slug: "virar-property-market-construction-guide",
        excerpt: "Virar (Global City, Yazoo Park area) rapidly develop ho raha hai. Virar property rates, investment potential aur construction requirements ke baare mein puri jankari.",
        author: "Mandal Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "virar property rates, global city virar, civil contractor virar, builder virar, construction cost",
        locationTags: ["Virar", "Palghar", "Western Line"],
        content: `
<h2>Virar: The Smart Investment Choice</h2>
<p>Virar mein bade township projects (jaise Global City) ne is area ka chehra badal diya hai. Virar West premium lifestyle offer karta hai (malls, parks, clubs), aur Virar East connectivity ke liye acha hai. Property rates ₹5,500 se ₹7,500 per sq. ft. tak hain.</p>

<h3>Virar Mein Property Kharidne Ke Baad Ke Civil Kharchay</h3>
<p>Agar aapne Virar ki kisi township mein ghar liya hai, toh wahan builders rules strict hote hain. Civil alteration karne ke liye expert team ki zaroorat hoti hai:</p>

<ul>
  <li><strong>Grill & Safety Doors:</strong> Flat ki safety badhana.</li>
  <li><strong><a href="/services/wall-work">Wall Partitioning</a>:</strong> Agar aap 1BHK ko apne hisaab se customize karna chahte hain, toh hum Siporex blocks (lightweight bricks) se nayi deewar banate hain jisse building pe load nahi padta.</li>
  <li><strong>Complete Interior Setup:</strong> <a href="/services/pop-work">False ceiling</a>, electrical wiring shifting aur <a href="/services/kitchen-work">kitchen trolley</a> setup.</li>
</ul>

<h3>Commercial Construction in Virar</h3>
<p>Virar mein nayi dukanein aur showrooms bhi khul rahe hain. Agar aapko apni shop ka <a href="/services/full-interior-work">commercial interior</a> karwana hai, toh <strong>Mandal Civil Works</strong> aapke liye best partner hai.</p>
        `
      }
    ];

    for (const blog of blogs) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
      console.log("Upserted Western Line Blog: " + blog.title);
    }
    console.log("Western Line Blogs Seeding complete!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
