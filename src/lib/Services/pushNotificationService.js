import { browser } from "$app/environment";

const API_BASE = "/api/v1";

/** @type {string | null} */
let vapidPublicKey = null;

/**
 * Get the VAPID public key from the server
 * @returns {Promise<string>}
 */
async function getVapidPublicKey() {
  if (vapidPublicKey) {
    return vapidPublicKey;
  }

  const response = await fetch(`${API_BASE}/staff/push/public-key`);
  if (!response.ok) {
    throw new Error("Failed to get VAPID public key");
  }

  const data = await response.json();
  vapidPublicKey = data.public_key;
  return vapidPublicKey;
}

/**
 * Check if push notifications are supported
 * @returns {boolean}
 */
export function isSupported() {
  return browser && "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * Check current permission status
 * @returns {Promise<NotificationPermission>}
 */
export async function getPermissionStatus() {
  if (!browser) {
    return "denied";
  }
  return Notification.permission;
}

/**
 * Request notification permission
 * @returns {Promise<NotificationPermission>}
 */
export async function requestPermission() {
  if (!browser) {
    return "denied";
  }

  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Convert base64 string to Uint8Array for push subscription
 * @param {string} base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Subscribe to push notifications
 * @returns {Promise<PushSubscription|null>}
 */
export async function subscribe() {
  if (!isSupported()) {
    console.warn("Push notifications not supported");
    return null;
  }

  const permission = await getPermissionStatus();
  if (permission !== "granted") {
    const newPermission = await requestPermission();
    if (newPermission !== "granted") {
      console.warn("Push notification permission denied");
      return null;
    }
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    console.log("Service Worker registered:", registration);

    // Get VAPID public key
    const publicKey = await getVapidPublicKey();

    // Subscribe to push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    // Send subscription to server
    await saveSubscription(subscription);

    console.log("Push subscription successful");
    return subscription;
  } catch (error) {
    console.error("Push subscription failed:", error);
    return null;
  }
}

/**
 * Save push subscription to server
 * @param {PushSubscription} subscription
 * @returns {Promise<boolean>}
 */
async function saveSubscription(subscription) {
  const subscriptionData = {
    endpoint: subscription.endpoint,
    public_key: subscription.getKey("p256dh")
      ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh"))))
      : null,
    auth_token: subscription.getKey("auth")
      ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth"))))
      : null,
    expires_at: subscription.expirationTime
      ? new Date(subscription.expirationTime).toISOString()
      : null,
  };

  const response = await fetch(`${API_BASE}/staff/push/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(subscriptionData),
  });

  return response.ok;
}

/**
 * Unsubscribe from push notifications
 * @returns {Promise<boolean>}
 */
export async function unsubscribe() {
  if (!browser) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      return false;
    }

    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      return true; // Already unsubscribed
    }

    // Remove from server
    await fetch(`${API_BASE}/staff/push/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });

    // Unsubscribe from push manager
    await subscription.unsubscribe();

    console.log("Push unsubscribed successfully");
    return true;
  } catch (error) {
    console.error("Push unsubscribe failed:", error);
    return false;
  }
}

/**
 * Check if already subscribed
 * @returns {Promise<boolean>}
 */
export async function isSubscribed() {
  if (!browser) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      return false;
    }

    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}

/**
 * Request push permission after first customer message
 * Called from chat component after first message is sent
 */
export async function requestPermissionAfterFirstMessage() {
  const permission = await getPermissionStatus();

  // Only prompt if not already granted or denied
  if (permission === "default") {
    await subscribe();
  }
}
