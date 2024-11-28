<script>
	import { toCurrency } from '$lib/helpers';
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { leftAngle, rightAngle } from '$lib/Components/iconPaths';

  /** @type { import('$lib/types').Product[] } */
  export let products;
  export let meta = {};
  export let basePageUrl = '';
</script>

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
                <span class="block text-sm text-gray-500 dark:text-neutral-500 text-wrap"><span class="font-sem-bold text-gray-600">Denominations:</span>{ card.product_price.denominations?.map(x => ' ' + toCurrency(x)) || 'N/A' }</span></span>
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
                {card.percentage_discount}% discount until {new Date(card.discount_until).toLocaleDateString()}
              {:else}
                None
              {/if}
            </span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-1.5 flex gap-3">
            <a class="inline-flex items-center gap-x-1 text-sm text-brand-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-brand-500" href={basePageUrl+'/'+card.id}>
              Edit
            </a>
            <form action="?/delete" method="POST" class="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-red-500">
              <input type="text" class="hidden" name="uuid" value={card.id}>
              <button type="submit" class="bg-transparent p-0 m-0 border-0 shadow-none">Delete</button>
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

<div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
  <div>
    <p class="text-sm text-gray-600 dark:text-neutral-400">
      Showing <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.items_count}</span> out of <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.total}</span> results
    </p>
  </div>

  <div>
    <div class="inline-flex gap-x-2">
      <a href={`${basePageUrl}/${meta.prev_page_cursor || '#'}`} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {! meta.prev_page_cursor ? 'opacity-50 pointer-events-none' : ''}">
        <SvgIcon class="shrink-0 size-4" slot={leftAngle}/>
        Prev
      </a>

      <a href={`${basePageUrl}/${meta.next_page_cursor || '#'}`} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {! meta.next_page_cursor ? 'opacity-50 pointer-events-none' : ''}">
        Next
        <SvgIcon class="shrink-0 size-4" slot={rightAngle}/>
      </a>
    </div>
  </div>
</div>
