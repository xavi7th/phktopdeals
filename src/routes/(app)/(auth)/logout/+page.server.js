import { api } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";
import { clearUserCache } from "../../../../hooks.server.js";
import { VITE_SESSION_NAME } from "$env/static/private";

export async function load(event) {
  const apiSessionKey = event.locals.session.data?.api_session;

  const response = await api({
    method: "post",
    resource: "logout",
    event,
  });

  if (!response?.ok) {
    console.error("Backend logout failed:", response?.status, "— proceeding with local cleanup");
  }

  if (apiSessionKey) clearUserCache(apiSessionKey);
  await event.locals.session.destroy();
  event.cookies.delete(VITE_SESSION_NAME, { path: "/" });

  redirect(307, "/");
}
