<script>
  import { toCurrency } from "$lib/helpers.js";

  export let data,
      isModal = false; // useful when we are loading this page in a modal like on the orders page

  $: ({ order } = data);
</script>

<div class="{isModal ? 'w-full block' : 'flex'} justify-center">
  <div class="{isModal ? 'rounded-none' : 'rounded-lg'} border border-gray-200 bg-slate-50 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-md dark:shadow-neutral-700/40">
    <div class="-m-4 flex items-center justify-between border-b border-gray-200 p-4 dark:border-neutral-700">
      <h2 class="text-2xl font-normal text-gray-800 dark:text-gray-400">
        <span class="text-base font-light">Order ID:</span>
        <span class="font-bold capitalize">#{order?.id}</span>
      </h2>
    </div>
    <div class="mt-4">
      <div class="flex items-center gap-x-3">
        <img class="inline-block size-[38px] rounded-full" src={order?.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
        <div class="flex grow flex-col gap-y-1.5">
          <span class="block text-wrap text-lg font-semibold text-gray-700 dark:text-neutral-300">
            {order?.description}
          </span>

          <span class="block text-base font-semibold text-gray-800 dark:text-neutral-400">
            Amount: <span class="font-semibold">{toCurrency(order?.pay_amount)}</span>
            <span
              class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {!order?.is_processed
                ? 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'
                : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'} rounded-full">
              <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              {order?.status}
            </span>
          </span>
          <span class="block text-sm text-gray-600 dark:text-neutral-400">
            Pay Amount: <span>{order?.pay_amount} {order?.pay_currency?.toUpperCase()}</span>
          </span>
          <span class="block text-sm text-gray-600 dark:text-neutral-400">
            Payment Method: <span>{order?.payment_method?.toUpperCase()?.replaceAll("_", " ")}</span>
          </span>
          {#if !order?.is_processed && !order?.expired_at}
            <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
              <span class="font-sem-bold text-gray-800">Valid Until:</span>
              {new Date(order?.valid_until || "")?.toLocaleDateString()}
            </span>
          {/if}
          {#if order?.expired_at}
            <span class="block text-wrap text-sm text-red-600 dark:text-red-600">
              <span class="font-sem-bold text-red-600">Expired:</span>
              {new Date(order?.expired_at)?.toLocaleDateString()}
            </span>
          {/if}
        </div>
      </div>

      <div class="-mx-4 -mb-4 mt-4 border-t border-neutral-200 bg-neutral-200/50 p-2 text-sm text-gray-500 dark:border-neutral-700 dark:bg-neutral-600/10">
        <div class="flex">
          <div class="ms-3">
            <h3 class="mb-4 text-base font-semibold uppercase text-brand-800 dark:font-medium dark:text-white">Voucher Codes</h3>

            {#each order.voucher_codes || [] as code, i}
              <div class="mt-2 flex items-start justify-start gap-x-3">
                <p class="mr-2 text-lg font-bold">{i + 1}:</p>
                <p class="text-lg font-bold text-gray-600 dark:text-neutral-400">
                  <span class="block">Code: {code.code}</span>
                  <span class="block">Amount: {toCurrency(code.amount)}</span>
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
