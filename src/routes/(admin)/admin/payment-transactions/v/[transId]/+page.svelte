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

  $: ({ transaction } = data);
</script>

{#if form?.message}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={false} type={form?.message?.type} msg={form?.message?.msg} />
  </div>
{/if}

<div class="{isModal ? 'block w-full' : 'flex'} justify-center">
  <div class="{isModal ? 'rounded-none' : 'rounded-lg'} border border-gray-200 bg-slate-50 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-md dark:shadow-neutral-700/40">
    <div class="-m-4 flex items-center justify-between border-b border-gray-200 p-4 dark:border-neutral-700">
      <h2 class="text-base font-normal text-gray-800 dark:text-gray-400">
        <span class="text-base font-light">Transaction ID:</span>
        <span class="font-bold uppercase">#{transaction?.payment_reference}</span>
      </h2>
    </div>
    <div class="mt-4">
      <div class="flex items-center gap-x-3">
        <img class="inline-block size-[38px] rounded-full" src={transaction?.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
        <div class="flex grow flex-col gap-y-1.5">
          <span class="block text-wrap text-lg font-semibold text-gray-700 dark:text-neutral-300">
            {transaction?.description || "N/A"}
            {#if !transaction?.description?.includes("Wallet")}
              purchase
            {/if}
          </span>

          <span class="block text-base font-semibold text-gray-800 dark:text-neutral-400">
            Amount: <span class="font-semibold">{toCurrency(transaction?.price_amount)}</span>
            <span
              class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {transaction.status == 'finished' || transaction.status == 'confirmed'
                ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                : transaction.status == 'waiting' && !transaction.expired_at
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500'
                  : transaction.status == 'processing' || transaction.status == 'sending'
                    ? 'bg-purple-200 text-purple-800 dark:bg-purple-500/10 dark:text-purple-500'
                    : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'} rounded-full">
              <SvgIcon class="size-2.5" svgHeight={16} slot={transaction.is_processed ? checkMarkFilledAlt : warningIcon} />
              {transaction?.expired_at ? "Expired" : transaction?.status}
            </span>
          </span>
          {#if transaction?.description?.includes("Wallet")}
            <span class="block text-sm text-gray-600 dark:text-neutral-400">
              Top Up Amount: <span>{toCurrency(transaction?.price_amount)}</span>
            </span>
          {/if}

          <span class="block text-sm text-gray-600 dark:text-neutral-400">
            Pay Amount: <span>{toCurrency(transaction?.pay_amount, transaction?.pay_currency?.toUpperCase())}</span>
          </span>
          <span class="block text-sm text-gray-600 dark:text-neutral-400">
            Payment Method: <span>{transaction?.payment_method?.toUpperCase()?.replaceAll("_", " ")}</span>
          </span>
          {#if transaction.is_confirmed}
            <span class="block text-sm text-gray-600 dark:text-neutral-400">
              Date of Confirmation: <span>{new Date(transaction.payment_confirmed_at || '').toLocaleDateString() + " " + new Date(transaction.payment_confirmed_at || '').toLocaleTimeString()}</span>
            </span>
          {/if}
          {#if transaction?.expired_at}
            <span class="block text-wrap text-sm text-red-600 dark:text-red-600">
              <span class="font-sem-bold text-red-600">Expired:</span>
              {new Date(transaction?.expired_at)?.toLocaleDateString()}
            </span>
          {/if}
        </div>
      </div>

      <div class="-m-4 mt-4 flex flex-col gap-y-3 border-t p-4">
        <h3 class="my-2 text-base text-gray-700 dark:text-neutral-400">User Details</h3>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <img class="size-20 rounded-lg" src={transaction?.app_user?.avatar_url} alt="Avatar" />

          <div class="grow">
            <div>
              <h3 class="font-medium text-gray-800 dark:text-neutral-200">
                {transaction?.app_user?.full_name}
              </h3>
              <p class="mt-1 text-xs uppercase text-gray-500 dark:text-neutral-500">
                {transaction.app_user?.email}
              </p>
            </div>
            <div class="mt-2 space-x-2.5 sm:mt-auto">
              {transaction.app_user?.phone}
            </div>
          </div>
        </div>
      </div>

      {#if transaction?.transaction_type?.includes("purchase")}
        <div class="-mx-4 -mb-4 mt-4 border-t border-neutral-200 bg-neutral-200/50 p-2 text-sm text-gray-500 dark:border-neutral-700 dark:bg-neutral-600/10">
          <div class="flex">
            <div class="ms-3">
              <h3 class="mb-4 text-base font-semibold uppercase text-brand-800 dark:font-medium dark:text-white">Product Details</h3>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <img class="size-20 rounded-lg" src={transaction?.product?.product_image_url} alt="Product" />

                <h3 class="grow font-medium text-gray-800 dark:text-neutral-200">
                  {transaction?.product?.product_name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    {#if !isModal && !transaction.is_confirmed && !transaction?.expired_at && transaction.status !== 'refunded' && transaction.status !== 'finished'}
      <div class="-m-4 mt-4 flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
        <form action="" method="POST" use:enhance>
          <input type="text" name="transactionId" value={transaction?.id} class="hidden" />
          <LoadingButton class="bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700">
            Confirm Payment
          </LoadingButton>
        </form>
      </div>
    {/if}
  </div>
</div>
