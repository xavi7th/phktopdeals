import { api } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";
import { VITE_SESSION_NAME } from "$env/static/private";

export async function load(event) {
  await api({
    method: "post",
    resource: "logout",
    event,
  });

  await event.locals.session.destroy();
  event.cookies.delete(VITE_SESSION_NAME, { path: "/" });

  redirect(307, "/");
}
