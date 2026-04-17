const fs = require('fs');
const siteJs = fs.readFileSync('./js/site.js', 'utf8');
const dataExtractor = new Function(
  siteJs.replace(/\/\/ ── SHARED NAV[\s\S]*$/, '').replace(/const SITE[\s\S]*?(?=const NEIGHBORHOODS)/,'')
  + '\n return { NEIGHBORHOODS, RESTAURANTS };'
);
const { NEIGHBORHOODS, RESTAURANTS } = dataExtractor();

// Neighborhoods that need a car (no DART access)
const NEEDS_CAR = ['stockyards','oak-cliff','bishop-arts'];

function nbhPage(n) {
  const needsCar = NEEDS_CAR.includes(n.slug);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${n.name} — Dallas 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<style>
.highlights-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;background:var(--border);margin-bottom:2.5rem}
.hi-cell{background:var(--card);padding:1.2rem;display:flex;align-items:flex-start;gap:10px}
.hi-star{color:var(--gold);flex-shrink:0;font-size:.9rem;margin-top:1px}
.hi-text{font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tips-list{display:flex;flex-direction:column;gap:8px;margin-bottom:2rem}
.tip-item{display:flex;gap:10px;padding:.85rem 1rem;background:var(--card);border-left:3px solid var(--gold);font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tip-num{font-family:var(--fh);font-weight:700;color:var(--gold);flex-shrink:0;min-width:24px}
</style>
</head>
<body>
<div id="affiliate-disclosure"></div>
<nav id="main-nav"></nav>
<div class="page-hero" style="margin-top:56px">
  <div class="page-hero-bg"></div>
  <div class="page-hero-content">
    <div class="breadcrumb">
      <a href="../index.html">Home</a><span>/</span>
      <a href="../explore.html">Explore</a><span>/</span>
      <span style="color:var(--text)">${n.name}</span>
    </div>
    <h1>${n.icon} <em>${n.name}</em></h1>
    <p class="page-hero-sub">${n.desc}</p>
    <div class="page-hero-tags">
      ${n.cats.map(c=>`<span class="tag tag-gold">${c}</span>`).join('')}
      ${needsCar ? '<span class="tag tag-red">Car recommended</span>' : '<span class="tag tag-green">DART accessible</span>'}
    </div>
  </div>
</div>

<section>
  <div class="sec-label">About</div>
  <div class="sec-title" style="margin-bottom:1.25rem">The <em>Details</em></div>
  <p style="font-size:.95rem;color:var(--muted);line-height:1.85;max-width:680px;font-weight:300;margin-bottom:2.5rem">${n.long}</p>
  <div class="sec-label" style="margin-bottom:.85rem">Highlights</div>
  <div class="highlights-grid">
    ${n.highlights.map(h=>`<div class="hi-cell"><span class="hi-star">★</span><div class="hi-text">${h}</div></div>`).join('')}
  </div>
  <div class="sec-label" style="margin-bottom:.75rem">Insider Tips</div>
  <div class="tips-list">
    ${n.tips.map((t,i)=>`<div class="tip-item"><span class="tip-num">0${i+1}</span><span>${t}</span></div>`).join('')}
  </div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:.5rem">
    <a href="${n.gmaps}" target="_blank" rel="noopener" class="ext-link">Open in Google Maps ↗</a>
    ${n.links.filter(l=>!l.url.includes('maps.google')).map(l=>`<a href="${l.url}" target="_blank" rel="noopener" class="ext-link">${l.label} ↗</a>`).join('')}
  </div>
</section>

<!-- AFFILIATE: hotel/car/activity booking for this neighborhood -->
<section style="background:var(--mid)">
  <div class="sec-label">Stay & Explore</div>
  <div class="sec-title" style="margin-bottom:.5rem">Book for <em>${n.name}</em></div>
  <p style="font-size:.82rem;color:var(--muted);font-weight:300;max-width:500px;margin-bottom:0">
    ${needsCar ? 'This area isn\'t on the DART rail network — a rental car gives you the most flexibility.' : 'Well connected by DART. Hotels here put you close to restaurants and nightlife.'}
  </p>
  <div id="nbh-booking"></div>
</section>

<section>
  <div class="sec-label">Nearby Dining</div>
  <div class="sec-title" style="margin-bottom:1.5rem">Where to <em>Eat</em></div>
  <div class="cards-grid" id="nearby"></div>
  <div style="margin-top:1.5rem"><a href="../explore.html#restaurants" class="btn-sec">All Restaurants →</a></div>
</section>

<section style="background:var(--mid)">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem">
    <div><div class="sec-label">Keep Exploring</div><div class="sec-title" style="margin-bottom:0">More <em>Neighborhoods</em></div></div>
    <a href="../explore.html" class="btn-ghost">All Neighborhoods →</a>
  </div>
  <div class="cards-grid" id="more"></div>
</section>

<footer id="main-footer"></footer>
<script src="../js/site.js"></script>
<script src="../js/affiliate.js"></script>
<script>
renderNav(); renderFooter(); renderDisclosure();
const slug='${n.slug}';
const nbhName='${n.name}';
renderNeighborhoodBooking('nbh-booking', nbhName + ', Dallas Texas', ${needsCar});
const nearby=RESTAURANTS.slice(0,4);
document.getElementById('nearby').innerHTML=nearby.map(r=>\`<a href="../restaurants/\${r.slug}.html" class="card card-link"><div class="card-label">\${r.cuisine} · \${r.price}</div><div class="card-title">\${r.name}</div><div class="card-body">\${r.desc}</div><span class="card-arrow">→</span></a>\`).join('');
const others=NEIGHBORHOODS.filter(n=>n.slug!==slug).slice(0,3);
document.getElementById('more').innerHTML=others.map(n=>\`<a href="\${n.slug}.html" class="card card-link"><div class="card-label">\${n.tag}</div><div class="card-title">\${n.icon} \${n.name}</div><div class="card-body">\${n.desc}</div><span class="card-arrow">→</span></a>\`).join('');
</script>
</body>
</html>`;
}

function restPage(r) {
  const priceMap={'$':'Budget','$$':'Mid-range','$$$':'Upscale','$$$$':'Special occasion'};
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${r.name} — Dallas 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<style>
.info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border);margin-bottom:2.5rem}
.ic{background:var(--card);padding:1.2rem}
.ic-lbl{font-family:var(--fh);font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.35rem}
.ic-val{font-size:.85rem;color:var(--text);line-height:1.5;font-weight:300}
.ic-val a{color:var(--gold)}
.tips-list{display:flex;flex-direction:column;gap:8px;margin-bottom:2rem}
.tip-item{display:flex;gap:10px;padding:.85rem 1rem;background:var(--card);border-left:3px solid var(--gold);font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tip-num{font-family:var(--fh);font-weight:700;color:var(--gold);flex-shrink:0;min-width:24px}
</style>
</head>
<body>
<div id="affiliate-disclosure"></div>
<nav id="main-nav"></nav>
<div class="page-hero" style="margin-top:56px">
  <div class="page-hero-bg"></div>
  <div class="page-hero-content">
    <div class="breadcrumb">
      <a href="../index.html">Home</a><span>/</span>
      <a href="../explore.html#restaurants">Restaurants</a><span>/</span>
      <span style="color:var(--text)">${r.name}</span>
    </div>
    <h1><em>${r.name}</em></h1>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:.85rem;flex-wrap:wrap">
      <span style="font-size:1.1rem;color:var(--gold);letter-spacing:.05em">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
      <span style="font-family:var(--fh);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">${r.price} · ${priceMap[r.price]||''}</span>
    </div>
    <p class="page-hero-sub">${r.desc}</p>
    <div class="page-hero-tags">
      <span class="tag tag-gold">${r.cuisine}</span>
      <span class="tag tag-blue">${r.area}</span>
      ${r.tags.map(t=>`<span class="tag tag-red">${t}</span>`).join('')}
    </div>
  </div>
</div>

<section>
  <div class="sec-label">Full Story</div>
  <div class="sec-title" style="margin-bottom:1.25rem">Why <em>Go</em></div>
  <p style="font-size:.95rem;color:var(--muted);line-height:1.85;max-width:680px;font-weight:300;margin-bottom:2.5rem">${r.long}</p>
  <div class="info-grid">
    <div class="ic"><div class="ic-lbl">Address</div><div class="ic-val"><a href="${r.gmaps}" target="_blank" rel="noopener">${r.address} ↗</a></div></div>
    <div class="ic"><div class="ic-lbl">Hours</div><div class="ic-val">${r.hours}</div></div>
    <div class="ic"><div class="ic-lbl">Phone</div><div class="ic-val"><a href="tel:${r.phone.replace(/[^+\d]/g,'')}">${r.phone}</a></div></div>
    <div class="ic"><div class="ic-lbl">Price Range</div><div class="ic-val">${r.price} · ${priceMap[r.price]||''}</div></div>
  </div>
  <div class="sec-label" style="margin-bottom:.75rem">Insider Tips</div>
  <div class="tips-list" style="margin-bottom:2rem">
    ${r.tips.map((t,i)=>`<div class="tip-item"><span class="tip-num">0${i+1}</span><span>${t}</span></div>`).join('')}
  </div>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <a href="${r.gmaps}" target="_blank" rel="noopener" class="ext-link">Google Maps ↗</a>
    <a href="${r.website}" target="_blank" rel="noopener" class="ext-link">Official Website ↗</a>
    <a href="tel:${r.phone.replace(/[^+\d]/g,'')}" class="ext-link">Call to Reserve ↗</a>
  </div>
</section>

<!-- AFFILIATE: hotels near this restaurant's area -->
<section style="background:var(--mid)">
  <div class="sec-label">Staying Nearby?</div>
  <div class="sec-title" style="margin-bottom:.5rem">Hotels in <em>${r.area}</em></div>
  <p style="font-size:.82rem;color:var(--muted);font-weight:300;max-width:500px;margin-bottom:0">Find accommodation close to ${r.name} — walking distance or a short Uber away.</p>
  <div id="rest-booking"></div>
</section>

<section>
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem">
    <div><div class="sec-label">Keep Exploring</div><div class="sec-title" style="margin-bottom:0">More <em>Restaurants</em></div></div>
    <a href="../explore.html#restaurants" class="btn-ghost">All Restaurants →</a>
  </div>
  <div class="cards-grid" id="more"></div>
</section>

<footer id="main-footer"></footer>
<script src="../js/site.js"></script>
<script src="../js/affiliate.js"></script>
<script>
renderNav(); renderFooter(); renderDisclosure();
renderNeighborhoodBooking('rest-booking', '${r.area}, Dallas Texas', false);
const slug='${r.slug}';
const others=RESTAURANTS.filter(r=>r.slug!==slug).slice(0,3);
document.getElementById('more').innerHTML=others.map(r=>\`<a href="\${r.slug}.html" class="card card-link"><div class="card-label">\${r.cuisine} · \${r.price}</div><div class="card-title">\${r.name}</div><div class="card-body">\${r.desc}</div><span class="card-arrow">→</span></a>\`).join('');
</script>
</body>
</html>`;
}

NEIGHBORHOODS.forEach(n => { fs.writeFileSync(`./neighborhoods/${n.slug}.html`, nbhPage(n)); console.log(`✓ neighborhoods/${n.slug}.html`); });
RESTAURANTS.forEach(r => { fs.writeFileSync(`./restaurants/${r.slug}.html`, restPage(r)); console.log(`✓ restaurants/${r.slug}.html`); });
console.log('\nAll detail pages regenerated with affiliate widgets.');
