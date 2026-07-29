// Service Worker de FitTracker Pro — app shell offline (network-first con fallback a caché)
const CACHE = 'fittracker-v1';
const CORE = ['./', './index.html', './exercises-data.js', './firebase-config.js', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    // Solo manejamos recursos propios; terceros (Firebase, ExerciseDB, video, traducción) van directo a la red
    if (url.origin !== self.location.origin) return;
    e.respondWith(
        fetch(req)
            .then(res => {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
                return res;
            })
            .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
});
