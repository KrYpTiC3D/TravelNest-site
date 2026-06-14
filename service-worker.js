const CACHE_NAME = "travelnest-v5";

/* The core files that make up the "app shell" — cached on install.          */
const CORE_ASSETS = [
  "./",                       // the start URL (resolves to index.html)
  "./index.html",
  "./explorer.html",
  "./budget.html",
  "./generator.html",
  "./mood.html",
  "./feedback.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/common.js",
  "./js/home.js",
  "./js/explorer.js",
  "./js/budget.js",
  "./js/generator.js",
  "./js/mood.js",
  "./js/feedback.js",
  "./manifest.json",

  /* Fonts, logos and the hero image — cached so repeat visits load fast. */
  "./fonts/NunitoSans-Regular.woff2",
  "./fonts/Fraunces-Regular.woff2",
  "./assets/icons/logo.svg",
  "./assets/icons/logo-light.svg",
  "./assets/icons/favicon.svg",
  "./assets/images/hero-image.webp"
];

/* INSTALL — open the cache and store every core asset. */
self.addEventListener("install", function (event) {
  /* waitUntil keeps the worker alive until the caching promise resolves.*/
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);   // fetch + store all core files
    })
  );
  self.skipWaiting();                      // activate this worker immediately
});

/* ACTIVATE — delete any old caches from previous versions.*/
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          /* Remove caches that are not the current version. */
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();                    // take control of open pages
});

/* FETCH — respond from cache first, then fall back to the network. */
self.addEventListener("fetch", function (event) {
  /* Only handle GET requests (we never cache form posts, etc.). */
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      /* Return the cached copy if we have one, otherwise go to the network. */
      return cached || fetch(event.request).then(function (response) {
        /* Optionally cache newly fetched files (e.g. images) for next time. */
        return caches.open(CACHE_NAME).then(function (cache) {
          /* Only cache successful, same-origin responses.*/
          if (response.ok && event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, response.clone());
          }
          return response;                 // hand the response to the page
        });
      }).catch(function () {
        /* Network failed and nothing cached — fall back to the home page.*/
        return caches.match("./index.html");
      });
    })
  );
});
