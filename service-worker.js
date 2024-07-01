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

// Install service worker, adding all our cache entries
self.addEventListener("install", (e) => {
  console.log("[ServiceWorker] - Install");
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    console.log("[ServiceWorker] - Caching app files");
    await cache.addAll(cacheFiles);
  });
  checkNetworkState();
});

self.addEventListener("fetch", async function (event) {
  var allowedUrls = [self.location.origin, "https://i.gyazo.com/"];
  if (!allowedUrls.some((url) => event.request.url.startsWith(url))) {
    return;
  }

  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;
  if (event.request.method === "GET") {
    if (event.request.mode !== "cors") {
      event.respondWith(fetchResponseFromCache(event.request));
      return;
    }
    if (navigator.onLine) {
      event.respondWith(cacheRequest(event.request));
    } else {
      var resp = await fetchResponseFromCache(event.request).catch((e) => {
        return;
      });
      if (resp) {
        event.respondWith(resp);
      }
    }
  } else {
    var authHeader = event.request.headers.get("Authorization");
    var reqUrl = event.request.url;
    Promise.resolve(event.request.text()).then((payload) => {
      //save offline requests to indexed db
      saveIntoIndexedDb(reqUrl, authHeader, payload);
    });
  }
});

// Activate service worker
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

function checkNetworkState() {
  setInterval(function () {
    if (navigator.onLine) {
      sendOfflinePostRequestsToServer();
    }
  }, 3000);
}

async function cacheResponse(cache, request, response, data) {
  var responseToCache;
  try {
    if (request.mode === "cors") {
      var responseData = await getResponseData(data);

      responseToCache = new Response(btoa(responseData), {
        headers: response.clone().headers,
      });
    } else {
      responseToCache = response.clone();
    }
    cache.put(request, responseToCache);
  } catch (err) {}
  return response;
}

const cacheRequest = (request) =>
  caches.open(cacheName).then((cache) =>
    fetch(request.clone(), {
      credentials: "same-origin",
    }).then((response) =>
      cacheResponse(cache, request.clone(), response, response.clone().text())
    )
  );

const fetchResponseFromCache = (request, returnResponseData) =>
  caches
    .open(cacheName)
    .then((cache) =>
      cache
        .match(request, { ignoreVary: true })
        .then((response) =>
          returnResponseFromCache(request, response, returnResponseData, cache)
        )
    );

async function returnResponseFromCache(
  request,
  response,
  returnResponseData,
  cache
) {
  if (response && request.mode === "cors") {
    var responseData = await getResponseData(response.text());
    if (returnResponseData) return responseData;
    response = new Response(atob(responseData), {
      headers: response.headers,
    });
  }

  if (!!response) {
    return response;
  } else {
    console.log(request.url + " not yet cached!");
    return fetch(request, { credentials: "same-origin" }).then((response) =>
      cacheResponse(cache, request, response)
    );
  }
}

async function getResponseData(data) {
  let promise = Promise.resolve(data).then((text) => {
    return text;
  });
  let result = await promise;
  return result;
}

async function sendOfflinePostRequestsToServer() {
  var request = indexedDB.open("TrayTrackingPostDB");
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("postrequest", "readwrite");
    var store = tx.objectStore("postrequest");
    var allRecords = store.getAll();
    allRecords.onsuccess = function () {
      if (allRecords.result && allRecords.result.length > 0) {
        var records = allRecords.result;
        //make recursive call to hit fetch requests to server in a serial manner
        var resp = sendFetchRequestsToServer(
          fetch(records[0].url, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: records[0].authHeader,
            },
            body: records[0].payload,
          }),
          records[0].url,
          records[0].authHeader,
          records[0].payload,
          records.slice(1)
        );

        for (var i = 0; i < allRecords.result.length; i++)
          store.delete(allRecords.result[i].id);
      }
    };
  };
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    db.onerror = function (event) {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    var objectStore;
    if (!db.objectStoreNames.contains("postrequest")) {
      objectStore = db.createObjectStore("postrequest", {
        keyPath: "id",
        autoIncrement: true,
      });
    } else {
      objectStore = db.objectStoreNames.get("postrequest");
    }
  };
}

function saveIntoIndexedDb(url, authHeader, payload) {
  var myRequest = {};
  jsonPayLoad = JSON.parse(payload);
  //add payload if required. If not skip parsing json and stringifying it again
  //jsonPayLoad['eventTime'] = getCurrentTimeString(eventTime)
  myRequest.url = url;
  myRequest.authHeader = authHeader;
  myRequest.payload = JSON.stringify(jsonPayLoad);
  var request = indexedDB.open("TrayTrackingPostDB");
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("postrequest", "readwrite");
    var store = tx.objectStore("postrequest");
    store.add(myRequest);
  };
}

async function sendFetchRequestsToServer(
  data,
  reqUrl,
  authHeader,
  payload,
  records
) {
  let promise = Promise.resolve(data)
    .then((response) => {
      console.log("Successfully sent request to server");
      if (records.length != 0) {
        sendFetchRequestsToServer(
          fetch(records[0].url, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: records[0].authHeader,
            },
            body: records[0].payload,
          }),
          records[0].url,
          records[0].authHeader,
          records[0].payload,
          records.slice(1)
        );
      }
      return true;
    })
    .catch((e) => {
      //fetch fails only in case of network error. Fetch is successful in case of any response code
      console.log("Exception while sending post request to server" + e);
      saveIntoIndexedDb(reqUrl, authHeader, payload);
    });
}

async function updateCacheForAParticularRequest(authHeader) {
  var myRequest = new Request("request url whose cache needs to be updated");
  myRequest.mode = "cors";
  myRequest.headers = { Authorization: authHeader };
  var resp = await fetchResponseFromCache(myRequest, true);
  //make updations to resp and update cache
  caches
    .open(cacheName)
    .then((cache) =>
      cache.put(myRequest, new Response(btoa("Updated Response")))
    );
}
