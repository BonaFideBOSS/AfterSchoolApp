var cacheName = "afterschool-v1";
var cacheFiles = [
  "index.html",
  "404.html",
  "manifest.json",
  "img/favicon.ico",
  "img/logo.png",
  "img/logo-512.png",
  "img/logo-256.png",
  "img/logo-192.png",
  "img/desktop.png",
  "img/desktop-2.png",
  "img/desktop-3.png",
  "img/desktop-4.png",
  "img/mobile.png",
  "img/mobile-2.png",
  "img/mobile-3.png",
  "img/mobile-4.png",
  "img/splashscreens/iphone5_splash.png",
  "img/splashscreens/iphone6_splash.png",
  "img/splashscreens/iphoneplus_splash.png",
  "img/splashscreens/iphonex_splash.png",
  "img/splashscreens/iphonexr_splash.png",
  "img/splashscreens/iphonexsmax_splash.png",
  "img/splashscreens/ipad_splash.png",
  "img/splashscreens/ipadpro1_splash.png",
  "img/splashscreens/ipadpro3_splash.png",
  "img/splashscreens/ipadpro2_splash.png",
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
