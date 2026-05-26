// src/data/locations.ts
// All Mumbai service areas — each gets its own SEO-optimised page at /areas/[location]

export interface LocationData {
  slug:      string;
  name:      string;
  zone:      string;
  district:  string;
  pincode?:  string;
  landmarks: string[];
  nearby:    string[];
}

export const locations: LocationData[] = [
  /* ── South Mumbai ───────────────────────────────────────── */
  { slug:'dadar',        name:'Dadar',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400014', landmarks:['Dadar Station','Shivaji Park','Dadar Market'],              nearby:['Prabhadevi','Mahalaxmi','Worli'] },
  { slug:'lower-parel',  name:'Lower Parel',  zone:'South Mumbai',  district:'Mumbai City',   pincode:'400013', landmarks:['Phoenix Mills','High Street Phoenix','Palladium Mall'],       nearby:['Prabhadevi','Worli','Mahalaxmi'] },
  { slug:'worli',        name:'Worli',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400018', landmarks:['Worli Sea Face','Bandra-Worli Sea Link','Nehru Science Centre'], nearby:['Lower Parel','Prabhadevi','Mahalaxmi'] },
  { slug:'prabhadevi',   name:'Prabhadevi',   zone:'South Mumbai',  district:'Mumbai City',   pincode:'400025', landmarks:['Siddhivinayak Temple','Prabhadevi Station'],                nearby:['Dadar','Worli','Lower Parel'] },
  { slug:'colaba',       name:'Colaba',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400005', landmarks:['Gateway of India','Taj Hotel','Colaba Causeway'],            nearby:['Marine Lines','Fort','Churchgate'] },
  { slug:'fort',         name:'Fort',          zone:'South Mumbai',  district:'Mumbai City',   pincode:'400001', landmarks:['Flora Fountain','CSMT','Bombay High Court'],                 nearby:['Colaba','Marine Lines','Churchgate'] },
  { slug:'marine-lines', name:'Marine Lines',  zone:'South Mumbai',  district:'Mumbai City',   pincode:'400002', landmarks:['Marine Drive','Girgaon Chowpatty','Mumbai University'],      nearby:['Colaba','Churchgate','Tardeo'] },
  { slug:'byculla',      name:'Byculla',       zone:'South Mumbai',  district:'Mumbai City',   pincode:'400027', landmarks:['Byculla Zoo','Byculla Station','Bhau Daji Lad Museum'],     nearby:['Sion','Mahalaxmi','Dadar'] },
  { slug:'mahalaxmi',   name:'Mahalaxmi',     zone:'South Mumbai',  district:'Mumbai City',   pincode:'400011', landmarks:['Mahalaxmi Temple','Mahalaxmi Racecourse','Haji Ali'],        nearby:['Lower Parel','Worli','Dadar'] },
  { slug:'churchgate',  name:'Churchgate',    zone:'South Mumbai',  district:'Mumbai City',   pincode:'400020', landmarks:['Churchgate Station','Eros Cinema','Rajabai Clock Tower'],     nearby:['Marine Lines','Fort','Colaba'] },
  { slug:'tardeo',      name:'Tardeo',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400007', landmarks:['Tardeo AC Market','Haji Ali Dargah','Tata Memorial Hospital'], nearby:['Mahalaxmi','Lower Parel','Marine Lines'] },
  { slug:'parel',       name:'Parel',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400012', landmarks:['Parel Station','Lodha World One','Peninsula Towers'],        nearby:['Dadar','Lower Parel','Byculla'] },
  { slug:'mahim',       name:'Mahim',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400016', landmarks:['Mahim Beach','Mahim Fort','Mahim Causeway'],                 nearby:['Dadar','Bandra','Matunga'] },
  { slug:'matunga',     name:'Matunga',       zone:'South Mumbai',  district:'Mumbai City',   pincode:'400019', landmarks:['Matunga Station','Five Gardens','King Circle'],              nearby:['Dadar','Sion','Mahim'] },

  /* ── Western Line ───────────────────────────────────────── */
  { slug:'bandra',       name:'Bandra',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400050', landmarks:['Bandra-Kurla Complex','Bandstand','Linking Road'],           nearby:['Khar','Santacruz','Andheri'] },
  { slug:'khar',         name:'Khar',           zone:'Western Line',  district:'Mumbai Suburban',pincode:'400052', landmarks:['Khar Station','Khar Gymkhana','Danda'],                     nearby:['Bandra','Santacruz','Vile Parle'] },
  { slug:'santacruz',   name:'Santacruz',      zone:'Western Line',  district:'Mumbai Suburban',pincode:'400054', landmarks:['Santacruz Airport Area','JVPD Scheme','Kalina'],             nearby:['Khar','Vile Parle','Andheri'] },
  { slug:'vile-parle',  name:'Vile Parle',     zone:'Western Line',  district:'Mumbai Suburban',pincode:'400057', landmarks:['Vile Parle Station','N.M. College','ISKCON Juhu'],          nearby:['Santacruz','Andheri','Jogeshwari'] },
  { slug:'andheri',     name:'Andheri',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400058', landmarks:['Andheri Station','SEEPZ','Versova','Lokhandwala'],          nearby:['Jogeshwari','Vile Parle','Goregaon'] },
  { slug:'juhu',        name:'Juhu',           zone:'Western Line',  district:'Mumbai Suburban',pincode:'400049', landmarks:['Juhu Beach','ISKCON Temple','Prithvi Theatre'],              nearby:['Vile Parle','Andheri','Santacruz'] },
  { slug:'jogeshwari',  name:'Jogeshwari',     zone:'Western Line',  district:'Mumbai Suburban',pincode:'400060', landmarks:['Jogeshwari Caves','Jogeshwari Station','Andheri Link Road'], nearby:['Andheri','Goregaon','Borivali'] },
  { slug:'goregaon',    name:'Goregaon',       zone:'Western Line',  district:'Mumbai Suburban',pincode:'400063', landmarks:['Film City','Oberoi Mall','Aarey Colony'],                   nearby:['Jogeshwari','Malad','Andheri'] },
  { slug:'malad',       name:'Malad',          zone:'Western Line',  district:'Mumbai Suburban',pincode:'400064', landmarks:['Infinity Mall','Malad Station','Orion Business Park'],       nearby:['Goregaon','Kandivali','Borivali'] },
  { slug:'kandivali',   name:'Kandivali',      zone:'Western Line',  district:'Mumbai Suburban',pincode:'400067', landmarks:['Kandivali Station','Growel 101 Mall','Thakur Village'],     nearby:['Malad','Borivali','Dahisar'] },
  { slug:'borivali',    name:'Borivali',       zone:'Western Line',  district:'Mumbai Suburban',pincode:'400092', landmarks:['Sanjay Gandhi National Park','Borivali Station','Raghuleela Mall'], nearby:['Kandivali','Dahisar','Mira Road'] },
  { slug:'dahisar',     name:'Dahisar',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400068', landmarks:['Dahisar Station','Dahisar Check Naka','Sanjay Gandhi Park'],  nearby:['Borivali','Mira Road','Bhayandar'] },
  { slug:'mira-road',   name:'Mira Road',      zone:'Western Line',  district:'Thane',          pincode:'401107', landmarks:['Mira Road Station','Big Bazaar Mira Road','Kashimira'],       nearby:['Dahisar','Bhayandar','Borivali'] },
  { slug:'bhayandar',   name:'Bhayandar',      zone:'Western Line',  district:'Thane',          pincode:'401101', landmarks:['Bhayandar Station','Golden Nest Circle','Uttan'],            nearby:['Mira Road','Vasai','Nalasopara'] },
  { slug:'vasai',       name:'Vasai',          zone:'Western Line',  district:'Palghar',        pincode:'401202', landmarks:['Vasai Fort','Vasai Station','Vasai Road'],                   nearby:['Bhayandar','Nalasopara','Virar'] },
  { slug:'nalasopara',  name:'Nalasopara',     zone:'Western Line',  district:'Palghar',        pincode:'401203', landmarks:['Nalasopara Station','Tulinj','Pelhar'],                     nearby:['Vasai','Virar','Bhayandar'] },
  { slug:'virar',       name:'Virar',          zone:'Western Line',  district:'Palghar',        pincode:'401303', landmarks:['Virar Station','Arnala Beach','Virar Fort'],                 nearby:['Nalasopara','Vasai','Bhayandar'] },

  /* ── Central Line ───────────────────────────────────────── */
  { slug:'sion',        name:'Sion',           zone:'Central Line',  district:'Mumbai City',   pincode:'400022', landmarks:['Sion Fort','Sion Station','Dharavi'],                       nearby:['Kurla','Byculla','Dadar'] },
  { slug:'kurla',       name:'Kurla',          zone:'Central Line',  district:'Mumbai Suburban',pincode:'400070', landmarks:['Kurla Station','Phoenix Marketcity','BKC'],                 nearby:['Sion','Ghatkopar','Bandra'] },
  { slug:'ghatkopar',   name:'Ghatkopar',      zone:'Central Line',  district:'Mumbai Suburban',pincode:'400077', landmarks:['Ghatkopar Metro','R-City Mall','Tilaknagar'],               nearby:['Kurla','Vikhroli','Mulund'] },
  { slug:'vikhroli',    name:'Vikhroli',       zone:'Central Line',  district:'Mumbai Suburban',pincode:'400083', landmarks:['Vikhroli Station','Godrej Colony','Eastern Express Highway'],nearby:['Ghatkopar','Bhandup','Kurla'] },
  { slug:'powai',       name:'Powai',          zone:'Central Line',  district:'Mumbai Suburban',pincode:'400076', landmarks:['Powai Lake','Hiranandani Gardens','IIT Bombay'],             nearby:['Vikhroli','Bhandup','Andheri'] },
  { slug:'chembur',     name:'Chembur',        zone:'Central Line',  district:'Mumbai Suburban',pincode:'400071', landmarks:['Chembur Station','Diamond Garden','RCF Colony'],             nearby:['Kurla','Ghatkopar','Sion'] },
  { slug:'bhandup',     name:'Bhandup',        zone:'Central Line',  district:'Mumbai Suburban',pincode:'400078', landmarks:['Bhandup Station','Bhandup Industrial Area','Powai Lake'],   nearby:['Vikhroli','Mulund','Thane'] },
  { slug:'mulund',      name:'Mulund',         zone:'Central Line',  district:'Mumbai Suburban',pincode:'400080', landmarks:['Mulund Station','R Mall Mulund','LBS Road'],                nearby:['Bhandup','Thane','Vikhroli'] },
  { slug:'thane',       name:'Thane',          zone:'Central Line',  district:'Thane',          pincode:'400601', landmarks:['Thane Station','Korum Mall','Upvan Lake','Viviana Mall'],    nearby:['Mulund','Dombivli','Navi Mumbai'] },
  { slug:'dombivli',    name:'Dombivli',       zone:'Central Line',  district:'Thane',          pincode:'421201', landmarks:['Dombivli Station','Xperia Mall','MIDC Dombivli'],            nearby:['Thane','Kalyan','Ulhasnagar'] },
  { slug:'kalyan',      name:'Kalyan',         zone:'Central Line',  district:'Thane',          pincode:'421301', landmarks:['Kalyan Station','Kalyan Fort','Metro Junction Mall'],        nearby:['Dombivli','Thane','Ulhasnagar'] },

  /* ── Navi Mumbai ────────────────────────────────────────── */
  /* ── Navi Mumbai (Missing Nodes) ────────────────────────── */
  { slug:'vashi',          name:'Vashi',           zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400703', landmarks:['Vashi Station','Inorbit Mall','Palm Beach Road'],          nearby:['Nerul','Airoli','Thane'] },
  { slug:'nerul',          name:'Nerul',            zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['Nerul Station','Seawoods Grand Central','Pandavkada Waterfalls'], nearby:['Vashi','Belapur','Koparkhairane'] },
  { slug:'belapur',        name:'Belapur',          zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400614', landmarks:['CBD Belapur Station','Belapur Fort','DY Patil Stadium'],   nearby:['Nerul','Kharghar','Panvel'] },
  { slug:'airoli',         name:'Airoli',           zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400708', landmarks:['Airoli Station','Airoli Bridge','TCS Campus Airoli'],       nearby:['Vashi','Ghansoli','Thane'] },
  { slug:'ghansoli',       name:'Ghansoli',         zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400701', landmarks:['Ghansoli Station','Reliance Corporate Park','ONGC Colony'], nearby:['Airoli','Koparkhairane','Vashi'] },
  { slug:'koparkhairane',  name:'Koparkhairane',    zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400709', landmarks:['Kopar Khairane Station','Millennium Business Park'],       nearby:['Ghansoli','Vashi','Nerul'] },
  { slug:'kharghar',       name:'Kharghar',         zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410210', landmarks:['Central Park Kharghar','Golf Course','Utsav Chowk'],        nearby:['Belapur','Panvel','Nerul'] },
  { slug:'panvel',         name:'Panvel',           zone:'Navi Mumbai', district:'Raigad',       pincode:'410206', landmarks:['Panvel Station','Aamby Valley City','Khopoli Road'],        nearby:['Belapur','Kharghar','Navi Mumbai'] },
  { slug:'navi-mumbai',    name:'Navi Mumbai',      zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400703', landmarks:['CBD Belapur','Vashi','Nerul','Palm Beach Road'],          nearby:['Thane','Vashi','Nerul'] },

  /* ── Thane & Beyond (Missing Nodes) ─────────────────────── */
  { slug:'ulhasnagar',    name:'Ulhasnagar',     zone:'Central Line',  district:'Thane',          pincode:'421001', landmarks:['Ulhasnagar Market','Ulhasnagar Station'],               nearby:['Kalyan','Dombivli','Ambernath'] },
  { slug:'ambernath',     name:'Ambernath',      zone:'Central Line',  district:'Thane',          pincode:'421501', landmarks:['Shiv Temple Ambernath','Ambernath Station'],           nearby:['Ulhasnagar','Badlapur'] },
  { slug:'badlapur',      name:'Badlapur',       zone:'Central Line',  district:'Thane',          pincode:'421503', landmarks:['Badlapur Station','Barvi Dam'],                       nearby:['Ambernath','Ulhasnagar'] },

  /* ── Pune & Maharashtra (Extended) ───────────────────────── */
  { slug:'pune',             name:'Pune',             zone:'Maharashtra', district:'Pune',      pincode:'411001', landmarks:['Shaniwar Wada','Aga Khan Palace','Pune Station','Magarpatta City'], nearby:['Lonavala','Hadapsar','Pimpri Chinchwad'] },
  { slug:'hadapsar',         name:'Hadapsar',         zone:'Maharashtra', district:'Pune',      pincode:'411028', landmarks:['Magarpatta City','Amanora Mall','Serum Institute'],           nearby:['Pune','Pimpri Chinchwad','Lonavala'] },
  { slug:'pimpri-chinchwad', name:'Pimpri Chinchwad', zone:'Maharashtra', district:'Pune',      pincode:'411018', landmarks:['Auto Cluster','Bird Valley Park','Pavana River'],              nearby:['Pune','Hadapsar','Lonavala'] },
  { slug:'lonavala',         name:'Lonavala',         zone:'Maharashtra', district:'Pune',      pincode:'410401', landmarks:['Tiger Point','Bhushi Dam','Lonavala Station'],               nearby:['Pune','Pimpri Chinchwad','Hadapsar'] },
  { slug:'nasik',            name:'Nasik',            zone:'Maharashtra', district:'Nasik',     pincode:'422001', landmarks:['Kalaram Temple','Trimbakeshwar','Sula Vineyards','Panchavati'],       nearby:['Pune','Aurangabad'] },
  { slug:'nagpur',           name:'Nagpur',           zone:'Maharashtra', district:'Nagpur',    pincode:'440001', landmarks:['Deekshabhoomi','Zero Mile Marker','Futala Lake'],                 nearby:['Aurangabad','Nasik'] },
  { slug:'aurangabad',       name:'Aurangabad',       zone:'Maharashtra', district:'Aurangabad',pincode:'431001', landmarks:['Bibi Ka Maqbara','Panchakki','Prozone Mall'],                    nearby:['Nasik','Nagpur'] },

  /* ── Jharkhand & West Bengal (Extended) ──────────────────── */
  { slug:'ranchi',    name:'Ranchi',    zone:'Jharkhand', district:'Ranchi',         pincode:'834001', landmarks:['Pahari Mandir','Rock Garden','Jagannath Temple','Ranchi Lake'],  nearby:['Namkum','Bariatu'] },
  { slug:'namkum',    name:'Namkum',    zone:'Jharkhand', district:'Ranchi',         pincode:'834010', landmarks:['Namkum Railway Station','RK Mission'],                       nearby:['Ranchi','Bariatu'] },
  { slug:'bariatu',   name:'Bariatu',   zone:'Jharkhand', district:'Ranchi',         pincode:'834009', landmarks:['RIMS Ranchi','Bariatu Hill'],                                nearby:['Ranchi','Namkum'] },
  { slug:'jamshedpur',name:'Jamshedpur',zone:'Jharkhand', district:'East Singhbhum', pincode:'831001', landmarks:['Jubilee Park','Tata Steel','Dimna Lake','Bistupur'],         nearby:['Sakchi','Dhanbad'] },
  { slug:'sakchi',    name:'Sakchi',    zone:'Jharkhand', district:'East Singhbhum', pincode:'831001', landmarks:['Sakchi Market','Tata Steel Gate'],                          nearby:['Jamshedpur','Dhanbad'] },
  { slug:'dhanbad',   name:'Dhanbad',   zone:'Jharkhand', district:'Dhanbad',         pincode:'826001', landmarks:['ISM Dhanbad','Coal Mines','Bank More'],                        nearby:['Jamshedpur','Asansol'] },
  { slug:'asansol',   name:'Asansol',   zone:'West Bengal', district:'Paschim Bardhaman',pincode:'713301', landmarks:['Ghagar Buri Chandi Temple','Maithon Dam'],                   nearby:['Kolkata','Dhanbad'] },
  { slug:'kolkata',   name:'Kolkata',   zone:'West Bengal', district:'Kolkata', pincode:'700001', landmarks:['Victoria Memorial','Howrah Bridge','Park Street','Salt Lake Sector V'], nearby:['Asansol'] },

  /* ── Others ────────────────────────────────────────────── */
  { slug:'bangalore', name:'Bangalore', zone:'Karnataka', district:'Bengaluru', pincode:'560001', landmarks:['Lalbagh','Cubbon Park','Bangalore Palace','MG Road','Indiranagar'],   nearby:['Mysore','Davangere'] },
  { slug:'mysore',    name:'Mysore',    zone:'Karnataka', district:'Mysuru',    pincode:'570001', landmarks:['Mysore Palace','Chamundi Hills','Brindavan Gardens'],                nearby:['Bangalore','Davangere'] },
  { slug:'davangere', name:'Davangere', zone:'Karnataka', district:'Davangere', pincode:'577001', landmarks:['Davanagere Benne Dosa Hotels','Kunduvada Kere','Glass House'],      nearby:['Bangalore','Mysore'] },

  /* ── Goa (Extended) ─────────────────────────────────────── */
  { slug:'panjim',    name:'Panjim',    zone:'Goa', district:'North Goa', pincode:'403001', landmarks:['Immaculate Conception Church','Fontainhas','Miramar Beach'], nearby:['Margao','Calangute'] },
  { slug:'margao',    name:'Margao',    zone:'Goa', district:'South Goa', pincode:'403601', landmarks:['Colva Beach','Madgaon Station','Borda'], nearby:['Panjim','Vasco'] },

  /* ── West Bengal (Extended) ─────────────────────────────── */
  { slug:'siliguri',  name:'Siliguri',  zone:'West Bengal', district:'Darjeeling', pincode:'734001', landmarks:['Hong Kong Market','Vega Circle Mall','Salugara Monastery'], nearby:['Kolkata','Asansol'] },
  { slug:'uran',      name:'Uran',      zone:'Navi Mumbai', district:'Raigad', pincode:'400702', landmarks:['Uran Beach','JNPT','Pirwadi Beach'], nearby:['Belapur','Panvel','Navi Mumbai'] },
  { slug:'vasco',     name:'Vasco',     zone:'Goa', district:'South Goa', pincode:'403802', landmarks:['Baina Beach','Mormugao Port','Bogmalo Beach'], nearby:['Margao','Panjim'] },
  { slug:'paithan',   name:'Paithan',   zone:'Maharashtra', district:'Aurangabad', pincode:'431107', landmarks:['Jayakwadi Dam','Dnyaneshwar Udyan'], nearby:['Aurangabad','Waluj'] },
  { slug:'waluj',     name:'Waluj',     zone:'Maharashtra', district:'Aurangabad', pincode:'431136', landmarks:['MIDC Waluj','Waluj Lake'], nearby:['Aurangabad','Paithan'] },
  { slug:'kamptee',   name:'Kamptee',   zone:'Maharashtra', district:'Nagpur', pincode:'441001', landmarks:['Dragon Palace Temple','Kamptee Cantonment'], nearby:['Nagpur'] },
  { slug:'raniganj',  name:'Raniganj',  zone:'West Bengal', district:'Paschim Bardhaman', pincode:'713347', landmarks:['Raniganj Market','Mejia Bridge'], nearby:['Asansol','Dhanbad'] },

  /* ── Karnataka (Extended — 404 Fix) ──────────────────────── */
  { slug:'whitefield',      name:'Whitefield',      zone:'Karnataka', district:'Bengaluru', pincode:'560066', landmarks:['ITPL','Phoenix Marketcity Whitefield','Graphite India'], nearby:['Bangalore','Koramangala'] },
  { slug:'electronic-city', name:'Electronic City',  zone:'Karnataka', district:'Bengaluru', pincode:'560100', landmarks:['Infosys Campus','Wipro Campus','Electronic City Flyover'], nearby:['Bangalore','Koramangala'] },
  { slug:'koramangala',     name:'Koramangala',      zone:'Karnataka', district:'Bengaluru', pincode:'560034', landmarks:['Forum Mall','Koramangala BDA Complex','Jyoti Nivas College'], nearby:['Bangalore','Whitefield','Electronic City'] },
  { slug:'hunsur',          name:'Hunsur',           zone:'Karnataka', district:'Mysuru',    pincode:'571105', landmarks:['Hunsur Lake','Lakshmikanthaswamy Temple','Hunsur Bus Stand'], nearby:['Mysore','Bangalore'] },
  { slug:'mandya',          name:'Mandya',           zone:'Karnataka', district:'Mandya',    pincode:'571401', landmarks:['KRS Dam','Sugar Factory','Mandya Town Hall'], nearby:['Mysore','Bangalore'] },

  /* ── Jharkhand (Extended — 404 Fix) ──────────────────────── */
  { slug:'mango',     name:'Mango',     zone:'Jharkhand', district:'East Singhbhum', pincode:'831012', landmarks:['Mango Market','Dimna Lake Road','Mango Station'], nearby:['Jamshedpur','Sakchi','Adityapur'] },
  { slug:'sindri',    name:'Sindri',    zone:'Jharkhand', district:'Dhanbad',         pincode:'828122', landmarks:['Sindri Fertilizer Factory','Sindri Market'], nearby:['Dhanbad','Jharia'] },
  { slug:'hatia',     name:'Hatia',     zone:'Jharkhand', district:'Ranchi',          pincode:'834003', landmarks:['Hatia Station','Hatia Dam','Ranchi Ring Road'], nearby:['Ranchi','Namkum','Bariatu'] },
  { slug:'adityapur', name:'Adityapur', zone:'Jharkhand', district:'Seraikela-Kharsawan', pincode:'831013', landmarks:['Adityapur Industrial Area','Gamharia Bridge'], nearby:['Jamshedpur','Sakchi','Mango'] },
  { slug:'jharia',    name:'Jharia',    zone:'Jharkhand', district:'Dhanbad',         pincode:'828111', landmarks:['Jharia Coalfield','Jharia Market','Tisra Falls'], nearby:['Dhanbad','Sindri'] },

  /* ── West Bengal (Extended — 404 Fix) ────────────────────── */
  { slug:'salt-lake',  name:'Salt Lake',  zone:'West Bengal', district:'Kolkata',           pincode:'700091', landmarks:['Salt Lake Sector V','Nicco Park','Central Park'], nearby:['Kolkata','New Town','Howrah'] },
  { slug:'howrah',     name:'Howrah',     zone:'West Bengal', district:'Howrah',             pincode:'711101', landmarks:['Howrah Bridge','Howrah Station','Belur Math'], nearby:['Kolkata','Salt Lake'] },
  { slug:'new-town',   name:'New Town',   zone:'West Bengal', district:'Kolkata',            pincode:'700156', landmarks:['Eco Park','Axis Mall','Biswa Bangla Gate'], nearby:['Kolkata','Salt Lake'] },
  { slug:'durgapur',   name:'Durgapur',   zone:'West Bengal', district:'Paschim Bardhaman', pincode:'713201', landmarks:['Durgapur Steel Plant','Kumar Mangalam Park','City Centre Durgapur'], nearby:['Asansol','Raniganj'] },

  /* ── Maharashtra (Extended — 404 Fix) ────────────────────── */
  { slug:'boisar',     name:'Boisar',     zone:'Maharashtra', district:'Palghar',     pincode:'401501', landmarks:['Boisar Station','Tarapur Atomic Power Station','MIDC Tarapur'], nearby:['Virar','Vasai','Nalasopara'] },
  { slug:'igatpuri',   name:'Igatpuri',   zone:'Maharashtra', district:'Nasik',       pincode:'422403', landmarks:['Vipassana Centre','Bhatsa Dam','Tringalwadi Fort'], nearby:['Nasik','Sinnar'] },
  { slug:'sinnar',     name:'Sinnar',     zone:'Maharashtra', district:'Nasik',       pincode:'422103', landmarks:['Sinnar MIDC','Gondeshwar Temple','Sinnar Lake'], nearby:['Nasik','Igatpuri'] },
  { slug:'deolali',    name:'Deolali',    zone:'Maharashtra', district:'Nasik',       pincode:'422401', landmarks:['Deolali Camp','Artillery Centre','Deolali Market'], nearby:['Nasik','Igatpuri','Sinnar'] },
  { slug:'grant-road', name:'Grant Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400007', landmarks:['Grant Road Station','Nana Chowk','Opera House'], nearby:['Tardeo','Marine Lines','Churchgate'] },
  { slug:'wardha',     name:'Wardha',     zone:'Maharashtra', district:'Wardha',      pincode:'442001', landmarks:['Sewagram Ashram','Wardha Station','Bor Wildlife Sanctuary'], nearby:['Nagpur','Kamptee'] },

  /* ── Goa (Extended — 404 Fix) ────────────────────────────── */
  { slug:'calangute',  name:'Calangute',  zone:'Goa', district:'North Goa', pincode:'403516', landmarks:['Calangute Beach','St. Alex Church','Baga Beach'], nearby:['Panjim','Margao'] },
];

export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().trim().replace(/\s+/g, '-');
}

export function getLocation(slug: string): LocationData | undefined {
  const normalized = normalizeSlug(slug);
  return locations.find(l => l.slug === normalized);
}

export function getStaticLocationPaths() {
  return locations.map(l => ({ params: { location: l.slug } }));
}
