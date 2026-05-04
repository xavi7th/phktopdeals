<script>
  import { page } from "$app/stores";
  import Logo from "$lib/Components/Logo.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { shoppingBagSVG, walletSVG, heartSVG, shareSVG, creditCardSVG, dollarCircleSVG, shieldTickSVG, gearsSVG, giftCardSVGAlt, eSimSVG, topUpSVGAlt, dollarCircle } from "$lib/Components/iconPaths";
  import { toCurrency } from "$lib/helpers";

  /** @type {Object<string, string>}*/
  let icons = {
    shoppingBagSVG,
    walletSVG,
    heartSVG,
    shareSVG,
    creditCardSVG,
    dollarCircleSVG,
    shieldTickSVG,
    gearsSVG,
    giftCardSVGAlt,
    eSimSVG,
    topUpSVGAlt,
  };

  /** @type {import('$lib/types').AdminNavMenuItem[]} */
  export let user_routes = [];
  export let wallet_balance = 0;
</script>

<div
  id="hs-application-sidebar"
  class="hs-overlay fixed inset-y-0 start-0 z-[60] hidden h-full w-1/2 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 sm:w-1/3 md:w-2/6 lg:bottom-0 lg:end-auto lg:block lg:w-1/5 lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
  role="dialog"
  tabindex="-1"
  aria-label="Sidebar">
  <div class="relative">
    <div class="absolute right-[-50%] top-2 hidden items-center rounded-full border border-gray-200 bg-gray-200 p-0.5 lg:flex dark:border-white/20 dark:bg-neutral-800">
      <a
        data-tour="top-up-link"
        href="/user/transactions/top-up/choose-payment-method"
        title=""
        class="mr-4 inline-flex h-11 w-auto items-center justify-center justify-self-end rounded-full bg-gray-200 px-3 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300">
        <SvgIcon strokeWidth={1.5} class="size-5 shrink-0" slot={dollarCircle} />
        <span class="ml-2 text-sm font-bold tracking-tighter">{toCurrency(wallet_balance)}</span>
      </a>
    </div>
  </div>

  <div class="relative flex h-full max-h-full flex-col">
    <div class="px-6 pt-4">
      <Logo />
    </div>

    <div
      class="mt-5 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
      <nav class="hs-accordion-group flex w-full flex-col flex-wrap p-3" data-hs-accordion-always-open>
        <ul class="flex flex-col space-y-1">
          {#each user_routes as route}
            <li>
              <a
                data-sveltekit-reload={route.reload}
                href={route.uri}
                class="flex gap-4 rounded-[1rem] p-2 py-3.5 hover:opacity-85"
                class:bg-neutral-700={$page.url.pathname == route.uri}
                class:text-brand-100={$page.url.pathname == route.uri}>
                <div class="grid size-12 shrink-0 place-content-center rounded-full bg-brand-900 text-brand-300 dark:bg-[#4e4e4e]">
                  {@html icons[route.icon]}
                </div>
                <div class="flex flex-col justify-between text-[14px] dark:text-white">
                  <h3 class="">{route.name}</h3>
                  <p class="text-xs font-light leading-3">{route.description}</p>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
</div>
