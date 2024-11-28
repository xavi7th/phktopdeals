<script>
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import { percentageCalculation } from '$lib/helpers';
	import Sidebar from '$partials/gift-cards/Sidebar.svelte';
	import { favoriteIcon, maximizeIcon, rightAngle } from '$lib/Components/iconPaths';

  export let data;

  /**
   * @param {[cards, category]: [import('$lib/types').ProdSummary[], string]} data
   */
  $: ({ cards, category } = data)
</script>

<svelte:head>
  <title>Purchase { category?.replaceAll('-', ' ')?.toLocaleUpperCase() } | PHKHotDeals</title>
  <meta name="description" content="Purchase { category?.replaceAll('-', ' ')?.toLocaleUpperCase() } from PHK Hot Deals at very discounted prices. Blazing fast transactions and discreet are assured.">
</svelte:head>

<div class="container">
  <div class="row">

    <div class="w-full lg:flex lg:space-x-3 pt-40">
      <Sidebar />

      <main class="flex-1">
        <div class="grid lg:grid-cols-3 grid-cols-1 xl:gap-3 gap-5 mb-8">

          {#each cards || [] as product}
            <div class="group overflow-hidden relative flex flex-col bg-white shadow rounded-xl dark:bg-neutral-700/30 dark:border-neutral-700 dark:shadow-neutral-700/70 transition hover:drop-shadow-xl hover:shadow-sm hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025]">
              <img class="w-full h-auto rounded-t-xl" src={product.img_url} alt={product.name}>

              <div class="px-4 md:px-5 py-2 md:py-3 flex-1 text-center">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">{product.name}</h3>
              </div>

              <div class="flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                <a href={`/store/${product.name_slug}_${product.id}`}><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html maximizeIcon }</span></a>
                <a href="#"><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html favoriteIcon }</span></a>
              </div>

              <a href={`/store/${product.name_slug}_${product.id}`} class="transition-colors duration-300 bg-brand hover:bg-brand-500 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-brand-900 dark:border-brand-700 mt-1 text-sm text-black dark:text-brand-50 hover:text-white text-center">
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
                  <span class="text-sm text-gray-600 dark:text-neutral-400">You can </span>
                  <a class="inline-flex items-center gap-x-1 text-sm text-brand-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-brand-500" href="/">
                    Go back Home
                    <SvgIcon class="shrink-0 size-4 text-red-500" slot={rightAngle}/>
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
