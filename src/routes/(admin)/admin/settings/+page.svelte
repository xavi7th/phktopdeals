<script>
  import { aiService } from "$lib/Services/aiService";
  import { onMount } from "svelte";

  let { data } = $props();

  let canRebuild = $state(data.canRebuild);
  let isRebuilding = $state(false);
  let lastStats = $state(null);
  let countdown = $state("");
  let rebuildMessage = $state("");
  let rebuildError = $state("");

  let countdownInterval;

  onMount(() => {
    // Start countdown if rebuild not available
    if (data.timeUntilRebuild) {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  });

  function updateCountdown() {
    if (!data.timeUntilRebuild) return;

    const now = new Date();
    const target = new Date(data.timeUntilRebuild);
    const diff = target - now;

    if (diff <= 0) {
      canRebuild = true;
      countdown = "";
      clearInterval(countdownInterval);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown = `${hours}h ${minutes}m ${seconds}s`;
  }

  async function handleRebuild() {
    isRebuilding = true;
    rebuildMessage = "";
    rebuildError = "";

    try {
      const response = await fetch("/api/admin/ai/rebuild", {
        method: "POST",
      });
      const result = await response.json();

      if (result.success) {
        rebuildMessage = `Rebuild complete! Processed ${result.stats?.sources_processed || 0} sources, created ${result.stats?.chunks_created || 0} chunks.`;
        canRebuild = false;
        lastStats = result.stats;
        // Set cooldown display
        countdown = "4h 0m 0s";
      } else {
        rebuildError = result.error || "Rebuild failed";
      }
    } catch (error) {
      rebuildError = error.message;
    } finally {
      isRebuilding = false;
    }
  }
</script>

<div class="space-y-6 p-4 sm:space-y-8 sm:p-6">
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-neutral-200">Settings</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">Manage application settings and configurations</p>
  </div>

  <!-- AI Knowledge Base Section -->
  <div class="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">AI Knowledge Base</h2>
      <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">Rebuild the AI knowledge base from Products, FAQs, and Policies.</p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-1">
        {#if countdown && !canRebuild}
          <span class="text-sm text-gray-500 dark:text-neutral-400">Next rebuild available in:</span>
          <span class="font-mono text-lg font-medium text-orange-600 dark:text-orange-400">
            {countdown}
          </span>
        {:else}
          <span class="text-sm text-green-600 dark:text-green-400">Ready to rebuild</span>
        {/if}
      </div>

      <button
        onclick={handleRebuild}
        disabled={!canRebuild || isRebuilding}
        class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-neutral-600 dark:disabled:text-neutral-400">
        {#if isRebuilding}
          <svg class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Rebuilding...
        {:else}
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rebuild Knowledge Base
        {/if}
      </button>
    </div>

    {#if rebuildMessage}
      <div class="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
        {rebuildMessage}
      </div>
    {/if}

    {#if rebuildError}
      <div class="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {rebuildError}
      </div>
    {/if}

    {#if lastStats}
      <div class="mt-4 grid grid-cols-3 gap-4 text-center">
        <div class="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
          <div class="text-2xl font-bold text-gray-800 dark:text-neutral-200">{lastStats.sources_processed || 0}</div>
          <div class="text-xs text-gray-500 dark:text-neutral-400">Sources</div>
        </div>
        <div class="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
          <div class="text-2xl font-bold text-gray-800 dark:text-neutral-200">{lastStats.chunks_created || 0}</div>
          <div class="text-xs text-gray-500 dark:text-neutral-400">Chunks</div>
        </div>
        <div class="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
          <div class="text-2xl font-bold text-gray-800 dark:text-neutral-200">{lastStats.chunks_skipped || 0}</div>
          <div class="text-xs text-gray-500 dark:text-neutral-400">Skipped</div>
        </div>
      </div>
    {/if}
  </div>
</div>
