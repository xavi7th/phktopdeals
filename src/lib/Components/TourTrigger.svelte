<script lang="ts">
  interface Props {
    label?: string;
    startTour: () => void;
  }
  let { label = 'Take a Tour', startTour }: Props = $props();
</script>

<button
  class="tour-trigger inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md border border-transparent bg-brand-400 px-4 py-2.5 text-sm font-normal text-gray-800 shadow-md hover:bg-brand-500 focus:bg-brand-500 focus:outline-none"
  onclick={startTour}
  aria-label="Start guided tour"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
  {label}
</button>

<style>
  .tour-trigger {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 50;
  }
</style>
