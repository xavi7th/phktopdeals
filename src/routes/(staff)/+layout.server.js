import { redirect } from "@sveltejs/kit";

export const prerender = false;
export const ssr = false;

export async function load({ locals }) {
  const user = locals.user;

  // Check if user is authenticated and has staff role
  if (!user) {
    throw redirect(303, "/login");
  }

  // Check for staff role - either direct role or admin
  const hasStaffRole = user.roles?.some((r) => r.name === "staff" || r.name === "admin");

  if (!hasStaffRole) {
    throw redirect(303, "/");
  }

  return {
    user,
  };
}
