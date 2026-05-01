/// <reference lib="webworker" />

const STATIC_CACHE = "phk-static-v2"; // immutable hashed Vite assets
const ASSETS_CACHE = "phk-assets-v2"; // images, fonts — revalidatable
const PAGES_CACHE = "phk-pages-v2"; // public page HTML + __data.json (2 min TTL)
const ALL_CACHES = [STATIC_CACHE, ASSETS_CACHE, PAGES_CACHE];

const PAGES_TTL_SECONDS = 120; // 2 minutes — short enough to limit stale user data exposure

// Routes where SW must NEVER cache (user-specific, auth, real-time)
const NEVER_CACHE_PREFIXES = ["/user", "/admin", "/staff", "/login", "/logout", "/store/successful"];

function isNeverCache(pathname) {
  return NEVER_CACHE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

// Install: precache the offline fallback page only
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS_CACHE).then((cache) => cache.addAll(["/favicon.png", "/offline.html"])));
  self.skipWaiting();
});

// Activate: delete stale cache buckets from previous SW versions
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((n) => !ALL_CACHES.includes(n)).map((n) => caches.delete(n)))));
  self.clients.claim();
});

// Message handler — used by the main thread to clear pages cache on logout
self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_PAGES_CACHE") {
    caches.delete(PAGES_CACHE).then(() => {
      event.ports[0]?.postMessage({ ok: true });
    });
  }
});

// Fetch: per-resource strategies
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const path = url.pathname;

  // 1. Vite hashed assets — cache-first (content-addressed, safe forever)
  if (path.startsWith("/_app/immutable/")) {
    event.respondWith(cacheFirst(STATIC_CACHE, event.request));
    return;
  }

  // 2. Font files — cache-first (fonts never change mid-session)
  if (/\.(woff2?|ttf|eot)$/.test(path)) {
    event.respondWith(cacheFirst(ASSETS_CACHE, event.request));
    return;
  }

  // 3. Image/icon assets — stale-while-revalidate (product images may change)
  if (/\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/.test(path)) {
    event.respondWith(staleWhileRevalidate(ASSETS_CACHE, event.request, Infinity));
    return;
  }

  // 4. Auth/admin/user routes — network-only, offline fallback for navigations
  if (isNeverCache(path)) {
    if (event.request.mode === "navigate") {
      event.respondWith(fetch(event.request).catch(() => caches.match("/offline.html").then((r) => r || new Response("Offline", { status: 503 }))));
    }
    return; // non-navigation requests just pass through
  }

  // 5. Public page HTML navigations — stale-while-revalidate with 2 min TTL
  if (event.request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(PAGES_CACHE, event.request, PAGES_TTL_SECONDS).catch(() => caches.match("/offline.html").then((r) => r || new Response("Offline", { status: 503 }))));
    return;
  }

  // 6. SvelteKit __data.json for public routes — stale-while-revalidate with 2 min TTL
  if (path.includes("/__data.json")) {
    event.respondWith(staleWhileRevalidate(PAGES_CACHE, event.request, PAGES_TTL_SECONDS));
    return;
  }

  // 7. Everything else — pass through (API calls, etc.)
});

async function cacheFirst(cacheName, request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Stale-while-revalidate with TTL check.
 * Serves cached response if it's within maxAgeSeconds, then refreshes in background.
 * If cache is expired, waits for network (but still triggers background refresh).
 */
async function staleWhileRevalidate(cacheName, request, maxAgeSeconds) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });

  if (cached) {
    const cachedDate = new Date(cached.headers.get("date") || 0);
    const ageSeconds = (Date.now() - cachedDate.getTime()) / 1000;
    if (ageSeconds < maxAgeSeconds) {
      networkFetch.catch(() => {}); // refresh in background, don't await
      return cached;
    }
    // Expired — wait for network but serve stale if network fails
    return networkFetch.catch(() => cached);
  }

  return networkFetch;
}

// Push notifications (unchanged from current implementation)
self.addEventListener("push", (event) => {
  let data = {
    title: "New Notification",
    body: "You have a new message",
    icon: "/favicon.png",
    badge: "/favicon.png",
    tag: "phk-chatbot-notification",
    data: {
      url: "/chat",
    },
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = {
        ...data,
        ...payload,
      };
    } catch (e) {
      // If not JSON, treat as plain text
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || "/favicon.png",
    badge: data.badge || "/favicon.png",
    tag: data.tag || "phk-chatbot-notification",
    data: data.data || { url: "/chat" },
    vibrate: data.type === "urgent" ? [200, 100, 200] : [100],
    requireInteraction: data.type === "urgent",
    actions: [
      {
        action: "open",
        title: "Open",
      },
      {
        action: "dismiss",
        title: "Dismiss",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click event (unchanged from current implementation)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") {
    return;
  }

  const urlToOpen = event.notification.data?.url || "/chat";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          // Navigate to the URL and focus
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      // Open new window if none exists
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    }),
  );
});
