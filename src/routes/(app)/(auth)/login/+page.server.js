import { api } from "$lib/helpers";
import { redirect, fail } from "@sveltejs/kit";

export async function load(event) {
  if (!event.locals.session) {
    await api({
      method: "get",
      resource: "sanctum/csrf-cookie",
      toBaseDomain: true,
      event,
    });
  }

  event.setHeaders({
    "Cache-Control": "max-age=604800, stale-while-revalidate=86400, immutable",
  });

  return {
    message: event.url.searchParams.has("verification") ? "Your email account has been verified." : undefined,
  };
}

export const actions = {
  login: async (event) => {
    const form = await event.request.formData();

    const response = await api({
      method: "post",
      resource: "login",
      data: {
        email: form.has("login-email") ? form.get("login-email") : undefined,
        password: form.has("login-password") ? form.get("login-password") : undefined,
        remember: form.has("remember") ? form.get("remember") : false,
        device_name: event.locals.deviceName,
      },
      event,
    });

    if (response?.status == 422) {
      return fail(response?.status || 400, await response?.json());
    }

    if (response?.status == 419) {
      return fail(response?.status || 419, { message: "Page has expired. Please reload and try again." });
    }

    if (!response?.ok) {
      return fail(response?.status || 500, { message: response?.statusText || "An error occurred while processing your request" });
    }

    /**
     * @hack user was already logged in, logout so they can retry again since we cannot determine if this is a user or an admin
     */
    if (response?.status == 205) {
      redirect(302, "/logout");
    }

    if (response?.status == 200 || response?.status == 201) {
      await event.locals.session.update(async ({ user }) => ({ user: (await response?.json())?.user || {} }));

      if (event.locals.session.data?.user?.is_admin) {
        redirect(302, "/admin/dashboard");
      }

      redirect(302, "/");
    }
  },

  register: async (event) => {
    const form = await event.request.formData();

    const response = await api({
      method: "post",
      resource: "register",
      data: {
        full_name: form.has("full_name") ? form.get("full_name") : undefined,
        email: form.has("register-email") ? form.get("register-email") : undefined,
        password: form.has("register-password") ? form.get("register-password") : undefined,
        password_confirmation: form.has("password_confirmation") ? form.get("password_confirmation") : undefined,
        remember: form.has("remember") ? form.get("remember") : false,
        device_name: event.locals.deviceName,
      },
      event,
    });

    if (response?.status == 422) {
      return fail(response?.status || 400, await response?.json());
    }

    if (response?.status == 419) {
      return fail(response?.status || 419, { message: "Page has expired. Please reload and try again." });
    }

    if (!response?.ok) {
      return fail(response?.status || 500, { message: response?.statusText || "An error occurred while processing your request", body: await response?.text() });
    }

    if (response?.status == 201) {
      throw redirect(302, "/");
    }
  },
};
