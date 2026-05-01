import { safeApiCall } from "$lib/safeApi.js";
import { trackedFetch } from "$lib/api/clientFetch.js";

/**
 * Fetch paginated list of archived conversations
 */
export async function fetchArchives(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `/api/admin/chat/archives${queryString ? "?" + queryString : ""}`;

  return safeApiCall(
    () =>
      trackedFetch(url, {
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to fetch archives",
  );
}

/**
 * Fetch single archived conversation by ID
 */
export async function fetchArchive(conversationId) {
  return safeApiCall(
    () =>
      trackedFetch(`/api/admin/chat/archives/${conversationId}`, {
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to fetch archive",
  );
}

/**
 * Trigger manual archive batch
 */
export async function triggerManualArchive(batchSize = 100) {
  return safeApiCall(
    () =>
      trackedFetch("/api/admin/chat/archives/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batch: batchSize }),
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to trigger manual archive",
  );
}
