import { Echo } from 'laravel-echo';
import Pusher from 'pusher-js';

// Reverb configuration
const reverbConfig = {
  broadcaster: 'reverb',
  key: import.meta.reverb?.app_key,
  wsHost: import.meta.reverb?.host ?? 'ws://localhost:6001',
  wsPort: import.meta.reverb?.port ?? 6001,
  forceTLS: false,
  enabledTransports: ['ws'],
});

const echoClient = new Echo({
  ...reverbConfig,
});

export const echoClient;
