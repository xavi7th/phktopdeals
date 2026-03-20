import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.session.data.recently_purchased || !locals.session.data.recently_purchased?.success) {
    redirect(303, "/");
  }

  let recently_purchased = locals.session.data.recently_purchased.data;
  let message = locals.session.data.recently_purchased.metadata.message;

  await locals.session.update(async ({ recently_purchased }) => ({ recently_purchased: false }));

  return {
    message,
    recently_purchased,
    user: locals.session.data?.user,
  };
}
