// See https://kit.svelte.dev/docs/types#app

import type { AppUser, UserOrder } from "$lib/types";
import type { Session } from "svelte-kit-cookie-session";
import type { DevicePayload } from "sveltekit-device-detector";
import { IStaticMethods } from "preline/src/static/interfaces";

type SessionData = {
  user: AppUser;
  recently_purchased: boolean;
  api_session: string | undefined;
};

// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      code: number;
      message: string | array;
    }
    interface Locals {
      user: AppUser | {};
      deviceType: DevicePayload;
      deviceName?: string;
      session: Session<SessionData>;
    }
    interface PageData {
      deviceType?: DevicePayload;
      deviceName?: string;
      message?: string;
      session?: SessionData;
      flash?: Superforms.Message;
    }
    interface ActionData {
      message: string;
    }
    namespace Superforms {
      type Message = {
        type: "grey" | "success" | "info" | "error" | "warning" | "white";
        msg: string;
      };
    }
    interface PageState {
      orderDetails: {
        order: UserOrder;
        user: AppUser;
        user_routes: import("$lib/types").AdminNavMenuItem[];
      };
    }
    interface Window {
      HSStaticMethods: IStaticMethods;
    }
    // interface Platform {}
  }
}

export {};
