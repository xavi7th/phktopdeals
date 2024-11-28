<script>
  import { page } from '$app/stores';
	import Logo from '$lib/Components/Logo.svelte';
	import { shoppingBagSVG, walletSVG, heartSVG, shareSVG, creditCardSVG, dollarCircleSVG, shieldTickSVG, gearsSVG, giftCardSVGAlt, eSimSVG, topUpSVGAlt } from '$lib/Components/iconPaths';

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
  }

  /** @type {import('$lib/types').AdminNavMenuItem[]} */
  export let user_routes = [];
</script>

<div id="hs-application-sidebar" class="hs-overlay w-1/2 sm:w-1/3 md:w-2/6 lg:w-1/5 h-full [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabindex="-1" aria-label="Sidebar">
  <div class="relative flex flex-col h-full max-h-full">
    <div class="px-6 pt-4">
      <Logo />
    </div>

    <div class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 mt-5">
      <nav class="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
        <ul class="flex flex-col space-y-1">
          {#each user_routes as route}
            <li>
              <a data-sveltekit-reload={route.reload} href={route.uri} class="flex gap-4 p-2 py-3.5 hover:opacity-85 rounded-[1rem]" class:bg-neutral-700={$page.url.pathname == route.uri}  class:text-brand-100={$page.url.pathname == route.uri}>
                <div class="bg-brand-900 text-brand-300 dark:bg-[#4e4e4e] size-12 rounded-full grid place-content-center shrink-0">
                    {@html icons[route.icon]}
                </div>
                <div class="text-[14px] flex flex-col justify-between dark:text-white">
                  <h3 class="">{route.name}</h3>
                  <p class="font-light text-xs leading-3">{route.description}</p>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
</div>
