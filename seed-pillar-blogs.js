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
        title: "Mumbai Mein 1BHK aur 2BHK Flat Renovation Cost (2026 Breakdown)",
        slug: "1bhk-2bhk-flat-renovation-cost-mumbai-2026",
        excerpt: "Mumbai mein purana flat liya hai ya apne existing ghar ko naya look dena chahte hain? Jaaniye 1BHK aur 2BHK ke renovation ka exact kharcha, materials aur tips. Aasan bhasha mein puri jankari.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "flat renovation cost in mumbai, 1bhk renovation cost, 2bhk interior cost mumbai, civil work cost calculator, civil contractor mumbai, house painting cost",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>Mumbai Mein Ghar Renovation Ka Kharcha Kitna Aata Hai?</h2>
<p>Jab bhi hum Mumbai mein ek purana flat kharidte hain (resale flat) ya apne 10-15 saal purane ghar ko naya banwana chahte hain, toh sabse pehla sawal yahi aata hai: <strong>"Kharcha kitna aayega?"</strong> Mumbai jaise shehar mein jahan property rates aasmaan chhu rahe hain, wahan smart tarike se budget banakar civil work karwana bahut zaroori hai.</p>

<p>Is blog mein humne bilkul aasan bhasha mein ek standard 1BHK (400 - 500 sq ft) aur 2BHK (600 - 800 sq ft) ka pura estimate diya hai. Isse aapko apne budget ki planning karne mein bahut madad milegi.</p>

<h3>Renovation Mein Kya-Kya Kaam Hota Hai?</h3>
<p>Ghar ka renovation sirf paint karne se nahi hota. Ek 'Complete Renovation' mein neeche diye gaye kaam aate hain:</p>
<ol>
  <li><strong>Civil aur Demolition:</strong> Purani deewar todna, naye partitions banana, aur kachra nikalna.</li>
  <li><strong>Plumbing aur Bathroom:</strong> Nayi paani ki pipe line, tiles aur fittings lagana.</li>
  <li><strong>Flooring (Tiles Work):</strong> Puraane farsh par nayi vitrified ya marble tiles lagana.</li>
  <li><strong>Electrical Wiring:</strong> Naye switch boards, wiring aur light points dena.</li>
  <li><strong>POP aur False Ceiling:</strong> Chhat (ceiling) ko naya aur premium look dena.</li>
  <li><strong>Painting:</strong> Deewaron par putty aur naya paint karna.</li>
  <li><strong>Kitchen Work:</strong> Naya civil platform aur modular kitchen banana.</li>
</ol>

<h3>1BHK Flat Renovation Cost Estimate (Standard Quality)</h3>
<p>Agar aapka 1BHK flat lagbhag 450 sq.ft ka hai, toh ek achhe aur standard quality ke material ke sath yeh approximate kharcha aa sakta hai:</p>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr style="background-color: #334155; color: white;">
    <th>Kaam Ka Prakar (Type of Work)</th>
    <th>Estimated Cost (₹)</th>
  </tr>
  <tr><td>Breaking & Debris Removal (Kachra nikalna)</td><td>₹15,000 - ₹25,000</td></tr>
  <tr><td><a href="/services/tiles-work">Flooring (Tiles + Labour)</a></td><td>₹50,000 - ₹70,000</td></tr>
  <tr><td><a href="/services/bathroom-renovation">Bathroom Renovation (1 Bath)</a></td><td>₹45,000 - ₹65,000</td></tr>
  <tr><td><a href="/services/kitchen-work">Kitchen Civil Platform & Wall Tiles</a></td><td>₹30,000 - ₹45,000</td></tr>
  <tr><td>Plumbing & Electrical Work</td><td>₹40,000 - ₹60,000</td></tr>
  <tr><td><a href="/services/pop-work">POP Ceiling & Wall Plaster</a></td><td>₹30,000 - ₹45,000</td></tr>
  <tr><td><a href="/services/painting">Painting (Putty + Paint)</a></td><td>₹25,000 - ₹35,000</td></tr>
  <tr style="font-weight:bold; background-color: #f1f5f9; color: #0f172a;">
    <td>Total Estimated Cost (1BHK)</td>
    <td>₹2,35,000 - ₹3,45,000</td>
  </tr>
</table>

