<script>
  import { enhance } from "$app/forms";
  import { toCurrency } from "$lib/helpers";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import PageNavigation from "$lib/Components/PageNavigation.svelte";
  import DateFilterChips from "$lib/Components/DateFilterChips.svelte";
  import { checkMarkCircle, plusIcon, search } from "$lib/Components/iconPaths";
  import { startAdminProductMgmtTour } from "$lib/tours";
  import TourTrigger from "$lib/Components/TourTrigger.svelte";

  /** @type { import('$lib/types').Product[] } */

  /**
   * @typedef {Object} Props
   * @property {import('$lib/types').Product[]} products
   * @property {{ items_count?: number; next_page_cursor?: string; previous_page_cursor?: string; }} [meta]
   * @property {string} basePageUrl
   * @property {boolean} [hasAction]
   * @property {string} cardType
   * @property {boolean} [isArchivedView]
   */

  /** @type {Props} */
  let { products = [], meta = {}, basePageUrl = "", hasAction = true, cardType = "All Products", isArchivedView = false } = $props();
</script>

<div class="space-y-4 p-4 sm:space-y-6 sm:p-6">
  <TourTrigger startTour={startAdminProductMgmtTour} />
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">{isArchivedView ? `Archived ${cardType}s` : cardType}</h2>
              <p class="text-sm text-gray-600 dark:text-neutral-400">{isArchivedView ? "View and restore archived items." : `Add ${cardType}, edit and more.`}</p>
            </div>

            <div class="px-4 py-3">
              <div class="relative max-w-xs">
                <label for="hs-table-search" class="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search for items" />
                <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
                </div>
              </div>
            </div>

            <div>
              {#if hasAction}
                <div class="inline-flex gap-x-2">
                  {#if !isArchivedView}
                    <a
                      data-tour="archive-link"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      href={`${basePageUrl}/archived`}>
                      View Archived
                    </a>
                    <a
                      data-tour="create-product-btn"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href={`${basePageUrl}/create`}>
                      {@html plusIcon}
                      Add {cardType}
                    </a>
                  {:else}
                    <a
                      class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      href={basePageUrl}>
                      View Active
                    </a>
                  {/if}
                </div>
              {/if}
            </div>
          </div>

          <!-- Date filter chips -->
          <div class="border-b border-gray-200 px-6 py-3 dark:border-neutral-700">
            <DateFilterChips baseUrl={isArchivedView ? `${basePageUrl}/archived` : basePageUrl} />
          </div>

          <table data-tour="product-list" class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" class="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product Details</span>
                  </div>
                </th>

                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Price Details</span>
                  </div>
                </th>

                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Discount Details</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              {#each products as card}
                <tr>
                  <td class="size-px whitespace-nowrap">
                    <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                      <div class="flex items-center gap-x-3">
                        <img class="inline-block size-[38px] rounded-full" src={card.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
                        <div class="grow">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.product_name} ({card.brand?.name})</span>
                          <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                            <span class="font-semibold text-gray-800">Categories:</span>
                            {card.product_category?.toString() || "N/A"}
                          </span>
                          <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                            <span class="font-semibold text-gray-800">Regions:</span>
                            {card.regions?.toString() || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="h-px w-72 whitespace-nowrap">
                    <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                      <div class="flex items-center gap-x-3">
                        <div class="grow">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                            Commission Percentage: <span class="font-semibold">{card.product_price.commission}%</span>
                            <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                              <span class="font-sem-bold text-gray-600">Denominations:</span>
                              {card.product_price.denominations?.map((x) => " " + toCurrency(x)) || "N/A"}
                            </span>
                          </span>
                          {#if card.product_price.flexible}
                            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Minimum Custom Price: {toCurrency(card.product_price.min)}</span>
                          {/if}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="size-px whitespace-nowrap">
                    <div class="px-6 py-3">
                      <span
                        class="inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {card.percentage_discount
                          ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500'} rounded-full">
                        <SvgIcon class="size-2.5" svgHeight={16} fill="currentColor" slot={checkMarkCircle} />
                        {#if card.percentage_discount}
                          {card.percentage_discount}% discount until {new Date(card.discount_until).toLocaleDateString()}
                        {:else}
                          None
                        {/if}
                      </span>
                    </div>
                  </td>
                  {#if hasAction}
                    <td class="size-px whitespace-nowrap">
                      <div class="flex gap-3 px-6 py-1.5">
                        <a
                          class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500"
                          href={`${basePageUrl}/edit/${card.id}`}>
                          Edit
                        </a>
                        {#if isArchivedView}
                          <form action="?/unarchive" method="POST" use:enhance>
                            <input type="text" class="hidden" name="id" value={card.id} />
                            <button
                              type="submit"
                              class="m-0 inline-flex items-center gap-x-1 border-0 bg-transparent p-0 text-sm font-medium text-teal-600 decoration-2 shadow-none hover:underline focus:underline focus:outline-none dark:text-teal-500">
                              Unarchive
                            </button>
                          </form>
                        {:else}
                          <form action="?/archive" method="POST" use:enhance>
                            <input type="text" class="hidden" name="id" value={card.id} />
                            <button
                              type="submit"
                              class="m-0 inline-flex items-center gap-x-1 border-0 bg-transparent p-0 text-sm font-medium text-yellow-600 decoration-2 shadow-none hover:underline focus:underline focus:outline-none dark:text-yellow-500">
                              Archive
                            </button>
                          </form>
                          {#if !card.has_transactions}
                            <form
                              action="?/delete"
                              method="POST"
                              class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500"
                              use:enhance>
                              <input type="text" class="hidden" name="id" value={card.id} />
                              <button type="submit" class="m-0 border-0 bg-transparent p-0 shadow-none">Delete</button>
                            </form>
                          {/if}
                        {/if}
                      </div>
                    </td>
                  {/if}
                </tr>
              {:else}
                <tr>
                  <td class="size-px whitespace-nowrap" colspan="4">
                    <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                      <div class="flex items-center gap-x-3 text-center">
                        <div class="grow">
                          <span class="block text-xl text-gray-600 dark:text-neutral-400 uppercase">{isArchivedView ? `NO ARCHIVED ${cardType.toUpperCase()}S` : `NO ${cardType.toUpperCase()}S CREATED`}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>

          <PageNavigation navData={{ ...meta, basePageUrl: isArchivedView ? `${basePageUrl}/archived` : basePageUrl }} />
        </div>
      </div>
    </div>
  </div>
</div>
