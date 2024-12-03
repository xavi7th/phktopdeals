<script>
  import { dev } from "$app/environment";
  import { slide } from "svelte/transition";
  import Toast from "$lib/Components/Toast.svelte";
  import { checkPlus } from "$lib/Components/iconPaths";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { percentageCalculation, toCurrency } from "$lib/helpers";
  import ProcessInvoicePurchase from "./ProcessInvoicePurchase.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingNumericTextInput from "$lib/Components/FormInputs/FloatingNumericTextInput.svelte";

  let selectedDenomination = "btn-0";

  /** @type {import('./$types').PageData} */
  export let data;

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ({ product, user } = data);

  $: $form.unit_price = product?.product_price?.denominations?.length ? Number(product.product_price.denominations[0]) : 0;
  $: $form.product_id = product?.id;
  $: $form.email = user?.email;
  $: totalPurchaseAmount = percentageCalculation($form.unit_price * $form.quantity, product.product_price.commission, product.percentage_discount, true);
</script>

<svelte:head>
  <title>Purchase {product?.product_name} | PHKHotDeals</title>
  <meta name="description" content="Purchase {product.product_name} from PHKHot Deals at very discounted prices. Blazing fast transactions and discreet are assured." />
</svelte:head>

{#if $message}
  <div class="fixed end-3 top-24 z-50 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="container px-4 py-28 lg:py-40">
  <div class="fixed bottom-0 left-0 z-[60] max-w-md">
    <SuperDebug data={{ $message, $form, $errors }} label="My form data" collapsible={true} display={dev} />
  </div>

  <main class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="hidden w-full text-white md:block md:pr-20">
      <div class="h-full">
        <img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb" />
      </div>
    </div>
    <div>
      <div class="grid w-full grid-cols-12 items-center gap-5 overflow-hidden">
        <div class="col-span-3 mb-[30px] block max-h-[170px] md:hidden">
          <img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb" />
        </div>
        <div class="col-span-9">
          <div class="title text-[20px] text-black sm:text-[30px] md:text-[38px] dark:text-white" style="font-weight: bold;">
            {product.product_name}
            <span class="text-base">({product.brand?.name})</span>
          </div>
        </div>
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 pb-8 pt-20 md:px-10 dark:bg-brand-900 dark:text-white">
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">1</span>
        </div>
        <h3 class="pb-6 text-xl font-medium md:text-2xl">Choose a Denomination</h3>
        <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {#each product?.product_price?.denominations?.sort((a, b) => a - b) || [] as amount, idx}
            <button
              type="button"
              class="group relative flex items-center justify-center rounded-lg border border-transparent bg-brand py-5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:text-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              class:selected={selectedDenomination == `btn-${idx}`}
              on:click={() => {
                (selectedDenomination = `btn-${idx}`), ($form.unit_price = Number(amount) || 0);
              }}>
              {percentageCalculation(amount, product.product_price.commission, product.percentage_discount)}
              <span class="invisible absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-ee-2xl rounded-ss-md bg-white text-brand-600 group-[.selected]:visible">
                {@html checkPlus}
              </span>
            </button>
          {/each}
        </div>
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 pb-8 pt-20 md:px-10 dark:bg-brand-900 dark:text-white">
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">2</span>
        </div>
        <div class="flex flex-col gap-2 sm:gap-4">
          {#if !user?.email}
            <FloatingTextInput name="email" type="email" label="Email Address :" placeholder="Value will be sent to this email address" bind:value={$form.email} msg={$errors.email} />
          {/if}

          <FloatingNumericTextInput
            name="quantity"
            label="Quantity"
            size="p-3"
            min={1}
            placeholder={`${toCurrency(totalPurchaseAmount)} per Quantity`}
            bind:value={$form.quantity}
            isError={!!$errors.quantity}
            msg={$errors.quantity}/>
        </div>
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 py-8 md:px-10 dark:bg-brand-900 dark:text-white" transition:slide={{ duration: 500 }}>
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">3</span>
        </div>
        <div class="relative flex min-h-24 items-center justify-center">
          <div class="absolute flex shrink-0 flex-col items-center justify-center gap-3" transition:slide={{ duration: 900 }}>
            <LoadingButton
              class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700"
              {timeout}
              {delayed}
              {submitting}
              disabled={totalPurchaseAmount > user?.wallet_balance || totalPurchaseAmount <= 0}
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="process-invoice-purchase-modal"
              data-hs-overlay="#process-invoice-purchase-modal">
              Pay with Wallet Funds {toCurrency(totalPurchaseAmount)}
            </LoadingButton>

            <ProcessInvoicePurchase data={$form} {totalPurchaseAmount} />

            {#if totalPurchaseAmount > user?.wallet_balance}
              <span class="pb-6 text-end text-sm font-medium text-red-700">You have exceeded your wallet balance of {toCurrency(user?.wallet_balance)}</span>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1 overflow-hidden rounded-xl bg-brand-200 p-4 px-[20px] py-[30px] md:col-span-2 md:px-[30px] dark:bg-brand-900 dark:text-white">
      <div class="overflow-hidden">
        <div>
          <div>
            <div>
              <div class="py-4">
                <h3 class="pb-6 text-xl font-medium md:text-2xl">Product Description / FAQs</h3>
              </div>
              <div style="transform: translateX(165px) translateX(-50%); transition-duration: 0.3s;"></div>
            </div>
          </div>

          {@html product.faqs}
        </div>
      </div>
    </div>
  </main>
</div>

<style lang="scss">
  .payment-steps-id {
    width: clamp(50px, 10vw, 75px);
    height: clamp(50px, 10vw, 65px);

    span {
      font-size: clamp(20px, 4.8vw, 48px);
      line-height: clamp(47px, 10vw, 60px);
    }
  }
</style>
