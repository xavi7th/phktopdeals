<script>
  import { navigating } from '$app/stores';
  import Header from '$partials/user/Header.svelte';
  import { open } from '$lib/Components/iconPaths.js';
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import Sidebar from '$partials/user/Sidebar.svelte';
  import PageSkeleton from '$lib/Components/PageSkeleton.svelte';

  export let data;

  const { user_routes, user } = data;

</script>

<section class="dark:bg-neutral-900">
  <Header {user} />

  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
    <div class="flex items-center py-2">
      <button type="button" class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <SvgIcon class="shrink-0 size-4" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={open}/>
      </button>

      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800 dark:text-neutral-400">
          User Dashboard
        </li>
      </ol>
    </div>
  </div>

  <div class="grid grid-cols-5 relative">
    <Sidebar {user_routes}/>

    {#if $navigating}
      <PageSkeleton />
    {:else}
      <slot></slot>
    {/if}
  </div>

</section>
