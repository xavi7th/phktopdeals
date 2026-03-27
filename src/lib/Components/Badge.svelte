<script>
  /**
   * Badge component - displays numeric count of unviewed conversations
   * @prop {number} count - Number to display
   * @prop {boolean} pulse - Whether to show pulse animation (when count increases)
   */
  export let count = 0;
  export let pulse = false;

  $: displayCount = count > 99 ? "99+" : count;
  $: showPulse = pulse && count > 0;
</script>

{#if count > 0}
  <span class="relative inline-flex">
    <span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-medium text-white" class:animate-pulse={showPulse}>
      {displayCount}
    </span>
    {#if showPulse}
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
    {/if}
  </span>
{/if}
