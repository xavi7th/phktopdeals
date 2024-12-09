<script>
  import { toCurrency } from "$lib/helpers";
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import { checkMarkCircle } from '$lib/Components/iconPaths';
  import PageNavigation from '$lib/Components/PageNavigation.svelte';

  /** @type { import('$lib/types').Product[] } */
  export let products = [];
  export let meta = {};
  export let basePageUrl = "";
</script>

<table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
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
        <td class="size-px whitespace-nowrap">
          <div class="flex gap-3 px-6 py-1.5">
            <a class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500" href={basePageUrl + "/" + card.id}>Edit</a>
            <form action="?/delete" method="POST" class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500">
              <input type="text" class="hidden" name="uuid" value={card.id} />
              <button type="submit" class="m-0 border-0 bg-transparent p-0 shadow-none">Delete</button>
            </form>
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

<PageNavigation navData={{ ...meta, basePageUrl }} />
