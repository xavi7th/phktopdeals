import { writable } from "svelte/store";

function createAiService() {
  const canRebuild = writable(true);
  const timeUntilRebuild = writable(null);
  const isRebuilding = writable(false);
  const lastStats = writable(null);

  return {
    canRebuild,
    timeUntilRebuild,
    isRebuilding,
    lastStats,

    async checkRebuildStatus() {
      try {
        const response = await fetch("/api/admin/ai/status");
        const data = await response.json();
        canRebuild.set(data.can_rebuild);
        timeUntilRebuild.set(data.time_until_rebuild);
        return data;
      } catch (error) {
        console.error("Failed to check rebuild status:", error);
        return null;
      }
    },

    async rebuild() {
      isRebuilding.set(true);
      try {
        const response = await fetch("/api/admin/ai/rebuild", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        lastStats.set(data);
        if (data.success) {
          canRebuild.set(false);
          // Set cooldown timer (4 hours)
          const fourHours = 4 * 60 * 60 * 1000;
          setTimeout(() => {
            canRebuild.set(true);
          }, fourHours);
        }
        return data;
      } catch (error) {
        console.error("Rebuild failed:", error);
        return { success: false, error: error.message };
      } finally {
        isRebuilding.set(false);
      }
    },
  };
}

export const aiService = createAiService();
