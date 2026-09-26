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
  { slug:'naigaon',     name:'Naigaon',        zone:'Western Line',  district:'Palghar',        pincode:'401208', landmarks:['Naigaon Station','Juchandra','Sun City'],                    nearby:['Vasai','Bhayandar','Nalasopara'] },
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

  /* ── Mumbai Micro-Markets (Hyperlocal SEO) ────────────── */
  // South Mumbai Posh Areas
  { slug:'malabar-hill', name:'Malabar Hill', zone:'South Mumbai', district:'Mumbai City', pincode:'400006', landmarks:['Hanging Gardens','Banganga Tank'], nearby:['Walkeshwar','Kemps Corner','Peddar Road'] },
  { slug:'cuffe-parade', name:'Cuffe Parade', zone:'South Mumbai', district:'Mumbai City', pincode:'400005', landmarks:['World Trade Centre','Taj President'], nearby:['Colaba','Nariman Point'] },
  { slug:'peddar-road', name:'Peddar Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Jaslok Hospital','Sophia College'], nearby:['Breach Candy','Kemps Corner','Altamount Road'] },
  { slug:'nepean-sea-road', name:'Nepean Sea Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400036', landmarks:['Priyadarshini Park'], nearby:['Malabar Hill','Breach Candy'] },
  { slug:'breach-candy', name:'Breach Candy', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Breach Candy Hospital','Amarsons Garden'], nearby:['Peddar Road','Kemps Corner'] },
  { slug:'walkeshwar', name:'Walkeshwar', zone:'South Mumbai', district:'Mumbai City', pincode:'400006', landmarks:['Walkeshwar Temple','Raj Bhavan'], nearby:['Malabar Hill'] },
  { slug:'altamount-road', name:'Altamount Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Antilia'], nearby:['Kemps Corner','Peddar Road'] },
  { slug:'nariman-point', name:'Nariman Point', zone:'South Mumbai', district:'Mumbai City', pincode:'400021', landmarks:['NCPA','Trident Hotel'], nearby:['Churchgate','Cuffe Parade'] },
  { slug:'wadala', name:'Wadala', zone:'South Mumbai', district:'Mumbai City', pincode:'400031', landmarks:['Wadala TT','IMAX Big Cinemas','Five Gardens'], nearby:['Matunga','Dadar','Sion'] },

  // Western Suburbs Hyperlocal
  { slug:'lokhandwala', name:'Lokhandwala', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Lokhandwala Complex','Infinity Mall'], nearby:['Andheri','Oshiwara','Versova'] },
  { slug:'oshiwara', name:'Oshiwara', zone:'Western Line', district:'Mumbai Suburban', pincode:'400104', landmarks:['Oshiwara Police Station','Mega Mall'], nearby:['Lokhandwala','Goregaon'] },
  { slug:'yari-road', name:'Yari Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Yari Road','Versova Beach'], nearby:['Versova','Seven Bungalows'] },
  { slug:'versova', name:'Versova', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Versova Beach','Versova Metro'], nearby:['Yari Road','Andheri'] },
  { slug:'pali-hill', name:'Pali Hill', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Pali Market','Carter Road'], nearby:['Bandra','Khar'] },
  { slug:'carter-road', name:'Carter Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Carter Road Promenade'], nearby:['Pali Hill','Bandra'] },
  { slug:'bandra-kurla-complex', name:'Bandra Kurla Complex (BKC)', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Jio World Drive','Maker Maxity'], nearby:['Bandra','Kurla'] },
  { slug:'jvpd-scheme', name:'JVPD Scheme', zone:'Western Line', district:'Mumbai Suburban', pincode:'400049', landmarks:['Juhu Gymkhana','Ecole Mondiale'], nearby:['Juhu','Vile Parle'] },
  { slug:'mindspace', name:'Mindspace Malad', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Inorbit Mall Malad','Mindspace IT Park'], nearby:['Malad','Goregaon'] },
  { slug:'thakur-village', name:'Thakur Village', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Thakur College','Dream Park'], nearby:['Kandivali','Borivali'] },
  { slug:'ic-colony', name:'I.C. Colony', zone:'Western Line', district:'Mumbai Suburban', pincode:'400103', landmarks:['Immaculate Conception Church'], nearby:['Borivali','Dahisar'] },

  // Central & Thane Hyperlocal
  { slug:'hiranandani-gardens', name:'Hiranandani Gardens', zone:'Central Line', district:'Mumbai Suburban', pincode:'400076', landmarks:['Hiranandani Hospital','Galleria Mall'], nearby:['Powai','Vikhroli'] },
  { slug:'raheja-vihar', name:'Raheja Vihar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['Raheja Vihar Complex'], nearby:['Powai','Chandivali'] },
  { slug:'chandivali', name:'Chandivali', zone:'Central Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['Chandivali Studio','Nahar Amrit Shakti'], nearby:['Powai','Saki Naka'] },
  { slug:'tilak-nagar', name:'Tilak Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400089', landmarks:['Tilak Nagar Station','Lokmanya Tilak Terminus'], nearby:['Chembur','Ghatkopar'] },
  { slug:'garodia-nagar', name:'Garodia Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400077', landmarks:['Garodia Nagar','R City Mall'], nearby:['Ghatkopar','Vidyavihar'] },
  { slug:'hiranandani-estate', name:'Hiranandani Estate', zone:'Central Line', district:'Thane', pincode:'400607', landmarks:['The Walk','Hiranandani Hospital Thane'], nearby:['Thane','Ghodbunder Road'] },
  { slug:'ghodbunder-road', name:'Ghodbunder Road', zone:'Central Line', district:'Thane', pincode:'400615', landmarks:['Suraj Water Park','Kasarvadavali'], nearby:['Thane','Hiranandani Estate'] },
  { slug:'majiwada', name:'Majiwada', zone:'Central Line', district:'Thane', pincode:'400601', landmarks:['Viviana Mall','Jupiter Hospital'], nearby:['Thane','Ghodbunder Road'] },

  // Navi Mumbai Hyperlocal
  { slug:'palm-beach-road', name:'Palm Beach Road', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['NRI Complex','Jewel of Navi Mumbai'], nearby:['Nerul','Belapur','Vashi'] },
  { slug:'seawoods', name:'Seawoods', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['Seawoods Grand Central Mall','Seawoods Estates'], nearby:['Nerul','Belapur'] },

  // Harbour Line & Eastern Suburbs
  { slug:'gtb-nagar', name:'GTB Nagar', zone:'Harbour Line', district:'Mumbai City', pincode:'400037', landmarks:['Guru Tegh Bahadur Nagar Station'], nearby:['Sion','Wadala'] },
  { slug:'chunabhatti', name:'Chunabhatti', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400022', landmarks:['Chunabhatti Station'], nearby:['Sion','Kurla'] },
  { slug:'govandi', name:'Govandi', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400043', landmarks:['Govandi Station','Deonar'], nearby:['Chembur','Mankhurd'] },
  { slug:'mankhurd', name:'Mankhurd', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400088', landmarks:['Mankhurd Station'], nearby:['Govandi','Vashi'] },
  { slug:'sewri', name:'Sewri', zone:'Harbour Line', district:'Mumbai City', pincode:'400015', landmarks:['Sewri Fort','Sewri Mudflats'], nearby:['Wadala','Parel'] },
  { slug:'cotton-green', name:'Cotton Green', zone:'Harbour Line', district:'Mumbai City', pincode:'400033', landmarks:['Cotton Green Station'], nearby:['Reay Road','Sewri'] },
  { slug:'reay-road', name:'Reay Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400010', landmarks:['Reay Road Station'], nearby:['Dockyard Road','Cotton Green'] },
  { slug:'dockyard-road', name:'Dockyard Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400010', landmarks:['Dockyard Road Station'], nearby:['Sandhurst Road','Reay Road'] },
  { slug:'sandhurst-road', name:'Sandhurst Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400009', landmarks:['Sandhurst Road Station'], nearby:['Masjid Bunder','Byculla'] },
  { slug:'masjid-bunder', name:'Masjid Bunder', zone:'South Mumbai', district:'Mumbai City', pincode:'400003', landmarks:['Masjid Bunder Station','Crawford Market'], nearby:['CST','Sandhurst Road'] },

  // Western Suburbs - East/West Specific
  { slug:'bandra-east', name:'Bandra East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Kala Nagar','Bandra Court'], nearby:['BKC','Khar East'] },
  { slug:'bandra-west', name:'Bandra West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Linking Road','Hill Road'], nearby:['Pali Hill','Khar West'] },
  { slug:'santacruz-east', name:'Santacruz East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400055', landmarks:['Kalina','Vakola'], nearby:['Vile Parle East','Kurla'] },
  { slug:'santacruz-west', name:'Santacruz West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400054', landmarks:['Juhu Road','Linking Road Ext'], nearby:['Juhu','Khar West'] },
  { slug:'andheri-east', name:'Andheri East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400069', landmarks:['MIDC','SEEPZ','Marol'], nearby:['Powai','Jogeshwari East'] },
  { slug:'andheri-west', name:'Andheri West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Lokhandwala','DN Nagar'], nearby:['Versova','Jogeshwari West'] },
  { slug:'goregaon-east', name:'Goregaon East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400063', landmarks:['Aarey Milk Colony','Gokuldham'], nearby:['Malad East','Jogeshwari East'] },
  { slug:'goregaon-west', name:'Goregaon West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400104', landmarks:['Bangur Nagar','Motilal Nagar'], nearby:['Malad West','Oshiwara'] },
  { slug:'malad-east', name:'Malad East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400097', landmarks:['Dindoshi','Kurar Village'], nearby:['Goregaon East','Kandivali East'] },
  { slug:'malad-west', name:'Malad West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Chincholi Bunder','Evershine Nagar'], nearby:['Kandivali West','Mindspace'] },
  { slug:'kandivali-east', name:'Kandivali East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Lokhandwala Township','Akurli Road'], nearby:['Thakur Village','Malad East'] },
  { slug:'kandivali-west', name:'Kandivali West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400067', landmarks:['Mahavir Nagar','Charkop'], nearby:['Borivali West','Malad West'] },
  { slug:'borivali-east', name:'Borivali East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400066', landmarks:['National Park','Magathane'], nearby:['Dahisar East','Kandivali East'] },
  { slug:'borivali-west', name:'Borivali West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400092', landmarks:['Gorai','Yogi Nagar'], nearby:['Dahisar West','I.C. Colony'] },
  { slug:'dahisar-east', name:'Dahisar East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400068', landmarks:['Rawalpada'], nearby:['Borivali East','Mira Road'] },
  { slug:'dahisar-west', name:'Dahisar West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400068', landmarks:['Kandarpada'], nearby:['Borivali West','Mira Road'] },
  
  // Extended Palghar & Vasai-Virar Belt
  { slug:'vasai-east', name:'Vasai East', zone:'Western Line', district:'Palghar', pincode:'401208', landmarks:['Evershine City','Gokhivare'], nearby:['Vasai West','Nalasopara East'] },
  { slug:'vasai-west', name:'Vasai West', zone:'Western Line', district:'Palghar', pincode:'401202', landmarks:['Vasai Fort','Bhabola'], nearby:['Vasai East','Nalasopara West'] },
  { slug:'virar-east', name:'Virar East', zone:'Western Line', district:'Palghar', pincode:'401305', landmarks:['Phoolpada','Manvelpada'], nearby:['Virar West','Nalasopara East'] },
  { slug:'virar-west', name:'Virar West', zone:'Western Line', district:'Palghar', pincode:'401303', landmarks:['Global City','Arnala'], nearby:['Virar East','Nalasopara West'] },
  { slug:'palghar', name:'Palghar', zone:'Western Line', district:'Palghar', pincode:'401404', landmarks:['Palghar Station','Shirgaon'], nearby:['Boisar','Kelva'] },
  { slug:'dahanu', name:'Dahanu', zone:'Western Line', district:'Palghar', pincode:'401601', landmarks:['Dahanu Beach'], nearby:['Boisar'] },

  // Central Line Extended
  { slug:'vidyavihar', name:'Vidyavihar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400077', landmarks:['Somaiya Campus'], nearby:['Ghatkopar','Kurla'] },
  { slug:'kanjurmarg', name:'Kanjurmarg', zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Kanjurmarg Station','Lodha Aurum'], nearby:['Bhandup','Vikhroli'] },
  { slug:'nahur', name:'Nahur', zone:'Central Line', district:'Mumbai Suburban', pincode:'400078', landmarks:['Nahur Station'], nearby:['Mulund','Bhandup'] },
  { slug:'mulund-east', name:'Mulund East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400081', landmarks:['Navghar Road','Mhada Colony'], nearby:['Mulund West','Thane East'] },
  { slug:'mulund-west', name:'Mulund West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400080', landmarks:['LBS Marg','Yogi Hills'], nearby:['Mulund East','Thane West'] },
  { slug:'thane-east', name:'Thane East', zone:'Central Line', district:'Thane', pincode:'400603', landmarks:['Kopri'], nearby:['Thane West','Mulund East'] },
  { slug:'thane-west', name:'Thane West', zone:'Central Line', district:'Thane', pincode:'400601', landmarks:['Upvan Lake','Naupada'], nearby:['Thane East','Majiwada'] },
  { slug:'kalwa', name:'Kalwa', zone:'Central Line', district:'Thane', pincode:'400605', landmarks:['Kalwa Bridge','Parsik Hill'], nearby:['Thane','Mumbra'] },
  { slug:'mumbra', name:'Mumbra', zone:'Central Line', district:'Thane', pincode:'400612', landmarks:['Mumbra Station','Kausa'], nearby:['Kalwa','Diva'] },
  { slug:'diva', name:'Diva', zone:'Central Line', district:'Thane', pincode:'400612', landmarks:['Diva Station'], nearby:['Mumbra','Dombivli'] },
  { slug:'titwala', name:'Titwala', zone:'Central Line', district:'Thane', pincode:'421605', landmarks:['Titwala Ganesh Mandir'], nearby:['Kalyan','Asangaon'] },
  { slug:'karjat', name:'Karjat', zone:'Central Line', district:'Raigad', pincode:'410201', landmarks:['Karjat Station','ND Studios'], nearby:['Neral','Khopoli'] },

  // Navi Mumbai Extended
  { slug:'sanpada', name:'Sanpada', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400705', landmarks:['Sanpada Station','Palm Beach Road'], nearby:['Vashi','Juinagar'] },
  { slug:'juinagar', name:'Juinagar', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400705', landmarks:['Juinagar Station'], nearby:['Sanpada','Nerul'] },
  { slug:'kamothe', name:'Kamothe', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410209', landmarks:['Mansarovar Station'], nearby:['Kharghar','Kalamboli'] },
  { slug:'kalamboli', name:'Kalamboli', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410218', landmarks:['Kalamboli Circle'], nearby:['Kamothe','Panvel'] },
  { slug:'ulwe', name:'Ulwe', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410206', landmarks:['Bamandongri Station','Navi Mumbai Airport Area'], nearby:['Belapur','Seawoods'] },
  { slug:'taloja', name:'Taloja', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410208', landmarks:['Taloja MIDC','Taloja Metro'], nearby:['Kharghar','Kalamboli'] },

  // South / Central Mumbai Extensions
  { slug:'kalbadevi', name:'Kalbadevi', zone:'South Mumbai', district:'Mumbai City', pincode:'400002', landmarks:['Kalbadevi Market','Mangaldas Market'], nearby:['Bhuleshwar','Marine Lines'] },
  { slug:'bhuleshwar', name:'Bhuleshwar', zone:'South Mumbai', district:'Mumbai City', pincode:'400002', landmarks:['Bhuleshwar Market'], nearby:['Kalbadevi','Charni Road'] },
  { slug:'charni-road', name:'Charni Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400004', landmarks:['Charni Road Station','Girgaon'], nearby:['Grant Road','Marine Lines'] },
  { slug:'girgaon', name:'Girgaon', zone:'South Mumbai', district:'Mumbai City', pincode:'400004', landmarks:['Girgaon Chowpatty'], nearby:['Charni Road','Malabar Hill'] },

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
