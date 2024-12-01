import { type } from "arktype";
import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { AppUserDefaults, AppUserSchema } from "$lib/schemas";
import { message, superValidate, fail, setError } from "sveltekit-superforms";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(event.locals.user, arktype(AppUserSchema, { defaults: event.locals.user }));

  event.setHeaders({
    "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
  });

  return {
    form,
    /** @type { import('$lib/types').AppUser } */
    user: event.locals.user,
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  /** @param {import('@sveltejs/kit').RequestEvent} event */
  updateProfile: async (event) => {
    const form = await superValidate(event, arktype(AppUserSchema, { defaults: AppUserDefaults }));

    if (!form.valid) {
      return fail(422, { form });
    }

    const formData = new FormData();

    for (let dt of Object.entries(form.data)) {
      formData.append(dt[0], dt[1]);
    }

    formData.append("_method", "PUT");

    const res = await api({
      method: "post",
      resource: "user",
      data: formData,
      event,
      toJSON: false,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0], errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }

      return message(form, { type: "error", msg: "There are errors in your form! Check them and try again." }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    event.locals.user = (await res.json()).data;

    return message(form, { type: "success", msg: "Profile updated successfully!" });
  },

  updatePassword: async (event) => {
    const form = await superValidate(
      event,
      arktype(
        type({
          current_password: type("string"),
          password: type("string>7"),
          password_confirmation: type("string").atLeastLength(8),
        }),
        { defaults: { password: "", current_password: "", password_confirmation: "" } },
      ),
    );

    if (!form.valid) {
      return fail(422, { form });
    }

    const res = await api({
      method: "PATCH",
      resource: "user/password",
      data: form.data,
      event,
    });

    //Pre populate the form data with user details
    form.data = { ...form.data, ...event.locals.user };

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0], errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }

      return message(form, { type: "error", msg: "There are errors in your form! Check them and try again." }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    return message(form, { type: "success", msg: "Password changed successfully!" });
  },
};
