<script>
  import { page } from "$app/stores";
  import Logo from "$lib/Components/Logo.svelte";
  import { homeSVG, productSVG, eSimSVG, gamesSVGAlt, giftCardSVGAlt, topUpSVGAlt, usersSVG, spinnerSVG } from "$lib/Components/iconPaths";

  /** @type {Object<string, string>}*/
  let icons = {
    homeSVG,
    productSVG,
    eSimSVG,
    gamesSVGAlt,
    giftCardSVGAlt,
    topUpSVGAlt,
    usersSVG,
    spinnerSVG,
  };

  /** @type {import('$lib/types').AdminNavMenuItem[]} */
  export let admin_routes = [];
</script>

<div
  id="hs-application-sidebar"
  class="hs-overlay fixed inset-y-0 start-0 z-[60] hidden h-full w-1/2 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 sm:w-1/3 md:w-2/6 lg:bottom-0 lg:end-auto lg:block lg:w-1/5 lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
  role="dialog"
  tabindex="-1"
  aria-label="Sidebar">
  <div class="relative flex h-full max-h-full flex-col">
    <div class="px-6 pt-4">
      <Logo location="/admin/dashboard" />
    </div>

    <div
      class="mt-5 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
      <nav class="hs-accordion-group flex w-full flex-col flex-wrap p-3" data-hs-accordion-always-open>
        <ul class="flex flex-col space-y-1">
          {#each admin_routes as route}
            <li>
              <a
                class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 focus:outline-none dark:text-white"
                href={route.uri}
                class:bg-gray-100={$page.url.pathname == route.uri}
                class:bg-neutral-700={$page.url.pathname == route.uri}
                class:text-white={$page.url.pathname == route.uri}>
                <span class="max-w-4">{@html icons[route.icon]}</span>
                {route.name}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
</div>
