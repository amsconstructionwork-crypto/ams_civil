const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const index = line.indexOf('=');
    if (index > 0) {
      const key = line.substring(0, index).trim();
      const value = line.substring(index + 1).trim();
      acc[key] = value;
    }
    return acc;
  }, {});

const uri = envConfig.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const blogs = [
  {
    title: "Mumbai Mein Ghar Banane Ka Kharcha 2026 (Per Sq Ft Rate)",
    slug: "mumbai-mein-ghar-banane-ka-kharcha-2026",
    excerpt: "Mumbai aur Thane mein naya ghar ya bungalow banane ka latest construction cost aur rate per square foot ki poori jankari.",
    content: `
<h2>Mumbai Mein Construction Cost (2026)</h2>
<p>Agar aap Mumbai, Thane ya Navi Mumbai mein apna sapno ka ghar (bungalow) banane ki soch rahe hain, toh sabse pehla sawaal aata hai: <strong>Kharcha kitna aayega?</strong></p>
<p>2026 mein cement, steel, aur labour ke daam badhne ke baad, construction cost mein badlaav aaya hai. Yahan hum aapko ekdum sateek (accurate) per square foot rate bata rahe hain, taaki koi thekedar aapko bewakoof na bana sake.</p>

<h2>Basic (Economy) Quality Construction</h2>
<p>Isme standard quality ka material use hota hai, jaise normal cement, local tiles, aur basic wiring.</p>
<ul>
<li><strong>Rate:</strong> ₹1,500 - ₹1,700 per sq. ft.</li>
<li><strong>Kiske liye sahi hai:</strong> Agar aap gaon ya outer limits mein rent ke liye building bana rahe hain.</li>
</ul>

<h2>Premium (Standard) Quality Construction</h2>
<p>Isme branded material lagta hai jaise UltraTech cement, Tata Tiscon steel, vitrified tiles, aur Asian Paints.</p>
<ul>
<li><strong>Rate:</strong> ₹1,800 - ₹2,200 per sq. ft.</li>
<li><strong>Kiske liye sahi hai:</strong> Khud ke rehne ke liye (Residential bungalows) jahan aap lamba chalne wala kaam chahte hain.</li>
</ul>

<h2>Luxury Quality Construction</h2>
<p>Isme imported Italian marble, UPVC soundproof windows, branded modular kitchen, aur smart home automation aata hai.</p>
<ul>
<li><strong>Rate:</strong> ₹2,500 - ₹3,500+ per sq. ft.</li>
<li><strong>Kiske liye sahi hai:</strong> South Mumbai, Bandra, ya Juhu ke premium villas aur high-end bungalows.</li>
</ul>

<h2>Kharcha Kahan Banta Hai? (Cost Breakdown)</h2>
<ol>
<li><strong>Civil Work & Structure:</strong> 35% - 40% (Cement, Steel, Bricks, RMC)</li>
<li><strong>Flooring & Tiling:</strong> 15% - 20% (Granite, Marble, Vitrified Tiles)</li>
<li><strong>Plumbing & Bathroom:</strong> 10% - 15% (CPVC pipes, Jaquar/Kohler fittings)</li>
<li><strong>Electricals & Lighting:</strong> 10% - 12% (Polycab wires, Legrand switches, False ceiling)</li>
<li><strong>Woodwork & Doors:</strong> 15% - 20% (Teak wood frames, Flush doors, UPVC windows)</li>
<li><strong>Painting:</strong> 5% - 8% (Putty, Primer, Royale Emulsion)</li>
</ol>

<h2>Conclusion</h2>
<p>Sasta thekedar dhoondhne ke chakkar mein quality se compromise mat karein. <em>AMS Civil Construction</em> par hum 100% transparent rate aur branded material ka guarantee dete hain.</p>
<p>Aapke plot ka exact cost nikalne ke liye aaj hi hume call karein: <strong>+91 87793 91690</strong>.</p>
    `,
    seoKeywords: "ghar banane ka kharcha, construction rate per sq ft in mumbai, civil contractor price, thekedar ka rate",
    author: "AMS Estimation Team",
    locationTags: ["Mumbai", "Thane", "Navi Mumbai"],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Bathroom Renovation Rate in Mumbai: Asli Kharcha Kitna Hai?",
    slug: "bathroom-renovation-rate-in-mumbai",
    excerpt: "Mumbai mein purane bathroom ko naya (remodel) karne ka total kharcha, tiles aur plumbing materials ke latest rate.",
    content: `
<h2>Purane Bathroom ka Renovation</h2>
<p>Mumbai ke flats mein sabse pehle jo cheez kharab hoti hai wo hai bathroom. Leakage, tooti hui tiles, aur purane pipes aapke ghar ki khoobsurti kharab karte hain. Lekin ek bathroom ko poori tarah tod kar naya banane ka kharcha kitna aata hai?</p>

<h2>Total Cost Estimate (2026)</h2>
<p>Ek standard Mumbai bathroom (size: 7x4 feet ya 5x5 feet) ko renovate karne mein aamtaur par <strong>₹80,000 se lekar ₹1.5 Lakhs</strong> tak ka kharcha aata hai.</p>

<h2>Step-by-Step Kharcha:</h2>

<h3>1. Tod-Phod (Demolition) aur Debris Removal - ₹8,000 to ₹12,000</h3>
<p>Purani tiles, commode, aur plaster ko todna. Mumbai mein malba (debris) phekne ka charge bahut zyada hota hai kyunki BMC ke rules strict hain.</p>

<h3>2. Waterproofing (Sabse Zaroori) - ₹10,000 to ₹15,000</h3>
<p>Agar ye sahi se nahi hua, toh niche wale padosi ke ghar mein paani tapkega aur aapko dobara tiles todni padengi. Hum Dr. Fixit Pidifin 2K aur Brick Bat Coba method use karte hain.</p>

<h3>3. Plumbing & Concealed Piping - ₹15,000 to ₹25,000</h3>
<p>Purane GI pipes hata kar naye CPVC pipes (Astral ya Ashirvad) lagana. Agar aapko concealed flush tank (Geberit) lagana hai, toh thoda kharcha badhega.</p>

<h3>4. Tiles aur Tiling Labour - ₹20,000 to ₹40,000</h3>
<p>High-quality anti-skid floor tiles aur glazed wall tiles. Labour charge ₹40-₹60 per sq.ft. hota hai plus cement aur epoxy grout ka cost.</p>

<h3>5. Sanitaryware & CP Fittings - ₹25,000 to ₹60,000+</h3>
<p>Commode, washbasin, shower diverter, aur taps. Agar aap basic Jaquar lagate hain toh sasta padega. Agar Grohe ya Kohler lagayenge toh budget double ho jayega.</p>

<h2>Kaam Kitne Din Mein Hota Hai?</h2>
<p>Ek bathroom ko renovate karne mein <strong>8 se 12 din</strong> lagte hain, kyunki waterproofing aur cement ko sookhne (curing) ka time chahiye hota hai.</p>

<p><em>Kya aapka bathroom leak kar raha hai? AMS Civil Construction aapko leakage-free, luxury bathroom bana kar dega. Aaj hi free estimate ke liye call karein.</em></p>
    `,
    seoKeywords: "bathroom renovation cost mumbai, tiles labour rate, bathroom leakage solution, plumbing charges",
    author: "AMS Plumb & Tile Team",
    locationTags: ["Mumbai", "Thane", "Andheri", "Bandra"],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Best Civil Mistry & Thekedar in Mumbai: Sahi Kaam, Sahi Daam",
    slug: "best-civil-mistry-thekedar-mumbai",
    excerpt: "Ghar ka civil work karwane ke liye ek bharosemand thekedar aur mistry kaise dhoondein? Jaaniye tips aur rates.",
    content: `
<h2>Bharosemand Thekedar Dhoondna Asaan Nahi</h2>
<p>Civil work (jaise tiles lagana, deewar todna, plaster karna) mein sabse bada risk hota hai local thekedar ya mistry ka paisa lekar bhaag jana, ya aadha-adhura, kharab kaam karke chhod dena.</p>
<p>Mumbai mein ek acha aur imandaar civil thekedar milna bahut mushkil hai. Yahan hum aapko batayenge ki sahi contractor kaise chunein aur 2026 mein labour rates kya chal rahe hain.</p>

<h2>Ache Thekedar Ki Pehchaan (Signs of a Good Contractor)</h2>
<ol>
<li><strong>Quotation in Writing:</strong> Ek acha contractor aapko verbally rate nahi batayega. Wo aapko proper likhit BOQ (Bill of Quantities) dega jisme har item ka rate, quantity aur total cost likhi hogi.</li>
<li><strong>Material Guarantee:</strong> Wo aapse nahi kahega ki "aap material laa do main laga dunga". Ek professional company end-to-end material ki responsibility leti hai (Tata Tiscon, UltraTech, Polycab etc.).</li>
<li><strong>Office & Experience:</strong> Uska ek physical office hona chahiye aur kam se kam 10-15 saal ka experience hona chahiye Mumbai ke market mein.</li>
<li><strong>No Daily Demand:</strong> Jo thekedar roz aakar "sir 5000 de do, labour ko dena hai" bole, uske paas apna working capital nahi hai. Aise thekedar kaam beech mein rok dete hain.</li>
</ol>

<h2>2026 Labour Rates (Approx) Mumbai Mein</h2>
<ul>
<li><strong>Tiles Mistry Labour Rate:</strong> ₹45 se ₹60 per sq. ft.</li>
<li><strong>Granite Fixing Rate:</strong> ₹100 se ₹150 per sq. ft.</li>
<li><strong>Plaster Labour Rate:</strong> ₹30 se ₹45 per sq. ft.</li>
<li><strong>Painting Labour Rate:</strong> ₹15 se ₹25 per sq. ft.</li>
<li><strong>Brickwork (Deewar banane ka) Rate:</strong> ₹40 se ₹60 per sq. ft.</li>
</ul>

<h2>AMS Civil Construction: Aapka Trusted Partner</h2>
<p>Hum local mistry nahi hain, hum professional Civil Engineers aur Contractors hain. Humare paas khud ki skilled labour team hai jo pichle 25 saal se Mumbai mein top-class kaam kar rahi hai.</p>
<p>Humare saath aapko milta hai: <strong>On-time delivery, No hidden cost, aur 1 saal ki Quality Guarantee.</strong> Koi bhi civil work ho, humse sampark karein!</p>
    `,
    seoKeywords: "civil mistry near me, tiles mistri mumbai, civil thekedar contact number, plaster labour rate",
    author: "AMS Management",
    locationTags: ["Mumbai", "Kurla", "Ghatkopar", "Kalyan"],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('amscivilwork');
    const blogsCol = db.collection('blogs');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const blog of blogs) {
      const existing = await blogsCol.findOne({ slug: blog.slug });
      if (!existing) {
        await blogsCol.insertOne(blog);
        console.log('Inserted: ' + blog.slug);
        insertedCount++;
      } else {
        console.log('Skipped (already exists): ' + blog.slug);
        skippedCount++;
      }
    }

    console.log('Done! Inserted ' + insertedCount + ', Skipped ' + skippedCount + '.');
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await client.close();
  }
}

seed();
