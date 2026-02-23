<script>
  import { cn, toCurrency } from "$lib/helpers";
  import Toast from "$lib/Components/Toast.svelte";
  import Table from "$lib/Components/Table.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import { checkMarkFilledAlt, exclamationCircle, xCircle } from "$lib/Components/iconPaths";

  export let data;

  $: ({ transactions, redirectStatus } = data);

  let statusData = {
    waiting: {
      icon: exclamationCircle,
      class: "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-500",
    },
    confirming: {
      icon: exclamationCircle,
      class: "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-500",
    },
    processing: {
      icon: exclamationCircle,
      class: "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-500",
    },
    confirmed: {
      icon: checkMarkFilledAlt,
      class: "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500",
    },
    finished: {
      icon: checkMarkFilledAlt,
      class: "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500",
    },
    failed: {
      icon: xCircle,
      class: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500",
    },
    expired: {
      icon: xCircle,
      class: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500",
    },
  };

  let statusMsg = {
    success: "Your top up was successful and your wallet has been credited.",
    error: "There was an error processing your top up. Please try again.",
    info: "Your top up has been initiated and will be processed within 24 hours.",
  };
</script>

{#if redirectStatus}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={true} type={redirectStatus} msg={statusMsg[redirectStatus]} />
  </div>
{/if}

<svelte:head>
  <title>Top Up Wallet | HotDeals</title>
  <meta name="description" content="Top up your wallet in your favorite currency or bank transfer to ensure seamless transactions when making purchases." />
</svelte:head>

<!-- <div class="flex items-center justify-between rounded-lg bg-white p-3.5 shadow-md sm:mx-10 dark:bg-gray-700">
  <div class="flex items-center gap-3 sm:gap-8">
    <div class="grid size-16 place-content-center rounded-md border-brand-500 bg-brand-700"></div>
    <div>
      <p class="text-xs text-slate-800 dark:text-slate-400">Current Balance</p>
      <p class="text-xl text-slate-800 dark:text-slate-100">{toCurrency(wallet_balance || '$0.00')}</p>
    </div>
  </div>
  <div>
    <a class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md border border-transparent bg-brand-400 px-4 py-2.5 text-sm font-normal text-gray-800 shadow-md hover:bg-brand-500 focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50" href="transactions/top-up/choose-payment-method">
      Recharge Wallet
    </a>
  </div>
</div> -->

{#await transactions}
  <TableSkeleton />
{:then transactions}
  <Table tCaption="List of Top Up Transactions" navData={{ ...transactions.metadata, basePageUrl: "/user/transactions" }}>
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
    </svelte:fragment>

    {#each transactions.data as trx, i}
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
            <span class="text-base text-gray-800 dark:text-neutral-300">
              {#if trx.pay_currency === "NGN"}
                {toCurrency(trx.pay_amount, trx.pay_currency.toUpperCase())}
              {:else}
                {trx.pay_amount}
                <span class="uppercase">{trx.pay_currency}</span>
              {/if}
            </span>
            <br />
            <span class="text-xs text-gray-400 dark:text-neutral-500">{toCurrency(trx.price_amount)}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span
              class={cn(
                "inline-flex items-center justify-center gap-x-1 rounded-full bg-yellow-100 px-1.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500",
                statusData[trx.status]?.class,
              )}>
              <SvgIcon class="size-2.5" slot={statusData[trx.status]?.icon || statusData["waiting"]?.icon} svgHeight={trx.status === "finished" ? 16 : 24} />
              {trx.status}
            </span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-sm text-gray-600 dark:text-neutral-400">{new Date(trx.valid_until).toLocaleDateString()}</span>
          </div>
        </td>
      </tr>
    {:else}
      <tr>
        <td class="size-px whitespace-nowrap" colspan="4">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-400">NO TOP UP TRANSACTIONS YET</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}

    <svelte:fragment slot="mobile">
      {#each transactions.data as trx, i}
        <div class="rounded-lg border bg-white p-4 shadow">
          <div class="-m-4 flex items-center justify-between border-b px-4 py-2">
            <h2 class="text-lg font-normal text-gray-800">
              <span class="font-semibold">ID:</span>
              #{trx.id}
            </h2>
            <span
              class={cn(
                "inline-flex items-center justify-center gap-x-1 rounded-full bg-yellow-100 px-1.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500",
                statusData[trx.status]?.class,
              )}>
              <SvgIcon class="size-2.5" slot={statusData[trx.status]?.icon || statusData["waiting"]?.icon} svgHeight={trx.status === "finished" ? 16 : 24} />
              {trx.status}
            </span>
          </div>
          <div class="mt-6 text-sm text-gray-600">
            <p>
              <span class="mr-2 font-semibold">Description:</span>
              {trx.description}
            </p>
            <p>
              <span class="mr-2 font-semibold">Amount in USD:</span>
              <span class="text-xs text-gray-600 dark:text-neutral-500">{toCurrency(trx.price_amount)}</span>
            </p>
            <p>
              <span class="mr-2 font-semibold">
                Amount in <span class="uppercase">{trx.pay_currency}</span>
                :
              </span>
              <span class="text-xs text-gray-600 dark:text-neutral-500">
                {trx.pay_amount}
                <span class="uppercase">{trx.pay_currency}</span>
              </span>
            </p>
            <p>
              <span class="mr-2 font-semibold">Valid Until:</span>
              {new Date(trx.valid_until).toLocaleDateString()}
            </p>
          </div>
          <!-- <div class="mt-4">
          <button class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">View Details</button>
        </div> -->
        </div>
      {:else}
        <div class="bg-white shadow rounded-lg p-4 border">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-400">NO TOP UP TRANSACTIONS YET</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </svelte:fragment>
  </Table>
{/await}
