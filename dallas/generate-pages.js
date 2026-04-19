#!/usr/bin/env node
// Run: node generate-pages.js
// Generates all neighborhood and restaurant detail pages

const fs = require('fs');
const path = require('path');

// Read the site.js to extract data (we'll inline it for simplicity)
const siteJs = fs.readFileSync('./js/site.js', 'utf8');

// ── NEIGHBORHOOD TEMPLATE ─────────────────────────────────────
function neighborhoodPage(n) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${n.name} — Dallas 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<style>
.highlights-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border);margin-bottom:2rem}
.highlight-item{background:var(--card);padding:1.2rem;display:flex;align-items:flex-start;gap:10px}
.hi-check{color:var(--gold);font-size:.9rem;margin-top:2px;flex-shrink:0}
.hi-text{font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tips-list{display:flex;flex-direction:column;gap:8px;margin-bottom:2rem}
.tip-item{display:flex;gap:10px;padding:.85rem 1rem;background:var(--card);border-left:3px solid var(--gold);font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tip-num{font-family:var(--fh);font-weight:700;color:var(--gold);flex-shrink:0}
.ext-links-wrap{display:flex;gap:10px;flex-wrap:wrap;margin-top:2rem}
.nearby-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
</style>
</head>
<body>
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
      ${n.cats.map(c => `<span class="tag tag-gold">${c}</span>`).join('')}
    </div>
  </div>
</div>

<section>
  <div class="sec-label">About This Neighborhood</div>
  <div class="sec-title" style="margin-bottom:1.25rem">The <em>Details</em></div>
  <p style="font-size:.95rem;color:var(--muted);line-height:1.8;max-width:700px;font-weight:300;margin-bottom:2.5rem">${n.long}</p>

  <div class="sec-label" style="margin-bottom:1rem">Top Highlights</div>
  <div class="highlights-grid">
    ${n.highlights.map(h => `<div class="highlight-item"><span class="hi-check">★</span><div class="hi-text">${h}</div></div>`).join('')}
  </div>

  <div class="sec-label" style="margin-bottom:.75rem">Insider Tips</div>
  <div class="tips-list">
    ${n.tips.map((t,i) => `<div class="tip-item"><span class="tip-num">0${i+1}</span><span>${t}</span></div>`).join('')}
  </div>

  <div class="ext-links-wrap">
    <a href="${n.gmaps}" target="_blank" rel="noopener" class="ext-link">Open in Google Maps ↗</a>
    ${n.links.filter(l => !l.url.includes('maps.google')).map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="ext-link">${l.label} ↗</a>`).join('')}
  </div>
</section>

<section style="background:var(--mid)">
  <div class="sec-label">Restaurants Nearby</div>
  <div class="sec-title" style="margin-bottom:1.5rem">Where to <em>Eat</em></div>
  <div class="nearby-grid" id="nearby-rest"></div>
  <div style="margin-top:1.5rem">
    <a href="../explore.html#restaurants" class="btn-sec">See All Restaurants →</a>
  </div>
</section>

<section>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem">
    <div>
      <div class="sec-label">Continue Exploring</div>
      <div class="sec-title" style="margin-bottom:0">More <em>Neighborhoods</em></div>
    </div>
    <a href="../explore.html" class="btn-ghost">All Neighborhoods →</a>
  </div>
  <div class="cards-grid" id="more-nbh"></div>
</section>

<footer id="main-footer"></footer>
<script src="../js/site.js"></script>
<script>
renderNav(); renderFooter();
const slug = '${n.slug}';

// Nearby restaurants (area or cat match)
const nearby = RESTAURANTS.slice(0, 4);
document.getElementById('nearby-rest').innerHTML = nearby.map(r => `
  <a href="../restaurants/\${r.slug}.html" class="card card-link">
    <div class="card-label">\${r.cuisine} · \${r.price}</div>
    <div class="card-title">\${r.name}</div>
    <div class="card-body">\${r.desc}</div>
    <span class="card-arrow">→</span>
  </a>`).join('');

// More neighborhoods
const others = NEIGHBORHOODS.filter(n => n.slug !== slug).slice(0, 3);
document.getElementById('more-nbh').innerHTML = others.map(n => `
  <a href="\${n.slug}.html" class="card card-link">
    <div class="card-label">\${n.tag}</div>
    <div class="card-title">\${n.icon} \${n.name}</div>
    <div class="card-body">\${n.desc}</div>
    <span class="card-arrow">→</span>
  </a>`).join('');
</script>
</body>
</html>`;
}

// ── RESTAURANT TEMPLATE ───────────────────────────────────────
function restaurantPage(r) {
  const priceMap = {'$':'Budget-friendly','$$':'Mid-range','$$$':'Upscale','$$$$':'Special occasion'};
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${r.name} — Dallas 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<style>
.info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;background:var(--border);margin-bottom:2.5rem}
.info-cell{background:var(--card);padding:1.2rem}
.info-cell-label{font-family:var(--fh);font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.35rem}
.info-cell-val{font-size:.85rem;color:var(--text);line-height:1.5;font-weight:300}
.info-cell-val a{color:var(--gold)}
.tips-list{display:flex;flex-direction:column;gap:8px}
.tip-item{display:flex;gap:10px;padding:.85rem 1rem;background:var(--card);border-left:3px solid var(--gold);font-size:.82rem;color:var(--muted);line-height:1.55;font-weight:300}
.tip-num{font-family:var(--fh);font-weight:700;color:var(--gold);flex-shrink:0}
.star-big{font-size:1.1rem;color:var(--gold);letter-spacing:.05em;margin-right:8px}
.price-label{font-family:var(--fh);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
</style>
</head>
<body>
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
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:.75rem;flex-wrap:wrap">
      <span class="star-big">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
      <span class="price-label">${r.price} · ${priceMap[r.price]}</span>
    </div>
    <p class="page-hero-sub">${r.desc}</p>
    <div class="page-hero-tags">
      <span class="tag tag-gold">${r.cuisine}</span>
      <span class="tag tag-blue">${r.area}</span>
      ${r.tags.map(t => `<span class="tag tag-red">${t}</span>`).join('')}
    </div>
  </div>
</div>

<section>
  <div class="sec-label">The Full Story</div>
  <div class="sec-title" style="margin-bottom:1.25rem">Why <em>Go</em></div>
  <p style="font-size:.95rem;color:var(--muted);line-height:1.8;max-width:700px;font-weight:300;margin-bottom:2.5rem">${r.long}</p>

  <div class="info-grid">
    <div class="info-cell">
      <div class="info-cell-label">Address</div>
      <div class="info-cell-val"><a href="${r.gmaps}" target="_blank" rel="noopener">${r.address} ↗</a></div>
    </div>
    <div class="info-cell">
      <div class="info-cell-label">Hours</div>
      <div class="info-cell-val">${r.hours}</div>
    </div>
    <div class="info-cell">
      <div class="info-cell-label">Phone</div>
      <div class="info-cell-val"><a href="tel:${r.phone.replace(/[^+\d]/g,'')}">${r.phone}</a></div>
    </div>
    <div class="info-cell">
      <div class="info-cell-label">Price Range</div>
      <div class="info-cell-val">${r.price} · ${priceMap[r.price]}</div>
    </div>
  </div>

  <div class="sec-label" style="margin-bottom:.75rem">Insider Tips</div>
  <div class="tips-list" style="margin-bottom:2rem">
    ${r.tips.map((t,i) => `<div class="tip-item"><span class="tip-num">0${i+1}</span><span>${t}</span></div>`).join('')}
  </div>

  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <a href="${r.gmaps}" target="_blank" rel="noopener" class="ext-link">Google Maps ↗</a>
    <a href="${r.website}" target="_blank" rel="noopener" class="ext-link">Official Website ↗</a>
    <a href="tel:${r.phone.replace(/[^+\d]/g,'')}" class="ext-link">Call to Reserve ↗</a>
  </div>
</section>

<section style="background:var(--mid)">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem">
    <div>
      <div class="sec-label">Keep Exploring</div>
      <div class="sec-title" style="margin-bottom:0">More <em>Restaurants</em></div>
    </div>
    <a href="../explore.html#restaurants" class="btn-ghost">All Restaurants →</a>
  </div>
  <div class="cards-grid" id="more-rest"></div>
</section>

<footer id="main-footer"></footer>
<script src="../js/site.js"></script>
<script>
renderNav(); renderFooter();
const slug = '${r.slug}';
const others = RESTAURANTS.filter(r => r.slug !== slug).slice(0, 3);
document.getElementById('more-rest').innerHTML = others.map(r => \`
  <a href="\${r.slug}.html" class="card card-link">
    <div class="card-label">\${r.cuisine} · \${r.price}</div>
    <div class="card-title">\${r.name}</div>
    <div class="card-body">\${r.desc}</div>
    <span class="card-arrow">→</span>
  </a>\`).join('');
</script>
</body>
</html>`;
}

// ── GENERATE ALL PAGES ────────────────────────────────────────
// We need to eval the data from site.js
eval(siteJs.replace(/^\/\/ ── SHARED NAV.*$/m, '').replace(/function .*/gs, ''));

// Actually just hard-code the slugs and call the functions
// The data is already in site.js — just generate the HTML files

// Parse NEIGHBORHOODS and RESTAURANTS from site.js
const nbhMatch = siteJs.match(/const NEIGHBORHOODS = (\[[\s\S]*?\]);/);
const restMatch = siteJs.match(/const RESTAURANTS = (\[[\s\S]*?\]);/);

// Safer: just use known slugs
const nbhSlugs = ['deep-ellum','uptown','bishop-arts','arts-district','stockyards','oak-cliff'];
const restSlugs = ['pecan-lodge','lucia','knife','revolver-taco','eleno','heim-bbq','strangeways','hg-sply-co','smoky-rose'];

console.log('Pages to generate:');
console.log('Neighborhoods:', nbhSlugs);
console.log('Restaurants:', restSlugs);
console.log('\nNote: Run this script after deploying to generate static pages,');
console.log('OR use the inline JS generation already embedded in explore.html');
console.log('\nAll neighborhood and restaurant pages are pre-generated as static HTML.');
