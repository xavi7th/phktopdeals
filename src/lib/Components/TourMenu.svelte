<script lang="ts">
  import { page } from "$app/stores";
  import { customerTours, staffTours } from "$lib/tours";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { helpCircle } from "$lib/Components/iconPaths";

  interface TourEntry {
    id: string;
    label: string;
    start: () => void;
  }

  let open = $state(false);

  let tours = $derived<TourEntry[]>(
    $page.url.pathname.startsWith("/admin") || $page.url.pathname.startsWith("/staff")
      ? staffTours
      : customerTours
  );

  function handleTourStart(start: () => void) {
    open = false;
    start();
  }

  function toggleDropdown() {
    open = !open;
  }
</script>

<div class="hs-dropdown relative inline-flex [--placement:bottom-right]">
  <button
    id="hs-tour-menu-dropdown"
    type="button"
    onclick={toggleDropdown}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-label="Guided tours"
    class="inline-flex size-12 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
    <SvgIcon class="size-5 shrink-0" svgHeight={24} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" slot={helpCircle} />
  </button>

  {#if open}
    <!-- Backdrop to close -->
    <button
      type="button"
      class="fixed inset-0 z-10 cursor-default"
      onclick={() => (open = false)}
      aria-label="Close menu"
      tabindex="-1"></button>
  {/if}

  <div
    class="hs-dropdown-menu z-20 mt-2 hidden min-w-64 cursor-pointer divide-y divide-gray-200 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
    role="menu"
    aria-labelledby="hs-tour-menu-dropdown"
    class:hidden={!open}>
    <div class="rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-neutral-700">
      <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Guided Tours</p>
      <p class="text-xs text-gray-500 dark:text-neutral-500">
        {$page.url.pathname.startsWith("/admin") || $page.url.pathname.startsWith("/staff")
          ? "Staff & Admin"
          : "Customer"}{" "}journeys
      </p>
    </div>
    <div class="p-1.5">
      {#each tours as tour}
        <button
          type="button"
          onclick={() => handleTourStart(tour.start)}
          class="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {tour.label}
        </button>
      {/each}
    </div>
  </div>
</div>
