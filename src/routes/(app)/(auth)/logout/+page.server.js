import { api } from "$lib/server/api-helpers";
import { redirect } from "@sveltejs/kit";
import { clearUserCache } from "$lib/server/cache-store";
import { VITE_SESSION_NAME } from "$env/static/private";
import { logWithLocation as serverLog } from "$lib/server/dev-logger";

export async function load(event) {
  const apiSessionKey = event.locals.session.data?.api_session;

  const response = await api({
    method: "post",
    resource: "logout",
    event,
  });

  if (!response?.ok) {
    serverLog("Backend logout failed — proceeding with local cleanup", { status: response?.status });
  }

  if (apiSessionKey) clearUserCache(apiSessionKey);
  await event.locals.session.destroy();
  event.cookies.delete(VITE_SESSION_NAME, { path: "/" });

  redirect(307, "/");
}
