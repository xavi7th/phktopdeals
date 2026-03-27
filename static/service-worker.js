/// <reference lib="webworker" />

const CACHE_NAME = "phk-chatbot-v1";
const STATIC_ASSETS = ["/", "/favicon.png"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    }),
  );
  self.clients.claim();
});

// Push event - handle incoming push notifications
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

// Notification click event
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

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseClone = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request);
      }),
  );
});
