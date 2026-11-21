/* Rigveda for Young Explorers — offline support */
const VERSION = 'rv-v3';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './fonts/fonts.css', './js/capacitor.js', './js/plugin.js',
  './data/m1.json', './data/m2.json', './data/m3.json', './data/m4.json', './data/m5.json',
  './data/m6.json', './data/m7.json', './data/m8.json', './data/m9.json', './data/m10.json',
  './data/g1.json', './data/g2.json', './data/g3.json', './data/g4.json', './data/g5.json',
  './data/g6.json', './data/g7.json', './data/g8.json', './data/g9.json', './data/g10.json',
  './data/d1.json', './data/d2.json', './data/d3.json', './data/d4.json', './data/d5.json',
  './data/d6.json', './data/d7.json', './data/d8.json', './data/d9.json', './data/d10.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Google Fonts: cache first, fill cache on first use
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); c.put(req, res.clone()); return res; }
      catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Page: network first so updates arrive, cache when offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  // Everything else: cache first
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
