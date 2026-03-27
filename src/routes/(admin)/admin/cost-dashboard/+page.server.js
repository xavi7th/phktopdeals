import { assertAdmin } from "$lib/server/auth";
import { api } from "$lib/helpers";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  assertAdmin(event);

  const from = event.url.searchParams.get("from") || "";
  const to = event.url.searchParams.get("to") || "";
  const period = event.url.searchParams.get("period") || "7d";

  let resource = `admin/ai/costs?period=${period}`;
  if (from) resource += `&from=${from}`;
  if (to) resource += `&to=${to}`;

  const costsPromise = api({ resource, event }).then((res) => res.json());

  return {
    costData: costsPromise,
    from,
    to,
    period,
  };
}
