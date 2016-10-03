var cacheName = 'weatherPWA-step-6-1-http://127.0.0.1:8887';
var dataCacheName = 'weatherData-v1';
var filesToCache = [
    '',
    'index.html',
    'scripts/script.jsx',
    'styles/style.css'
];


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = 'https://api.github.com/users/';
    if (e.request.url.indexOf(dataUrl) >= -1) {
        e.respondWith(
          caches.match(e.request).then(function(response) {
              return response || fetch(e.request).then(function(response) {
                  return caches.open(dataCacheName).then(function(cache){
                    cache.put(e.request.url, response.clone());
                    return response;
                  })
              })
          })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});
