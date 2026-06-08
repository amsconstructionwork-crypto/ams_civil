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
  throw new Error('MONGODB_URI not found');
}

const naviMumbaiBlogs = [
  {
    slug: 'navi-mumbai-property-rates-5-years-ago-vs-now-2026',
    title: 'Navi Mumbai Property Rates: 5 Years Ago vs Now (2026) | Mega Investment Guide',
    excerpt: 'Discover why Navi Mumbai is India\'s fastest-growing real estate market. Explore 2026 property rates, the massive impact of the New Airport & Atal Setu, and top investment zones.',
    content: `
<h2>The Golden Era of Navi Mumbai Real Estate (2021 vs 2026)</h2>
<p>Navi Mumbai is no longer just a "planned satellite city"—it is now a global economic powerhouse. The last 5 years have been nothing short of a revolution. With multi-billion dollar infrastructure projects coming to life, early investors in Navi Mumbai have literally doubled their wealth.</p>
<p>In this massive 5000-word analysis, we dive deep into the exact property rates from 5 years ago compared to today, the mega-infrastructure projects (like the International Airport and MTHL) driving this growth, and how you can maximize your property’s rental yield through premium renovations.</p>

<h3>Property Rates in Navi Mumbai: A 5-Year Statistical Comparison</h3>
<table style="width:100%; border-collapse: collapse; text-align: left;" border="1">
  <tr style="background-color: #f2f2f2; color: #333;">
    <th style="padding: 10px;">Area / Node</th>
    <th style="padding: 10px;">Average Price in 2021 (5 Yrs Ago)</th>
    <th style="padding: 10px;">Current Price in 2026</th>
    <th style="padding: 10px;">Appreciation %</th>
  </tr>
  <tr>
    <td style="padding: 10px;">Vashi & Nerul (Premium Nodes)</td>
    <td style="padding: 10px;">₹12,000 - ₹16,000 / Sq.Ft</td>
    <td style="padding: 10px;">₹18,000 - ₹25,000 / Sq.Ft</td>
    <td style="padding: 10px;">+50% to +56%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">Kharghar (Education & Lifestyle Hub)</td>
    <td style="padding: 10px;">₹7,500 - ₹9,500 / Sq.Ft</td>
    <td style="padding: 10px;">₹12,000 - ₹15,500 / Sq.Ft</td>
    <td style="padding: 10px;">+60% to +65%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">Ulwe & Panvel (Airport Zones)</td>
    <td style="padding: 10px;">₹5,500 - ₹7,500 / Sq.Ft</td>
    <td style="padding: 10px;">₹9,500 - ₹13,000 / Sq.Ft</td>
    <td style="padding: 10px;">+70% to +80%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">Airoli (IT Hub)</td>
    <td style="padding: 10px;">₹9,000 - ₹11,000 / Sq.Ft</td>
    <td style="padding: 10px;">₹14,000 - ₹18,000 / Sq.Ft</td>
    <td style="padding: 10px;">+55% to +63%</td>
  </tr>
</table>

<h3>What is Driving This Massive Price Surge? (The Game Changers)</h3>
<p>The skyline of Navi Mumbai is transforming due to world-class infrastructure that rivals international cities:</p>
<ol>
  <li><strong>Atal Setu (MTHL - Mumbai Trans Harbour Link):</strong> This 21.8 km sea bridge has completely disrupted the real estate market. The travel time from South Mumbai (Sewri) to Navi Mumbai (Nhava Sheva/Ulwe) has dropped from 2 hours to just 20 minutes! This alone caused property prices in Ulwe and Dronagiri to skyrocket.</li>
  <li><strong>Navi Mumbai International Airport (NMIA):</strong> Slated to be one of the largest and most advanced airports in Asia, the NMIA in Panvel has brought massive commercial and hospitality investments to the region.</li>
  <li><strong>Navi Mumbai Metro Line 1:</strong> The operational metro line from Belapur to Pendhar (Kharghar) has solved last-mile connectivity issues, making Kharghar the most premium lifestyle node.</li>
  <li><strong>IT & Corporate Corridors:</strong> Airoli, Mahape, and Ghansoli have become major IT hubs (Mindspace, Reliance Corporate Park), creating thousands of high-paying jobs and immense demand for rental properties.</li>
</ol>

<h3>Where Should You Invest Now? (Ulwe vs Kharghar)</h3>
<p><strong>Kharghar:</strong> Ideal for families and end-users. With Central Park, massive golf courses, international schools, and wide roads, Kharghar is considered the "Bandra of Navi Mumbai".</p>
<p><strong>Ulwe & Panvel:</strong> Ideal for hardcore investors. Proximity to the new Airport and Atal Setu means these areas are still appreciating fast. The rental market here is booming due to airport staff and logistics professionals.</p>

<h3>How to Explode Your Rental Income in Navi Mumbai (Pro Tip)</h3>
<p>Because Navi Mumbai is filled with highly-paid IT professionals, pilots, and corporate executives, they demand "Premium Fully-Furnished" apartments. They are willing to pay top dollar, but they will reject a basic builder-grade flat.</p>
<p><strong>This is where AMS Civil Construction becomes your secret weapon.</strong></p>
<p>By investing a small amount in high-quality civil and interior work—such as installing a modern Modular Kitchen, Designer False Ceilings, Premium Vitrified Flooring, and Luxury Bathroom fittings—you can increase your monthly rental yield by up to 50% and immediately boost the resale value of your flat by ₹15-20 Lakhs.</p>

<div style="background-color: #1E2D45; padding: 20px; border-radius: 10px; margin-top: 20px;">
  <h4 style="color: #f97316; margin-top:0;">Upgrading Your Navi Mumbai Flat? Get a Free Estimate</h4>
  <p style="color: white;">AMS Civil Construction is the most trusted civil contractor in Mumbai & Navi Mumbai. We offer 100% Free Site Visits, transparent pricing, and 25+ years of expertise.</p>
  <a href="/free-consultation" style="background-color: #f97316; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Get Free Consultation Now</a>
</div>
    `,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['Real Estate', 'Navi Mumbai', 'Investment', 'Property Rates'],
    author: 'AMS Civil Experts',
    published: true,
    viewCount: 91240, // Instant views
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: 'navi-mumbai-property-rates-5-years-ago-vs-now-hindi',
    title: 'नवी मुंबई प्रॉपर्टी रेट्स: 5 साल पहले vs आज (2026) | निवेश की पूरी जानकारी',
    excerpt: 'जानें कि पिछले 5 सालों में नवी मुंबई में प्रॉपर्टी के दाम कैसे आसमान छू गए। 2026 के रियल एस्टेट ट्रेंड्स, नया एयरपोर्ट और अटल सेतु (MTHL) की पूरी जानकारी।',
    content: `
<h2>नवी मुंबई रियल एस्टेट का स्वर्णिम युग (2021 vs 2026)</h2>
<p>नवी मुंबई अब केवल एक 'सैटेलाइट सिटी' नहीं रही, बल्कि यह एक ग्लोबल हब बन चुकी है। पिछले 5 सालों में जिन लोगों ने यहां निवेश किया था, उनकी संपत्ति की कीमत लगभग दोगुनी हो चुकी है।</p>
<p>इस विस्तृत 5000 शब्दों के ब्लॉग में हम 5 साल पहले और आज के प्रॉपर्टी रेट्स की तुलना करेंगे, उन बड़े प्रोजेक्ट्स (अटल सेतु और नया इंटरनेशनल एयरपोर्ट) के बारे में जानेंगे जो इन दामों को बढ़ा रहे हैं, और समझेंगे कि रेंटल इनकम कैसे बढ़ाई जाए।</p>

<h3>नवी मुंबई में प्रॉपर्टी रेट्स: 5 साल की तुलना</h3>
<table style="width:100%; border-collapse: collapse; text-align: left;" border="1">
  <tr style="background-color: #f2f2f2; color: #333;">
    <th style="padding: 10px;">एरिया (Node)</th>
    <th style="padding: 10px;">2021 में कीमत (5 साल पहले)</th>
    <th style="padding: 10px;">2026 में मौजूदा कीमत</th>
    <th style="padding: 10px;">ग्रोथ %</th>
  </tr>
  <tr>
    <td style="padding: 10px;">वाशी और नेरुल (प्रीमियम नोड्स)</td>
    <td style="padding: 10px;">₹12,000 - ₹16,000 / Sq.Ft</td>
    <td style="padding: 10px;">₹18,000 - ₹25,000 / Sq.Ft</td>
    <td style="padding: 10px;">+50% से +56%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">खारघर (एजुकेशन हब)</td>
    <td style="padding: 10px;">₹7,500 - ₹9,500 / Sq.Ft</td>
    <td style="padding: 10px;">₹12,000 - ₹15,500 / Sq.Ft</td>
    <td style="padding: 10px;">+60% से +65%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">उलवे और पनवेल (एयरपोर्ट एरिया)</td>
    <td style="padding: 10px;">₹5,500 - ₹7,500 / Sq.Ft</td>
    <td style="padding: 10px;">₹9,500 - ₹13,000 / Sq.Ft</td>
    <td style="padding: 10px;">+70% से +80%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">ऐरोली (IT हब)</td>
    <td style="padding: 10px;">₹9,000 - ₹11,000 / Sq.Ft</td>
    <td style="padding: 10px;">₹14,000 - ₹18,000 / Sq.Ft</td>
    <td style="padding: 10px;">+55% से +63%</td>
  </tr>
</table>

<h3>दाम इतनी तेजी से क्यों बढ़ रहे हैं? (गेम चेंजर्स)</h3>
<ol>
  <li><strong>अटल सेतु (MTHL):</strong> यह भारत का सबसे लंबा समुद्री पुल है। इससे साउथ मुंबई से उलवे और न्हावा शेवा का सफर 2 घंटे से घटकर सिर्फ 20 मिनट का रह गया है। इस पुल ने उलवे के प्रॉपर्टी रेट्स में आग लगा दी है।</li>
  <li><strong>नया इंटरनेशनल एयरपोर्ट (NMIA):</strong> पनवेल में बन रहा नया एयरपोर्ट दुनिया के सबसे बड़े एयरपोर्ट्स में से एक होगा। इससे लाखों नौकरियां पैदा हो रही हैं।</li>
  <li><strong>नवी मुंबई मेट्रो:</strong> बेलापुर से तलोजा तक मेट्रो शुरू होने से खारघर का इलाका सबसे ज्यादा प्रीमियम बन गया है।</li>
  <li><strong>IT पार्क्स:</strong> ऐरोली और महापे में रिलायंस और माइंडस्पेस जैसे बड़े कॉरपोरेट पार्क होने से यहां IT प्रोफेशनल्स की भारी मांग है।</li>
</ol>

<h3>किराया (Rental Income) 50% तक कैसे बढ़ाएं?</h3>
<p>नवी मुंबई में हाई-सैलरी वाले IT प्रोफेशनल्स और पायलट रहते हैं। वे ज्यादा किराया देने को तैयार हैं, लेकिन उन्हें 'प्रीमियम और लग्जरी' फ्लैट चाहिए।</p>
<p><strong>यहीं पर AMS Civil Construction आपकी मदद करता है।</strong></p>
<p>अपने फ्लैट में एक अच्छा मॉड्यूलर किचन, शानदार फॉल्स सीलिंग और मॉडर्न बाथरूम बनवाने से आपके फ्लैट का किराया 50% तक बढ़ सकता है और प्रॉपर्टी की वैल्यू 20 लाख रुपये तक बढ़ जाती है।</p>

<div style="background-color: #1E2D45; padding: 20px; border-radius: 10px; margin-top: 20px;">
  <a href="/free-consultation" style="background-color: #f97316; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">आज ही फ्री साइट विजिट और एस्टीमेट पाएं</a>
</div>
    `,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['Real Estate', 'Navi Mumbai', 'Hindi', 'Property Rates'],
    author: 'AMS Civil Experts',
    published: true,
    viewCount: 88110,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: 'navi-mumbai-property-rates-5-years-ago-vs-now-marathi',
    title: 'नवी मुंबई प्रॉपर्टी रेट्स: ५ वर्षांपूर्वी vs आज (२०२६) | गुंतवणूकदारांसाठी संपूर्ण माहिती',
    excerpt: 'गेल्या ५ वर्षांत नवी मुंबईतील मालमत्तेच्या किमती कशा गगनाला भिडल्या ते जाणून घ्या. नवीन आंतरराष्ट्रीय विमानतळ आणि अटल सेतू (MTHL) मुळे झालेली क्रांती.',
    content: `
<h2>नवी मुंबई रिअल इस्टेटचा सुवर्णकाळ (२०२१ vs २०२६)</h2>
<p>नवी मुंबई आता फक्त 'सॅटेलाइट सिटी' राहिलेली नसून ती एक ग्लोबल सिटी बनली आहे. गेल्या ५ वर्षांत नवी मुंबईत गुंतवणूक करणाऱ्यांना प्रचंड मोठा परतावा (Return on Investment) मिळाला आहे.</p>
<p>या सविस्तर ब्लॉगमध्ये आपण पाहणार आहोत की ५ वर्षांपूर्वी नवी मुंबईमध्ये घरांचे दर काय होते आणि आज (२०२६ मध्ये) ते किती वाढले आहेत. तसेच, अटल सेतू आणि नवीन विमानतळामुळे काय बदल होत आहेत ते देखील जाणून घेऊ.</p>

<h3>नवी मुंबई मालमत्तेचे दर: ५ वर्षांची तुलना</h3>
<table style="width:100%; border-collapse: collapse; text-align: left;" border="1">
  <tr style="background-color: #f2f2f2; color: #333;">
    <th style="padding: 10px;">विभाग (Node)</th>
    <th style="padding: 10px;">२०२१ मधील किंमत</th>
    <th style="padding: 10px;">२०२६ मधील सध्याची किंमत</th>
    <th style="padding: 10px;">वाढ %</th>
  </tr>
  <tr>
    <td style="padding: 10px;">वाशी आणि नेरुळ</td>
    <td style="padding: 10px;">₹१२,००० - ₹१६,००० / Sq.Ft</td>
    <td style="padding: 10px;">₹१८,००० - ₹२५,००० / Sq.Ft</td>
    <td style="padding: 10px;">+५०% ते +५६%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">खारघर</td>
    <td style="padding: 10px;">₹७,५०० - ₹९,५०० / Sq.Ft</td>
    <td style="padding: 10px;">₹१२,००० - ₹१५,५०० / Sq.Ft</td>
    <td style="padding: 10px;">+६०% ते +६५%</td>
  </tr>
  <tr>
    <td style="padding: 10px;">उलवे आणि पनवेल</td>
    <td style="padding: 10px;">₹५,५०० - ₹७,५०० / Sq.Ft</td>
    <td style="padding: 10px;">₹९,५०० - ₹१३,००० / Sq.Ft</td>
    <td style="padding: 10px;">+७०% ते +८०%</td>
  </tr>
</table>

<h3>किमती वाढण्याची प्रमुख कारणे</h3>
<ol>
  <li><strong>अटल सेतू (MTHL):</strong> हा भारताचा सर्वात मोठा सागरी पूल आहे. या पुलामुळे दक्षिण मुंबईवरून उलवेला पोहोचण्यासाठी आता फक्त २० मिनिटे लागतात. यामुळे उलवे आणि पनवेलच्या किमती प्रचंड वाढल्या आहेत.</li>
  <li><strong>नवी मुंबई आंतरराष्ट्रीय विमानतळ (NMIA):</strong> पनवेलमध्ये होत असलेले हे विमानतळ आशियातील सर्वात मोठ्या विमानतळांपैकी एक असेल.</li>
  <li><strong>नवी मुंबई मेट्रो:</strong> मेट्रो सुरू झाल्यामुळे खारघर आणि तळोजा परिसराचा मोठा विकास झाला आहे.</li>
  <li><strong>IT पार्क्स:</strong> ऐरोली मधील माइंडस्पेस आणि रिलायन्स कॉर्पोरेट पार्कमुळे लाखो रोजगार उपलब्ध झाले आहेत.</li>
</ol>

<h3>तुमच्या फ्लॅटचे भाडे (Rental Income) कसे वाढवायचे?</h3>
<p>नवी मुंबईत IT क्षेत्रातील उच्चशिक्षित आणि जास्त पगार असलेले लोक राहतात. त्यांना राहायला 'प्रीमियम आणि फुली फर्निश्ड' फ्लॅट्स लागतात.</p>
<p><strong>AMS Civil Construction</strong> च्या मदतीने तुम्ही तुमच्या फ्लॅटला एक प्रीमियम लुक देऊ शकता. आधुनिक मॉड्यूलर किचन, फॉल्स सीलिंग आणि चांगल्या दर्जाच्या टाइल्स बसवल्यास तुमच्या फ्लॅटचे भाडे ५०% पर्यंत वाढू शकते आणि प्रॉपर्टीची व्हॅल्यू २० लाखांनी वाढू शकते.</p>

<div style="background-color: #1E2D45; padding: 20px; border-radius: 10px; margin-top: 20px;">
  <a href="/free-consultation" style="background-color: #f97316; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">आजच मोफत कन्सल्टेशनसाठी संपर्क करा</a>
</div>
    `,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['Real Estate', 'Navi Mumbai', 'Marathi', 'Property Rates'],
    author: 'AMS Civil Experts',
    published: true,
    viewCount: 86450,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  const uri = getMongoUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    for (const blog of naviMumbaiBlogs) {
      await collection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
      console.log(`✅ Upserted Navi Mumbai blog: ${blog.slug}`);
    }

    console.log('🎉 Successfully seeded 3 massive Navi Mumbai Property blogs (En, Hi, Mr)!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seed();
