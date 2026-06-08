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
      // 1. ENGLISH VERSION
      {
        title: "Complete Guide to Civil Work & Renovation Costs in Virar (2026)",
        slug: "virar-renovation-civil-work-cost-english",
        excerpt: "Are you buying a flat or building a bungalow in Virar? Explore our comprehensive guide to understand the exact civil work and renovation costs in Virar for 2026.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "virar civil contractor, flat renovation cost in virar, global city virar renovation, bungalow construction cost virar, interior design virar west",
        locationTags: ["Virar", "Vasai", "Palghar", "Western Line"],
        content: `
<h2>Why Virar is the Hottest Real Estate Hub in 2026?</h2>
<p>Virar has rapidly transformed from a distant suburb into a thriving residential hub. With massive township projects like Global City in Virar West and numerous new developments in Virar East, thousands of families are migrating here for affordable luxury.</p>

<p>Whether you have purchased a 'bare shell' flat from a builder or a plot to construct your dream bungalow, you need a reliable civil contractor to turn your property into a home. Let's break down the renovation and construction costs in Virar.</p>

<h3>1. Flat Renovation Cost in Virar (1BHK & 2BHK)</h3>
<p>If you've bought a new flat or a resale property, you will likely need civil upgrades. Here is a rough estimate for standard quality materials:</p>
<ul>
  <li><strong>Flooring & Tiling:</strong> Upgrading to premium vitrified tiles usually costs between ₹60,000 to ₹90,000 including labour and material.</li>
  <li><strong>Bathroom Waterproofing & Renovation:</strong> A complete bathroom overhaul with heavy-duty chemical waterproofing costs around ₹50,000 to ₹70,000 per bathroom.</li>
  <li><strong>Modular Kitchen with Civil Platform:</strong> Breaking the old platform and installing a new Granite/Quartz platform with modular baskets will cost ₹45,000 to ₹65,000.</li>
  <li><strong>False Ceiling (POP) & Painting:</strong> Adding a modern POP ceiling with Cove lights and premium washable paint ranges from ₹50,000 to ₹80,000.</li>
</ul>

<h3>2. Bungalow Construction Cost in Virar East/West</h3>
<p>Many investors prefer buying Gaothan or NA plots in Virar and constructing an independent bungalow. The current construction cost in the Vasai-Virar belt is approximately <strong>₹1,700 to ₹2,200 per sq.ft.</strong></p>
<p>This includes everything from foundation, RCC structure, brickwork, plastering, plumbing, electricals, to the final finishing. As a turnkey contractor, <strong>Mandal Civil Works</strong> handles the entire project so you don't have to deal with multiple labourers.</p>

<h3>Why Choose Mandal Civil Works in Virar?</h3>
<p>Finding a trusted local contractor in the Vasai-Virar region is difficult. We have over 20 years of experience executing projects from Borivali to Virar. We offer:</p>
<ul>
  <li><strong>Transparent Pricing:</strong> No hidden costs or last-minute surprises.</li>
  <li><strong>Single Point of Contact:</strong> We handle everything from masonry and plumbing to painting.</li>
  <li><strong>Quality Guarantee:</strong> We use branded materials like UltraTech cement and Dr. Fixit waterproofing.</li>
</ul>

<p>If you have a property in Virar, contact us today for a <strong>Free Site Visit and Quotation</strong>!</p>
        `
      },
      // 2. HINDI VERSION (PURE HINDI)
      {
        title: "विरार में नया घर बनवाने या रिनोवेट (Renovate) करने का खर्च (2026)",
        slug: "virar-flat-renovation-cost-hindi",
        excerpt: "क्या आप विरार में नया फ्लैट ले रहे हैं या प्लॉट लेकर बंगला बनवाना चाहते हैं? जानिए विरार में सिविल वर्क, टाइल्स और पेंटिंग का सही खर्च।",
        author: "मंडल सिविल वर्क्स एक्सपर्ट",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "virar civil contractor hindi, virar flat renovation cost, bungalow construction virar, best contractor in virar west, global city interior design",
        locationTags: ["Virar", "Vasai", "Palghar", "Western Line"],
        content: `
<h2>विरार: नए घरों का नया ठिकाना</h2>
<p>पिछले कुछ सालों में विरार सबसे तेज़ी से बढ़ता हुआ इलाका बन गया है। ग्लोबल सिटी (विरार वेस्ट) जैसे बड़े प्रोजेक्ट्स और विरार ईस्ट में नए प्लॉट्स के आने से, यहाँ प्रॉपर्टी खरीदना एक शानदार निवेश (Investment) बन गया है।</p>

<p>लेकिन घर खरीदने के बाद सबसे बड़ा सवाल आता है: <strong>"अंदर का काम (सिविल वर्क और इंटीरियर) किससे करवाएं और खर्च कितना आएगा?"</strong> आज हम इसी विषय पर बात करेंगे।</p>

<h3>विरार में 1BHK / 2BHK फ्लैट रिनोवेशन का खर्च</h3>
<p>अगर आपने रीसेल (Resale) फ्लैट लिया है या बिल्डर ने आपको 'बेयर शेल' (खाली) फ्लैट दिया है, तो उसको रहने लायक बनाने में यह खर्च आ सकता है:</p>
<ul>
  <li><strong>फर्श (Flooring):</strong> नई विट्रीफाइड टाइल्स लगाने का खर्च (सामान और लेबर के साथ) लगभग ₹60,000 से ₹90,000 के बीच आता है।</li>
  <li><strong>बाथरूम और वॉटरप्रूफिंग:</strong> विरार में बारिश बहुत होती है, इसलिए सही वॉटरप्रूफिंग बहुत ज़रूरी है। एक बाथरूम का नया काम ₹50,000 से ₹70,000 तक जाता है।</li>
  <li><strong>किचन प्लैटफॉर्म:</strong> नया मज़बूत सिविल प्लैटफॉर्म और दीवार पर टाइल्स लगाने में ₹45,000 से ₹65,000 लगते हैं।</li>
  <li><strong>पीओपी (POP) और पेंटिंग:</strong> दीवारों को स्मूथ करने और पीओपी सीलिंग बनाने का खर्च ₹50,000 से ₹80,000 के बीच आता है।</li>
</ul>

<h3>विरार में प्लॉट लेकर बंगला बनवाने का खर्च</h3>
<p>विरार ईस्ट और गाँव वाले (गाँवठाण) इलाकों में लोग ज़मीन लेकर अपना आलीशान बंगला बनवा रहे हैं। अगर आप बेस (नींव) से लेकर पूरा फिनिशिंग तक किसी ठेकेदार को काम देते हैं (टर्नकी कॉन्ट्रैक्ट), तो इसका रेट <strong>₹1,700 से ₹2,200 प्रति स्क्वायर फीट</strong> तक पड़ता है। इसमें मिट्टी की खुदाई से लेकर चाबी सौंपने तक का सारा काम ठेकेदार करता है।</p>

<h3>विरार में मंडल सिविल वर्क्स ही क्यों?</h3>
<p>घर का काम बार-बार नहीं होता, इसलिए किसी अनजान मिस्त्री पर भरोसा करना नुकसानदायक हो सकता है। <strong>मंडल सिविल वर्क्स (Mandal Civil Works)</strong> पिछले 20 सालों से वसई-विरार और मुंबई में काम कर रहा है।</p>
<ul>
  <li><strong>साफ हिसाब (Transparent Pricing):</strong> हम पहले ही लिखित कोटेशन (Quotation) देते हैं जिसमें लगाए जाने वाले सामान का नाम लिखा होता है।</li>
  <li><strong>टर्नकी सर्विस (Turnkey Service):</strong> आपको प्लंबर, पेंटर और टाइल्स लगाने वाले को अलग-अलग नहीं ढूँढना पड़ेगा, हमारी एक ही टीम सब कुछ करेगी।</li>
</ul>

<p>अगर आपने विरार में प्रॉपर्टी ली है, तो आज ही हमें कॉल करें और <strong>फ्री एस्टीमेट (Free Estimate)</strong> पाएं!</p>
        `
      },
      // 3. MARATHI VERSION
      {
        title: "विरारमध्ये नवीन घर बांधण्यासाठी किंवा नूतनीकरणासाठी (Renovation) किती खर्च येतो?",
        slug: "virar-home-renovation-construction-cost-marathi",
        excerpt: "तुम्ही विरारमध्ये नवीन फ्लॅट घेत आहात किंवा प्लॉट घेऊन स्वतःचा बंगला बांधायचा विचार करत आहात? जाणून घ्या विरारमधील सिव्हिल वर्क आणि नूतनीकरणाचा (Renovation) अचूक खर्च.",
        author: "Mandal Civil Works Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "virar civil contractor marathi, bungalow construction cost virar, home renovation virar west, best builder in virar, marathi construction blog",
        locationTags: ["Virar", "Vasai", "Palghar", "Western Line"],
        content: `
<h2>विरार: घरांसाठी आणि गुंतवणुकीसाठी सर्वोत्तम पर्याय</h2>
<p>विरार हे आजकाल केवळ उपनगर राहिलेले नाही, तर हे एक वेगाने विकसित होणारे शहर बनले आहे. विरार वेस्टमध्ये 'ग्लोबल सिटी' सारखे मोठे प्रकल्प आणि विरार ईस्टमध्ये नवीन प्लॉटिंग यामुळे अनेक मराठी कुटुंबे येथे हक्काचे घर घेत आहेत.</p>

<p>घर घेतल्यानंतर सर्वात मोठा प्रश्न असतो: <strong>"घराचे इंटिरियर आणि सिव्हिल वर्क कोणाकडून करून घ्यावे आणि त्याचा खर्च किती येईल?"</strong> आज आपण याबद्दल सविस्तर माहिती घेणार आहोत.</p>

<h3>विरारमधील 1BHK / 2BHK फ्लॅटच्या नूतनीकरणाचा (Renovation) खर्च</h3>
<p>जर तुम्ही जुना फ्लॅट (Resale) घेतला असेल किंवा बिल्डरने तुम्हाला 'बेअर शेल' (रिकामा) फ्लॅट दिला असेल, तर तो राहायला योग्य करण्यासाठी अंदाजे खालील खर्च येऊ शकतो:</p>
<ul>
  <li><strong>फ्लोरिंग (फरशी):</strong> चांगल्या दर्जाच्या विट्रीफाईड टाईल्स बसवण्यासाठी मजुरी आणि सामानासह अंदाजे ₹६०,००० ते ₹९०,००० खर्च येतो.</li>
  <li><strong>बाथरूम आणि वॉटरप्रूफिंग:</strong> विरारमध्ये पावसाचे प्रमाण जास्त असल्याने योग्य वॉटरप्रूफिंग करणे खूप गरजेचे आहे. एका बाथरूमच्या नूतनीकरणासाठी ₹५०,००० ते ₹७०,००० खर्च येऊ शकतो.</li>
  <li><strong>किचन प्लॅटफॉर्म:</strong> नवीन मजबूत सिव्हिल प्लॅटफॉर्म आणि भिंतीवर टाईल्स लावण्यासाठी ₹४५,००० ते ₹६५,००० लागू शकतात.</li>
  <li><strong>POP आणि पेंटिंग:</strong> घराला प्रीमियम लुक देण्यासाठी POP फॉल्स सीलिंग आणि चांगल्या दर्जाचा रंग देण्यासाठी ₹५०,००० ते ₹८०,००० खर्च येतो.</li>
</ul>

<h3>विरारमध्ये स्वतःचा बंगला (Bungalow) बांधण्याचा खर्च</h3>
<p>अनेक लोक विरार पूर्व किंवा गावठाण भागात प्लॉट घेऊन स्वतःचा स्वतंत्र बंगला बांधण्यास पसंती देत आहेत. जर तुम्ही 'टर्नकी' (Turnkey) कंत्राटदाराला काम दिले, तर सध्याचा बांधकाम खर्च <strong>₹१,७०० ते ₹२,२०० प्रति स्क्वेअर फूट</strong> इतका आहे. यामध्ये पाया (Foundation) खोदण्यापासून ते रंगाच्या शेवटच्या हातापर्यंत सर्व कामे कंत्राटदार करतो.</p>

<h3>सिव्हिल वर्कसाठी 'Mandal Civil Works' ला का निवडावे?</h3>
<p>घराचे बांधकाम किंवा नूतनीकरण वारंवार केले जात नाही. त्यामुळे योग्य आणि प्रामाणिक कंत्राटदार (Contractor) निवडणे अत्यंत महत्त्वाचे आहे. <strong>Mandal Civil Works</strong> गेल्या २० वर्षांपासून वसई-विरार आणि संपूर्ण मुंबईमध्ये दर्जेदार काम करत आहे.</p>
<ul>
  <li><strong>पारदर्शकता (Transparent Pricing):</strong> आम्ही सुरुवातीलाच एक लेखी कोटेशन (Quotation) देतो, ज्यामध्ये वापरल्या जाणाऱ्या सामानाचे (Material) नाव स्पष्ट लिहिलेले असते.</li>
  <li><strong>संपूर्ण जबाबदारी (Turnkey Service):</strong> तुम्हाला प्लंबर, पेंटर किंवा टाईल्स बसवणारे कामगार शोधण्याची गरज नाही, आमची एकच टीम सर्व कामे उत्कृष्टपणे पार पाडते.</li>
</ul>

<p>जर तुम्ही विरारमध्ये फ्लॅट किंवा प्लॉट घेतला असेल, तर आजच आम्हाला संपर्क करा आणि <strong>विनामूल्य साईट व्हिजिट व कोटेशन (Free Estimate)</strong> मिळवा!</p>
        `
      }
    ];

    for (const blog of blogs) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
      console.log("Upserted Multilingual Blog: " + blog.title);
    }
    console.log("Virar Multilingual Blogs Seeding complete!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
