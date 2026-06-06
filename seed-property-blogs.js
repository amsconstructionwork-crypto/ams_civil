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
        title: "Mumbai Property Buying Guide 2026: 5 Crucial Things to Check Before Buying a Flat",
        slug: "mumbai-property-buying-guide-2026",
        excerpt: "Are you planning to buy a new flat in Mumbai? Naya ghar lene se pehle in 5 zaroori baaton ka dhyan zaroor rakhein. Don't make a mistake that costs you lakhs in renovation later!",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "buy flat in mumbai, property buying guide 2026, real estate investment mumbai, pre possession inspection, flat renovation checklist, rera registered projects",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>The Ultimate Guide to Buying Property in Mumbai (2026)</h2>
<p>Buying a property in Mumbai is a massive financial decision. Mumbai ka real estate market bahut expensive aur fast-moving hai. Zyadatar log RERA registration aur loan interest rates par focus karte hain, lekin <strong>Civil Construction Quality</strong> ko ignore kar dete hain. Yeh ek choti si bhool baad mein lakho rupaye ka nuksan (loss) karwa sakti hai.</p>

<p>Is guide mein hum aapko batayenge ki ek flat final karne se pehle aapko physically kya-kya check karna chahiye.</p>

<h3>1. Structural Quality & Wall Cracks Check Karein</h3>
<p>Naya flat dekhte waqt hamesha deewaron (walls) par dhyan dein. Agar under-construction ya nayi building mein hairline cracks dikh rahe hain, toh iska matlab hai ki builder ne plaster of paris (POP) ya cement mein compromise kiya hai. Ghar lene ke baad aapko <a href="/services/plaster-work">Plaster aur Painting</a> par dobara kharcha karna padega.</p>

<h3>2. Bathroom aur Kitchen Waterproofing (The Hidden Danger)</h3>
<p>Mumbai monsoons are brutal. Agar bathroom ka base waterproofed nahi hai, toh paani aapke bedroom ki deewar tak aayega (Dampness/Seelan). Ghar lene se pehle builder se zaroor puchein ki unhone kaun sa waterproofing compound use kiya hai. Agar doubt ho, toh possession se pehle kisi expert contractor se <a href="/services/waterproofing">Bathroom Waterproofing</a> check karwayein.</p>

<h3>3. Floor Leveling and Tile Hollow Sounds</h3>
<p>Naye flat mein farsh par chalte waqt kisi chhadi (stick) se tiles par halke se knock karein. Agar khokha (hollow) sound aata hai, toh iska matlab hai ki tile ke neeche cement sahi se nahi bhara gaya hai. Aisi tiles jaldi toot jayengi aur aapko pura <a href="/services/tiles-work">Flooring Work</a> dobara karwana padega.</p>

<h3>4. Check Plumbing & Drainage Slopes</h3>
<p>Bathroom aur balcony mein paani daal kar check karein. Agar paani drain (jaali) ki taraf aaram se nahi ja raha aur ek jagah jama (stagnant) ho raha hai, toh iska matlab hai ki 'Slope' galat diya gaya hai. Isse aapke bathroom mein hamesha badboo aur keede rahenge.</p>

<h3>5. Carpet Area vs Built-up Area Confusion</h3>
<p>Hamesha RERA carpet area check karein. Agar aapko lagta hai ki builder dwara diya gaya kitchen platform bahut chhota hai, toh chinta mat karein. Pura ghar pass hone ke baad aap humari madad se civil changes karke <a href="/services/kitchen-work">Custom Modular Kitchen Platform</a> banwa sakte hain.</p>

