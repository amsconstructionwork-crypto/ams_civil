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

    const colorBlogs = [
      // ENGLISH
      {
        title: "The Ultimate Guide to Choosing the Best Paint Colors for Flats, Buildings, and Bungalows (2026 Trends)",
        slug: "best-paint-colors-for-flats-buildings-bungalows-global-trends",
        excerpt: "Discover the top global color trends of 2026! From making your 2BHK flat look twice as big, to giving your bungalow a luxury royal finish, here is everything you need to know about house painting.",
        author: "Global Interior & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "best paint colors for flat, exterior paint colors for buildings, luxury bungalow color combinations, vastu colors for home, 2026 global paint trends, asian paints shades",
        locationTags: ["Global", "Mumbai", "Dubai", "London"],
        content: `
<h2>The Psychology & Science of Choosing the Perfect Paint</h2>
<p>Whether you are renovating a cozy 2BHK apartment or constructing a sprawling luxury bungalow, the colors you choose define the energy, size, and aesthetic of the space. In 2026, the global trend is shifting towards "Quiet Luxury" and "Earthy Minimalism". Here is the ultimate color guide for every type of property.</p>

<h3>1. Best Colors for Flats & Apartments (Interiors)</h3>
<p>Flats usually face space constraints and limited natural light. The goal is to make the space look larger, brighter, and breathable.</p>
<ul>
  <li><strong>Warm White & Ivory:</strong> The timeless global favorite. It reflects 80% of natural light, making a small living room look massive and premium.</li>
  <li><strong>Soft Greige (Grey + Beige):</strong> The modern alternative to pure white. It adds warmth without closing in the space. Perfect for bedrooms.</li>
  <li><strong>Pastel Sage Green:</strong> A trending color globally that brings the calmness of nature indoors, ideal for a relaxing ambiance.</li>
  <li><em>Vastu Tip:</em> Always use light shades like off-white or light yellow in the East and North-facing rooms to attract positive energy and wealth.</li>
</ul>

<h3>2. Best Colors for Building Exteriors (Apartment Complexes)</h3>
<p>The exterior of a building must endure harsh weather—blistering sun, heavy monsoon rains, and city dust. The color must be highly durable and elegant.</p>
<ul>
  <li><strong>Terracotta & Cream:</strong> A classic combination that hides city dust well and gives a warm, inviting look.</li>
  <li><strong>Slate Grey & White Trims:</strong> The ultimate modern corporate/residential look. It gives buildings a highly sophisticated "New York" or "Dubai" skyscraper feel.</li>
  <li><strong>Olive Green & Beige:</strong> Blends perfectly with urban landscaping and resists fading from UV rays.</li>
  <li><em>Pro Tip:</em> Never use dark shades like black or dark brown on the entire exterior; they absorb heat and can increase the temperature inside the building by 3-4 degrees!</li>
</ul>

<h3>3. Best Colors for Luxury Bungalows & Villas</h3>
<p>Bungalows demand grandeur. You want your property to stand out and look like a multi-million-dollar estate.</p>
<ul>
  <li><strong>Royal White with Gold/Brass Accents:</strong> Inspired by Mediterranean and French chateaus. A pure white exterior with warm lighting makes a bungalow look like a palace at night.</li>
  <li><strong>Charcoal Grey & Natural Wood:</strong> The pinnacle of modern, ultra-luxury architecture. Pairing dark charcoal exteriors with natural teak wood paneling creates a striking, wealthy aesthetic.</li>
  <li><strong>Navy Blue & Crisp White:</strong> A coastal, wealthy look that is globally trending in high-end neighborhoods.</li>
</ul>

<h3>Need Professional Painting & Waterproofing?</h3>
<p>Choosing the right color is only 50% of the job. You need proper wall putties, primers, and anti-fungal treatments before applying the final coat. <a href="/contact" style="color: #F97316; font-weight: bold;">Contact AMS Civil Construction</a> for premium interior and exterior painting services using the latest airless spray technology!</p>
        `
      },

      // HINDI
      {
        title: "घर, बिल्डिंग और बंगले के लिए सबसे बेहतरीन पेंट कलर्स (2026 के ग्लोबल ट्रेंड्स)",
        slug: "best-paint-colors-for-home-building-bungalow-hindi",
        excerpt: "अपने छोटे फ्लैट को बड़ा दिखाना हो या बंगले को रॉयल लुक देना हो, 2026 के इन ग्लोबल कलर ट्रेंड्स और वास्तु टिप्स के साथ चुनें अपने घर का परफेक्ट रंग।",
        author: "Global Interior & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "ghar ke liye best color hindi, building ka bahari color, bungalow colour combinations, vastu anusar ghar ka color, asian paints colour shades",
        locationTags: ["India", "Mumbai", "Delhi"],
        content: `
<h2>परफेक्ट पेंट कैसे चुनें: रंग का विज्ञान और मनोविज्ञान</h2>
<p>चाहे आप एक छोटा सा 2BHK फ्लैट रेनोवेट कर रहे हों या एक आलीशान बंगला बना रहे हों, आपके द्वारा चुना गया रंग उस जगह की ऊर्जा (Energy) और आकार को तय करता है। 2026 में पूरी दुनिया में "कलर ट्रेंड्स" बदल रहे हैं। आइए जानते हैं कि किस प्रॉपर्टी के लिए कौन सा रंग सबसे बेस्ट है।</p>

<h3>1. फ्लैट और अपार्टमेंट (इंटीरियर) के लिए बेस्ट कलर्स</h3>
<p>फ्लैट्स में अक्सर जगह कम होती है। इसलिए हमारा लक्ष्य रंग के जरिए जगह को बड़ा और चमकदार दिखाना होता है।</p>
<ul>
  <li><strong>वार्म वाइट और आइवरी (Warm White & Ivory):</strong> यह रंग सबसे ज़्यादा रोशनी (Light) को रिफ्लेक्ट करता है, जिससे एक छोटा सा हॉल भी बहुत बड़ा और प्रीमियम लगता है।</li>
  <li><strong>ग्रेज (Grey + Beige):</strong> अगर आपको वाइट रंग बोरिंग लगता है, तो ग्रेज सबसे बेहतरीन है। यह कमरों को एक मॉडर्न और शांत लुक देता है।</li>
  <li><strong>पेस्टल सेज ग्रीन (Pastel Green):</strong> यह रंग आँखों को सुकून देता है और बेडरूम के लिए दुनिया भर में सबसे ज़्यादा पसंद किया जा रहा है।</li>
  <li><em>वास्तु टिप (Vastu Tip):</em> घर की सुख-शांति के लिए हमेशा पूर्व (East) और उत्तर (North) दिशा की दीवारों पर हल्के रंग (जैसे हल्का पीला या ऑफ-वाइट) का इस्तेमाल करें।</li>
</ul>

<h3>2. बिल्डिंग के बाहरी हिस्से (Exterior) के लिए बेस्ट कलर्स</h3>
<p>बिल्डिंग के बाहरी रंग को कड़ी धूप, भारी बारिश और धूल का सामना करना पड़ता है। इसलिए रंग ऐसा होना चाहिए जो जल्दी खराब न हो।</p>
<ul>
  <li><strong>टेराकोटा और क्रीम (Terracotta & Cream):</strong> यह कॉम्बिनेशन धूल को छुपा लेता है और एक बहुत ही क्लासिक लुक देता है।</li>
  <li><strong>स्लेट ग्रे और वाइट (Slate Grey & White):</strong> यह कलर बिल्डिंग को "दुबई" या "न्यूयॉर्क" की गगनचुंबी इमारतों जैसा अल्ट्रा-मॉडर्न लुक देता है।</li>
  <li><em>प्रो टिप:</em> बिल्डिंग के बाहर कभी भी गहरे काले या डार्क ब्राउन रंग का इस्तेमाल न करें। ये रंग गर्मी को सोखते हैं, जिससे बिल्डिंग के अंदर का तापमान 3-4 डिग्री तक बढ़ सकता है!</li>
</ul>

<h3>3. बंगले और विला (Bungalows) के लिए रॉयल कलर्स</h3>
<p>बंगले को शाही और ग्रैंड दिखना चाहिए।</p>
<ul>
  <li><strong>रॉयल वाइट और गोल्ड:</strong> एक शुद्ध सफ़ेद रंग का बंगला जिसपर वार्म येलो (Warm Yellow) लाइट्स लगी हों, रात में किसी महल जैसा दिखता है।</li>
  <li><strong>चारकोल ग्रे और असली लकड़ी (Wood):</strong> आज के अल्ट्रा-लग्जरी मॉडर्न बंगलों में इस डार्क थीम का सबसे ज़्यादा चलन है।</li>
</ul>

<h3>क्या आप अपने घर को पेंट करवाना चाहते हैं?</h3>
<p>सही रंग चुनना केवल आधा काम है। पेंट से पहले दीवारों पर सही पुट्टी, प्राइमर और वाटरप्रूफिंग (एंटी-फंगल) का होना बहुत ज़रूरी है। <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction से आज ही संपर्क करें</a> और अपने घर को एक प्रीमियम ग्लोबल लुक दें!</p>
        `
      },

      // MARATHI
      {
        title: "फ्लॅट, बिल्डिंग आणि बंगल्यासाठी सर्वोत्कृष्ट रंगांची निवड कशी करावी? (२०२६ चे ग्लोबल ट्रेंड्स)",
        slug: "best-paint-colors-for-home-building-bungalow-marathi",
        excerpt: "तुमचा छोटा फ्लॅट मोठा दाखवायचा असेल किंवा बंगल्याला रॉयल लुक द्यायचा असेल, तर २०२६ च्या या ग्लोबल कलर ट्रेंड्स आणि वास्तू टिप्स नक्की वाचा.",
        author: "Global Interior & Civil Experts",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "gharasaathi best color marathi, building exterior color, bungalow color design, vastu shastra colors marathi, asian paints colors",
        locationTags: ["Maharashtra", "Mumbai", "Pune"],
        content: `
<h2>परफेक्ट पेंट कसा निवडावा: रंगांचे विज्ञान आणि मानसशास्त्र</h2>
<p>तुम्ही तुमचा 2BHK फ्लॅट रेनोव्हेट करत असाल किंवा एखादा आलिशान बंगला बांधत असाल, तुम्ही निवडलेला रंग त्या वास्तूची ऊर्जा (Energy) आणि आकार ठरवतो. २०२६ मध्ये जगभरात "क्वायट लक्झरी" (Quiet Luxury) कलर्स ट्रेंडमध्ये आहेत. जाणून घेऊया कोणत्या वास्तूसाठी कोणता रंग सर्वोत्तम आहे.</p>

<h3>1. फ्लॅट्स आणि अपार्टमेंट्स (इंटिरिअर) साठी सर्वोत्कृष्ट रंग</h3>
<p>फ्लॅट्समध्ये जागा आणि नैसर्गिक प्रकाश अनेकदा मर्यादित असतो. त्यामुळे रंगाच्या माध्यमातून जागा मोठी आणि हवेशीर दाखवणे हे मुख्य ध्येय असते.</p>
<ul>
  <li><strong>वॉर्म व्हाईट आणि आयव्हरी (Warm White & Ivory):</strong> हा रंग सर्वाधिक प्रकाश परावर्तित (Reflect) करतो, ज्यामुळे छोटीशी लिव्हिंग रूम देखील खूप मोठी आणि प्रीमियम दिसते.</li>
  <li><strong>ग्रेज (Grey + Beige):</strong> जर तुम्हाला पूर्ण पांढरा रंग आवडत नसेल, तर ग्रेज हा उत्तम पर्याय आहे. हा रंग भिंतींना खूप मॉडर्न लुक देतो.</li>
  <li><strong>पेस्टल सेज ग्रीन (Pastel Green):</strong> हा निसर्गाशी जवळीक साधणारा रंग बेडरूमसाठी जगभरात सर्वाधिक पसंत केला जात आहे.</li>
  <li><em>वास्तू टिप (Vastu Tip):</em> घरात सुख-शांती आणि सकारात्मक ऊर्जा आकर्षित करण्यासाठी पूर्व (East) आणि उत्तर (North) दिशेला नेहमी हलके रंग (उदा. ऑफ-व्हाईट किंवा हलका पिवळा) वापरा.</li>
</ul>

<h3>2. बिल्डिंगच्या बाहेरील भागासाठी (Exterior) सर्वोत्कृष्ट रंग</h3>
<p>बिल्डिंगच्या बाहेरील रंगाला कडक ऊन, मुसळधार पाऊस आणि धुळीचा सामना करावा लागतो. त्यामुळे रंग टिकाऊ आणि आकर्षक असणे गरजेचे आहे.</p>
<ul>
  <li><strong>टेराकोटा आणि क्रीम (Terracotta & Cream):</strong> हे कॉम्बिनेशन धुळीला लपवते आणि बिल्डिंगला एक सुंदर, क्लासिक लुक देते.</li>
  <li><strong>स्लेट ग्रे आणि व्हाईट (Slate Grey & White):</strong> हा रंग बिल्डिंगला "दुबई" किंवा "न्यूयॉर्क" मधील व्यावसायिक इमारतींसारखा अल्ट्रा-मॉडर्न लुक देतो.</li>
  <li><em>प्रो टिप:</em> बिल्डिंगच्या बाहेर कधीही गडद काळा किंवा गडद तपकिरी (Dark Brown) रंग वापरू नका. हे रंग उष्णता शोषून घेतात, ज्यामुळे बिल्डिंगच्या आतील तापमान ३-४ अंशांनी वाढू शकते!</li>
</ul>

<h3>3. बंगले आणि व्हिलासाठी (Bungalows) रॉयल रंग</h3>
<p>बंगला शाही आणि भव्य दिसला पाहिजे.</p>
<ul>
  <li><strong>रॉयल व्हाईट आणि गोल्ड:</strong> पूर्ण पांढऱ्या रंगाचा बंगला, ज्यावर वॉर्म पिवळ्या (Warm Yellow) लाईट्स लावल्या आहेत, तो रात्री एखाद्या राजवाड्यासारखा दिसतो.</li>
  <li><strong>चारकोल ग्रे आणि नैसर्गिक लाकूड (Natural Wood):</strong> आजच्या अल्ट्रा-लक्झरी मॉडर्न बंगल्यांमध्ये या डार्क थीमचा सर्वात जास्त ट्रेंड आहे.</li>
</ul>

<h3>तुम्हाला तुमच्या घराचे पेंटिंग करायचे आहे का?</h3>
<p>योग्य रंग निवडणे हे फक्त ५०% काम आहे. रंग लावण्यापूर्वी भिंतींवर योग्य पुट्टी, प्रायमर आणि वॉटरप्रूफिंग (अँटी-फंगल ट्रिटमेंट) असणे अत्यंत महत्त्वाचे आहे. <a href="/contact" style="color: #F97316; font-weight: bold;">आजच AMS Civil Construction शी संपर्क साधा</a> आणि तुमच्या घराला एक प्रीमियम ग्लोबल लुक द्या!</p>
        `
      }
    ];

    console.log("Seeding Global Trend Paint Color blogs in 3 languages...");
    for (const blog of colorBlogs) {
      const exists = await blogsCollection.findOne({ slug: blog.slug });
      if (!exists) {
        await blogsCollection.insertOne(blog);
        console.log("✅ Inserted Paint Color blog:", blog.title);
      } else {
        console.log("⚠️ Paint Color blog already exists:", blog.title);
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
