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
        title: "Mumbai Mein Ghar Banane Ka Kharcha 2026 (1000 Sq Ft Construction Cost)",
        slug: "mumbai-mein-ghar-banane-ka-kharcha-2026",
        excerpt: "Agar aap Mumbai, Navi Mumbai ya Thane mein apna naya ghar ya bungalow banane ka soch rahe hain, toh jaaniye 2026 ka exact construction cost per sq ft. Material rates se lekar labour charges tak sab kuch yahan padhein.",
        author: "AMS Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "ghar banane ka kharcha, construction cost in mumbai 2026, 1000 sq ft house construction cost, civil contractor mumbai, ghar banane wala",
        content: `
<h2>Mumbai Mein Ghar Banane Ka Kharcha: 2026 Updated Guide</h2>
<p>Agar aap Mumbai, Navi Mumbai ya Thane mein apna naya ghar (bungalow ya villa) banane ka soch rahe hain, toh sabse pehla sawal aata hai — <strong>"Kharcha kitna aayega?"</strong></p>
<p>2026 mein material ke daam thode badhe hain, isliye ek achha budget plan karna bahut zaroori hai. Chaliye dekhte hain ki 1000 Sq. Ft. ka ghar banane mein kya expenses aate hain.</p>

<h3>1. Standard Construction Rate (Basic to Premium)</h3>
<ul>
  <li><strong>Standard Quality:</strong> ₹1,500 – ₹1,800 per sq ft (Normal tiles, standard electrical fittings)</li>
  <li><strong>Premium Quality:</strong> ₹1,900 – ₹2,500 per sq ft (Branded vitrified tiles, Teakwood doors, premium paint)</li>
  <li><strong>Luxury Quality:</strong> ₹2,500 – ₹4,000+ per sq ft (Italian marble, smart home wiring, luxury sanitary fittings)</li>
</ul>

<h3>2. Material Vs Labour Cost Breakdown</h3>
<p>Jab bhi aap kisi contractor ko contract dete hain, toh kharcha 2 hisson mein baanta jaata hai:</p>
<ul>
  <li><strong>Material (Cement, Steel, Bricks, Sand):</strong> 60% of total cost.</li>
  <li><strong>Labour (Mistri, Plumber, Electrician):</strong> 40% of total cost.</li>
</ul>

<h3>3. Hidden Costs Jo Log Bhool Jaate Hain</h3>
<p>Ghar banate waqt sirf cement-eent ka kharcha nahi hota. Kuch hidden costs bhi hote hain:</p>
<ul>
  <li><strong>Municipal Approvals (BMC/NMMC/TMC):</strong> Approval lene ka legal cost.</li>
  <li><strong>Waterproofing:</strong> Mumbai ki baarish se bachne ke liye 100% zaroori. <em>Never compromise on this!</em></li>
  <li><strong>Interior Work:</strong> POP false ceiling aur modular kitchen ka kharcha alag se hota hai.</li>
</ul>

<h3>Kisko Contract Dena Chahiye?</h3>
<p>Hamesha ek <strong>verified civil contractor</strong> ko chunein jiske paas apna labour aur experience ho. "Thekedar" badalne se bachne ke liye, <strong>AMS Civil Construction</strong> jaise purane aur trusted builders ko contact karein jo 25 saal se Mumbai mein kaam kar rahe hain.</p>
<br/>
<p><strong>Free site measurement aur quote ke liye call karein: <a href="tel:+918779391690">+91 87793 91690</a></strong></p>
        `
      },
      {
        title: "Bathroom Renovation Cost in Mumbai: Saste Aur Achhe Tiles Kaise Chunein?",
        slug: "bathroom-renovation-cost-mumbai-tiles",
        excerpt: "Bathroom renovation ka exact kharcha kitna hai Mumbai mein? Plumbing, waterproofing aur tiles ka total cost estimate. Jaaniye kaise aap kam budget mein ek luxury bathroom design kar sakte hain.",
        author: "AMS Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "bathroom renovation cost mumbai, tiles lagane ka rate, best tiles mistri in mumbai, plumbing cost, bathroom remodeling",
        content: `
<h2>Bathroom Renovation Cost in Mumbai (2026)</h2>
<p>Mumbai ke flats mein bathroom chote hote hain, par sabko ek premium aur luxury feel chahiye hota hai. Ek complete <strong>bathroom renovation</strong> ka kharcha Mumbai mein ₹40,000 se leke ₹1,20,000 tak jaa sakta hai.</p>

<h3>Kharcha Kahan Hota Hai? (Cost Breakdown)</h3>

<h4>1. Tod-Phod aur Waterproofing (Civil Work)</h4>
<p>Purani tiles nikalna aur naye sire se waterproofing karna sabse critical step hai. Agar yahan galti hui, toh niche waale floor par leakage hoga.</p>
<ul>
  <li><strong>Cost:</strong> ₹10,000 – ₹15,000</li>
  <li><strong>Expert Tip:</strong> Dr. Fixit ya equivalent standard chemical ka double coat zaroor lagwayein.</li>
</ul>

<h4>2. Plumbing aur Electricals</h4>
<p>Puraani pipes ko badalkar nayi CPVC/UPVC pipes lagana zaroori hai. Saath hi naye geyser aur exhaust ke points dena.</p>
<ul>
  <li><strong>Cost:</strong> ₹12,000 – ₹20,000 (Labour + Material)</li>
</ul>

<h4>3. Bathroom Tiles Aur Lagane Ka Rate</h4>
<p>Aapke bathroom ka look completely tiles par depend karta hai. Mumbai mein <strong>tiles mistri</strong> ka rate ₹40 se ₹80 per sq ft hota hai.</p>
<ul>
  <li><strong>Material Cost:</strong> ₹10,000 – ₹25,000 (Anti-slip floor tiles aur glossy wall tiles)</li>
  <li><strong>Tip:</strong> Hamesha light colour ki tiles use karein, isse chota bathroom bada dikhta hai.</li>
</ul>

<h4>4. Sanitary Fittings (WC, Washbasin, Shower)</h4>
<p>Jaquar, Hindware ya Cera jaisi brands ke basic fittings lagayenge toh kharcha kam aayega. Premium fittings mein kharcha ₹30,000+ jaa sakta hai.</p>
<ul>
  <li><strong>Cost:</strong> ₹15,000 – ₹40,000</li>
</ul>

<h3>Kisko Hire Karein?</h3>
<p>Bathroom banwana kisi local plumber ka kaam nahi hai. Iske liye ek proper team chahiye jismein tiles mistri, plumber, aur civil worker shamil ho. <strong>AMS Civil Construction</strong> Mumbai mein ek single point of contact provide karta hai jisse aapka bathroom time par aur bina kisi headache ke ban jaata hai.</p>
<br/>
<p><strong>Free Quote & Inspection ke liye Call karein: <a href="tel:+918779391690">+91 87793 91690</a></strong></p>
        `
      },
      {
        title: "Mumbai Monsoons Se Pehle Waterproofing Kyun Zaroori Hai? (Top 5 Mistakes)",
        slug: "waterproofing-solutions-mumbai-monsoon",
        excerpt: "Mumbai ki heavy baarish mein seelan (dampness) aur leakage aam baat hai. Jaaniye 5 aisi galtiyan jo log ghar banate ya repair karte waqt karte hain, aur best waterproofing solutions.",
        author: "AMS Civil Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "waterproofing contractor mumbai, roof waterproofing, wall seelan repair, leakage solution mumbai, best civil contractor",
        content: `
<h2>Waterproofing in Mumbai: Seelan Aur Leakage Se Bachne Ke Tarike</h2>
<p>Mumbai ki baarish (Monsoons) apne saath bahut si problems le aati hai, jismein sabse badi problem hai diwaaron mein <strong>seelan (dampness)</strong> aur chhat (roof) se leakage. Agar iska ilaj sahi waqt par nahi kiya gaya, toh aapka mehenga paint aur furniture dono kharab ho sakte hain.</p>

<h3>Log Waterproofing Mein Kya Galtiyan Karte Hain?</h3>

<h4>Mistake 1: Sasta Chemical Use Karna</h4>
<p>Paisa bachane ke chakkar mein log saste local chemicals use karte hain jo 1 saal mein hi kharab ho jaate hain. Hamesha branded polymers (like Dr. Fixit, Fosroc ya Sika) ka use karein.</p>

<h4>Mistake 2: Bahar Ki Deewar (External Walls) Ko Ignore Karna</h4>
<p>Log sirf andar paint lagwate hain, jabki leakage bahar ki diwaar ki cracks se aati hai. External wall par crack-fill aur waterproofing paint lagwana sabse zaroori hai.</p>

<h4>Mistake 3: Bathroom Waterproofing Par Dhyan Na Dena</h4>
<p>Ghar mein sabse zyada leakage bathroom se aati hai. Bathroom banate waqt "Brickbat Coba" ya liquid membrane waterproofing zaroor karwayein.</p>

<h3>Types of Waterproofing Solutions Hum Provide Karte Hain:</h3>
<ul>
  <li><strong>Terrace Waterproofing:</strong> Chhat (roof) par paani jama hone se bachane ke liye PU coating aur slope correction.</li>
  <li><strong>External Wall Waterproofing:</strong> High-rise buildings aur bungalows ke liye crack filling aur weather-proof coating.</li>
  <li><strong>Bathroom & Kitchen Waterproofing:</strong> Flooring todne se pehle base par chemical coating.</li>
  <li><strong>Water Tank Waterproofing:</strong> Safe, non-toxic epoxy coatings for underground and overhead tanks.</li>
</ul>

<h3>Kisko Bulaayein?</h3>
<p>Paint waale ko bula kar seelan par sirf putty aur paint lagwana ek temporary solution hai. Iske liye ek <strong>expert civil contractor</strong> ki zaroorat hoti hai jo problem ko jadd (root) se khatam kare.</p>
<p><strong>AMS Civil Construction</strong> pichle 25 saal se Mumbai aur Navi Mumbai mein 100% guaranteed waterproofing solutions provide kar raha hai.</p>
<br/>
<p><strong>Aaj hi site inspection book karein: <a href="tel:+918779391690">+91 87793 91690</a></strong></p>
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
    console.log("Seeding complete!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
