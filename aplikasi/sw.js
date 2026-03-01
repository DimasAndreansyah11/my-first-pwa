const CACHE_NAME = 'system-ledger-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Instalasi Service Worker & Menyimpan File ke Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('[System Core] Initializing Offline Cache...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Strategi Pengambilan File (Network First, Fallback to Cache)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});