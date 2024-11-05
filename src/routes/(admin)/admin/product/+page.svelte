<script>
	import { toCurrency } from '$lib/helpers';
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { leftAngle, rightAngle, search } from '$lib/Components/iconPaths';

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

            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th scope="col" class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Product Details
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Price Details
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Discount Details
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                {#each products as card}
                  <tr>
                    <td class="size-px whitespace-nowrap">
                      <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div class="flex items-center gap-x-3">
                          <img class="inline-block size-[38px] rounded-full" src="{card.product_image_url}" alt="Avatar" referrerpolicy="no-referrer">
                          <div class="grow">
                            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.product_name} ({card.brand.name})</span>
                            <span class="block text-sm text-gray-500 dark:text-neutral-500 text-wrap"><span class="text-gray-800 font-semibold">Categories: </span>{card.product_category?.toString() || 'N/A'}</span>
                            <span class="block text-sm text-gray-500 dark:text-neutral-500 text-wrap"><span class="text-gray-800 font-semibold">Regions: </span>{card.regions?.toString() || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="h-px w-72 whitespace-nowrap">
                      <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div class="flex items-center gap-x-3">
                          <div class="grow">
                            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Commission Percentage: <span class="font-semibold">{ card.product_price.commission }%</span>
                            <span class="block text-sm text-gray-500 dark:text-neutral-500 text-wrap">Denominations: <br />{ card.product_price.denominations?.map(x => toCurrency(x)) || 'N/A' }</span></span>
                            {#if card.product_price.flexible}
                              <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Minimum Custom Price: { toCurrency(card.product_price.min) }</span>
                            {/if}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-3">
                        <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium {card.percentage_discount ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500' : 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500'} rounded-full">
                          <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                          {#if card.percentage_discount}
                            {card.percentage_discount}% discount until {card.discount_until}
                          {:else}
                            None
                          {/if}
                        </span>
                      </div>
                    </td>
                  </tr>
                {:else}
                  <tr>
                    <td class="size-px whitespace-nowrap" colspan="4">
                      <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div class="flex items-center gap-x-3 text-center">
                          <div class="grow">
                            <span class="block text-xl text-gray-600 dark:text-neutral-200">NO PRODUCTS CREATED</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>

            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
              <div>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  Showing <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.per_page}</span> out of <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.total}</span> results
                </p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a href={meta.prev_page_url || '#'} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    <SvgIcon class="shrink-0 size-4" slot={leftAngle}/>
                    Prev
                  </a>

                  <a href="{meta.next_page_url || '#'}" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Next
                    <SvgIcon class="shrink-0 size-4" slot={rightAngle}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
