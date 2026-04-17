// ── SHARED DATA ──────────────────────────────────────────────
const SITE = {
  nav: [
    { label: 'Matches',   href: '/matches.html',      key: 'nav_matches' },
    { label: 'Map',       href: '/map.html',           key: 'nav_map' },
    { label: 'Explore',   href: '/explore.html',       key: 'nav_explore' },
    { label: 'Get There', href: '/logistics.html',     key: 'nav_logistics' },
    { label: 'Checklist', href: '/checklist.html',     key: 'nav_checklist' },
    { label: 'Survival',  href: '/survival.html',      key: 'nav_survival' },
  ]
};

const NEIGHBORHOODS = [
  { slug:'deep-ellum', name:'Deep Ellum', icon:'🎸', tag:'Nightlife · Food', cats:['nightlife','food'],
    desc:'Dallas\'s gritty arts district — live blues & jazz every night, craft breweries, murals, and legendary BBQ spots within walking distance of each other.',
    long:'Deep Ellum is the heartbeat of Dallas after dark. Once a booming jazz scene in the 1920s, today it pulses with live music venues, independent galleries, craft beer bars, and some of the city\'s best BBQ joints. During the World Cup, expect wall-to-wall fan energy every night.',
    highlights:['Live music 7 nights a week','Pecan Lodge — best brisket in Dallas','Craft brewery trail','Massive murals & street art'],
    tips:['Park on side streets — avoid the main strip lots','Most venues open until 2am','DART Green Line stops at Deep Ellum station'],
    gmaps:'https://maps.google.com/?q=Deep+Ellum+Dallas+TX',
    links:[{label:'Deep Ellum Foundation',url:'https://www.deepellumtexas.com'},{label:'Deep Ellum on Google Maps',url:'https://maps.google.com/?q=Deep+Ellum+Dallas+TX'}]
  },
  { slug:'uptown', name:'Uptown', icon:'🥂', tag:'Food · Upscale', cats:['food','nightlife'],
    desc:'Walkable restaurant row with rooftop bars, steakhouses, and international cuisine. The most pedestrian-friendly part of Dallas — rare for Texas.',
    long:'Uptown is where Dallas dresses up. McKinney Avenue is lined with patio restaurants, wine bars, and rooftop lounges. The M-Line Trolley runs the length of the strip for free. It\'s the best neighborhood for pre-match dining and post-match cocktails in equal measure.',
    highlights:['McKinney Ave restaurant strip','Free M-Line Trolley along the main drag','Rooftop bars with skyline views','Walking distance to downtown hotels'],
    tips:['Make reservations a week out during World Cup','The trolley runs until midnight on weekends','Uber pickup points get busy — add a few blocks'],
    gmaps:'https://maps.google.com/?q=Uptown+Dallas+TX',
    links:[{label:'McKinney Avenue Transit Authority',url:'https://www.mata.org'},{label:'Uptown Dallas on Google Maps',url:'https://maps.google.com/?q=Uptown+Dallas+TX'}]
  },
  { slug:'bishop-arts', name:'Bishop Arts', icon:'🎨', tag:'Culture · Boutique', cats:['culture','food'],
    desc:'Oak Cliff\'s bohemian pocket: independent boutiques, gallery spaces, Tex-Mex taquerias, and some of the best coffee in Dallas.',
    long:'Bishop Arts District is the kind of neighborhood you didn\'t know you needed. Thirty blocks of independent shops, acclaimed restaurants, and art galleries in a walkable grid. It\'s authentically Dallas — not built for tourists — which is exactly what makes it special.',
    highlights:['30+ independent restaurants and shops','Gallery row on Bishop Ave','Best specialty coffee in Dallas','Vibrant outdoor dining scene'],
    tips:['10 min by car from downtown — no direct rail','Street parking free after 6pm','Visit on a Saturday for the full market atmosphere'],
    gmaps:'https://maps.google.com/?q=Bishop+Arts+District+Dallas+TX',
    links:[{label:'Bishop Arts District',url:'https://www.bishopartsdistrict.com'},{label:'Bishop Arts on Google Maps',url:'https://maps.google.com/?q=Bishop+Arts+District+Dallas+TX'}]
  },
  { slug:'arts-district', name:'Arts District', icon:'🏛️', tag:'Culture · Museums', cats:['culture'],
    desc:'The largest contiguous arts district in the US. Home to the Nasher Sculpture Center, Dallas Museum of Art, and the Meyerson Symphony Center.',
    long:'The Dallas Arts District spans 68 acres and contains more LEED-certified buildings than any other arts district in the world. The Dallas Museum of Art is free every day. The Nasher Sculpture Center has one of the finest sculpture gardens in North America.',
    highlights:['Dallas Museum of Art (free admission)','Nasher Sculpture Center','Morton H. Meyerson Symphony Center','Crow Museum of Asian Art'],
    tips:['DMA is free every day — no reservation needed','Nasher garden is best in the late afternoon light','DART Pearl/Arts District station is steps away'],
    gmaps:'https://maps.google.com/?q=Dallas+Arts+District+TX',
    links:[{label:'Dallas Museum of Art',url:'https://www.dma.org'},{label:'Nasher Sculpture Center',url:'https://www.nashersculpturecenter.org'},{label:'Arts District on Google Maps',url:'https://maps.google.com/?q=Dallas+Arts+District+TX'}]
  },
  { slug:'stockyards', name:'Stockyards (Fort Worth)', icon:'🤠', tag:'Culture · History', cats:['culture','food'],
    desc:'30 min from Dallas — the historic cattle yards where you can catch a rodeo, visit honky-tonks, and eat legendary Texas BBQ.',
    long:'The Fort Worth Stockyards is one of the most genuinely unique experiences in all of North Texas. Twice daily longhorn cattle drives down Exchange Avenue. World-class honky-tonks like Billy Bob\'s Texas. And some of the most serious beef in the state at Cattlemen\'s Steakhouse.',
    highlights:['Daily Longhorn cattle drive (11:30am & 4pm)','Billy Bob\'s Texas — world\'s largest honky-tonk','Cattlemen\'s Steakhouse — legendary since 1947','Rodeo every Friday & Saturday night'],
    tips:['40 min from Dallas via I-30','TRE rail goes to Fort Worth — then Uber','Go on a Friday night for the full rodeo experience'],
    gmaps:'https://maps.google.com/?q=Fort+Worth+Stockyards+TX',
    links:[{label:'Fort Worth Stockyards',url:'https://www.fortworthstockyards.org'},{label:'Billy Bob\'s Texas',url:'https://www.billybobstexas.com'},{label:'Stockyards on Google Maps',url:'https://maps.google.com/?q=Fort+Worth+Stockyards+TX'}]
  },
  { slug:'oak-cliff', name:'Oak Cliff', icon:'🌮', tag:'Food · Authentic', cats:['food'],
    desc:'Skip the tourist Tex-Mex. Come here for authentic tacos al pastor, elote, and family-run taquizas that international visitors absolutely love.',
    long:'Oak Cliff is where Dallas locals eat when they don\'t want to perform for tourists. The taco scene here is world-class. Torchy\'s got famous here. Revolver Taco was born here. And the neighborhood taquerias — cash only, no English menus, always a line — are what Dallas food writers dream about.',
    highlights:['Revolver Taco — chef-driven elevated tacos','Neighborhood taquerias open until 3am','Elleño — best queso in Dallas','Oak Cliff Brewing Company'],
    tips:['Bring cash — many taquerias don\'t take cards','Best visited after 8pm when the night market energy picks up','Bishop Arts District is in the same neighborhood'],
    gmaps:'https://maps.google.com/?q=Oak+Cliff+Dallas+TX',
    links:[{label:'Oak Cliff on Google Maps',url:'https://maps.google.com/?q=Oak+Cliff+Dallas+TX'}]
  },
];

