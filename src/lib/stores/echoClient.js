import Echo from "laravel-echo";
import Pusher from "pusher-js";

const REVERB_CONFIG = {
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST ?? "ws://localhost:6001",
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 6001,
  forceTLS: false,
  enabledTransports: ["ws"],
};

let echoClient = null;

export const getEchoClient = (): Echo => {
  if (!echoClient) {
    echoClient = new Echo(REVERB_CONFIG);
  }
  return echoClient;
};

export const disconnectEcho = (): void => {
  if (echoClient) {
    echoClient.disconnect();
    echoClient = null;
  }
};
