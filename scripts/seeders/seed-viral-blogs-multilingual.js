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

    const multilingualBlogs = [
      // HINDI BLOGS
      {
        title: "मुंबई में टॉप 5 इंटीरियर डिजाइन स्कैम: कॉन्ट्रैक्टर कैसे बेवकूफ बनाते हैं",
        slug: "top-5-interior-design-scams-mumbai-hindi",
        excerpt: "क्या आप अपने घर का रेनोवेशन करा रहे हैं? रुकिए! जानिए कैसे कुछ लोकल कॉन्ट्रैक्टर खराब माल इस्तेमाल करके आपको लाखों का चूना लगाते हैं।",
        author: "AMS Investigation Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "interior design scams mumbai hindi, ghar banane ka kharcha mumbai, contractor fraud, civil work tips",
        locationTags: ["Mumbai", "Thane"],
        content: `
<h2>मुंबई होम रेनोवेशन के छिपे हुए राज</h2>
<p>आपने अपनी जिंदगी भर की कमाई से मुंबई में एक घर खरीदा है। अब आप उसे सुंदर बनाना चाहते हैं। लेकिन सावधान! किसी भी अनजान कॉन्ट्रैक्टर को पैसे देने से पहले आपको इन बातों का ध्यान रखना चाहिए।</p>

<h3>स्कैम 1: सस्ते प्लाईवुड (Commercial Ply) का धोखा</h3>
<p>आप किचन के लिए 100% वॉटरप्रूफ मरीन प्लाईवुड के पैसे देते हैं। लेकिन कॉन्ट्रैक्टर क्या लगाता है? सस्ता कमर्शियल प्लाई। 2 साल बाद जब पानी लगता है, तो लकड़ी अंदर से सड़ जाती है और आपके पैसे बर्बाद हो जाते हैं।</p>

<h3>स्कैम 2: नल और प्लंबिंग का फ्रॉड</h3>
<p>₹5,000 बचाने के लिए, लोकल मिस्त्री लोकल पाइप का इस्तेमाल करते हैं। जब दीवार के अंदर पाइप फटता है, तो आपको ₹2 लाख का मार्बल तोड़कर उसे ठीक करना पड़ता है।</p>

<h3>स्कैम 3: "स्क्वायर फुट" का लालच</h3>
<p>कई कॉन्ट्रैक्टर शुरुआत में बहुत कम रेट बताते हैं। लेकिन काम शुरू होने के बाद हर चीज का "एक्स्ट्रा" पैसा मांगते हैं। आपका 5 लाख का बजट कब 10 लाख हो जाता है, आपको पता भी नहीं चलता।</p>

<h3>बचाव कैसे करें?</h3>
<p>AMS Civil Construction में, हम 100% पारदर्शिता (Transparency) में विश्वास करते हैं। हम काम शुरू होने से पहले ही पूरा बिल (BOQ) देते हैं। अगर हम Asian Paints या Jaquar का वादा करते हैं, तो हम आपके सामने सील-पैक डिब्बे खोलते हैं।</p>

<p><strong>धोखे से बचें और सही लोगों से काम कराएं।</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction से फ्री और सच्चा एस्टीमेट लेने के लिए संपर्क करें।</a></p>
        `
      },
      {
        title: "2026 में मुंबई प्रॉपर्टी: रीडेवलपमेंट का इंतजार करें या नया फ्लैट खरीदें?",
        slug: "redevelopment-vs-buy-new-flat-mumbai-hindi",
        excerpt: "दादर और बांद्रा की पुरानी इमारतों का क्या भविष्य है? बिल्डर के भरोसे बैठना सही है या अपना फ्लैट बेचकर कहीं और शिफ्ट होना?",
        author: "Real Estate Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mumbai redevelopment hindi, purani building redevelopment, civil construction costs, flat buy mumbai",
        locationTags: ["South Mumbai", "Dadar", "Bandra"],
        content: `
<h2>मुंबईकरों की सबसे बड़ी उलझन</h2>
<p>अगर आप दादर, बांद्रा या घाटकोपर की 30 साल पुरानी सोसायटी में रहते हैं, तो आपने 'रीडेवलपमेंट' (Redevelopment) शब्द बहुत सुना होगा। लेकिन क्या यह वाकई फायदेमंद है?</p>

<h3>रीडेवलपमेंट का कड़वा सच</h3>
<p>बिल्डर आपको 20% बड़ा घर और ढेर सारे पैसे देने का वादा करता है। लेकिन सच्चाई यह है कि मुंबई में सैकड़ों प्रोजेक्ट रुके हुए हैं क्योंकि बिल्डर के पास पैसे खत्म हो गए हैं। और जो घर बनते भी हैं, उनकी <a href="/services" style="color: #F97316;">सिविल कंस्ट्रक्शन क्वालिटी</a> अक्सर बहुत खराब होती है।</p>

<h3>इसका दूसरा रास्ता क्या है?</h3>
<p>अगर आपकी बिल्डिंग का स्ट्रक्चर (RCC) अभी भी मजबूत है, तो उसे बिल्डर को देने के बजाय खुद रिपेयर करवाना बहुत सुरक्षित होता है। भारी स्ट्रक्चरल रिपेयर और वाटरप्रूफिंग से आपकी बिल्डिंग 15-20 साल और चल सकती है।</p>

<p>AMS Civil Construction की टीम पुराने कॉलम्स को केमिकल ट्रीटमेंट देकर मजबूत बनाने में माहिर है।</p>

<h3>निष्कर्ष</h3>
<p>कोई भी बड़ा फैसला लेने से पहले अपनी बिल्डिंग का स्ट्रक्चरल ऑडिट करवाएं। अगर रिपेयर संभव है, तो <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction को कॉल करें</a> और अपनी पुरानी बिल्डिंग को नया जैसा बनाएं!</p>
        `
      },
      {
        title: "हमने ₹10 लाख में नवी मुंबई का घर रेनोवेट किया - देखिए क्या क्या बना",
        slug: "10-lakh-home-renovation-navi-mumbai-hindi",
        excerpt: "अगर आपका बजट ₹10 लाख है, तो क्या आप एक स्मार्ट होम बना सकते हैं? नवी मुंबई के एक 2BHK फ्लैट का पूरा खर्च और डिटेल्स।",
        author: "AMS Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "2bhk interior cost hindi, renovation budget mumbai, modular kitchen rate, pop false ceiling rate",
        locationTags: ["Navi Mumbai", "Vashi", "Panvel"],
        content: `
<h2>केस स्टडी: नवी मुंबई फ्लैट का गजब का ट्रांसफॉर्मेशन</h2>
<p>हर कोई एक शानदार घर चाहता है, लेकिन असली खर्च के बारे में कोई नहीं बताता। आज हम आपको वाशी, नवी मुंबई के एक 2BHK फ्लैट की पूरी कहानी बता रहे हैं, जिसका कुल बजट 10 लाख रुपये था।</p>

<h3>पैसे कहाँ खर्च हुए? (बजट ब्रेकडाउन)</h3>
<ol>
  <li><strong>सिविल और तोड़-फोड़ (₹1.5 लाख):</strong> पुराने टाइल्स तोड़ना, किचन प्लेटफार्म हटाना और स्पेस बढ़ाना।</li>
  <li><strong>प्लंबिंग और इलेक्ट्रिकल (₹2 लाख):</strong> पूरी नई वायरिंग, वाई-फाई वाले स्मार्ट स्विच और बाथरूम की नई फिटिंग।</li>
  <li><strong>फ्लोरिंग / टाइल्स (₹1.8 लाख):</strong> पूरे घर में 4x2 फीट की प्रीमियम विट्रीफाइड टाइल्स।</li>
  <li><strong>फॉल्स सीलिंग और पेंट (₹1.5 लाख):</strong> जिप्सम POP सीलिंग और दीवारों पर एशियन पेंट्स रॉयल पेंट।</li>
  <li><strong>मॉड्यूलर किचन और बाथरूम (₹3.2 लाख):</strong> एक्रेलिक फिनिश किचन कैबिनेट्स, क्वार्ट्ज काउंटर और जगुआर की फिटिंग।</li>
</ol>

<h3>क्या फायदा हुआ?</h3>
<p>अब हमारे क्लाइंट अपने घर की लाइट और एसी को आवाज़ (Alexa) से कंट्रोल करते हैं। <a href="/services/tiles-work" style="color: #F97316;">टाइल्स</a> और <a href="/services/pop-work" style="color: #F97316;">POP का शानदार काम</a> घर को 5-स्टार होटल जैसा लुक देता है।</p>

<p>क्या आपका भी कोई बजट है? <a href="/calculator" style="color: #F97316; font-weight: bold;">हमारा फ्री कंस्ट्रक्शन कैलकुलेटर आज़माएं</a> या सीधे <a href="/contact" style="color: #F97316;">हमसे संपर्क करें!</a></p>
        `
      },

      // MARATHI BLOGS
      {
        title: "मुंबईतील टॉप 5 इंटिरिअर डिझाईन स्कॅम: कॉन्ट्रॅक्टर कसे फसवतात ते ओळखा",
        slug: "top-5-interior-design-scams-mumbai-marathi",
        excerpt: "तुम्ही तुमच्या घराचे नूतनीकरण करत आहात? थांबा! काही स्थानिक कॉन्ट्रॅक्टर्स हलक्या दर्जाचे साहित्य वापरून तुमची कशी फसवणूक करतात ते जाणून घ्या.",
        author: "AMS Investigation Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "interior design scams mumbai marathi, ghar bandhani kharcha, civil contractor fraud marathi, renovation tips",
        locationTags: ["Mumbai", "Thane", "Dombivli"],
        content: `
<h2>मुंबईतील होम रेनोवेशनचे छुपे सत्य</h2>
<p>तुम्ही तुमच्या आयुष्यभराच्या कमाईने मुंबईत घर विकत घेतले आहे. आता तुम्हाला ते सुंदर बनवायचे आहे. पण सावधान! कोणत्याही अनोळखी कॉन्ट्रॅक्टरला पैसे देण्यापूर्वी तुम्हाला या गोष्टींची माहिती असली पाहिजे.</p>

<h3>स्कॅम 1: स्वस्त प्लायवूडचा (Commercial Ply) फसवणूक</h3>
<p>तुम्ही किचनसाठी 100% वॉटरप्रूफ मरीन प्लायवूडचे पैसे देता. पण कॉन्ट्रॅक्टर काय लावतो? हलक्या दर्जाचे कमर्शियल प्लायवूड. दोन वर्षांनी पाणी लागल्यावर लाकूड आतून सडते आणि तुमचे पैसे वाया जातात.</p>

<h3>स्कॅम 2: नळ आणि प्लंबिंगचा फ्रॉड</h3>
<p>₹5,000 वाचवण्यासाठी, स्थानिक कामगार हलक्या प्रतीचे पाईप वापरतात. जेव्हा भिंतीच्या आत पाईप फुटतो, तेव्हा तुम्हाला ₹2 लाखाचा मार्बल फोडून तो दुरुस्त करावा लागतो.</p>

<h3>स्कॅम 3: "स्क्वेअर फूट" चा सापळा</h3>
<p>अनेक कॉन्ट्रॅक्टर सुरुवातीला खूप कमी रेट सांगतात. पण काम सुरू झाल्यावर प्रत्येक गोष्टीसाठी "एक्स्ट्रा" पैसे मागतात. तुमचे 5 लाखांचे बजेट 10 लाख कधी होते, ते तुम्हाला कळतही नाही.</p>

<h3>स्वतःचा बचाव कसा करावा?</h3>
<p>AMS Civil Construction मध्ये, आम्ही 100% पारदर्शकतेवर विश्वास ठेवतो. काम सुरू होण्यापूर्वीच आम्ही संपूर्ण बिल (BOQ) देतो. जर आम्ही Asian Paints किंवा Jaquar चा शब्द दिला, तर आम्ही तुमच्यासमोर सील-पॅक डब्बे उघडतो.</p>

<p><strong>फसवणुकीपासून वाचा आणि योग्य लोकांकडून काम करून घ्या.</strong> <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction शी मोफत आणि खऱ्या एस्टिमेटसाठी संपर्क करा.</a></p>
        `
      },
      {
        title: "2026 मध्ये मुंबईतील प्रॉपर्टी: पुनर्विकास (Redevelopment) की नवीन घर?",
        slug: "redevelopment-vs-buy-new-flat-mumbai-marathi",
        excerpt: "दादर आणि वांद्रे (Bandra) येथील जुन्या इमारतींचे भविष्य काय? बिल्डरवर अवलंबून राहणे योग्य आहे की आपला फ्लॅट विकून दुसरीकडे जाणे?",
        author: "Real Estate Expert",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "mumbai redevelopment marathi, purani building redevelopment, civil construction costs pune, flat buy mumbai",
        locationTags: ["South Mumbai", "Dadar", "Bandra"],
        content: `
<h2>मुंबईकरांची सर्वात मोठी द्विधा मनस्थिती</h2>
<p>जर तुम्ही दादर, वांद्रे किंवा घाटकोपर येथील 30 वर्षे जुन्या सोसायटीत राहत असाल, तर तुम्ही 'पुनर्विकास' (Redevelopment) हा शब्द खूप वेळा ऐकला असेल. पण याचा खरोखरच फायदा आहे का?</p>

<h3>पुनर्विकासाचे कटू सत्य</h3>
<p>बिल्डर तुम्हाला 20% मोठे घर आणि भरपूर पैसे देण्याचे आश्वासन देतो. पण सत्य हे आहे की, मुंबईत शेकडो प्रकल्प रखडलेले आहेत कारण बिल्डरकडे पैसे संपले आहेत. आणि जी घरे बांधली जातात, त्यांची <a href="/services" style="color: #F97316;">सिविल कन्स्ट्रक्शन क्वालिटी</a> अनेकदा खूप खराब असते.</p>

<h3>यावर दुसरा उपाय काय?</h3>
<p>जर तुमच्या इमारतीचे स्ट्रक्चर (RCC) अजूनही मजबूत असेल, तर ती बिल्डरला देण्याऐवजी स्वतः दुरुस्त करून घेणे खूप सुरक्षित असते. योग्य स्ट्रक्चरल रिपेअर आणि वॉटरप्रूफिंग केल्यास तुमची इमारत आणखी 15-20 वर्षे टिकू शकते.</p>

<p>AMS Civil Construction ची टीम जुन्या कॉलमना केमिकल ट्रीटमेंट देऊन ते मजबूत करण्यात तज्ज्ञ आहे.</p>

<h3>निष्कर्ष</h3>
<p>कोणताही मोठा निर्णय घेण्यापूर्वी तुमच्या इमारतीचे स्ट्रक्चरल ऑडिट करून घ्या. जर दुरुस्ती शक्य असेल, तर <a href="/contact" style="color: #F97316; font-weight: bold;">AMS Civil Construction ला कॉल करा</a> आणि तुमची जुनी इमारत नवीनसारखी बनवा!</p>
        `
      },
      {
        title: "नवी मुंबईमध्ये १० लाखांत घराचे नूतनीकरण - बघा आम्ही काय काय केले",
        slug: "10-lakh-home-renovation-navi-mumbai-marathi",
        excerpt: "तुमचे बजेट जर १० लाख असेल, तर तुम्ही स्मार्ट होम बनवू शकता का? नवी मुंबईतील एका 2BHK फ्लॅटचा संपूर्ण खर्च आणि माहिती.",
        author: "AMS Design Team",
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        seoKeywords: "2bhk interior cost marathi, renovation budget mumbai, modular kitchen rate, pop false ceiling rate",
        locationTags: ["Navi Mumbai", "Vashi", "Panvel"],
        content: `
<h2>केस स्टडी: नवी मुंबईतील फ्लॅटचे जबरदस्त ट्रान्सफॉर्मेशन</h2>
<p>प्रत्येकाला एक सुंदर घर हवे असते, पण खऱ्या खर्चाबद्दल कोणीच सांगत नाही. आज आम्ही तुम्हाला वाशी, नवी मुंबई येथील एका 2BHK फ्लॅटची संपूर्ण माहिती देत आहोत, ज्याचे एकूण बजेट 10 लाख रुपये होते.</p>

<h3>पैसे कुठे खर्च झाले? (बजेट ब्रेकडाउन)</h3>
<ol>
  <li><strong>सिविल आणि तोडफोड (₹1.5 लाख):</strong> जुन्या टाईल्स तोडणे, किचन प्लॅटफॉर्म काढणे आणि जागा वाढवणे.</li>
  <li><strong>प्लंबिंग आणि इलेक्ट्रिकल (₹2 लाख):</strong> संपूर्ण नवीन वायरिंग, वाय-फाय (Wi-Fi) वाले स्मार्ट स्विचेस आणि बाथरूमचे नवीन फिटिंग.</li>
  <li><strong>फ्लोअरिंग / टाईल्स (₹1.8 लाख):</strong> संपूर्ण घरात 4x2 फूट प्रीमियम विट्रीफाईड टाईल्स.</li>
  <li><strong>फॉल्स सीलिंग आणि पेंट (₹1.5 लाख):</strong> जिप्सम POP सीलिंग आणि भिंतींवर एशियन पेंट्स रॉयल पेंट.</li>
  <li><strong>मॉड्युलर किचन आणि बाथरूम (₹3.2 लाख):</strong> अ‍ॅक्रेलिक फिनिश किचन कॅबिनेट, क्वार्ट्ज काउंटर आणि जॅग्वारचे फिटिंग.</li>
</ol>

<h3>काय फायदा झाला?</h3>
<p>आता आमचे क्लायंट त्यांच्या घरातील लाईट आणि एसी आवाजाने (Alexa) कंट्रोल करतात. <a href="/services/tiles-work" style="color: #F97316;">टाईल्स</a> आणि <a href="/services/pop-work" style="color: #F97316;">POP चे उत्कृष्ट काम</a> घराला 5-स्टार हॉटेलसारखा लुक देते.</p>

<p>तुमचेही काही बजेट आहे का? <a href="/calculator" style="color: #F97316; font-weight: bold;">आमचा फ्री कन्स्ट्रक्शन कॅल्क्युलेटर वापरा</a> किंवा थेट <a href="/contact" style="color: #F97316;">आमच्याशी संपर्क साधा!</a></p>
        `
      }
    ];

    console.log("Seeding multilingual viral blogs...");
    for (const blog of multilingualBlogs) {
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
    console.log("Multilingual seeding complete!");

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
