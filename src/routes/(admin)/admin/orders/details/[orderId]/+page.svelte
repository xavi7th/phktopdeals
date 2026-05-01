<script>
  import { enhance } from "$app/forms";
  import { toCurrency } from "$lib/helpers.js";
  import Toast from "$lib/Components/Toast.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import { checkMarkFilledAlt, warningIcon } from "$lib/Components/iconPaths.js";

  export let data,
    form,
    isModal = false; // useful when we are loading this page in a modal like on the orders page

  $: ({ order, apiError = false } = data);
</script>

{#if form?.message}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={false} type={form?.message?.type} msg={form?.message?.msg} />
  </div>
{/if}

{#if order?.id}
  <div class="{isModal ? 'block w-full' : 'flex'} justify-center">
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
              {order?.description || "N/A"}
              {#if !order?.description?.includes("Wallet")}
                purchase
              {/if}
            </span>

            <span class="block text-base font-semibold text-gray-800 dark:text-neutral-400">
              Amount: <span class="font-semibold">{toCurrency(order?.price_amount)}</span>
              <span
                class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {order?.status == 'finished'
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                  : order?.status == 'waiting' && !order.expired_at
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500'
                    : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'} rounded-full">
                <SvgIcon class="size-2.5" svgHeight={16} slot={order?.is_processed ? checkMarkFilledAlt : warningIcon} />
                {order?.expired_at ? "Expired" : order?.status}
              </span>
            </span>
            {#if order?.description?.includes("Wallet")}
              <span class="block text-sm text-gray-600 dark:text-neutral-400">
                Top Up Amount: <span>{toCurrency(order?.price_amount)}</span>
              </span>
            {/if}

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

        <div class="-m-4 mt-4 flex flex-col gap-y-3 border-t p-4">
          <h3 class="my-2 text-base text-gray-700 dark:text-neutral-400">User Details</h3>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <img class="size-20 rounded-lg" src={order?.app_user?.avatar_url} alt="Avatar" />

            <div class="grow">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-neutral-200">
                  {order?.app_user?.full_name}
                </h3>
                <p class="mt-1 text-xs uppercase text-gray-500 dark:text-neutral-500">
                  {order.app_user?.email}
                </p>
              </div>
              <div class="mt-2 space-x-2.5 sm:mt-auto">
                {order.app_user?.phone}
              </div>
            </div>
          </div>
        </div>

        {#if !order?.description?.includes("Wallet")}
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
        {/if}
      </div>

      {#if !isModal}
        <div class="-m-4 mt-4 flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
          <form action="" method="POST" use:enhance>
            <input type="text" name="orderId" value={order?.id} class="hidden" />
            <LoadingButton class="bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700">
              {#if order.voucher_codes?.length}
                Resend
              {:else}
                Process and Email
              {/if} Vouchers
            </LoadingButton>
          </form>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="-mx-4 -mb-4 mt-4 border-t border-neutral-200 bg-neutral-200/50 p-4 text-sm text-gray-500 dark:border-neutral-700 dark:bg-neutral-600/10">
    <div class="flex items-center justify-center py-6">
      <div class="text-center">
        <div class="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
          <svg class="size-6 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
        </div>

        <h3 class="text-base font-semibold uppercase text-gray-800 dark:text-white">No Vouchers Found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-neutral-400">
          {#if apiError}
            There are currently no voucher codes associated with this order.
          {:else}
            We are having difficulties accessing the API at the moment. Please try again later
          {/if}
        </p>
      </div>
    </div>
  </div>
{/if}
