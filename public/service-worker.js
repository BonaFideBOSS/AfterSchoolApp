var cacheName = "afterschool-v1";
var cacheFiles = [
  "index.html",
  "manifest.json",
  "img/logo-192.png",
  "img/logo-512.png",
  "img/favicon.ico",
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      // Download the file if it is not in the cache,
      return (
        r ||
        fetch(e.request).then(async (response) => {
          // add the new file to cache
          return caches.open(cacheName).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
