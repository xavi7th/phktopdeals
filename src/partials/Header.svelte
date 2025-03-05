<script module>
  /** @type {import('$lib/types').NavData[]} */
  export const main_nav = [
    {
      name: "Gift Cards",
      url: "/store/products/gift-cards",
    },
    {
      name: "Games",
      url: "/store/products/games",
    },
    {
      name: "eSim",
      url: "/store/products/eSims",
    },
    {
      name: "Top Up",
      url: "/store/products/top-up",
    },
  ];
</script>

<script>
  import { page } from "$app/state";
  import { slide } from "svelte/transition";
  import { toCurrency } from "$lib/helpers";
  import Logo from "$lib/Components/Logo.svelte";
  import { beforeNavigate } from "$app/navigation";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { PUBLIC_VITE_BASE_DOMAIN } from "$env/static/public";
  import { crescentMoon, dollarCircle, sunRays, x } from "$lib/Components/iconPaths";

  let user = $derived(page.data?.user);

  let showMenu = $state(false);
  let { wallet_balance } = $props();

  beforeNavigate(() => (showMenu = false));
</script>

<header class="fixed z-30 w-full bg-transparent">
  <!-- lg+ -->
  <div class="border-b border-gray-200 bg-white drop-shadow-md dark:border-neutral-800 dark:bg-neutral-950/30 dark:shadow-gray-600">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="relative flex h-16 items-center justify-between lg:h-20">
        <div class="hidden lg:flex lg:items-center lg:space-x-10">
          <!-- <a href="#" title="" class="text-base font-medium text-black"> Features </a> -->
        </div>

        <div class="-ml-5 scale-75 lg:absolute lg:inset-y-5 lg:left-1/2 lg:-translate-x-1/2">
          <div class="flex-shrink-0">
            <Logo wide />
          </div>
        </div>

        <div class="inline-flex lg:hidden">
          {#if user?.full_name && !user?.is_admin}
            <a
              href="/user/transactions/top-up/choose-payment-method"
              title=""
              class="mr-4 inline-flex h-11 w-auto items-center justify-center justify-self-end rounded-full bg-gray-200 px-3 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300">
              <SvgIcon strokeWidth={1.5} class="size-5 shrink-0" slot={dollarCircle} />
              <span class="ml-2 text-sm font-bold tracking-tighter">{toCurrency(wallet_balance)}</span>
            </a>
          {/if}

          <button
            type="button"
            class="hs-dark-mode size-11 rounded-full font-medium text-gray-800 hover:bg-white/75 focus:bg-white/75 focus:outline-none hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            data-hs-theme-click-value="dark">
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="size-4 shrink-0" slot={crescentMoon} />
            </span>
          </button>

          <button
            type="button"
            class="hs-dark-mode hidden size-11 rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            data-hs-theme-click-value="light">
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="size-4 shrink-0" slot={sunRays} />
            </span>
          </button>

          <button
            type="button"
            class="ml-5 inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100/10 focus:bg-gray-100/10 lg:hidden dark:text-gray-200"
            onclick={() => (showMenu = !showMenu)}>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div class="hidden lg:flex lg:items-center lg:space-x-6">
          {#if user?.full_name}
            <a href="/user/orders" class="text-base font-medium tracking-tighter text-gray-700 hover:text-brand-600 dark:text-neutral-300">Dashboard</a>
            <a href="/logout" class="text-base font-medium tracking-tighter text-gray-700 hover:text-brand-600 dark:text-neutral-300" data-sveltekit-reload>Logout</a>
          {:else}
            <a href="/login#register" class="text-base font-medium tracking-tighter text-gray-700 hover:text-brand-600 dark:text-neutral-300">Sign Up</a>
            <a href="/login" class="text-base font-medium tracking-tighter text-gray-700 hover:text-brand-600 dark:text-neutral-300">Sign In</a>
          {/if}

          <div class="hidden items-center rounded-full border border-gray-200 bg-gray-200 p-0.5 sm:order-3 sm:flex dark:border-white/20 dark:bg-neutral-800">
            {#if user?.full_name}
              <a
                href={user?.is_admin ? "/admin/dashboard" : "/user/orders"}
                class="inline-flex size-11 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-black">
                <img class="size-10 shrink-0 rounded-full" src={user?.avatar_url || PUBLIC_VITE_BASE_DOMAIN + "storage/user.png"} alt="Avatar" />
              </a>

              {#if !user?.is_admin}
                <a
                  href="/user/transactions/top-up/choose-payment-method"
                  title=""
                  class="inline-flex h-11 w-auto items-center justify-center rounded-full bg-gray-200 px-3 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300">
                  <SvgIcon strokeWidth={1.5} class="size-5 shrink-0" slot={dollarCircle} />
                  <span class="ml-2 text-sm font-bold tracking-tighter">{toCurrency(wallet_balance)}</span>
                </a>
              {/if}
            {/if}
            <button
              type="button"
              class="hs-dark-mode size-11 rounded-full font-medium text-gray-800 hover:bg-white/75 focus:bg-white/75 focus:outline-none hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              data-hs-theme-click-value="dark">
              <span class="group inline-flex size-9 shrink-0 items-center justify-center">
                <SvgIcon class="size-4 shrink-0" slot={crescentMoon} />
              </span>
            </button>

            <button
              type="button"
              class="hs-dark-mode hidden size-11 rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              data-hs-theme-click-value="light">
              <span class="group inline-flex size-9 shrink-0 items-center justify-center">
                <SvgIcon class="size-4 shrink-0" slot={sunRays} />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <!-- xs to lg -->
  {#if showMenu}
    <nav class="bg-white py-4 lg:hidden" transition:slide={{ axis: "y" }}>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-widest text-gray-400">Menu</p>

          {#if user?.full_name}
            <div class="inline-flex items-center justify-center">
              <a
                href={user?.is_admin ? "/admin/dashboard" : "/user/orders"}
                class="inline-flex size-11 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-black">
                <img class="size-10 shrink-0 rounded-full" src={user?.avatar_url || PUBLIC_VITE_BASE_DOMAIN + "storage/user.png"} alt="Avatar" />
              </a>
              <span class="pl-4">DANIEL AKHILE</span>
            </div>
          {/if}

          <button type="button" class="inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100" onclick={() => (showMenu = false)}>
            <SvgIcon class="size-6 shrink-0" slot={x} />
          </button>
        </div>

        <div class="mt-6">
          <!-- <div class="flex flex-col space-y-2">
            <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Features </a>
          </div>

          <hr class="my-4 border-gray-200" /> -->

          <div class="flex flex-col space-y-2">
            {#if user?.full_name}
              <a href="/user/orders" class="py-2 text-base font-medium text-black transition-all duration-200 hover:text-brand-600 focus:text-brand-600">Dashboard</a>
              <a href="/logout" class="py-2 text-base font-medium text-black transition-all duration-200 hover:text-brand-600 focus:text-brand-600" data-sveltekit-reload>Logout</a>
            {:else}
              <a href="/login#register" class="py-2 text-base font-medium text-black transition-all duration-200 hover:text-brand-600 focus:text-brand-600">Sign up</a>
              <a href="/login" class="py-2 text-base font-medium text-black transition-all duration-200 hover:text-brand-600 focus:text-brand-600">Sign in</a>
            {/if}
          </div>
        </div>
      </div>
    </nav>
  {/if}
</header>

<style global>
  a[aria-current="page"] {
    color: theme("colors.brand.500");
  }
</style>