<h3>Need a Professional Pre-Possession Inspection?</h3>
<p>Lakhon rupaye property mein invest karne se pehle ek civil expert ko flat dikhana samajhdari hai. <strong>Mandal Civil Works</strong> ki expert team aapke flat ka thorough inspection kar sakti hai taaki aap hidden flaws (chhupe hue nuksan) se bach sakein. Agar flat mein changes ki zaroorat hai, toh hum aapko ek fixed renovation estimate bhi denge.</p>
<p><strong>Contact us today to book a free site visit and inspection!</strong></p>
        `
      },
      {
        title: "Under-Construction Flat vs Resale Property: What's the Best Choice for You?",
        slug: "under-construction-vs-resale-property-mumbai",
        excerpt: "Should you invest in an under-construction project or buy a resale flat? Dono ke apne pros aur cons hain. Jaaniye aapke budget aur zarurat ke hisaab se kya sahi rahega.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "under construction vs resale flat, buy old flat in mumbai, resale property renovation, real estate investment tips, flat interior cost, civil contractor mumbai",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>The Big Dilemma: Under-Construction Ya Resale Flat?</h2>
<p>Jab bhi koi Mumbai, Thane ya Navi Mumbai mein ghar dhoondhta hai, toh sabse pehla sawal yahi aata hai: <em>"Kya main builder se naya (Under-Construction) flat lu, ya kisi se purana (Resale) flat lu?"</em></p>
<p>Dono options ke apne fayde (Pros) aur nuksan (Cons) hain. Aaiye isko detail mein samajhte hain ek civil construction ke nazariye se.</p>

<h3>Option 1: Under-Construction Flats (Naya Project)</h3>
<p>Aap ek RERA registered naye project mein ghar book karte hain jo 2-3 saal baad bankar tayar hoga.</p>

<h4>Fayde (Pros):</h4>
<ul>
  <li><strong>Modern Amenities:</strong> Nayi buildings mein swimming pool, gym aur club house jaisi suvidhayein milti hain.</li>
  <li><strong>Payment Flexibility:</strong> Aapko construction linked plan milta hai, yani thoda-thoda paisa dena hota hai.</li>
  <li><strong>Choice of Customization:</strong> Pura banne ke baad aap apne hisaab se usko ekdum naya <a href="/services/full-interior-work">Premium Interior Look</a> de sakte hain.</li>
</ul>

<h4>Nuksan (Cons):</h4>
<ul>
  <li><strong>Waiting Time:</strong> Possession milne mein saalo lag jate hain.</li>
  <li><strong>GST Cost:</strong> Under-construction properties par GST lagta hai.</li>
</ul>

<h3>Option 2: Resale Flats (Ready-to-Move Old Property)</h3>
<p>Aap ek 5 se 15 saal purana flat kharidte hain jo turant shift hone ke liye ready hota hai.</p>

<h4>Fayde (Pros):</h4>
<ul>
  <li><strong>No GST:</strong> Purani property par GST nahi lagta, jisse lakho rupaye bachte hain.</li>
  <li><strong>Prime Locations:</strong> Achhi aur established locations (Station ke paas) mein purani buildings easily mil jati hain.</li>
  <li><strong>Bada Carpet Area:</strong> Puraane flats mein loading kam hoti hai, isliye unka andar ka hissa (carpet area) naye flats ke mukable bada hota hai.</li>
</ul>

<h4>Nuksan (Cons):</h4>
<ul>
  <li><strong>Maintenance & Renovation Cost:</strong> Puraane flats mein plumbing aur wiring kharab ho sakti hai. Deewaron par seelan ho sakti hai. Aapko ek <a href="/services/full-interior-work">Complete Home Renovation</a> ki zarurat padegi.</li>
</ul>

<h3>The Winning Strategy: Buy Resale & Renovate!</h3>
<p>Smart investors aur buyers aajkal <strong>"Buy Resale and Renovate"</strong> ka formula apna rahe hain. Ek purana flat saste damo (discounted rates) mein kharidiye. GST ka paisa bachaiye, aur us bache hue paise se ghar ka ekdum premium renovation karwaiye.</p>

<p>Jab aap purane flat ka <a href="/services/bathroom-renovation">bathroom todkar nayi tiles</a> lagwate hain, <a href="/services/kitchen-work">naya modular kitchen</a> banwate hain, aur <a href="/services/pop-work">POP ceiling</a> lagwate hain, toh wo flat andar se ekdum kisi 5-Star luxury apartment jaisa lagne lagta hai.</p>

<h3>How Mandal Civil Works Can Help?</h3>
<p>Resale property kharidne se pehle humein bulayein. Hum aapko ek exact estimate denge ki is purane flat ko "Brand New" banane mein kitna kharcha aayega. Hamari turnkey civil team tod-fod (demolition) se lekar aakhri paint coat tak saara kaam legally aur professionally karti hai.</p>
        `
      },
      {
        title: "Why Builders Sell 'Bare Shell' Flats & How to Convert Them into Luxury Homes",
        slug: "bare-shell-flats-interior-conversion-mumbai",
        excerpt: "Mumbai ke top developers aajkal 'Bare Shell' flats kyu bech rahe hain? Jaaniye kya hota hai bare shell aur is khaali flat ko apne sapno ka mahal banane mein kitna kharcha aata hai.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "bare shell flat meaning, builder finish flat, interior design cost mumbai, luxury home renovation, full interior civil work, pop false ceiling cost",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>What is a 'Bare Shell' Flat?</h2>
<p>Agar aap Mumbai, Pune ya Navi Mumbai mein kisi premium builder (Lodha, Godrej, Hiranandani) se flat lete hain, toh wahan aksar aapko ek <strong>'Bare Shell'</strong> ya <strong>'Warm Shell'</strong> flat milta hai. Iska matlab hota hai ek aisa flat jisme sirf basic deewarein (walls) aur farsh (screeding) hoti hai. Na koi tiles hoti hain, na kitchen ka platform, aur na hi proper bathroom fittings.</p>

<h3>Builders Bare Shell Flats Kyun Dete Hain?</h3>
<p>Builders ne yeh concept isliye shuru kiya kyunki har buyer (kharidar) ki pasand alag hoti hai. Koi imported Italian marble lagana chahta hai, toh koi wooden flooring. Pehle builders sabko ek jaisi tiles dete the jise log possession ke baad tod dete the. Material waste rokne ke liye aur buyers ko customization ki azaadi dene ke liye 'Bare Shell' flats market mein aaye.</p>

<h3>The Challenge: Is Khaali Flat Ko Ghar Kaise Banayein?</h3>
<p>Jab aapko bare shell flat milta hai, toh asal kaam tab shuru hota hai. Aap ek aam mistri (local labour) par bharosa nahi kar sakte kyunki aisi premium buildings ke rules (working hours, material movement) bahut strict hote hain. Aapko ek professional <a href="/services/full-interior-work">Turnkey Civil Contractor</a> ki zaroorat hoti hai.</p>

<h3>Step-by-Step Civil Work in a Bare Shell Flat:</h3>

<h4>1. Flooring & Tiling (Zameen aur Deewarein)</h4>
<p>Sabse pehle ghar ka floor level kiya jata hai. Uske baad client ki pasand ke hisaab se <a href="/services/tiles-work">Premium Vitrified Tiles ya Italian Marble</a> laya jata hai. Bathroom mein waterproof base banakar designer tiles lagayi jati hain.</p>

<h4>2. Plumbing & Electrical Layout</h4>
<p>Builder sirf ek main connection point deta hai. Hum aapke requirement ke hisaab se chipe hue (concealed) pipes aur wiring daalte hain. Is stage par <a href="/services/waterproofing">Waterproofing</a> par special dhyan diya jata hai.</p>

<h4>3. The Kitchen Platform</h4>
<p>Bare shell flat mein kitchen platform nahi hota. Hum red brick ya Siporex blocks ka use karke ek mazboot <a href="/services/kitchen-work">Civil Kitchen Platform</a> banate hain, jiske upar Granite ya Quartz stone fix kiya jata hai.</p>

<h4>4. False Ceiling & Plaster</h4>
<p>Ghar ko luxury feel dene ke liye ek khoobsurat <a href="/services/pop-work">POP False Ceiling</a> banayi jati hai jismein Cove lights lagti hain. Deewaron ko smooth karne ke liye POP punning ki jati hai.</p>

<h4>5. Painting & Finishing</h4>
<p>Aakhir mein putty ke 2-3 coats aur high-quality washable paint (Royal ya Velvet finish) lagaya jata hai, jisse <a href="/services/painting">Painting Work</a> complete hota hai.</p>

<h3>The Cost Factor (Kharcha Kitna Aayega?)</h3>
<p>Ek standard bare shell flat ko fully livable aur premium banane ka civil kharcha lagbhag ₹800 se ₹1,500 per sq.ft aata hai, jo puri tarah material ki quality par depend karta hai.</p>

<p><strong>Mandal Civil Works</strong> bade complexes aur high-rises mein bare shell flats ko luxury homes mein convert karne ka specialist hai. Hum housing society ke saare rules follow karte hue aapko ek hassle-free experience dete hain. Contact us for a detailed 3D design and quotation!</p>
        `
      },
      {
        title: "Navi Mumbai & Thane Real Estate: Plot Lekar Bungalow Banwane Ka Kharcha",
        slug: "navi-mumbai-thane-plot-bungalow-construction-cost",
        excerpt: "Mumbai ke crowded flats se door, log ab Navi Mumbai aur Thane ke outskirts mein plots lekar khud ka bungalow banwa rahe hain. Jaaniye plot kharidne ke fayde aur construction ka pura hisaab.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "buy plot in navi mumbai, bungalow construction cost in thane, build your own home, civil contractor navi mumbai, turnkey bungalow builders, real estate trends 2026",
        locationTags: ["Navi Mumbai", "Thane", "Central Line", "Palghar", "Maharashtra"],
        content: `
<h2>The New Real Estate Trend: Build Your Own Bungalow</h2>
<p>Pichle kuch saalon mein Mumbai ke real estate market mein ek bahut bada badlaav aaya hai. Log ab chote aur crowded 2BHK flats ke liye crore rupaye dene ke bajaye, <strong>Navi Mumbai (Panvel, Kharghar) aur Thane (Badlapur, Kalyan)</strong> ke aage khuli zameen (Plots) kharid rahe hain taaki apna khud ka aalishan Bungalow banwa sakein.</p>

<p>Plot lekar khud ka ghar banwane mein flexibility, privacy aur aage chal kar zabardast property appreciation milta hai. Lekin sabse bada challenge hota hai: <strong>"Bungalow banwaye kis se?"</strong></p>

<h3>Bungalow Banwane Ka Process Aur Cost (2026 Estimate)</h3>
<p>Aapne plot toh le liya, ab ek proper ghar khada karne ke liye aapko in steps ko samajhna hoga:</p>

<h4>1. Foundation & RCC Structure</h4>
<p>Zameen ki mitti check karne ke baad ek mazboot RCC (Reinforced Cement Concrete) foundation banayi jati hai. Ye building ka skeleton (haddiyaan) hota hai jisme sariya (steel) aur cement lagta hai. Yahan quality mein koi compromise nahi chalega.</p>

<h4>2. Brickwork & Plastering</h4>
<p>Structure tayar hone ke baad deewarein (walls) khadi ki jati hain aur unpar andar aur bahar se <a href="/services/plaster-work">Plaster Work</a> kiya jata hai.</p>

<h4>3. Heavy Duty Waterproofing</h4>
<p>Bungalow mein charo taraf se baarish ka paani aata hai. Isliye terrace, balcony aur zameen se lagti hui (plinth) deewaron par chemical <a href="/services/waterproofing">Waterproofing</a> bahut zaroori hai.</p>

<h4>4. Premium Finishing</h4>
<p>Aakhri hisse mein <a href="/services/tiles-work">Marble ya Vitrified Flooring</a>, bade <a href="/services/bathroom-renovation">Luxury Bathrooms</a>, aur khoobsurat <a href="/services/painting">Exterior/Interior Painting</a> hoti hai. Bahar ke hisse mein aap ek chota sa lawn ya <a href="/services/compound-wall-work">Compound Wall</a> bhi banwa sakte hain.</p>

<h3>Kharcha Kitna Aata Hai? (Construction Cost per Sq.Ft)</h3>
<p>Agar aap ek Standard se Premium level ka bungalow banwa rahe hain, toh Maharashtra (Navi Mumbai/Thane) mein construction cost lagbhag <strong>₹1,800 se ₹2,500 per sq. ft.</strong> tak aati hai. (Isme zameen ki keemat shamil nahi hai, yeh sirf construction ka rate hai).</p>
<ul>
  <li><strong>Standard Quality:</strong> ₹1,600 - ₹1,800 / sq.ft (Basic tiles, normal fittings)</li>
  <li><strong>Premium Quality:</strong> ₹2,000 - ₹2,500 / sq.ft (Vitrified tiles, branded CP fittings, false ceiling)</li>
  <li><strong>Luxury Segment:</strong> ₹3,000+ / sq.ft (Italian marble, smart home automation, imported fittings)</li>
</ul>

<h3>Turnkey Construction Contract Kyun Zaroori Hai?</h3>
<p>Khud material laana aur 10 alag-alag mistriyon ko handle karna ek aam aadmi ke liye namumkin hai. <strong>Mandal Civil Works</strong> ek <a href="/services/bungalow-construction">Turnkey Bungalow Builder</a> hai.</p>
<p>Iska matlab hai ki aap sirf apna plot aur sapna (vision) humein dijiye. Hum architect ki drawing, government approvals, material procurement, aur construction sab kuch manage karenge. Jab ghar puri tarah ban jayega, tab hum aapko chabi (keys) hand-over karenge.</p>

<p>Agar aapka plot Navi Mumbai ya Thane region mein hai, toh apni details aaj hi share karein aur ek transparent quotation payein!</p>
        `
      }
    ];

    for (const blog of blogs) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
      console.log("Upserted Property Blog: " + blog.title);
    }
    console.log("Property Blogs Seeding complete! All 4 long-form articles published.");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
