const CACHE_NAME = 'avivet-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/products.html',
  '/poultry.html',
  '/cattle-livestock.html',
  '/dealer.html',
  '/contact.html',
  '/assets/css/style.css',
  '/assets/css/premium.css',
  '/assets/css/advanced.css',
  '/assets/js/main.js',
  '/assets/js/advanced.js',
  '/assets/data/products-data.js',
  '/assets/data/products.json',
  '/assets/images/avivet-logo.png',
  '/assets/images/favicon.png',
  '/assets/images/hero-animals.svg',
  '/assets/images/category-poultry.svg',
  '/assets/images/category-cattle.svg',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

function syncForms() {
  // Handle syncing offline form submissions
  return Promise.resolve();
}
