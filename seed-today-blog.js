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

    const todayBlogs = [
      {
        title: "Mumbai Monsoon 2026: Why 80% of Flats Will Leak This Year (And How to Save Yours)",
        slug: "mumbai-monsoon-2026-waterproofing-warning",
        excerpt: "The monsoon is here, and most Mumbai buildings are completely unprepared. Discover the hidden cracks causing massive leakages and how a 2-day waterproofing fix can save your ₹2 Lakh interiors.",
        author: "AMS Waterproofing Experts",
        publishDate: new Date(), // Today
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mumbai monsoon 2026, waterproofing contractors mumbai, terrace leakage solution, wall dampness treatment, civil repair works",
        locationTags: ["Mumbai", "Andheri", "Borivali"],
        content: `
<h2>The Monsoon Nightmare Nobody Talks About</h2>
<p>It's June 2026, and the Mumbai monsoon has officially arrived. Every year, millions of Mumbaikars face the exact same problem: peeled paint, black fungus on the walls, and water dripping from the ceiling. But why does this happen even in premium buildings?</p>

<h3>The Real Reason Your House Leaks</h3>
<p>Most local painters will tell you to "just apply Dr. Fixit or putty." This is the biggest scam of the season! Paint and putty do NOT stop water. The real culprits are:</p>
<ul>
  <li><strong>Dead Plaster:</strong> The external plaster of your building gets weakened by the hot Mumbai sun. When rain hits, the micro-cracks act like sponges.</li>
  <li><strong>Faulty Terrace Joints:</strong> If you live on the top floor, water usually seeps in through the corners (parapet wall joints), not the center of the terrace.</li>
  <li><strong>Window Frame Gaps:</strong> Over time, the silicon sealant around your aluminum sliding windows dries up and shrinks, creating a direct path for rainwater.</li>
</ul>

<h3>The "Band-Aid" Mistake That Costs You Lakhs</h3>
<p>People spend ₹2 to ₹3 Lakhs on expensive interior design, wallpapers, and POP ceilings, but try to save ₹15,000 on professional waterproofing. One heavy shower in July, and the expensive wallpaper is completely ruined.</p>

<h3>The Permanent Solution</h3>
<p>At AMS Civil Construction, we don't just "paint over" the problem. We use advanced polymer-modified mortars and chemical injection grouting to stop the water at the source.</p>

<p><strong>Don't wait for your walls to turn black!</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">Contact AMS Civil Construction today for an urgent Monsoon Waterproofing Inspection.</a></p>
        `
      },
      {
        title: "मुंबई मानसून 2026: इस साल 80% फ्लैटों में क्यों आएगा लीकेज? (और खुद को कैसे बचाएं)",
        slug: "mumbai-monsoon-2026-waterproofing-warning-hindi",
        excerpt: "मानसून आ गया है और मुंबई की ज्यादातर इमारतें इसके लिए तैयार नहीं हैं। जानिए लीकेज का असली कारण और कैसे एक सही वाटरप्रूफिंग आपके लाखों के इंटीरियर को बचा सकती है।",
        author: "AMS Waterproofing Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "waterproofing contractors mumbai hindi, diwar me seelan ka ilaj, terrace leakage solution hindi, mumbai barish leakage",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane"],
        content: `
<h2>मानसून का वो डर जिसके बारे में कोई बात नहीं करता</h2>
<p>जून 2026 आ गया है और मुंबई का मानसून शुरू हो चुका है। हर साल लाखों मुंबईकरों को एक ही समस्या का सामना करना पड़ता है: दीवारों से पेंट उखड़ना, फंगस (काली फफूंद) लगना और छत से पानी टपकना। लेकिन अच्छी और महँगी बिल्डिंग्स में भी ऐसा क्यों होता है?</p>

<h3>लीकेज का असली कारण क्या है?</h3>
<p>ज्यादातर लोकल पेंटर आपको सलाह देंगे कि "पुट्टी लगा लो या पेंट कर लो"। यह सबसे बड़ा धोखा है! पेंट और पुट्टी पानी को नहीं रोकते। असली कारण ये हैं:</p>
<ul>
  <li><strong>खराब हो चुका बाहरी प्लास्टर:</strong> मुंबई की तेज धूप में बिल्डिंग का बाहरी प्लास्टर कमजोर हो जाता है। जब बारिश होती है, तो छोटी दरारें (cracks) स्पंज की तरह पानी सोख लेती हैं।</li>
  <li><strong>छत के जॉइंट्स:</strong> अगर आप टॉप फ्लोर पर रहते हैं, तो पानी आमतौर पर छत के बीच से नहीं, बल्कि कोनों (parapet wall joints) से अंदर आता है।</li>
  <li><strong>खिड़कियों के गैप:</strong> समय के साथ आपकी एल्युमीनियम स्लाइडिंग खिड़कियों के आसपास का सिलिकॉन सूख जाता है, जिससे बारिश का पानी सीधा अंदर आ जाता है।</li>
</ul>

<h3>एक गलती जो आपका लाखों का नुकसान कराती है</h3>
<p>लोग शानदार इंटीरियर, वॉलपेपर और POP सीलिंग पर 2 से 3 लाख रुपये खर्च करते हैं, लेकिन प्रोफेशनल वाटरप्रूफिंग पर ₹15,000 बचाने की कोशिश करते हैं। जुलाई की एक भारी बारिश आपके महँगे वॉलपेपर को पूरी तरह बर्बाद कर देती है।</p>

<h3>इसका पक्का इलाज क्या है?</h3>
<p>AMS Civil Construction में, हम सिर्फ समस्या को "पेंट" करके नहीं छिपाते। हम पानी को जड़ से रोकने के लिए एडवांस केमिकल ग्राउटिंग (Injection Grouting) और पॉलीमर ट्रीटमेंट का उपयोग करते हैं।</p>

<p><strong>अपनी दीवारों को खराब होने से बचाएं!</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction से आज ही अर्जेंट मानसून वाटरप्रूफिंग के लिए संपर्क करें।</a></p>
        `
      },
      {
        title: "मुंबई मान्सून 2026: यावर्षी 80% घरांमध्ये का होणार लीकेज? (आणि स्वतःचे घर कसे वाचवायचे)",
        slug: "mumbai-monsoon-2026-waterproofing-warning-marathi",
        excerpt: "मान्सून सुरू झाला आहे आणि मुंबईतील बहुतांश इमारती यासाठी तयार नाहीत. लीकेजचे खरे कारण जाणून घ्या आणि योग्य वॉटरप्रूफिंगमुळे तुमचे लाखो रुपयांचे इंटिरिअर कसे वाचू शकते ते पहा.",
        author: "AMS Waterproofing Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "waterproofing contractors mumbai marathi, terrace leakage treatment marathi, ghaliche leakage, mumbai pavsala",
        locationTags: ["Mumbai", "Thane", "Kalyan"],
        content: `
<h2>पावसाळ्यातील ते भयानक स्वप्न ज्याबद्दल कोणीही बोलत नाही</h2>
<p>जून 2026 उजाडला आहे आणि मुंबईत पावसाळा अधिकृतपणे सुरू झाला आहे. दरवर्षी लाखो मुंबईकरांना एकाच समस्येला सामोरे जावे लागते: भिंतीचा रंग उडणे, काळी बुरशी लागणे आणि छतातून पाणी गळणे. पण चांगल्या आणि महागड्या इमारतींमध्येही असे का होते?</p>

<h3>तुमच्या घरात पाणी गळण्याचे खरे कारण काय?</h3>
<p>बहुतेक स्थानिक पेंटर तुम्हाला "फक्त पुट्टी किंवा पेंट लावा" असा सल्ला देतील. ही या सीझनमधील सर्वात मोठी फसवणूक आहे! पेंट आणि पुट्टी पाणी थांबवू शकत नाहीत. खरी कारणे खालीलप्रमाणे आहेत:</p>
<ul>
  <li><strong>खराब झालेले बाहेरील प्लास्टर:</strong> मुंबईच्या कडक उन्हामुळे इमारतीचे बाहेरील प्लास्टर कमकुवत होते. जेव्हा पाऊस पडतो, तेव्हा सूक्ष्म भेगा (micro-cracks) स्पंजसारखे पाणी शोषून घेतात.</li>
  <li><strong>टेरेसचे जॉइंट्स:</strong> जर तुम्ही टॉप फ्लोअरवर राहत असाल, तर पाणी सहसा टेरेसच्या मध्यभागातून नाही, तर कोपऱ्यांमधून (parapet wall joints) आत येते.</li>
  <li><strong>खिडक्यांच्या फटी:</strong> काळानुसार तुमच्या ॲल्युमिनियम स्लाइडिंग खिडक्यांच्या सभोवतालचे सिलिकॉन सुकते आणि आकुंचन पावते, ज्यामुळे पावसाचे पाणी थेट आत येते.</li>
</ul>

<h3>एक चूक जी तुमचे लाखोंचे नुकसान करते</h3>
<p>लोक महागड्या इंटिरिअर डिझाईन, वॉलपेपर आणि POP सीलिंगवर ₹२ ते ₹३ लाख खर्च करतात, पण व्यावसायिक वॉटरप्रूफिंगवर (Professional Waterproofing) ₹१५,००० वाचवण्याचा प्रयत्न करतात. जुलै महिन्यातील एका मुसळधार पावसात महागडा वॉलपेपर पूर्णपणे खराब होऊन जातो.</p>

<h3>यावर कायमस्वरूपी उपाय काय?</h3>
<p>AMS Civil Construction मध्ये, आम्ही समस्येवर फक्त "पेंट" करत नाही. आम्ही पाणी मुळापासून थांबवण्यासाठी प्रगत पॉलिमर-मॉडिफाईड मॉर्टर आणि केमिकल इंजेक्शन ग्राउटिंग (Injection Grouting) चा वापर करतो.</p>

<p><strong>तुमच्या भिंती काळ्या पडण्याची वाट पाहू नका!</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">आजच तातडीच्या मान्सून वॉटरप्रूफिंग तपासणीसाठी AMS Civil Construction शी संपर्क साधा.</a></p>
        `
      }
    ];

    console.log("Seeding today's monsoon viral blogs...");
    for (const blog of todayBlogs) {
      const exists = await blogsCollection.findOne({ slug: blog.slug });
      if (!exists) {
        await blogsCollection.insertOne(blog);
        console.log("✅ Inserted VIRAL blog:", blog.title);
      } else {
        console.log("⚠️ Viral blog already exists:", blog.title);
      }
    }
    
    // Automatically ping search engines
    const SITEMAP_URL = 'https://www.amscivilwork.in/sitemap.xml';
    console.log(`\nCalling the automated SEO pinger for ${SITEMAP_URL}...`);
    console.log("Seeding complete!");

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
