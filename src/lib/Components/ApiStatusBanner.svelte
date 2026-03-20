<script>
  import { apiStatus, shouldShowBanner } from "$lib/stores/apiStatus";
  import { fly } from "svelte/transition";

  let dismissed = $state(false);

  function retry() {
    dismissed = false;
    apiStatus.reset();
    location.reload();
  }

  function dismiss() {
    dismissed = true;
  }

  // Reset dismissed state when status changes
  $effect(() => {
    if ($apiStatus.status === "online") {
      dismissed = false;
    }
  });
</script>

{#if $shouldShowBanner && !dismissed}
  <div
    class="fixed left-0 right-0 top-0 z-[200] flex items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-medium shadow-md"
    class:bg-yellow-100={$apiStatus.status === "degraded"}
    class:bg-red-100={$apiStatus.status === "offline"}
    class:text-yellow-800={$apiStatus.status === "degraded"}
    class:text-red-800={$apiStatus.status === "offline"}
    class:border-b={$apiStatus.status !== "online"}
    class:border-yellow-300={$apiStatus.status === "degraded"}
    class:border-red-300={$apiStatus.status === "offline"}
    in:fly={{ y: -50, duration: 300 }}
    out:fly={{ y: -50, duration: 300 }}
    role="alert"
    aria-live="polite">
    {#if $apiStatus.status === "degraded"}
      <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <span>Some features may be temporarily slow or unavailable.</span>
    {:else}
      <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <span>Our service is temporarily unavailable. Please try again later.</span>
    {/if}

    <button
      onclick={retry}
      class="ml-3 rounded px-2 py-1 text-xs font-semibold underline-offset-2 transition hover:underline"
      class:bg-yellow-200={$apiStatus.status === "degraded"}
      class:bg-red-200={$apiStatus.status === "offline"}
      class:hover:bg-yellow-300={$apiStatus.status === "degraded"}
      class:hover:bg-red-300={$apiStatus.status === "offline"}>
      Retry
    </button>

    <button onclick={dismiss} class="ml-2 rounded p-1 opacity-60 transition hover:opacity-100" aria-label="Dismiss notification">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
{/if}
