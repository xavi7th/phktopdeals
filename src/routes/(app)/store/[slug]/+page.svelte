<script>
	import FloatingNumericTextInput from '$lib/Components/FormInputs/FloatingNumericTextInput.svelte';
	import { checkPlus, minusIcon, plusIcon } from '$lib/Components/iconPaths';
	import { toCurrency } from '$lib/helpers';

	let platformSelectOptions = `{
        "hasSearch": true,
        "searchPlaceholder": "Search...",
        "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
        "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
        "placeholder": "Select Platform ...",
        "toggleTag": "<button type='button' aria-expanded='false'><span class='me-2' data-icon></span><span class='text-gray-800 dark:text-neutral-200' data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full lg:w-72 flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
        "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
        "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
        "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
    }`;

	let count = 0, selectedDenomination = 'btn-0';

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({product} = data);
  $: selectedDenominationAmount = product?.product_price?.denominations.length ? product.product_price.denominations[0] : 0;

</script>

<div class="container px-4 py-28 lg:py-40">
	<main class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="w-full md:pr-20 md:block hidden text-white">
			<div class="h-full">
				<img
					class="w-full rounded-xl"
					src={product.product_image_url}
					alt="hero-img-thumb"
				/>
			</div>
		</div>
		<div>
			<div class="grid grid-cols-12 gap-5 items-center w-full overflow-hidden">
				<div class="md:hidden block max-h-[170px] col-span-3 mb-[30px]">
					<img
						class="w-full rounded-xl"
						src={product.product_image_url}
						alt="hero-img-thumb"
					/>
				</div>
				<div class="col-span-9">
					<div class="title text-black dark:text-white md:text-[38px] sm:text-[30px] text-[20px]" style="font-weight: bold;">
						{product.product_name}
					</div>
				</div>
			</div>
			<div class="mt-5 rounded-xl dark:text-white bg-brand-200 dark:bg-brand-900 py-[30px] md:px-[30px] px-[20px] overflow-hidden">
				<div class="flex flex-col gap-2 sm:gap-4">
					<div
						class="flex items-center rounded-lg border border-solid border-gray-200 bg-white pl-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 overflow-hidden"
					>
						<p class="shrink-0">Email Address :</p>
						<input
							type="text"
							class="grow border-0 bg-transparent py-3 pr-4 text-sm focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-0"
							placeholder="Value will be sent to this email address"
						/>
					</div>

					<FloatingNumericTextInput name="quantity" label="Quantity" placeholder={`${toCurrency(selectedDenominationAmount)} per Quantity`} />
				</div>
			</div>

			<div class="mt-5 rounded-xl dark:text-white bg-brand-200 dark:bg-brand-900 py-[30px] md:px-[30px] px-[20px] overflow-hidden">
				<div class="py-4">
					<h3 class="md:text-xl text-[18px] font-medium">Choose a Denomination</h3>
				</div>
				<div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
					{#each product.product_price.denominations as item, idx}
						<button
							type="button"
							class="group relative flex py-5 items-center justify-center rounded-lg border border-transparent bg-brand font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:text-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              				class:selected={selectedDenomination == `btn-${idx}`}
             				on:click={() => { selectedDenomination = `btn-${idx}`, selectedDenominationAmount = item; } }
						>
							{toCurrency(item)}
							<span
								class="invisible absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-ee-2xl rounded-ss-md bg-white text-brand-600 group-[.selected]:visible"
								>{@html checkPlus}</span
							>
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-5 flex rounded-xl flex-col items-center gap-3 dark:text-white bg-brand-200 dark:bg-brand-900 py-[30px] md:px-[30px] px-[18px] overflow-hidden">
				<div class="flex w-full items-center justify-between">
					<h2 class="shrink-0 md:text-xl text-[18px]">Payment Method:</h2>
					<select id="platform-select" data-hs-select={platformSelectOptions} class="hidden grow">
						<option value="">Choose</option>
						<option
							value="AF"
							data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png' alt='Af' />"}`}
							selected
						>
							Binance
						</option>
						<option
							value="AX"
							data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}
						>
							EA Games
						</option>
						<option
							value="AL"
							data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}
						>
							Battle.net
						</option>
						<option
							value="DZ"
							data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}
						>
							Ubisoft
						</option>
						<option
							value="AS"
							data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}
						>
							American Samoa
						</option>
					</select>
				</div>

				<div class="flex flex-col items-center justify-center gap-3">
					<p class="text-left">
						The platform does not support single brushing or rebates. Please be cautious of fraud
						and do not fill in other people's top-up accounts to prevent scams.
					</p>
					<button
						type="button"
						class="mt-10 inline-flex items-center rounded-lg border border-transparent bg-brand px-10 py-1.5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						style="justify-content: center;"
					>
						Buy Now {toCurrency(selectedDenominationAmount * count)}
					</button>
				</div>
			</div>
		</div>

		<div class="col-span-1 rounded-xl dark:text-white bg-brand-200 dark:bg-brand-900 p-4 md:col-span-2 py-[30px] md:px-[30px] px-[20px] overflow-hidden">
			<div class="overflow-hidden">
				<div>
					<div>
						<div>
							<div class="py-4">
								<h2 class="md:text-xl text-[18px]">Product Description</h2>
							</div>
							<div
								style="transform: translateX(165px) translateX(-50%); transition-duration: 0.3s;"
							></div>
						</div>
					</div>
					{@html product.faqs}
				</div>
			</div>
		</div>
	</main>
</div>
