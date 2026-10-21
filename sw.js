/**
 * MecanIQ - Service Worker PWA
 * Assure le fonctionnement hors-ligne complet et la mise en cache dynamique des ressources
 */

const CACHE_NAME = "mecaniq-pwa-v3.2.0";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./vehicles.json",
  "./css/style.css",
  "./js/app.js",
  "./js/db.js",
  "./js/api.js",
  "./js/supabase.js",
  "./js/data/initial-vehicles.js",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable.png"
];

// Installation : pré-remplissage du cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).then(() => {
        return self.skipWaiting();
      });
    })
  );
});

// Activation : suppression des anciens caches obsolètes
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // 1. Les appels vers l'API Gemini ou des APIs externes ne doivent pas être cachés par le SW
  // (Leur persistance est gérée au niveau applicatif dans IndexedDB)
  if (
    requestUrl.origin.includes("googleapis.com") ||
    requestUrl.pathname.includes("/v1beta/")
  ) {
    return;
  }

  // 2. Requêtes statiques de l'application : stratégie Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Mettre à jour le cache si la réponse est valide
            if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // En cas d'échec réseau, si on cherche une page de navigation, retourner index.html
            if (event.request.mode === "navigate") {
              return cache.match("./index.html");
            }
          });

        // Retourner la réponse en cache immédiatement si elle existe, sinon attendre le réseau
        return cachedResponse || fetchPromise;
      });
    })
  );
});
