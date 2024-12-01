<script>
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { percentageCalculation } from "$lib/helpers";
  import Sidebar from "$partials/gift-cards/Sidebar.svelte";
  import { favoriteIcon, maximizeIcon, rightAngle } from "$lib/Components/iconPaths";

  export let data;

  /**
   * @param {[cards, category]: [import('$lib/types').ProdSummary[], string]} data
   */
  $: ({ cards, category } = data);
</script>

<svelte:head>
  <title>Purchase {category?.replaceAll("-", " ")?.toLocaleUpperCase()} | PHKHotDeals</title>
  <meta name="description" content="Purchase {category?.replaceAll('-', ' ')?.toLocaleUpperCase()} from PHK Hot Deals at very discounted prices. Blazing fast transactions and discreet are assured." />
</svelte:head>

<div class="container">
  <div class="row">
    <div class="w-full pt-40 lg:flex lg:space-x-3">
      <Sidebar />

      <main class="flex-1">
        <div class="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:gap-3">
          {#each cards || [] as product}
            <div
              class="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70"
            >
              <img class="h-auto w-full rounded-t-xl" src={product.img_url} alt={product.name} />

              <div class="flex-1 px-4 py-2 text-center md:px-5 md:py-3">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">{product.name}</h3>
              </div>

              <div class="absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4">
                <a href={`/store/${product.name_slug}_${product.id}`}><span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html maximizeIcon}</span></a>
                <a href="#"><span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html favoriteIcon}</span></a>
              </div>

              <a
                href={`/store/${product.name_slug}_${product.id}`}
                class="mt-1 rounded-b-xl border-t bg-brand px-4 py-3 text-center text-sm text-black transition-colors duration-300 hover:bg-brand-500 hover:text-white md:px-5 md:py-4 dark:border-brand-700 dark:bg-brand-900 dark:text-brand-50"
              >
                Buy Now from {percentageCalculation(product.min_price, 0, product.percentage_discount)}
              </a>
            </div>
          {:else}
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 col-span-3">
              <div class="max-w-2xl px-4 sm:px-6 py-12 md:py-20 lg:px-8 mx-auto">
                <div class="mb-5 sm:mb-10 text-center">
                  <h2 class="text-2xl font-bold lg:text-3xl lg:leading-tight dark:text-white">{category} Not Found</h2>
                  <p class="mt-3 text-gray-500 dark:text-neutral-400">The requested product category was not found. Check your url and try again</p>
                </div>

                <div class="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
                  <span class="text-sm text-gray-600 dark:text-neutral-400">You can</span>
                  <a class="inline-flex items-center gap-x-1 text-sm text-brand-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-brand-500" href="/">
                    Go back Home
                    <SvgIcon class="shrink-0 size-4 text-red-500" slot={rightAngle} />
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </main>
    </div>
  </div>
</div>
