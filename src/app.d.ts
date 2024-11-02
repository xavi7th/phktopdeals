// See https://kit.svelte.dev/docs/types#app

import type { AppUser } from '$lib/types';
import type { DevicePayload } from 'sveltekit-device-detector';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user: AppUser | {};
      session: string | undefined;
      deviceType: DevicePayload;
      deviceName?: string;
    }
		interface PageData {
      deviceType?: DevicePayload;
      deviceName?: string;
    }
		interface ActionData {
      message: string
    }
    namespace Superforms {
      type Message = {
        type: 'grey' | 'success' | 'info' | 'error' | 'warning' | 'white',
        msg: string
      }
    }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
