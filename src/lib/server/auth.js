import { error } from "@sveltejs/kit";

/**
 * Assert the current user is an admin. Throws 403 if not.
 * Use as a secondary guard in admin load functions and form actions.
 *
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export function assertAdmin(event) {
  if (!event.locals.session.data?.user?.is_admin) {
    error(403, "Unauthorized");
  }
}
