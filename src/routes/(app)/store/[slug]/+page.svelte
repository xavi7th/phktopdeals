<script>
  import { dev } from '$app/environment';
	import { slide } from 'svelte/transition';
	import Toast from '$lib/Components/Toast.svelte';
	import { percentageCalculation } from '$lib/helpers';
  import { checkPlus } from '$lib/Components/iconPaths';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
	import FloatingNumericTextInput from '$lib/Components/FormInputs/FloatingNumericTextInput.svelte';
	import FloatingSearchableSelectInput from '$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte';

	let selectedDenomination = 'btn-0';

  /** @type {import('./$types').PageData} */
  export let data;

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ({product, user} = data);

  $: $form.unit_price = product?.product_price?.denominations?.length ? Number(product.product_price.denominations[0]) : 0;
  $: $form.product_id = product?.id;
  $: $form.email = user?.email;

</script>

<svelte:head>
  <title>Purchase {product?.product_name} | PHKHotDeals</title>
  <meta name="description" content="Purchase {product.product_name} from PHKHot Deals at very discounted prices. Blazing fast transactions and discreet are assured.">
</svelte:head>


{#if $message}
  <div class="fixed top-24 z-50 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<div class="container px-4 py-28 lg:py-40">

  <div class="max-w-md fixed left-0 bottom-0 z-[60]">
    <SuperDebug data={{$message, $form, $errors}} label="My form data" collapsible={true} display={dev} />
  </div>

	<main class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="w-full md:pr-20 md:block hidden text-white">
			<div class="h-full">
				<img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb"/>
			</div>
		</div>
		<div>
			<div class="grid grid-cols-12 gap-5 items-center w-full overflow-hidden">
				<div class="md:hidden block max-h-[170px] col-span-3 mb-[30px]">
					<img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb"/>
				</div>
				<div class="col-span-9">
					<div class="title text-black dark:text-white md:text-[38px] sm:text-[30px] text-[20px]" style="font-weight: bold;">
						{product.product_name} <span class="text-base">({product.brand?.name})</span>
					</div>
				</div>
			</div>

      <div class="relative mt-5 rounded-xl rounded-ss-3xl dark:text-white bg-brand-200 dark:bg-brand-900 md:px-10 pt-20 pb-8 overflow-hidden">
        <div class="payment-steps-id rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 absolute top-0 left-0 text-center">
          <span class="text-white font-bold md:font-extrabold">1</span>
        </div>
				<div class="flex flex-col gap-2 sm:gap-4">
					<div
						class="flex items-center rounded-lg border border-solid border-gray-200 bg-white p-3 pl-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 overflow-hidden"
					>
						<p class="shrink-0">Email Address :</p>
						<input
							type="text"
							class="grow border-0 bg-transparent py-3 pr-4 text-sm focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-0"
							placeholder="Value will be sent to this email address"
						/>
					</div>

					<FloatingNumericTextInput name="quantity" label="Quantity" size="p-3" min={1} placeholder={`${ percentageCalculation(selectedDenominationAmount, product.product_price.commission, product.percentage_discount) } per Quantity`} bind:value={selectedQuantity}/>
				</div>
			</div>

			<div class="relative mt-5 rounded-xl rounded-ss-3xl dark:text-white bg-brand-200 dark:bg-brand-900 md:px-10 pt-20 pb-8 overflow-hidden">
        <div class="payment-steps-id rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 absolute top-0 left-0 text-center">
          <span class="text-white font-bold md:font-extrabold">2</span>
        </div>
        <h3 class="text-xl md:text-2xl pb-6 font-medium">Choose a Denomination</h3>
				<div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
					{#each product?.product_price?.denominations?.sort((a, b) => a - b) || [] as amount, idx}
						<button
							type="button"
							class="group relative flex py-5 items-center justify-center rounded-lg border border-transparent bg-brand font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:text-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              class:selected={selectedDenomination == `btn-${idx}`}
              on:click={() => { selectedDenomination = `btn-${idx}`, $form.unit_price = Number(amount) || 0; } }
						>
							{ percentageCalculation(amount, product.product_price.commission, product.percentage_discount) }
							<span class="invisible absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-ee-2xl rounded-ss-md bg-white text-brand-600 group-[.selected]:visible">
                {@html checkPlus}
              </span>
						</button>
					{/each}
				</div>
			</div>

			<div class="relative mt-5 rounded-xl rounded-ss-3xl dark:text-white bg-brand-200 dark:bg-brand-900 md:px-10 pt-20 pb-8 overflow-hidden">
        <div class="payment-steps-id rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 absolute top-0 left-0 text-center">
          <span class="text-white font-bold md:font-extrabold">2</span>
        </div>
				<div class="flex flex-col gap-2 sm:gap-4">
          {#if ! user?.email}
            <FloatingTextInput name="email" type="email" label="Email Address :" placeholder="Value will be sent to this email address" bind:value={$form.email} msg={$errors.email}/>
          {/if}

					<FloatingNumericTextInput name="quantity" label="Quantity" size="p-3" min={1} placeholder={`${ percentageCalculation($form.unit_price, product.product_price.commission, product.percentage_discount) } per Quantity`} bind:value={$form.quantity} isError={ !! $errors.quantity} msg={$errors.quantity}/>
				</div>
			</div>

			<div class="relative mt-5 rounded-xl rounded-ss-3xl dark:text-white bg-brand-200 dark:bg-brand-900 md:px-10 pt-20 pb-8">
        <div class="payment-steps-id rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 absolute top-0 left-0 text-center">
          <span class="text-white font-bold md:font-extrabold">3</span>
        </div>
				<div class="flex flex-col w-full gap-8 justify-between">
					<h3 class="text-xl md:text-2xl font-medium">Select Payment Method</h3>

          <FloatingSearchableSelectInput label="Product Type" options={['Crypto']} bind:value={$form.payment_method} hasSearch={false}/>

          <div class="text-sm text-red-800 p-4 dark:text-red-500" role="alert" tabindex="-1" aria-labelledby="hs-with-list-label">
            <div class="ms-4">
              <h3 class="text-sm font-semibold">
                NOTE:
              </h3>
              <p class="mt-2 text-sm text-red-700 dark:text-red-400">
                This platform does not support single brushing or rebates. Please be cautious of fraud and do not fill in other people's top-up accounts to prevent being scammed.
              </p>
            </div>
          </div>
				</div>
      </div>


      {#if $form.payment_method}
        <div class="relative mt-5 rounded-xl rounded-ss-3xl dark:text-white bg-brand-200 dark:bg-brand-900 md:px-10 py-8 overflow-hidden" transition:slide={{duration: 500}}>
          <div class="payment-steps-id rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 absolute top-0 left-0 text-center">
            <span class="text-white font-bold md:font-extrabold">4</span>
          </div>
          <div class="relative min-h-24 flex justify-center items-center">
            {#if $form.payment_method === 'crypto'}
              <div class="absolute shrink-0 flex flex-col items-center justify-center gap-3" transition:slide={{ duration: 900 }}>
                <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" {timeout} {delayed} {submitting}>
                  Pay with Crypto { percentageCalculation($form.unit_price * $form.quantity, product.product_price.commission, product.percentage_discount) }
                </LoadingButton>
              </div>
            {:else if $form.payment_method === 'bank payment'}
              <div class="absolute shrink-0 flex flex-col items-center justify-center gap-3" transition:slide={{ duration: 900 }}>
                <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" {timeout} {delayed} {submitting}>
                  Pay with Bank Transfer { percentageCalculation($form.unit_price * $form.quantity, product.product_price.commission, product.percentage_discount) }
                </LoadingButton>
              </div>
            {/if}
          </div>
        </div>
      {/if}

		</div>

		<div class="col-span-1 rounded-xl dark:text-white bg-brand-200 dark:bg-brand-900 p-4 md:col-span-2 py-[30px] md:px-[30px] px-[20px] overflow-hidden">
			<div class="overflow-hidden">
				<div>
					<div>
						<div>
							<div class="py-4">
								<h3 class="text-xl md:text-2xl pb-6 font-medium">Product Description / FAQs</h3>
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

    span{
      font-size: clamp(20px, 4.8vw, 48px);
      line-height: clamp(47px, 10vw, 60px);
    }
  }
</style>
