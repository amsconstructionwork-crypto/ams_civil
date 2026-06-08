const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envPaths = [
    path.join(__dirname, '..', '..', '.env.local'),
    path.join(process.cwd(), '.env.local')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^MONGODB_URI\s*=\s*(.+)$/m);
      if (match) return match[1].trim();
    }
  }
  throw new Error('MONGODB_URI not found');
}

const blogs = [
  {
    title: "Why Mumbaikars Are Leaving Cramped Flats to Build Luxury Bungalows in Virar & Palghar (2026 Reality Check)",
    slug: "mumbai-flats-vs-virar-bungalows-2026-reality-check",
    excerpt: "Discover the shocking truth about Mumbai real estate in 2026. Why pay 1.5 Crores for a tiny 1 BHK when you can build a massive luxury bungalow in Virar? A complete cost comparison.",
    content: `
      <h2>The Great Mumbai Migration: From Cramped Flats to Spacious Bungalows</h2>
      <p>For decades, the ultimate dream of every Mumbaikar was to own a flat in the heart of the city. But as we step into 2026, a massive shift is happening. The real estate market has hit a breaking point. With a basic 1 BHK in suburbs like Andheri or Borivali costing upwards of ₹1.5 to ₹2 Crores, families are waking up to a harsh reality: <strong>You are paying a fortune to live in a matchbox.</strong></p>
      
      <p>Enter the viral trend of 2026: <strong>The Virar-Palghar Bungalow Boom.</strong> Thousands of smart investors and families are selling their cramped city flats, buying land in the rapidly developing outer suburbs like Virar, Vasai, and Palghar, and hiring top civil contractors like <strong>AMS Civil Construction</strong> to build spectacular, independent bungalows.</p>

      <h2>The Shocking Cost Comparison: Flat in Mumbai vs Bungalow in Virar</h2>
      <p>Let’s look at the raw numbers that are making people leave the city:</p>
      <ul>
        <li><strong>Option A: 1 BHK in Borivali (500 sq ft)</strong> - Cost: ₹1.5 Crores. You get: No privacy, high maintenance costs, shared walls, and zero open space.</li>
        <li><strong>Option B: Independent Bungalow in Virar (1500 sq ft Built-up)</strong> - Land Cost: ₹40-50 Lakhs. Construction Cost (Premium quality by AMS Civil): ₹40 Lakhs. Total: ₹90 Lakhs. You get: 3 Bedrooms, private garden, terrace, zero monthly maintenance, and total privacy.</li>
      </ul>
      <p>You literally save ₹60 Lakhs AND get three times the space!</p>

      <h2>Why 2026 is the Perfect Time to Build?</h2>
      <p>With infrastructure projects like the upcoming Coastal Road extensions, improved local train networks, and the Bullet Train project gaining momentum, the connectivity from Virar to South Mumbai has never been better. The travel time is shrinking, making the outer suburbs prime real estate.</p>

      <h2>How AMS Civil Construction is Leading the Change</h2>
      <p>Building a bungalow from scratch can seem daunting. Where do you find reliable labor? Who handles the permissions? How do you ensure material quality? This is where <strong>AMS Civil Construction</strong> steps in. With over 25 years of experience in the Mumbai and Palghar regions, AMS provides a true "Turnkey Solution".</p>
      <ul>
        <li><strong>Transparent Pricing:</strong> No hidden costs. You know exactly what goes into your foundation and walls.</li>
        <li><strong>Premium Materials:</strong> From ACC cement to Tata steel, the structural integrity is world-class.</li>
        <li><strong>End-to-End Service:</strong> From 3D architectural planning, civil work, plumbing, to final luxury interiors (POP, False Ceiling, Italian Marble), AMS does it all.</li>
      </ul>

      <h2>The Psychological Benefit of Independent Living</h2>
      <p>Post-pandemic, the desire for open spaces has skyrocketed. Having a private terrace for evening tea, a small garden for your pets, and walls that you don't share with noisy neighbors is not just a luxury; it's a necessity for mental peace.</p>

      <h2>Conclusion: Don't Buy, Build!</h2>
      <p>If you have a budget of ₹1 Crore to ₹2 Crores, do not trap yourself in a 20-year EMI for a tiny apartment. Be smart. Buy land in emerging corridors like Virar or Palghar, and let AMS Civil Construction build your dream home. It's time to upgrade your lifestyle.</p>
      <p><em>Ready to start your bungalow project? Contact AMS Civil Construction today for a free site visit and estimate! Call +91 87793 91690.</em></p>
    `,
    author: "AMS Civil Team",
    tags: ["Bungalow Construction", "Virar", "Real Estate Trends", "Mumbai Property"],
    published: true,
    coverImage: "/images/blogs/placeholder.jpg",
    metaTitle: "Mumbai Flats vs Virar Bungalows: 2026 Reality Check | AMS Civil",
    metaDescription: "Why are Mumbaikars leaving flats to build luxury bungalows in Virar? See the shocking cost comparison and why 2026 is the best time to build with AMS Civil."
  },
  {
    title: "मुंबई की तंग फ्लैटों को छोड़कर लोग विरार में बंगले क्यों बना रहे हैं? (2026 की वायरल रिपोर्ट)",
    slug: "mumbai-flats-vs-virar-bungalows-2026-hindi",
    excerpt: "मुंबई रियल एस्टेट का कड़वा सच। 1.5 करोड़ में एक छोटा सा 1 BHK फ्लैट लेने से अच्छा है कि विरार में अपना खुद का आलीशान बंगला बनाया जाए। जानिए पूरा खर्च और गणित।",
    content: `
      <h2>मुंबई से पलायन: छोटे फ्लैट से बड़े बंगलों की ओर</h2>
      <p>दशकों से हर मुंबईकर का सपना शहर के बीचों-बीच एक फ्लैट खरीदने का रहा है। लेकिन 2026 में एक बहुत बड़ा बदलाव आ रहा है। अंधेरी या बोरीवली जैसे इलाकों में एक सामान्य 1 BHK की कीमत ₹1.5 से ₹2 करोड़ तक पहुंच गई है। अब परिवारों को यह कड़वी सच्चाई समझ आ रही है: <strong>आप एक माचिस की डिब्बी में रहने के लिए करोड़ों रुपये चुका रहे हैं।</strong></p>
      
      <p>यही कारण है कि 2026 का सबसे बड़ा वायरल ट्रेंड है: <strong>विरार-पालघर बंगला बूम।</strong> हजारों समझदार निवेशक और परिवार अपने शहर के तंग फ्लैट बेच रहे हैं, विरार, वसई और पालघर जैसे तेजी से विकसित हो रहे इलाकों में जमीन खरीद रहे हैं, और <strong>AMS Civil Construction</strong> जैसे शीर्ष ठेकेदारों से शानदार, स्वतंत्र बंगले बनवा रहे हैं।</p>

      <h2>चौंकाने वाली तुलना: मुंबई का फ्लैट vs विरार का बंगला</h2>
      <p>आइए उन आंकड़ों पर नजर डालें जो लोगों को शहर छोड़ने पर मजबूर कर रहे हैं:</p>
      <ul>
        <li><strong>विकल्प A: बोरीवली में 1 BHK (500 sq ft)</strong> - कीमत: ₹1.5 करोड़। आपको मिलता है: कोई प्राइवेसी नहीं, भारी मेंटेनेंस खर्च, और खुली जगह बिल्कुल नहीं।</li>
        <li><strong>विकल्प B: विरार में स्वतंत्र बंगला (1500 sq ft)</strong> - जमीन की कीमत: ₹40-50 लाख। निर्माण लागत (AMS Civil द्वारा प्रीमियम क्वालिटी): ₹40 लाख। कुल: ₹90 लाख। आपको मिलता है: 3 बेडरूम, निजी बगीचा, छत, शून्य मासिक मेंटेनेंस, और पूरी प्राइवेसी।</li>
      </ul>
      <p>आप सीधे ₹60 लाख बचाते हैं और आपको तीन गुना अधिक जगह मिलती है!</p>

      <h2>AMS Civil Construction कैसे मदद कर रहा है?</h2>
      <p>शून्य से बंगला बनाना एक मुश्किल काम लग सकता है। लेकिन <strong>AMS Civil Construction</strong> के साथ, यह एक सहज अनुभव है। मुंबई और पालघर क्षेत्रों में 25 से अधिक वर्षों के अनुभव के साथ, AMS एक सच्चा "टर्नकी सॉल्यूशन" प्रदान करता है।</p>
      <ul>
        <li><strong>पारदर्शी मूल्य निर्धारण:</strong> कोई छिपा हुआ खर्च नहीं।</li>
        <li><strong>प्रीमियम सामग्री:</strong> ACC सीमेंट से लेकर टाटा स्टील तक।</li>
        <li><strong>संपूर्ण सेवा:</strong> 3D प्लानिंग से लेकर इंटीरियर और पीओपी तक।</li>
      </ul>

      <h2>निष्कर्ष: खरीदें नहीं, बनाएं!</h2>
      <p>यदि आपका बजट ₹1 से ₹2 करोड़ है, तो एक छोटे से अपार्टमेंट के लिए खुद को 20 साल की EMI में न फंसाएं। समझदार बनें। विरार या पालघर में जमीन खरीदें, और AMS Civil Construction को अपने सपनों का घर बनाने दें।</p>
      <p><em>आज ही AMS Civil Construction से संपर्क करें: +91 87793 91690</em></p>
    `,
    author: "AMS Civil Team",
    tags: ["Bungalow Construction", "Virar", "Real Estate Trends", "Mumbai Property"],
    published: true,
    coverImage: "/images/blogs/placeholder.jpg",
    metaTitle: "मुंबई के फ्लैट vs विरार के बंगले (2026 रिपोर्ट) | AMS Civil",
    metaDescription: "मुंबई के तंग फ्लैटों को छोड़कर लोग विरार और पालघर में अपना बंगला क्यों बना रहे हैं? निर्माण लागत और फायदे जानें।"
  },
  {
    title: "मुंबईचे फ्लॅट्स सोडून लोक विरारमध्ये बंगले का बांधत आहेत? (2026 चा व्हायरल रिपोर्ट)",
    slug: "mumbai-flats-vs-virar-bungalows-2026-marathi",
    excerpt: "मुंबईतील रिअल इस्टेटचे कटू सत्य. 1.5 कोटी रुपयांत छोटा 1 BHK फ्लॅट घेण्यापेक्षा विरारमध्ये स्वतःचा आलिशान बंगला बांधणे का फायदेशीर आहे? जाणून घ्या संपूर्ण गणित.",
    content: `
      <h2>मुंबईकरांचा नवा ट्रेंड: छोट्या फ्लॅटमधून मोठ्या बंगल्याकडे</h2>
      <p>अनेक दशकांपासून प्रत्येक मुंबईकराचे स्वप्न शहराच्या मध्यभागी फ्लॅट घेण्याचे होते. परंतु 2026 मध्ये एक मोठा बदल होत आहे. अंधेरी किंवा बोरीवली सारख्या भागात 1 BHK ची किंमत ₹1.5 ते ₹2 कोटींवर पोहोचली आहे. आता कुटुंबांना हे सत्य समजत आहे: <strong>तुम्ही एका छोट्या बॉक्समध्ये राहण्यासाठी लाखो रुपये खर्च करत आहात.</strong></p>
      
      <p>म्हणूनच 2026 चा सर्वात मोठा व्हायरल ट्रेंड आहे: <strong>विरार-पालघर बंगला बूम.</strong> हजारो हुशार गुंतवणूकदार आणि कुटुंबे त्यांचे शहरातील फ्लॅट्स विकत आहेत, विरार, वसई आणि पालघर सारख्या वेगाने विकसित होणाऱ्या उपनगरांमध्ये जागा विकत घेत आहेत आणि <strong>AMS Civil Construction</strong> सारख्या टॉप कॉन्ट्रॅक्टर्सकडून स्वतःचे आलिशान बंगले बांधून घेत आहेत.</p>

      <h2>थक्क करणारी तुलना: मुंबईतील फ्लॅट विरुद्ध विरारमधील बंगला</h2>
      <p>चला त्या आकडेवारीवर एक नजर टाकूया ज्यामुळे लोक शहर सोडत आहेत:</p>
      <ul>
        <li><strong>पर्याय A: बोरीवलीमध्ये 1 BHK (500 sq ft)</strong> - किंमत: ₹1.5 कोटी. तुम्हाला मिळते: कोणतीही प्रायव्हसी नाही, जास्त मेंटेनन्स खर्च आणि मोकळी जागा नाही.</li>
        <li><strong>पर्याय B: विरारमध्ये स्वतंत्र बंगला (1500 sq ft)</strong> - जागेची किंमत: ₹40-50 लाख. बांधकामाचा खर्च (AMS Civil ची प्रीमियम क्वालिटी): ₹40 लाख. एकूण: ₹90 लाख. तुम्हाला मिळते: 3 बेडरूम, स्वतःची बाग, गच्ची, झिरो मासिक मेंटेनन्स आणि पूर्ण प्रायव्हसी.</li>
      </ul>
      <p>तुम्ही थेट ₹60 लाख वाचवता आणि तुम्हाला तीन पट जास्त जागा मिळते!</p>

      <h2>AMS Civil Construction ची भूमिका</h2>
      <p>स्वतःचा बंगला बांधणे कठीण वाटू शकते. पण <strong>AMS Civil Construction</strong> सोबत हा एक अतिशय सोपा अनुभव आहे. 25 वर्षांपेक्षा जास्त अनुभवासह, AMS सर्व्हिस देते.</p>
      <ul>
        <li><strong>पारदर्शक व्यवहार:</strong> कोणताही छुपा खर्च नाही.</li>
        <li><strong>दर्जेदार साहित्य:</strong> टॉप क्लास सिमेंट आणि स्टील.</li>
        <li><strong>संपूर्ण जबाबदारी:</strong> प्लॅनिंगपासून ते इंटीरियरपर्यंत सगळी कामे एकाच ठिकाणी.</li>
      </ul>

      <h2>निष्कर्ष</h2>
      <p>जर तुमचे बजेट ₹1 ते ₹2 कोटी असेल, तर छोट्या अपार्टमेंटसाठी 20 वर्षांच्या EMI मध्ये अडकू नका. हुशार व्हा. विरारमध्ये जागा घ्या आणि AMS Civil Construction ला तुमचे स्वप्नातील घर बांधू द्या.</p>
      <p><em>आजच AMS Civil Construction शी संपर्क साधा: +91 87793 91690</em></p>
    `,
    author: "AMS Civil Team",
    tags: ["Bungalow Construction", "Virar", "Real Estate Trends", "Mumbai Property"],
    published: true,
    coverImage: "/images/blogs/placeholder.jpg",
    metaTitle: "मुंबईचे फ्लॅट्स विरुद्ध विरारचे बंगले (2026 रिपोर्ट) | AMS Civil",
    metaDescription: "मुंबईचे फ्लॅट्स सोडून लोक विरारमध्ये बंगले का बांधत आहेत? खर्च आणि फायदे जाणून घ्या."
  }
];

async function seed() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    let inserted = 0;
    for (const blog of blogs) {
      // Create publishDate right now so it shows at the very top
      blog.publishDate = new Date();
      blog.createdAt = new Date();

      const existing = await collection.findOne({ slug: blog.slug });
      if (!existing) {
        await collection.insertOne(blog);
        inserted++;
        console.log(`Inserted: ${blog.slug}`);
      } else {
        await collection.updateOne(
          { slug: blog.slug },
          { $set: blog }
        );
        console.log(`Updated: ${blog.slug}`);
      }
    }
    console.log(`\nSuccessfully processed ${inserted} highly viral blogs!`);
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await client.close();
  }
}

seed();
