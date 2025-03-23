import { api } from '$lib/helpers.js';

export async function load(event) {
  const fetchDashboardData = async () => {
    const res = await api({
      method: "get",
      resource: "admin",
      event,
    });

    return await res?.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    /** @type { Promise< { data: { users: { full_name: string; email: string; }[]; orders: { description: string; is_processed: boolean; payment_id: string; status: string; transaction_date: string; }[]; } } > } */
    transactions: noJS ? await fetchDashboardData() : fetchDashboardData(),
  };
}
