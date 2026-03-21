import { json, error } from "@sveltejs/kit";

export async function GET({ locals }) {
  const user = locals.session.data?.user;
  if (!user?.email) throw error(401, "Unauthenticated.");
  return json(user);
}
