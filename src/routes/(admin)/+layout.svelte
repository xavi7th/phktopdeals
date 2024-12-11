<script>
	import { navigating } from '$app/stores';
	import Header from '$partials/admin/Header.svelte';
	import { open } from '$lib/Components/iconPaths.js';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import Sidebar from '$partials/admin/Sidebar.svelte';
  import Brand from '$partials/brands/BrandModal.svelte';
	import PageSkeleton from '$lib/Components/PageSkeleton.svelte';

  export let data;

  const { admin_routes, brandForm, brands } = data;

  let title = "";
</script>

<section class="dark:bg-neutral-900">
  <Header />

  <div class="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 sm:px-6 lg:hidden lg:px-8 dark:border-neutral-700 dark:bg-neutral-800">
    <div class="flex items-center py-2">
      <button
        type="button"
        class="flex size-8 items-center justify-center gap-x-2 rounded-lg border border-gray-200 text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-application-sidebar"
        aria-label="Toggle navigation"
        data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <SvgIcon class="size-4 shrink-0" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={open} />
      </button>

      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800 dark:text-neutral-400">Admin Dashboard</li>
      </ol>
    </div>
  </div>

  <div class="relative grid grid-cols-5">
    <Sidebar {admin_routes} />

    {#if $navigating}
      <PageSkeleton />
    {:else}
      <div class="col-span-5 space-y-4 p-4 sm:space-y-6 sm:p-6 lg:col-span-4 lg:col-start-2">
        <slot></slot>
      </div>
    {/if}
  </div>
</section>

<Brand {title} {brands} form={brandForm} />