<h3>2BHK Flat Renovation Cost Estimate</h3>
<p>Ek 2BHK (lagbhag 700 sq.ft) flat jisme 2 bathroom hote hain, uska kharcha lagbhag itna aayega:</p>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr style="background-color: #334155; color: white;">
    <th>Kaam Ka Prakar (Type of Work)</th>
    <th>Estimated Cost (₹)</th>
  </tr>
  <tr><td>Breaking & Debris Removal</td><td>₹25,000 - ₹35,000</td></tr>
  <tr><td><a href="/services/tiles-work">Flooring (Tiles + Labour)</a></td><td>₹80,000 - ₹1,10,000</td></tr>
  <tr><td><a href="/services/bathroom-renovation">Bathroom Renovation (2 Bathrooms)</a></td><td>₹85,000 - ₹1,20,000</td></tr>
  <tr><td><a href="/services/kitchen-work">Kitchen Civil Platform & Wall Tiles</a></td><td>₹40,000 - ₹55,000</td></tr>
  <tr><td>Plumbing & Electrical Work</td><td>₹60,000 - ₹80,000</td></tr>
  <tr><td><a href="/services/pop-work">POP Ceiling & Wall Plaster</a></td><td>₹45,000 - ₹65,000</td></tr>
  <tr><td><a href="/services/painting">Painting (Putty + Paint)</a></td><td>₹40,000 - ₹55,000</td></tr>
  <tr style="font-weight:bold; background-color: #f1f5f9; color: #0f172a;">
    <td>Total Estimated Cost (2BHK)</td>
    <td>₹3,75,000 - ₹5,20,000</td>
  </tr>
</table>
<p><em>Note: Yeh ek basic estimate hai. Agar aap premium Italian marble ya imported fittings lagwate hain, toh kharcha badh sakta hai.</em></p>

<h3>Renovation Mein Paise Kaise Bachayein? (Cost Saving Tips)</h3>
<p>Aamtaur par budget fail (out of control) ho jata hai kyunki hum planning sahi nahi karte. In baaton ka dhyan rakhein:</p>
<ul>
  <li><strong>Material Khud Na Kharidein:</strong> Ek ache contractor ko bulk discount milta hai tiles aur cement par. Usey kharidne dein.</li>
  <li><strong>Ek Hi Contractor Chunein:</strong> Alag-alag mistri (Plumber alag, Painter alag) mat rakhein. Kisi ek ache <a href="/services/full-interior-work">Turnkey Civil Contractor</a> ko kaam dein jaisa ki <strong>Mandal Civil Works</strong>, isse paise aur samay dono bachenge.</li>
  <li><strong>Nayi Tiles Ke Upar Tiles Lagayein:</strong> Agar purani tiles majboot hain, toh unhe todne ke bajaye 'Tile-on-Tile' adhesive ka use karke uske upar nayi tiles lagwayein. Isse tod-fod ka kharcha bachega.</li>
</ul>

<h3>Aapka Budget Kya Hai?</h3>
<p>Ghar banana baar-baar nahi hota, isliye quality material aur sahi karigar (skilled labour) hona sabse zyada zaroori hai. <strong>Mandal Civil Works</strong> pichle 20 saalon se Mumbai mein premium aur budget dono tarah ke flats ka renovation kar raha hai.</p>
<p>Hum aapke ghar par aakar ek <strong>100% Free Site Inspection</strong> karte hain aur aapko ek clear, fixed budget estimate dete hain, jisme koi hidden cost (chupa hua kharcha) nahi hota.</p>

