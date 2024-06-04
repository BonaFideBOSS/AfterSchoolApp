var cacheName = "afterschool-v1";
var cacheFiles = [
  "index.html",
  "manifest.json",
  "img/logo-192.png",
  "img/logo-512.png",
  "img/favicon.ico",
  "img/desktop.png",
  "img/mobile.png",
  "mdbootstrap-7.3.0/mdb.min.css",
  "mdbootstrap-7.3.0/mdb.umd.min.js",
  "fontawesome-6.5.2/css/all.css",
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (e) => {
  console.log("[ServiceWorker] - Install");
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    console.log("[ServiceWorker] - Caching app files");
    await cache.addAll(cacheFiles);
  });
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (e) => {
  e.waitUntil(async () => {
    const keyList = await caches.keys();
    await Promise.all(
      keyList.map((key) => {
        if (key !== cacheName) {
          console.log("[ServiceWorker] - Removing old cache", key);
          return caches.delete(key);
        }
      })
    );
  });
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(cacheName).then((cache) => {
          return fetch(event.request).then((response) => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
