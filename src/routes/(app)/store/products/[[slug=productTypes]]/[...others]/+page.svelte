<script>
  import { page } from "$app/stores";
  import { main_nav } from '$partials/Header.svelte';
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { rightAngle } from "$lib/Components/iconPaths";
  import ProductCard from '$partials/ProductCard.svelte';
  import Sidebar from "$partials/gift-cards/Sidebar.svelte";
  import PageNavigation from "$lib/Components/PageNavigation.svelte";

  export let data;

  $: ({ cards, category, meta, basePageUrl } = data);
</script>

<svelte:head>
  <title>Purchase {category?.replaceAll("-", " ")?.toLocaleUpperCase()} | PHKHotDeals</title>
  <meta name="description" content="Purchase {category?.replaceAll('-', ' ')?.toLocaleUpperCase()} from PHK Hot Deals at very discounted prices. Blazing fast transactions and discreet are assured." />
</svelte:head>

<div class="container">
  <div class="row">
    <div class="w-full pt-40 md:flex md:space-x-3">
      <Sidebar />

      <main class="flex-1">
        <div class=" w-full sm:w-2/3 lg:w-1/2 mx-auto mb-7 block md:hidden">
          <div class="hs-collapse rounded-0 mt-2 grow basis-full space-x-0.5 overflow-hidden border border-gray-200 bg-gray-200 transition-all duration-300 block sm:grow-0 sm:basis-auto rounded-full dark:border-white/20">
            <div class="flex items-center justify-evenly divide-y sm:flex-row sm:items-center sm:gap-5 sm:divide-y-0">
              {#each main_nav as {name, url}}
                <a class="p-3.5 font-bold tracking-tighter text-gray-600 hover:text-brand-500 focus:text-brand-500 focus:outline-none dark:font-semibold dark:text-neutral-700 dark:hover:text-brand-900 dark:focus:text-brand-900" href="{url}" aria-current={$page.url.pathname.includes(url) ? "page" : undefined}>
                  {name}
                </a>
              {/each}
            </div>
          </div>
        </div>

        <div class="mb-8 grid grid-cols-2 gap-4 lg:gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:gap-3">
          {#each cards || [] as product}
            <ProductCard {product} />
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

        <PageNavigation navData={{ ...meta, basePageUrl }} />
      </main>
    </div>
  </div>
</div>
