<script>
  import Wallet from './Wallet.svelte';
	import { cn, toCurrency } from '$lib/helpers';
	import Table from '$lib/Components/Table.svelte';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { checkMarkFilledAlt, exclamationCircle, xCircle } from '$lib/Components/iconPaths';

	/** @type {import('./$types').PageData} */
	export let data;

  $: ({ currencies, wallet_balance, transactions } = data);

  let statusData = {
    waiting: {
      icon: exclamationCircle,
      class: 'bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-500',
    },
    finished: {
      icon: checkMarkFilledAlt,
      class: 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500',
    },
    failed: {
      icon: xCircle,
      class: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500',
    },
    expired: {
      icon: xCircle,
      class: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500',
    }
  };

  $: console.log(transactions);
</script>

<svelte:head>
  <title>Top Up Wallet | PHKHotDeals</title>
  <meta name="description" content="Top up your wallet in your favorite crypto currency or bank transfer to ensure seamless transactions when .">
</svelte:head>

<section class="col-span-5 mx-auto min-w-[70%] px-4 py-16 sm:px-6 lg:col-span-4 lg:col-start-2 lg:px-8 lg:py-24">
	<Wallet data={data.form} {currencies} {wallet_balance} />

	<Table tCaption="List of Top Up Transactions" totalDataCount={100}>
    <svelte:fragment slot="thead">
      <th scope="col" class="px-6 py-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">ID</span>
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Description</span>
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Amount</span>
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Status</span>
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Date</span>
      </th>

      <!-- <th scope="col" class="px-6 py-3 text-end">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
      </th> -->
    </svelte:fragment>

    {#each transactions as trx, i}
      <tr class="text-start">
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-sm text-gray-600 dark:text-neutral-400">{trx.id}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <div class="flex items-center gap-x-2">
              <div class="grow">
                <span class="text-sm text-gray-600 dark:text-neutral-400">{trx.description}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-base text-gray-800 dark:text-neutral-300">{trx.pay_amount} <span class="uppercase">{trx.pay_currency}</span></span> <br>
            <span class="text-xs text-gray-400 dark:text-neutral-500">{toCurrency(trx.price_amount)}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span class={cn("py-1 px-1.5 inline-flex items-center justify-center gap-x-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500", statusData[trx.status]?.class) }>
              <SvgIcon class="size-2.5" slot={statusData[trx.status]?.icon || statusData['waiting']?.icon} svgHeight={trx.status === 'finished' ? 16 : 24}/>
              <!-- <SvgIcon class="size-2.5" slot={xCircle}/> -->
              <!-- <SvgIcon class="size-2.5" slot={exclamationCircle}/> -->
              {trx.status}
            </span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-sm text-gray-600 dark:text-neutral-400">{new Date(trx.valid_until).toLocaleDateString()}</span>
          </div>
        </td>
        <!-- <td class="size-px whitespace-nowrap">
          <div class="px-6 py-1.5">
            <div class="hs-dropdown [--placement:bottom-right] relative inline-block">
              <button id="hs-table-dropdown-1" type="button" class="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
              <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-table-dropdown-1">
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                    Rename
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                    Regenrate Key
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                    Disable
                  </a>
                </div>
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700" href="#">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </td> -->
      </tr>
    {:else}
      <tr>
        <td class="size-px whitespace-nowrap" colspan="4">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-200">NO TOP UP TRANSACTIONS YET</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}

  </Table>
</section>