const RESTAURANTS = [
  { slug:'pecan-lodge', name:'Pecan Lodge', stars:5, cuisine:'BBQ', cat:'bbq', price:'$$', area:'Deep Ellum',
    desc:'Best brisket in Dallas. Insane burnt ends. Lines start at 11am — get there early or expect a 90-min wait.',
    long:'Pecan Lodge started as a farmers market stall and became a Dallas institution almost overnight. The brisket is smoke-ringed perfection, the burnt ends are legendary, and the jalapeño cheese sausage is not optional. Cash only. Worth every second of the wait.',
    address:'2702 Main St, Dallas, TX 75226', hours:'Mon–Thu 11am–3pm, Fri–Sun 11am–5pm',
    phone:'+1 (214) 748-8900', tags:['ICONIC','Cash Only','Lines Expected'],
    website:'https://www.pecanlodge.com', gmaps:'https://maps.google.com/?q=Pecan+Lodge+Dallas+TX',
    tips:['Arrive at opening — waits hit 90 min by noon','Order the Pitmaster Plate to try everything','Cash only at the counter','Burnt ends sell out — get there before noon']
  },
  { slug:'lucia', name:'Lucia', stars:5, cuisine:'Italian', cat:'international', price:'$$$', area:'Oak Cliff',
    desc:'Tiny, reservation-only gem. House-made pasta with Texas ingredients. Book 3 weeks ahead during World Cup.',
    long:'Lucia is one of the most acclaimed restaurants in Dallas, full stop. Chef David Uygur sources everything locally and makes pasta daily. The menu changes weekly. It seats 36 people. During the World Cup, getting a reservation will be nearly impossible — try OpenTable at midnight exactly 30 days before your date.',
    address:'408 W 8th St, Dallas, TX 75208', hours:'Tue–Sat 6pm–10pm (dinner only)',
    phone:'+1 (214) 948-4998', tags:['BOOK AHEAD','James Beard Nominated','Tiny Venue'],
    website:'https://www.luciadallas.com', gmaps:'https://maps.google.com/?q=Lucia+Restaurant+Dallas+TX',
    tips:['Reservations open 30 days in advance on OpenTable','Walk-in bar seats are first come, first served','Ask about the chef\'s tasting menu','Pair with the wine list — it\'s exceptional']
  },
  { slug:'knife', name:'Knife', stars:5, cuisine:'Steakhouse', cat:'international', price:'$$$$', area:'Uptown',
    desc:'Texas-raised beef, dry-aged 60+ days on site. The definitive Dallas steakhouse experience for special occasions.',
    long:'John Tesar\'s Knife is where you go to understand what Texas beef is really about. Everything is dry-aged in-house, minimum 60 days, some cuts up to 240 days. The bone-in ribeye is the benchmark. It\'s expensive. It is absolutely worth it.',
    address:'5300 E Mockingbird Ln, Dallas, TX 75206', hours:'Daily 5pm–10pm',
    phone:'+1 (214) 443-9339', tags:['SPLURGE','Best Steak in Dallas','Reservation Required'],
    website:'https://www.restaurantknife.com', gmaps:'https://maps.google.com/?q=Knife+Restaurant+Dallas+TX',
    tips:['The bone-in ribeye is non-negotiable','Reserve at least 2 weeks ahead','Try the 240-day dry-aged if available','Happy hour at the bar is significantly cheaper']
  },
  { slug:'revolver-taco', name:'Revolver Taco', stars:5, cuisine:'Tacos', cat:'texmex', price:'$', area:'Deep Ellum',
    desc:'Chef-driven elevated tacos. Rotating menu based on seasonal ingredients. The most creative taco in Dallas.',
    long:'Revolver Taco Lounge is where fine dining sensibility meets taco-stand format. Regino Rojas changes the menu constantly, sourcing from Mexican farms and Texas ranches simultaneously. You might find duck confit tacos next to handmade mole negro. No two visits are the same.',
    address:'2701 Main St, Dallas, TX 75226', hours:'Wed–Sun 5pm–10pm',
    phone:'+1 (214) 741-2629', tags:['CHEF-DRIVEN','Creative Menu','Local Legend'],
    website:'https://www.revolvertacosdallaas.com', gmaps:'https://maps.google.com/?q=Revolver+Taco+Dallas+TX',
    tips:['No reservations — arrive at 5pm or expect a wait','Order everything — portions are small and meant to share','The drinks program is as serious as the food','Follow them on Instagram for menu previews']
  },
  { slug:'eleno', name:'Elleño', stars:5, cuisine:'Tex-Mex', cat:'texmex', price:'$$', area:'Bishop Arts',
    desc:'Modern Tex-Mex with a serious cocktail program. The queso is the stuff of local legend.',
    long:'Elleño is what Tex-Mex looks like when a serious chef gets involved. The queso blanco is genuinely otherworldly — silky, flavorful, deeply addictive. The margarita program is equally serious. Lively atmosphere, great for groups, and the perfect bridge between authentic Mexican food and Dallas dining culture.',
    address:'316 W 7th St, Dallas, TX 75208', hours:'Mon–Thu 4pm–10pm, Fri–Sun 11am–11pm',
    phone:'+1 (469) 399-1299', tags:['BEST QUESO','Great for Groups','Lively Atmosphere'],
    website:'https://www.elleno.com', gmaps:'https://maps.google.com/?q=Elleño+Dallas+TX',
    tips:['Start with the queso — it is not optional','The house margarita is on par with anywhere in Mexico','Weekend brunch is excellent but very busy','Reservations available on Resy']
  },
  { slug:'heim-bbq', name:'Heim BBQ', stars:4, cuisine:'BBQ', cat:'bbq', price:'$$', area:'Fort Worth',
    desc:'Fort Worth\'s answer to Pecan Lodge. Bacon burnt ends are the must-order — they\'re unique to Heim.',
    long:'Travis and Emma Heim turned a food truck into a Fort Worth empire. The innovation here is bacon burnt ends — thick-cut bacon, smoked for hours, cubed and caramelized. They also do tremendous brisket and sell out of ribs by 1pm on weekends. The Fort Worth location is closer to AT&T Stadium than any Dallas BBQ.',
    address:'1109 W Magnolia Ave, Fort Worth, TX 76104', hours:'Wed–Sun 11am–4pm (or sold out)',
    phone:'+1 (817) 882-6970', tags:['BACON BURNT ENDS','Closest to Stadium','Sells Out Fast'],
    website:'https://www.heimbbq.com', gmaps:'https://maps.google.com/?q=Heim+BBQ+Fort+Worth+TX',
    tips:['Arrive at opening — sold out by 2pm on weekends','Bacon burnt ends are unique to Heim — mandatory order','The Fort Worth location is 15 min from AT&T Stadium','Check their Instagram for daily sold-out alerts']
  },
  { slug:'strangeways', name:'Strangeways', stars:4, cuisine:'Bar', cat:'bar', price:'$$', area:'Deep Ellum',
    desc:'500+ craft beers on tap and in cans. Legendary cheese fries. The best match-watching bar in Deep Ellum.',
    long:'Strangeways is the beer nerd\'s paradise and the perfect World Cup bar. 500+ selections spanning every style imaginable, a legit food menu anchored by their famous cheese fries, and an atmosphere that gets electric for big matches. Multiple screens throughout.',
    address:'2743 Commerce St, Dallas, TX 75226', hours:'Daily 2pm–2am',
    phone:'+1 (214) 741-4001', tags:['500+ BEERS','Match Watching','Open Late'],
    website:'https://www.strangewaysdallas.com', gmaps:'https://maps.google.com/?q=Strangeways+Dallas+TX',
    tips:['Get there 45 min before kickoff to get a screen-facing seat','The cheese fries are essential','Ask the staff for beer recommendations — they know everything','No reservations — first come first served']
  },
  { slug:'hg-sply-co', name:'HG Sply Co', stars:4, cuisine:'Bar', cat:'bar', price:'$$', area:'Lower Greenville',
    desc:'Massive rooftop with 360° Dallas skyline views. The ideal pre-match spot. Great cocktails and a full food menu.',
    long:'HG Sply Co occupies a converted space on Greenville Ave with one of the best rooftop terraces in Dallas. The views are dramatic, the cocktail menu is creative, and the kitchen turns out solid food until late. It\'s become the unofficial pre-match gathering spot for expats in Dallas during big tournaments.',
    address:'2008 Greenville Ave, Dallas, TX 75206', hours:'Mon–Fri 4pm–2am, Sat–Sun 11am–2am',
    phone:'+1 (469) 334-0895', tags:['ROOFTOP','Pre-Match Spot','Skyline Views'],
    website:'https://www.hgsplyco.com', gmaps:'https://maps.google.com/?q=HG+Sply+Co+Dallas+TX',
    tips:['Rooftop fills fast — arrive 1 hour before kickoff','The lower level has A/C if the heat is brutal','Parking on side streets or use the lot on Ross Ave','Sunday brunch + match day is a killer combo']
  },
  { slug:'smoky-rose', name:'Smoky Rose', stars:4, cuisine:'BBQ Fusion', cat:'bbq', price:'$$', area:'Garland',
    desc:'Korean-Texas BBQ fusion. Table grills, brisket tacos, kimchi biscuits. Completely unique to Dallas.',
    long:'Smoky Rose is the most unexpected restaurant on this list — and one of the most memorable. Korean table-grill technique applied to Texas beef, with kimchi and gochujang woven into the sides. Brisket tacos with Korean slaw, smoked bulgogi, and house-made hot sauce. A one-of-a-kind Dallas experience.',
    address:'2551 Forest Ln, Garland, TX 75042', hours:'Tue–Sun 11am–9pm',
    phone:'+1 (972) 276-6111', tags:['KOREAN-TEXAS FUSION','Unique','Table Grills'],
    website:'https://www.smokyrosebbq.com', gmaps:'https://maps.google.com/?q=Smoky+Rose+Garland+TX',
    tips:['The brisket tacos with Korean slaw are the signature — order them','Table grill experience requires 2+ people','About 20 min from downtown Dallas','Call ahead on weekends — waits can be long']
  },
];

