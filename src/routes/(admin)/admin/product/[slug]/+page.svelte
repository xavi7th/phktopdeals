<script>
  import { search } from "$lib/Components/iconPaths";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import ProductListings from "../../ProductListings.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({ products, meta } = data);
</script>

<div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="inline-block min-w-full p-1.5 align-middle">
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">All Products</h2>
            <p class="text-sm text-gray-600 dark:text-neutral-400">View Products of all types in one place. Quickly search for a particular product</p>
          </div>

          <div class="px-4 py-3">
            <div class="relative max-w-xs">
              <label for="products-search" class="sr-only">Search</label>
              <input
                type="text"
                name="products-search"
                id="products-search"
                class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Search for products"
              />
              <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
              </div>
            </div>
          </div>
        </div>

        <ProductListings {products} {meta} basePageUrl="/admin/product" />
      </div>
    </div>
  </div>
</div>
