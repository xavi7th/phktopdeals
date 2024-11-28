<script>
  import { page } from '$app/stores';
	import Logo from '$lib/Components/Logo.svelte';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { breadcrumb, crescentMoon, sunRays, x } from '$lib/Components/iconPaths';

  /** @type {import('$lib/types').NavData[]} */
  const main_nav = [
    {
      name: 'Gift Cards',
      url: '/store/products/gift-cards'
    },
    {
      name: 'Games',
      url: '/store/products/games'
    },
    {
      name: 'eSim',
      url: '/store/products/e-sims'
    },
    {
      name: 'Top Up',
      url: '/store/products/top-up'
    },
  ]

 $: ({ user } = $page.data)
</script>

<header class="fixed z-30 flex w-full flex-wrap bg-black/40 py-4 text-sm backdrop-blur sm:flex-nowrap sm:justify-start dark:bg-neutral-900 dark:sm:bg-transparent">
  <nav class="mx-auto flex w-full max-w-[85rem] basis-full flex-wrap items-center justify-between sm:px-4">
    <Logo />

    <div class="flex items-center gap-x-2 sm:order-4 sm:hidden">
      <button
        type="button"
        class="hs-collapse-toggle relative flex size-7 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 sm:hidden dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        id="hs-navbar-alignment-collapse"
        aria-expanded="false"
        aria-controls="hs-navbar-alignment"
        aria-label="Toggle navigation"
        data-hs-collapse="#hs-navbar-alignment"
      >
        <SvgIcon class="shrink-0 size-4 hs-collapse-open:hidden" slot={breadcrumb}/>
        <SvgIcon class="shrink-0 size-4 hs-collapse-open:block hidden" slot={x}/>
        <span class="sr-only">Toggle</span>
      </button>
      {#if user?.full_name}
        <a href="/logout" data-sveltekit-reload class="mr-1 inline-flex items-center gap-x-3 rounded-full bg-gray-800 px-5 py-3 text-xs font-medium text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none dark:bg-white dark:text-neutral-800">Logout</a>
      {:else}
        <a href="/login" class="inline-flex mr-1 items-center gap-x-3 rounded-full bg-brand-800 px-5 py-3 text-xs font-medium text-white hover:bg-brand-900 focus:bg-brand-900 focus:outline-none dark:bg-brand-700 dark:text-white">Login</a>
        <a href="/login#register" class="inline-flex sm:hidden mr-1 items-center gap-x-3 rounded-full bg-gray-800 px-5 py-3 text-xs font-bold tracking-tighter text-white  hover:bg-gray-900 focus:bg-gray-900 focus:outline-none dark:bg-white dark:text-brand-700 dark:hover:text-white">Sign Up</a>
      {/if}
    </div>

    <div
      id="hs-navbar-alignment"
      class="hs-collapse hidden grow basis-full space-x-0.5 overflow-hidden rounded-0 sm:rounded-full border border-gray-200 transition-all duration-300 sm:order-2 sm:block sm:grow-0 sm:basis-auto dark:border-white/20 bg-gray-200"
      aria-labelledby="hs-navbar-alignment-collapse"
    >
      <div class="flex items-center justify-evenly sm:gap-5 sm:flex-row sm:items-center divide-y sm:divide-y-0">
        {#each main_nav as nav_item}
          <a class="p-3.5 border-gray-400/60 font-bold tracking-tighter text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-700 dark:hover:text-neutral-900 dark:focus:text-neutral-900 dark:font-semibold" href="{nav_item.url}" aria-current="{$page.url.pathname.includes(nav_item.url) ? 'page' : undefined}">{nav_item.name}</a>
        {/each}
        {#if user?.full_name}
          <a class="hidden sm:block mr-1 inline-flex items-center gap-x-3 sm:rounded-full bg-gray-800 px-5 py-3 text-xs font-bold tracking-tighter text-white  hover:bg-gray-900 focus:bg-gray-900 focus:outline-none dark:bg-white dark:text-neutral-800 dark:hover:text-white" href="/logout" data-sveltekit-reload>Logout</a>
        {:else}
          <a class="hidden sm:block mr-1 inline-flex items-center gap-x-3 sm:rounded-full bg-brand-600 px-5 py-3 text-xs font-bold tracking-tighter text-white  hover:bg-brand-900 focus:bg-brand-900 focus:outline-none dark:bg-white dark:text-brand-600 dark:hover:text-white" href="/login">Login</a>
          <a class="hidden sm:block mr-1 inline-flex items-center gap-x-3 sm:rounded-full bg-gray-800 px-5 py-3 text-xs font-bold tracking-tighter text-white  hover:bg-gray-900 focus:bg-gray-900 focus:outline-none dark:bg-white dark:text-neutral-800 dark:hover:text-white" href="/login#register">Sign Up</a>
        {/if}
      </div>
    </div>

    <div class="hidden items-center rounded-full border border-gray-200 p-0.5 sm:order-3 sm:flex dark:border-white/20 bg-gray-200 dark:bg-neutral-800">
      <button
        type="button"
        class="hs-dark-mode size-11 rounded-full font-medium text-gray-800 hover:bg-white/75 focus:bg-white/75 focus:outline-none hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        data-hs-theme-click-value="dark"
      >
        <span class="group inline-flex size-9 shrink-0 items-center justify-center">
          <SvgIcon class="shrink-0 size-4" slot={crescentMoon}/>
        </span>
      </button>

      <button
        type="button"
        class="hs-dark-mode size-11 hidden rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        data-hs-theme-click-value="light"
      >
        <span class="group inline-flex size-9 shrink-0 items-center justify-center">
          <SvgIcon class="shrink-0 size-4" slot={sunRays}/>
        </span>
      </button>

      {#if user?.full_name}
        <a href={user.is_admin ? '/admin/dashboard' : '/user/order'} class="size-11 inline-flex justify-center items-center gap-x-2 ml-2 bg-gray-100 dark:bg-black rounded-full border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <img class="shrink-0 size-10 rounded-full" src="{user.avatar_url}" alt="Avatar">
        </a>
      {/if}
    </div>
  </nav>
</header>

<style>
  a[aria-current='page'] {
    color: theme('colors.brand.500');
  }
</style>
