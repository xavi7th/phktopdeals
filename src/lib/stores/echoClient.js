import { browser } from "$app/environment";

const REVERB_CONFIG = {
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST ?? "ws://localhost:6001",
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 6001,
  forceTLS: false,
  enabledTransports: ["ws"],
};

// Exponential backoff config
const RECONNECT_BASE_DELAY = 1000; // 1 second
const RECONNECT_MAX_DELAY = 30000; // 30 seconds
const RECONNECT_MAX_ATTEMPTS = 10;

let echoClient = null;
let reconnectAttempts = 0;
let reconnectTimeout = null;

export const getEchoClient = async () => {
  if (!browser) {
    return null;
  }

  if (!echoClient) {
    const { default: Echo } = await import("laravel-echo");
    const { default: Pusher } = await import("pusher-js");

    window.Pusher = Pusher;

    echoClient = new Echo({
      ...REVERB_CONFIG,
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            // Call the backend to authorize the channel
            fetch("/api/broadcasting/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || "",
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name,
              }),
            })
              .then((response) => response.json())
              .then((data) => callback(null, data))
              .catch((error) => callback(error, null));
          },
        };
      },
    });

    // Set up connection event handlers for exponential backoff
    echoClient.connector.pusher.connection.bind("connected", () => {
      console.log("Echo connected");
      reconnectAttempts = 0;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    });

    echoClient.connector.pusher.connection.bind("disconnected", () => {
      console.log("Echo disconnected");
      attemptReconnect();
    });

    echoClient.connector.pusher.connection.bind("error", (error) => {
      console.error("Echo error:", error);
      attemptReconnect();
    });
  }
  return echoClient;
};

function attemptReconnect() {
  if (!browser || reconnectAttempts >= RECONNECT_MAX_ATTEMPTS) {
    console.error("Max reconnect attempts reached");
    return;
  }

  // Calculate exponential backoff delay
  const delay = Math.min(RECONNECT_BASE_DELAY * Math.pow(2, reconnectAttempts), RECONNECT_MAX_DELAY);

  console.log(`Attempting reconnect in ${delay}ms (attempt ${reconnectAttempts + 1})`);

  reconnectTimeout = setTimeout(() => {
    reconnectAttempts++;
    if (echoClient && echoClient.connector.pusher) {
      echoClient.connector.pusher.connect();
    }
  }, delay);
}

export const disconnectEcho = () => {
  if (!browser) return;

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  reconnectAttempts = 0;

  if (echoClient) {
    echoClient.disconnect();
    echoClient = null;
  }
};

export const getReconnectAttempts = () => {
  return reconnectAttempts;
};

export const resetReconnectAttempts = () => {
  reconnectAttempts = 0;
};