<p><strong>Agar aap bhi apna ghar renovate karna chahte hain, toh aaj hi humein call karein aur apna free quotation book karein!</strong></p>
        `
      },
      {
        title: "Mumbai Monsoons: Bathroom Leakage (Seelan) Ka Permanent Waterproofing Solution",
        slug: "bathroom-leakage-waterproofing-solution-mumbai",
        excerpt: "Mumbai ki heavy baarish mein deewaron par seelan aur bathroom se pani ka leak hona sabse aam pareshani hai. Jaaniye iska sahi aur permanent civil solution taaki aapka ghar hamesha safe rahe.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "waterproofing contractor mumbai, bathroom leakage repair, seelan treatment, wall dampness solution, roof waterproofing, bathroom tiles repair",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>Bathroom Leakage Aur Seelan (Dampness) Se Chhutkara Kaise Paayein?</h2>
<p>Agar aap Mumbai mein rehte hain, toh aapko pata hoga ki monsoon yahan kitna khatarnak hota hai. Sabse badi pareshani jo har dusre ghar mein hoti hai wo hai <strong>Deewaron par Seelan (Dampness)</strong> aana aur <strong>Bathroom se paani ka leak hona.</strong> Is leakage ki wajah se aapka naya paint kharab ho jata hai, POP girne lagta hai aur ghar mein ajeeb si smell aati hai.</p>

<p>Aaj hum aapko aasan shabdon mein batayenge ki yeh pareshani kyu hoti hai aur <strong>Mandal Civil Works</strong> iska 100% permanent solution kaise nikalta hai.</p>

<h3>Seelan Aur Leakage Kyu Hoti Hai? (Root Causes)</h3>
<ul>
  <li><strong>Tiles Ke Beech Ka Grout Nikalna:</strong> Bathroom ke farsh (floor) ki tiles ke beech jo white cement (grout) hota hai, wo samay ke sath ghis jata hai. Wahan se paani andar chala jata hai aur neeche wale floor par leak karta hai.</li>
  <li><strong>Plumbing Pipes Ka Phutna (Cracks):</strong> Purane GI (Loha) ke pipes mein zang (rust) lag jata hai aur wo deewar ke andar leak karne lagte hain.</li>
  <li><strong>Kharab Waterproofing:</strong> Jab builder ne building banayi thi, toh agar usne base mein chemical waterproofing nahi ki, toh dhire-dhire paani deewaron (walls) mein charhne lagta hai.</li>
  <li><strong>Baarish Ka Paani (Exterior Wall):</strong> Bahar ki deewaron par cracks aane se baarish ka paani andar ki deewar ka paint kharab kar deta hai.</li>
</ul>

<h3>Kya Aapka Paint Bar-Bar Nikal Raha Hai?</h3>
<p>Log galti kya karte hain ki jab seelan aati hai, toh us par naya paint ya putty laga dete hain. Lekin agle saal phir wahi problem aati hai. Jab tak aap <strong>Source (Paani kahan se aa raha hai)</strong> ko band nahi karenge, tab tak paint aapko bacha nahi payega. Iske liye ek expert civil contractor se <a href="/services/waterproofing">Waterproofing Work</a> karwana zaroori hota hai.</p>

<h3>Permanent Solution Kya Hai?</h3>

<h4>1. Bathroom Ki Epoxy Grouting (Low Budget)</h4>
<p>Agar leakage kam hai, toh hum bathroom ki tiles ke purane joints ko saf karke usme 'Epoxy Grout' aur chemical bhar dete hain. Yeh 100% waterproof hota hai aur paani ko zameen ke andar jaane se rokta hai.</p>

<h4>2. Complete Bathroom Waterproofing & Renovation (Permanent)</h4>
<p>Agar leakage bahut zyada hai aur pipes sad (rust) chuke hain, toh sabse best option hai tiles tod kar base level par aana. Hum Dr. Fixit ya Sika jaise top brands ke chemicals ka use karke double-coat brush waterproofing karte hain. Uske baad naye CPVC pipes aur nayi tiles lagate hain. Isse aane wale 15-20 saalon tak <a href="/services/bathroom-renovation">Bathroom Leakage</a> ki problem nahi aati.</p>

<h4>3. Exterior Wall Crack Filling</h4>
<p>Agar baarish ki wajah se paani aa raha hai, toh hum bahar ki deewar par scaffolding (jhula) lagakar cracks ko chemical compound se fill karte hain aur waterproof exterior paint karte hain.</p>

<h3>Kyu Chunein Mandal Civil Works Ko?</h3>
<p>Waterproofing ek aam mistri (painter ya tiler) ka kaam nahi hai. Ek choti si galti ki wajah se aapka lakho rupaye ka interior kharab ho sakta hai. <strong>Mandal Civil Works</strong> ke paas trained experts hain jo scientific tarike se pehle leakage check karte hain aur fir warranty ke sath theek karte hain.</p>
<p>Monsoon aane ka wait mat kijiye! Aaj hi apni seelan wali deewaron aur bathroom ki tasveer humein WhatsApp par bhejein aur <strong>Free Estimate</strong> payein.</p>
        `
      },
      {
        title: "Ghar Banwane Ya Renovate Karne Ke Liye Sahi Thekedar (Contractor) Kaise Chunein?",
        slug: "how-to-choose-right-civil-contractor-mumbai",
        excerpt: "Market mein hazaron thekedar hain, lekin ek bharosemand (trusted) civil contractor kaise dhundein jo aapke budget mein acha kaam karke de? Padhyein ye jaroori guide ghar banane se pehle.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "civil contractor mumbai, best construction company near me, find a builder in mumbai, home renovation expert, reliable building contractor",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>Sahi Civil Contractor (Thekedar) Chunna Kyun Zaroori Hai?</h2>
<p>Ghar banana ya usko renovate karna ek bahut bada sapna hota hai. Saari zindagi ki savings hum isme lagate hain. Lekin aksar hum sunte hain ki "Thekedar ne kaam beech mein chhod diya", ya "Material bahut ghatiya lagaya", ya "Bole hue budget se double kharcha kara diya".</p>

<p>Mumbai mein roz naye contractors aate hain, lekin sahi aur imandar (honest) contractor chunna sabse mushkil kaam hai. Is blog mein humne kuch simple points bataye hain jo aapko ek sahi civil contractor chunne mein madad karenge.</p>

<h3>1. Sirf 'Saste' (Lowest Quote) Ke Peeche Mat Bhagiye</h3>
<p>Yeh sabse badi galti hoti hai. Agar ek thekedar bol raha hai ki kaam 3 lakh mein hoga aur dusra 1.5 lakh mein karne ko taiyar hai, toh iska matlab hai ki sasta wala ghatiya material use karega ya baad mein "Hidden Charges" lagayega. Hamesha market rate samjhein aur ek reasonable (sahi) budget wale ko chunein.</p>

<h3>2. 'Turnkey' Contractor Chunein (Single Point Contact)</h3>
<p>Agar aap tiles ke liye alag aadmi, plumber alag, aur painter alag dhoondhenge, toh aapka aadha din sirf unki ladaiyan suljhane mein nikal jayega. Ek <a href="/services/full-interior-work">Turnkey Civil Contractor</a> jaise <strong>Mandal Civil Works</strong> ko chunein jiske paas saari teams hoti hain. Aapko sirf ek hi insaan se baat karni hogi.</p>

<h3>3. Purane Kaam (Previous Work) Zaroor Dekhein</h3>
<p>Contractor kitna bhi achha bole, uski sachai uske kiye hue kaam mein dikhti hai. Unse unke pichle projects ki photos ya videos maangein. Agar possible ho toh unke kisi client se baat karne ko bolein. Ek achha thekedar apni <a href="/gallery">Gallery</a> aur past projects dikhane mein khushi mehsoos karega.</p>

<h3>4. Agreement Aur Quotation Hamesha Written (Likhit) Mein Lein</h3>
<p>Zabani baaton par bharosa na karein. Hamesha ek proper Written Quotation lein jisme yeh clear likha ho:</p>
<ul>
  <li>Kaun sa material use hoga? (Jaise cement UltraTech hoga ya koi local brand?)</li>
  <li>Tiles kis range ki hongi?</li>
  <li>Kaam kab shuru hoga aur kab khatam hoga? (Timeline)</li>
  <li>Payment schedule kaisa rahega? (Advance kitna, aur kaam ke hisaab se kitna)</li>
</ul>

<h3>5. Technical Knowledge Check Karein</h3>
<p>Agar aapko apne ghar mein <a href="/services/wall-work">Wall Partition</a> karna hai ya <a href="/services/waterproofing">Waterproofing</a> karani hai, toh unse puchiye ki wo "Kaise" karenge. Agar wo theek se scientific tarika nahi samjha pa rahe, toh unhe kaam na dein. Ache thekedar chemicals, load bearing aur structural design ke baare mein jante hain.</p>

<h3>Mandal Civil Works Ko Hi Kyun Chunein?</h3>
<p><strong>Mandal Civil Works</strong> pichle lagbhag 20 saalon se Mumbai ki construction line mein ek respected brand hai. Hamare kaam ka tarika bahut transparent (saaf) hai.</p>
<ol>
  <li>Hum written estimate dete hain aur fixed price par kaam karte hain.</li>
  <li>Hamari team experienced aur highly trained hai.</li>
  <li>Aapko regular updates milte hain ki aapke ghar ka kaam kahan tak pahuncha hai.</li>
</ol>
<p>Chahe aapko ek naya <a href="/services/bungalow-construction">Bungalow banwana ho</a>, ya sirf ek <a href="/services/bathroom-renovation">Bathroom renovate karna ho</a>, hum har kaam ko utni hi importance dete hain. Aaj hi humein call karein aur ek stress-free construction experience enjoy karein.</p>
        `
      },
      {
        title: "Chhote Flats Ke Liye Best Space-Saving Modular Kitchen & Interior Ideas",
        slug: "space-saving-modular-kitchen-interior-ideas-small-flats-mumbai",
        excerpt: "Mumbai ke chhote (compact) 1BHK aur 1RK flats mein jagah (space) ki hamesha kami hoti hai. Jaaniye aisi civil aur interior tricks jisse aapka chhota flat bada aur sundar lagega.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "modular kitchen design, small flat interior mumbai, space saving furniture, kitchen renovation mumbai, 1rk interior design, 1bhk smart interior",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane", "Western Line", "Central Line"],
        content: `
<h2>Chhote Ghar Ko Bada Kaise Dikhayein?</h2>
<p>Mumbai mein "Space" (jagah) ki keemat sone (gold) se bhi zyada hai. Yahan aamtaur par flats chhote (compact) hote hain jaise ki 1RK ya 1BHK (300 - 450 sq.ft). In chhote flats mein saara samaan rakhna aur ghar ko sundar bhi dikhana ek bahut bada challenge hota hai.</p>

<p>Lekin kuch smart <strong>Civil Changes aur Interior Planning</strong> ke sath, aap apne compact ghar ko ek luxury premium look de sakte hain jahan jagah ki koi kami mehsoos nahi hogi.</p>

<h3>1. Kitchen Mein Jagah (Space) Kaise Banayein?</h3>
<p>Kitchen har ghar ki jaan hoti hai. Chhoti kitchen ko bada banane ke kuch civil tricks:</p>
<ul>
  <li><strong>Parallel Kitchen Platform:</strong> Agar aapki kitchen lamba aur patla (narrow) hai, toh ek bada L-shape platform banane ki jagah dono aamne-saamne chhote platforms banayein. Isse beech mein chalne ki jagah bachegi.</li>
  <li><strong><a href="/services/kitchen-work">Modular Kitchen Baskets</a>:</strong> Purane dabbo ko khule mein rakhne ke bajaye, Innotech baskets aur tall units lagwayein. Isme aadhe jagah mein double samaan aa jata hai.</li>
  <li><strong>Loft (Chhajja):</strong> Kitchen ke upar ki jagah ka istemal karke hum <a href="/services/wall-work">Civil Loft</a> banate hain, jahan aap apna extra (un-used) samaan store kar sakte hain.</li>
</ul>

<h3>2. Sliding Doors & Windows Ka Istemal</h3>
<p>Normal darwaze khulte waqt kafi jagah (swing space) gherte hain. Apne bathroom aur bedroom mein <strong>Sliding Doors</strong> ya folding doors lagwayein. Yahan tak ki ward-robes (Almirah) mein bhi sliding system lagwayein taaki bed aur almari ke beech chalne ki jagah mil sake.</p>

<h3>3. Deewaron Ka Rang (Wall Painting) aur POP</h3>
<p>Ghar ka colour sabse zyada effect dalta hai ki wo kitna bada dikhega. Dark colours (dark blue, brown) ghar ko chhota dikhate hain. Hamesha light shades (White, Ivory, Pastel) ka use karein. Saath hi ek simple aur sleek <a href="/services/pop-work">POP False Ceiling</a> banwayein jismein choti LED profile lights hon. Isse kamre mein roshni bhi zyada hogi aur height bhi zyada lagegi.</p>

<h3>4. Niche (Deewar Ke Andar Ki Jagah)</h3>
<p>Bathroom mein shampoo aur sabun rakhne ke liye alag se plastic ke stand na lagayein. Hum bathroom <a href="/services/bathroom-renovation">renovation ke waqt</a> deewar ke andar civil kat cutting karke <strong>'Niche' (Khaanche)</strong> banate hain jisme tiles lagti hain. Yeh space bhi bachata hai aur hotel jaisa premium look deta hai.</p>

<h3>5. Tiles Ka Sahi Chunav (Right Flooring)</h3>
<p>Chhote ghar mein chhoti tiles mat lagaiye. <a href="/services/flooring-work">Badi Vitrified tiles (Jaise 2x4 ft ya 4x4 ft)</a> lagane se joint kam aate hain aur zameen (floor) bahut bada (seamless) lagta hai. Light colour ki glossy tiles ghar ki roshni ko reflect karke usey bright banati hain.</p>

<h3>Kya Aap Bhi Apne Chhote Ghar Ka Makeover Chahte Hain?</h3>
<p>Smart homes banane mein experience aur dimag lagta hai. <strong>Mandal Civil Works</strong> ki expert interior aur civil team aapke 1RK ya 1BHK ko aisi design karke degi jisme har ek inch ka sahi istemal hoga.</p>
<p>Aap humari gallery check kar sakte hain, ya humein sidha Call/WhatsApp karke free consultation le sakte hain ki aapke ghar mein kya-kya changes possible hain!</p>
        `
      }
    ];

    for (const blog of blogs) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
      console.log("Upserted Pillar Blog: " + blog.title);
    }
    console.log("Pillar Blogs Seeding complete! All 4 long-form articles published.");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
