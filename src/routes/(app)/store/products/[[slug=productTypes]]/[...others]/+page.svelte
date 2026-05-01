<script>
  import { page } from "$app/stores";
  import { main_nav } from "$partials/Header.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { rightAngle } from "$lib/Components/iconPaths";
  import ProductCard from "$partials/ProductCard.svelte";
  import Sidebar from "$partials/gift-cards/Sidebar.svelte";
  import PageNavigation from "$lib/Components/PageNavigation.svelte";
  import { getPrefs, setPrefs } from "$stores/userPreferences";
  import { onMount } from "svelte";

  export let data;

  $: ({ cards, category, meta, basePageUrl, search } = data);

  let sortOrder = $state("default");
  let viewMode = $state("grid");

  onMount(() => {
    const prefs = getPrefs();
    sortOrder = prefs.productSortOrder || "default";
    viewMode = prefs.productViewMode || "grid";
  });

  function updateSortOrder(newSort) {
    sortOrder = newSort;
    setPrefs({ productSortOrder: newSort });
  }

  function toggleViewMode() {
    const newMode = viewMode === "grid" ? "list" : "grid";
    viewMode = newMode;
    setPrefs({ productViewMode: newMode });
  }

  let sortedCards = $derived(
    (cards || []).slice().sort((a, b) => {
      if (sortOrder === "price_asc") return (a.product_price?.denominations?.[0] || 0) - (b.product_price?.denominations?.[0] || 0);
      if (sortOrder === "price_desc") return (b.product_price?.denominations?.[0] || 0) - (a.product_price?.denominations?.[0] || 0);
      return 0;
    }),
  );
</script>

<svelte:head>
  <title>Purchase {category?.replaceAll("-", " ")?.toLocaleUpperCase()} | HotDeals</title>
  <meta name="description" content="Purchase {category?.replaceAll('-', ' ')?.toLocaleUpperCase()} from Hot Deals at very discounted prices. Blazing fast transactions and discreet are assured." />
</svelte:head>

<div class="container">
  <div class="row">
    <div class="w-full pt-40 md:flex md:space-x-3">
      <Sidebar />

      <main class="flex-1">
        <div class=" mx-auto mb-7 block w-full sm:w-2/3 md:hidden lg:w-1/2">
          <div
            class="hs-collapse rounded-0 mt-2 block grow basis-full space-x-0.5 overflow-hidden rounded-full border border-gray-200 bg-gray-200 transition-all duration-300 sm:grow-0 sm:basis-auto dark:border-white/20">
            <div class="flex items-center justify-evenly divide-y sm:flex-row sm:items-center sm:gap-5 sm:divide-y-0">
              {#each main_nav as { name, url }}
                <a
                  class="p-3.5 font-bold tracking-tighter text-gray-600 hover:text-brand-500 focus:text-brand-500 focus:outline-none dark:font-semibold dark:text-neutral-700 dark:hover:text-brand-900 dark:focus:text-brand-900"
                  href={url}
                  aria-current={$page.url.pathname.includes(url) ? "page" : undefined}>
                  {name}
                </a>
              {/each}
            </div>
          </div>
        </div>

        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600 dark:text-neutral-400">Sort:</label>
            <select class="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-800" on:change={(e) => updateSortOrder(e.target.value)}>
              <option value="default" selected={sortOrder === "default"}>Default</option>
              <option value="price_asc" selected={sortOrder === "price_asc"}>Price: Low to High</option>
              <option value="price_desc" selected={sortOrder === "price_desc"}>Price: High to Low</option>
            </select>
          </div>
          <button class="rounded border border-gray-300 p-1.5 text-sm hover:bg-gray-100 dark:border-neutral-600 dark:hover:bg-neutral-800" onclick={toggleViewMode}>
            {viewMode === "grid" ? "List" : "Grid"}
          </button>
        </div>

        <div class={viewMode === "grid" ? "mb-8 grid grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-5 xl:gap-3" : "mb-8 flex flex-col gap-4"}>
          {#each sortedCards || [] as product}
            <ProductCard {product} />
          {:else}
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 col-span-3 lg:col-start-2">
              <div class="max-w-2xl px-4 sm:px-6 py-12 md:py-20 lg:px-8 mx-auto">
                <div class="mb-5 sm:mb-10 text-center">
                  {#if search}
                    <h2 class="text-2xl font-bold lg:text-3xl lg:leading-tight dark:text-white">There are no products with the name "{search}"</h2>
                    <p class="mt-3 text-gray-500 dark:text-neutral-400">
                      Review your search term and try again or click <a href="/store/products" class="text-brand-600 dark:text-brand-400 decoration-2 hover:underline focus:outline-none focus:underline font-medium">
                        here
                      </a>
                      to view all products
                    </p>
                  {:else}
                    <h2 class="text-2xl font-bold lg:text-3xl lg:leading-tight dark:text-white capitalize">{category} products Not Found</h2>
                    <p class="mt-3 text-gray-500 dark:text-neutral-400">
                      There are no products under this category at the moment. Click <a
                        href="/store/products"
                        class="text-brand-600 dark:text-brand-400 decoration-2 hover:underline focus:outline-none focus:underline font-medium">
                        here
                      </a>
                      to view all products
                    </p>
                  {/if}
                </div>

                <div class="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
                  <span class="text-sm text-gray-600 dark:text-neutral-400">Or you can</span>
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
