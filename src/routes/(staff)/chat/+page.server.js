import { fetchStaffInbox, fetchStaffList } from "$lib/api/staffApi.js";

export const prerender = false;
export const ssr = false;

export async function load() {
  // Fetch initial inbox data
  const inboxResult = await fetchStaffInbox();
  const staffListResult = await fetchStaffList();

  return {
    inbox: inboxResult?.data || null,
    staffList: staffListResult?.data?.staff || [],
  };
}