// ── SHARED NAV RENDER ──────────────────────────────────────────
function renderNav(activePage) {
  const base = getBase();
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  nav.innerHTML = `
    <a class="logo" href="${base}index.html">⚽ Dallas<span class="g">2026</span></a>
    <ul class="nav-links">
      ${SITE.nav.map(n => {
        const href = base + n.href.replace(/^\//, '');
        const fileName = n.href.replace(/^\//, '');
        const isActive = currentPath === fileName || (currentPath === 'index.html' && n.href === '/matches.html' && activePage === 'matches');
        return `<li><a href="${href}" class="${isActive ? 'active' : ''}">${n.label}</a></li>`;
      }).join('')}
    </ul>
    <div class="lang-switcher">
      <button class="lang-btn active" onclick="setLang('en')">EN</button>
      <button class="lang-btn" onclick="setLang('es')">ES</button>
      <button class="lang-btn" onclick="setLang('fr')">FR</button>
      <button class="lang-btn" onclick="setLang('pt')">PT</button>
    </div>`;
}

function getBase() {
  // Works for both local file and deployed subdirectory
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const isSubDir = window.location.pathname.includes('/neighborhoods/') || window.location.pathname.includes('/restaurants/');
  return isSubDir ? '../../' : './';
}

// ── FOOTER RENDER ─────────────────────────────────────────────
function renderFooter() {
  const base = getBase();
  const footer = document.getElementById('main-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-logo">⚽ Dallas<span class="g">2026</span></div>
        <div class="footer-tagline">Your complete FIFA World Cup visitor guide</div>
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          ${SITE.nav.map(n => `<li><a href="${base}${n.href.replace(/^\//,'')}">${n.label}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Official Links</div>
        <ul class="footer-links">
          <li><a href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener">FIFA World Cup 2026 ↗</a></li>
          <li><a href="https://www.dart.org" target="_blank" rel="noopener">DART Transit ↗</a></li>
          <li><a href="https://www.attstadium.com" target="_blank" rel="noopener">AT&T Stadium ↗</a></li>
          <li><a href="https://www.visitdallas.com" target="_blank" rel="noopener">Visit Dallas ↗</a></li>
          <li><a href="https://www.dfwairport.com" target="_blank" rel="noopener">DFW Airport ↗</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Emergency</div>
        <ul class="footer-links">
          <li><a href="tel:911">Emergency: 911</a></li>
          <li><a href="tel:+12147484900">Medical City Arlington</a></li>
          <li><a href="https://www.weather.gov" target="_blank" rel="noopener">Weather Alerts ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">Fan-made visitor guide for FIFA World Cup 2026 · Not affiliated with FIFA or the City of Dallas</div>`;
}

// ── COUNTDOWN ─────────────────────────────────────────────────
function initCountdown(dayId, hId, mId, sId) {
  function tick() {
    const t = new Date('2026-06-15T19:00:00-05:00') - new Date();
    if (t <= 0) return;
    const d = Math.floor(t / 864e5), h = Math.floor(t % 864e5 / 36e5),
          m = Math.floor(t % 36e5 / 6e4), s = Math.floor(t % 6e4 / 1e3);
    if (dayId && document.getElementById(dayId)) document.getElementById(dayId).textContent = d;
    if (hId && document.getElementById(hId)) document.getElementById(hId).textContent = String(h).padStart(2,'0');
    if (mId && document.getElementById(mId)) document.getElementById(mId).textContent = String(m).padStart(2,'0');
    if (sId && document.getElementById(sId)) document.getElementById(sId).textContent = String(s).padStart(2,'0');
    const dh = document.getElementById('days-hero');
    if (dh) dh.textContent = d;
  }
  tick(); setInterval(tick, 1000);
}

// ── WEATHER ───────────────────────────────────────────────────
async function initWeather() {
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.78&longitude=-96.81&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago');
    const d = await r.json(); const c = d.current;
    const codes = {0:'Clear skies',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',51:'Light drizzle',61:'Light rain',63:'Moderate rain',80:'Rain showers',95:'Thunderstorms'};
    const tempEl = document.getElementById('w-temp');
    const descEl = document.getElementById('w-desc');
    const humEl  = document.getElementById('w-hum');
    const windEl = document.getElementById('w-wind');
    if (tempEl) tempEl.textContent = Math.round(c.temperature_2m) + '°F';
    if (descEl) descEl.textContent = codes[c.weather_code] || 'Conditions vary';
    if (humEl)  humEl.textContent  = Math.round(c.relative_humidity_2m);
    if (windEl) windEl.textContent = Math.round(c.wind_speed_10m);
  } catch(e) {
    const descEl = document.getElementById('w-desc');
    if (descEl) descEl.textContent = 'Weather unavailable';
  }
}

// ── EXTERNAL LINK HELPER ──────────────────────────────────────
function extLink(url, label) {
  return `<a href="${url}" target="_blank" rel="noopener" class="ext-link">${label} <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>`;
}

// ── STAR RENDERER ─────────────────────────────────────────────
function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5-n);
}

// ── ACTIVE NAV ON SCROLL ──────────────────────────────────────
function initScrollSpy(sectionIds) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 120) cur = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.section === cur);
    });
  });
}
