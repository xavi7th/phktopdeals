<script>
	import { search } from '$lib/Components/iconPaths';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import ProductListings from '../../ProductListings.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  $: ( { products, meta } = data ) ;
</script>


<div class="col-span-5 lg:col-span-4 lg:col-start-2">
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">

            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  All Products
                </h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  View Products of all types in one place. Quickly search for a particular product
                </p>
              </div>

              <div class="py-3 px-4">
                <div class="relative max-w-xs">
                  <label for="products-search" class="sr-only">Search</label>
                  <input type="text" name="products-search" id="products-search" class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search for products">
                  <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
                  </div>
                </div>
              </div>
            </div>

            <ProductListings {products} {meta}  basePageUrl="/admin/product"/>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
