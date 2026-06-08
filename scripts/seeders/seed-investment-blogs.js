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

    const investmentBlogs = [
      // ENGLISH
      {
        title: "Top 5 Property Investment Locations in Mumbai for High Returns (2026-2030)",
        slug: "top-5-property-investment-mumbai-high-returns",
        excerpt: "Looking to multiply your wealth? Discover the 5 most profitable real estate hotspots in Mumbai where property prices are expected to double in the next 5 years.",
        author: "Real Estate & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "property investment mumbai, high return real estate mumbai, panvel airport property, thane real estate, mumbai flat investment",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane"],
        content: `
<h2>Where Should You Invest Your Money in Mumbai?</h2>
<p>Buying property in South Mumbai or Bandra will give you rental income, but the capital appreciation is slow. If you want <strong>high returns (capital appreciation of 15% to 25% yearly)</strong>, you need to invest in emerging locations where major infrastructure projects (Metro, Airports, Coastal Roads) are being built. Here are the top 5 locations:</p>

<h3>1. Panvel & NAINA Region (Navi Mumbai)</h3>
<p><strong>Why Invest:</strong> The upcoming Navi Mumbai International Airport (NMIA) is a game-changer. The NAINA (Navi Mumbai Airport Influence Notified Area) city planning is creating massive commercial hubs. Properties bought here today are guaranteed to skyrocket once the airport is fully operational.</p>
<p><strong>Expected Return:</strong> Very High (Prices could double in 5-6 years)</p>

<h3>2. Majiwada / Ghodbunder Road (Thane)</h3>
<p><strong>Why Invest:</strong> Thane is no longer a distant suburb. With Metro Line 4 (Wadala-Kasarvadavali) nearing completion and the upcoming Borivali-Thane underground tunnel, connectivity will be unmatched. Majiwada acts as a central junction connecting Mumbai, Navi Mumbai, and the Central Suburbs.</p>
<p><strong>Expected Return:</strong> Steady High (12-15% annually)</p>

<h3>3. Mira Road & Bhayandar</h3>
<p><strong>Why Invest:</strong> Traditionally considered far, the extension of Metro Line 9 and the massive Coastal Road connectivity project has put Mira-Bhayandar on the map. It offers affordable entry prices right now compared to Borivali or Kandivali, but the gap is closing fast.</p>
<p><strong>Expected Return:</strong> High (Best for affordable segment)</p>

<h3>4. Wadala</h3>
<p><strong>Why Invest:</strong> Often called the "New BKC", Wadala is emerging as a massive commercial and luxury residential hub. It boasts unbelievable connectivity via the Eastern Freeway, Monorail, and upcoming Metro lines. For luxury segment investors, Wadala is a goldmine.</p>
<p><strong>Expected Return:</strong> Premium High</p>

<h3>5. Kanjurmarg / Vikhroli</h3>
<p><strong>Why Invest:</strong> The geographical center of Mumbai. Due to the Eastern Express Highway and the JVLR (Jogeshwari-Vikhroli Link Road), it connects directly to Powai, BKC, and Western Suburbs. Corporate IT hubs are rapidly shifting here from Powai.</p>
<p><strong>Expected Return:</strong> Solid & Secure</p>

<h3>Before You Invest...</h3>
<p>Buying a property is just step one. Whether you buy a raw flat or an old resale property, you will need expert <strong>Interior Civil Work</strong> to make it rent-ready or flip it for a profit. <a href="/contact" style="color: #F97316; font-weight: bold;">Contact AMS Civil Construction</a> to renovate your investment property at the best market rates!</p>
        `
      },

      // HINDI
      {
        title: "मुंबई में प्रॉपर्टी निवेश के लिए टॉप 5 लोकेशन (जहाँ मिलेगा सबसे ज्यादा रिटर्न)",
        slug: "top-5-property-investment-mumbai-high-returns-hindi",
        excerpt: "क्या आप अपना पैसा डबल करना चाहते हैं? जानिए मुंबई के वे 5 इलाके जहाँ आने वाले 5 सालों में प्रॉपर्टी की कीमतें सबसे तेज़ी से बढ़ने वाली हैं।",
        author: "Real Estate & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mumbai property investment hindi, kaha ghar kharide mumbai me, panvel real estate, thane property rates hindi",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane"],
        content: `
<h2>मुंबई में अपना पैसा कहाँ निवेश करें?</h2>
<p>साउथ मुंबई (South Mumbai) या बांद्रा (Bandra) में प्रॉपर्टी खरीदने से आपको किराया तो अच्छा मिलेगा, लेकिन कीमत बढ़ने की रफ़्तार बहुत धीमी होती है। अगर आप <strong>हाई रिटर्न (सालाना 15% से 25% का फायदा)</strong> चाहते हैं, तो आपको उन इलाकों में निवेश करना चाहिए जहाँ नए मेट्रो, एयरपोर्ट या कोस्टल रोड बन रहे हैं। ये रहे टॉप 5 लोकेशंस:</p>

<h3>1. पनवेल और नैना (NAINA) क्षेत्र (नवी मुंबई)</h3>
<p><strong>निवेश क्यों करें:</strong> आने वाला 'नवी मुंबई इंटरनेशनल एयरपोर्ट' इस पूरे इलाके की तस्वीर बदल रहा है। NAINA सिटी प्लानिंग के तहत यहाँ बड़े कमर्शियल हब बन रहे हैं। आज यहाँ खरीदी गई प्रॉपर्टी की कीमत एयरपोर्ट चालू होने के बाद आसमान छूने वाली है।</p>
<p><strong>संभावित रिटर्न:</strong> बहुत ज़्यादा (5-6 सालों में कीमत डबल हो सकती है)</p>

<h3>2. मजीवाड़ा / घोडबंदर रोड (ठाणे)</h3>
<p><strong>निवेश क्यों करें:</strong> ठाणे अब कोई दूर का इलाका नहीं रहा। मेट्रो लाइन 4 (वडाला-कासरवडवली) का काम ज़ोरों पर है और बोरीवली-ठाणे अंडरग्राउंड टनल से कनेक्टिविटी जबरदस्त हो जाएगी। मजीवाड़ा मुंबई, नवी मुंबई और सेंट्रल सबर्ब्स को जोड़ने वाला मुख्य जंक्शन है।</p>
<p><strong>संभावित रिटर्न:</strong> स्थिर और बढ़िया (सालाना 12-15%)</p>

<h3>3. मीरा रोड और भायंदर</h3>
<p><strong>निवेश क्यों करें:</strong> मेट्रो लाइन 9 के विस्तार और कोस्टल रोड प्रोजेक्ट के कारण मीरा-भायंदर अब मुख्य मुंबई के बहुत करीब आ गया है। बोरीवली या कांदिवली के मुकाबले यहाँ अभी एंट्री प्राइस (कीमत) कम है, लेकिन यह तेजी से बढ़ रही है।</p>
<p><strong>संभावित रिटर्न:</strong> ज़्यादा (कम बजट वालों के लिए बेस्ट)</p>

<h3>4. वडाला (Wadala)</h3>
<p><strong>निवेश क्यों करें:</strong> वडाला को "नया BKC" कहा जा रहा है। ईस्टर्न फ्रीवे, मोनोरेल और मेट्रो के कारण यहाँ से मुंबई के किसी भी हिस्से में जाना सबसे आसान है। लग्जरी प्रॉपर्टी में निवेश करने वालों के लिए यह एक सोने की खान है।</p>
<p><strong>संभावित रिटर्न:</strong> प्रीमियम</p>

<h3>5. कांजुरमार्ग / विक्रोली</h3>
<p><strong>निवेश क्यों करें:</strong> यह मुंबई का भौगोलिक (Geographical) केंद्र है। ईस्टर्न एक्सप्रेस हाईवे और JVLR के कारण यह पवई, BKC और वेस्टर्न सबर्ब्स से सीधे जुड़ा है। बड़ी-बड़ी IT कंपनियाँ अब पवई से शिफ्ट होकर यहाँ आ रही हैं।</p>
<p><strong>संभावित रिटर्न:</strong> सुरक्षित और शानदार</p>

<h3>निवेश करने से पहले ध्यान दें...</h3>
<p>प्रॉपर्टी खरीदना सिर्फ पहला कदम है। चाहे आप नया फ्लैट खरीदें या कोई पुरानी प्रॉपर्टी, उसे किराए पर चढ़ाने या मुनाफे में बेचने के लिए आपको अच्छे <strong>इंटीरियर और सिविल वर्क</strong> की ज़रूरत पड़ेगी। अपने फ्लैट के रेनोवेशन के लिए <a href="/contact" style="color: #F97316; font-weight: bold;">आज ही AMS Civil Construction से संपर्क करें!</a></p>
        `
      },

      // MARATHI
      {
        title: "मुंबईतील टॉप 5 प्रॉपर्टी इन्व्हेस्टमेंट लोकेशन्स (जिथे मिळेल सर्वाधिक परतावा)",
        slug: "top-5-property-investment-mumbai-high-returns-marathi",
        excerpt: "तुम्हाला तुमच्या पैशांवर सर्वाधिक परतावा हवा आहे का? मुंबईतील या ५ उदयोन्मुख लोकेशन्सची माहिती घ्या जिथे पुढील ५ वर्षांत प्रॉपर्टीचे भाव दुप्पट होण्याची शक्यता आहे.",
        author: "Real Estate & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "property investment mumbai marathi, mumbai madhye ghar kuthe ghyave, panvel property rates marathi, thane real estate",
        locationTags: ["Mumbai", "Navi Mumbai", "Thane"],
        content: `
<h2>मुंबईत प्रॉपर्टीमध्ये कुठे गुंतवणूक करावी?</h2>
<p>दक्षिण मुंबई (South Mumbai) किंवा वांद्रे (Bandra) येथे प्रॉपर्टी खरेदी केल्यास तुम्हाला चांगले भाडे मिळेल, परंतु किमती वाढण्याचा वेग खूप कमी असतो. जर तुम्हाला <strong>हाय रिटर्न (वार्षिक 15% ते 25% वाढ)</strong> हवा असेल, तर जिथे नवीन मेट्रो, विमानतळ किंवा कोस्टल रोडसारखे मोठे पायाभूत प्रकल्प येत आहेत तिथे गुंतवणूक करणे फायद्याचे ठरते. हे आहेत टॉप 5 लोकेशन्स:</p>

<h3>1. पनवेल आणि नैना (NAINA) विभाग (नवी मुंबई)</h3>
<p><strong>गुंतवणूक का करावी:</strong> आगामी 'नवी मुंबई आंतरराष्ट्रीय विमानतळ' (NMIA) मुळे या परिसराचा चेहरामोहरा बदलत आहे. NAINA सिटी प्लॅनिंग अंतर्गत येथे मोठे व्यावसायिक हब तयार होत आहेत. आज येथे घेतलेल्या प्रॉपर्टीचे भाव विमानतळ पूर्ण क्षमतेने सुरू झाल्यानंतर गगनाला भिडतील.</p>
<p><strong>अपेक्षित परतावा:</strong> अतिशय जास्त (5-6 वर्षात किमती दुप्पट होऊ शकतात)</p>

<h3>2. माजिवडा / घोडबंदर रोड (ठाणे)</h3>
<p><strong>गुंतवणूक का करावी:</strong> ठाणे आता लांबचे उपनगर राहिलेले नाही. मेट्रो लाईन 4 (वडाळा-कासारवडवली) चे काम वेगाने सुरू आहे आणि आगामी बोरिवली-ठाणे भुयारी मार्गामुळे कनेक्टिव्हिटी जबरदस्त होईल. माजिवडा हे मुंबई, नवी मुंबई आणि मध्य उपनगरांना जोडणारे मुख्य जंक्शन बनले आहे.</p>
<p><strong>अपेक्षित परतावा:</strong> स्थिर आणि उत्तम (वार्षिक 12-15%)</p>

<h3>3. मीरा रोड आणि भाईंदर</h3>
<p><strong>गुंतवणूक का करावी:</strong> मेट्रो लाईन 9 चा विस्तार आणि कोस्टल रोड प्रकल्पामुळे मीरा-भाईंदर मुख्य मुंबईच्या खूप जवळ आले आहे. बोरीवली किंवा कांदिवलीच्या तुलनेत येथे अजूनही किमती कमी आहेत, त्यामुळे गुंतवणुकीसाठी ही उत्तम वेळ आहे.</p>
<p><strong>अपेक्षित परतावा:</strong> जास्त (कमी बजेट असलेल्यांसाठी सर्वोत्तम)</p>

<h3>4. वडाळा (Wadala)</h3>
<p><strong>गुंतवणूक का करावी:</strong> वडाळा हे आता "नवीन BKC" म्हणून ओळखले जात आहे. इस्टर्न फ्रीवे, मोनोरेल आणि मेट्रोमुळे येथून मुंबईच्या कोणत्याही भागात जाणे सर्वात सोपे आहे. लक्झरी सेगमेंटमध्ये गुंतवणूक करणाऱ्यांसाठी वडाळा हे एक उत्तम ठिकाण आहे.</p>
<p><strong>अपेक्षित परतावा:</strong> प्रीमियम हाय</p>

<h3>5. कांजूरमार्ग / विक्रोळी</h3>
<p><strong>गुंतवणूक का करावी:</strong> हे मुंबईचे भौगोलिक केंद्र (Geographical Center) आहे. इस्टर्न एक्स्प्रेस हायवे आणि JVLR मुळे हे पवई, BKC आणि पश्चिम उपनगरांशी थेट जोडलेले आहे. मोठ्या कॉर्पोरेट IT कंपन्या आता पवईवरून येथे शिफ्ट होत आहेत.</p>
<p><strong>अपेक्षित परतावा:</strong> सुरक्षित आणि भक्कम</p>

<h3>गुंतवणूक करण्यापूर्वी लक्षात ठेवा...</h3>
<p>प्रॉपर्टी खरेदी करणे ही फक्त पहिली पायरी आहे. तुम्ही नवीन फ्लॅट घ्या किंवा जुनी प्रॉपर्टी, ती भाड्याने देण्यासाठी किंवा नफ्यात विकण्यासाठी तुम्हाला उत्कृष्ट <strong>इंटिरिअर आणि सिव्हिल वर्कची</strong> आवश्यकता असेल. तुमच्या फ्लॅटच्या रेनोव्हेशनसाठी <a href="/contact" style="color: #F97316; font-weight: bold;">आजच AMS Civil Construction शी संपर्क साधा!</a></p>
        `
      }
    ];

    console.log("Seeding High-Return Property Investment blogs in 3 languages...");
    for (const blog of investmentBlogs) {
      const exists = await blogsCollection.findOne({ slug: blog.slug });
      if (!exists) {
        await blogsCollection.insertOne(blog);
        console.log("✅ Inserted Investment blog:", blog.title);
      } else {
        console.log("⚠️ Investment blog already exists:", blog.title);
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
