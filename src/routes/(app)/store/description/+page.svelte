<script>
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
</script>

<div class="container px-4 py-28 lg:py-40">
	<main class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="w-full pr-20">
			<div class="">
				<enhanced:img
					class="h-auto w-full rounded-xl"
					src="$lib/images/games-6.avif?aspect=400:320&fit=cover"
					alt="hero-img-thumb"
				/>
			</div>
		</div>
		<div>
			<div class="w-full">
				<div>
					<div class="title text-black dark:text-white" style="font-size: 40px; font-weight: bold;">
						The Title
					</div>
				</div>
			</div>
			<div class="mt-5 rounded-lg bg-brand-100 p-4">
				<div class="flex flex-col gap-2 sm:gap-4">
					<div
						class="flex items-center rounded-lg border border-solid border-gray-200 bg-white pl-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
					>
						<p class="shrink-0">Email Address :</p>
						<input
							type="text"
							class="grow border-0 bg-transparent py-3 pr-4 text-sm focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-0"
							placeholder="Value will be sent to this email address"
						/>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
					>
						<div class="flex w-full items-center justify-between gap-x-3">
							<div>
								<span class="block text-sm font-medium text-gray-800 dark:text-white">
									Quantity
								</span>
								<span class="block text-xs text-gray-500 dark:text-neutral-400">
									{toCurrency(count * 5)} total
								</span>
							</div>
							<div class="flex items-center gap-x-1.5">
								<button
									type="button"
									class="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-brand-200 bg-white text-sm font-medium text-brand-800 shadow-sm hover:bg-brand-50 focus:bg-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
									tabindex="-1"
									aria-label="Decrease"
									disabled={count <= 0}
									on:click={() => count--}
								>
									{@html plusIcon}
								</button>
								<input
									class="w-6 border-0 bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
									style="-moz-appearance: textfield;"
									type="number"
									aria-roledescription="Number field"
									bind:value={count}
								/>
								<button
									type="button"
									class="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-brand-200 bg-white text-sm font-medium text-brand-800 shadow-sm hover:bg-brand-50 focus:bg-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
									tabindex="-1"
									aria-label="Increase"
									on:click={() => count++}
								>
									{@html minusIcon}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-5 rounded-t-lg bg-brand-100 p-4">
				<div class="py-4">
					<h3 class="text-xl font-medium">Choose a Denomination</h3>
				</div>
				<div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
					{#each Array(10) as item, idx}
						<button
							type="button"
							class="group relative flex h-[6vw] items-center justify-center rounded-lg border border-transparent bg-brand font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              class:selected={selectedDenomination == `btn-${idx}`}
              on:click={() => { selectedDenomination = `btn-${idx}`; } }
						>
							{toCurrency(10 * (item + 1))}
							<span
								class="invisible absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-ee-2xl rounded-ss-md bg-white group-hover:text-brand-600 group-[.selected]:visible"
								>{@html checkPlus}</span
							>
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-5 flex flex-col items-center gap-3 bg-brand-100 p-4">
				<div class="flex w-full items-center justify-around">
					<p class="shrink-0">Payment Method:</p>
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

				<div class="flex flex-col items-center justify-center gap-3 p-4">
					<p class="text-left">
						The platform does not support single brushing or rebates. Please be cautious of fraud
						and do not fill in other people's top-up accounts to prevent scams.
					</p>
					<button
						type="button"
						class="mt-10 inline-flex items-center rounded-lg border border-transparent bg-brand px-10 py-1.5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						style="justify-content: center;"
					>
						Buy Now $ 4,000
					</button>
				</div>
			</div>
		</div>

		<div class="col-span-1 rounded-lg bg-brand-100 p-4 md:col-span-2">
			<div>
				<div>
					<div>
						<div>
							<div class="py-4">
								<h2 class="text-2xl font-bold">Product Description</h2>
							</div>
							<div
								style="transform: translateX(165px) translateX(-50%); transition-duration: 0.3s;"
							></div>
						</div>
					</div>
					<div>
						<div>
							<div class="question-item space-y-4">
								<!-- <h3 class="mb-4">Product Description</h3> -->
								<p>
									Amazon.com Gift Cards* never expire and can be redeemed towards millions of items
									at www.amazon.com
								</p>
								<h3>Redemption</h3>
								<p>To redeem your gift card, follow these steps:</p>
								<p>
									1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visit <a
										href="https://panel.ezpaypin.com/www.amazon.com/redeem"
										rel="noopener noreferrer"
										target="_blank"
										style="color: rgb(3, 155, 229);">www.amazon.com/redeem</a
									>
								</p>
								<p>
									2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter the Claim Code when prompted.
								</p>
								<p>
									3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift card funds will be applied
									automatically to eligible orders during the checkout process.
								</p>
								<p>
									4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You must pay for any remaining balance
									on your order with another payment method.
								</p>
								<p>&nbsp;</p>
								<p>
									Your gift card claim code may also be entered when prompted during checkout. To
									redeem your gift card using the <a
										href="https://www.amazon.com/"
										rel="noopener noreferrer"
										target="_blank"
										style="color: rgb(3, 155, 229);">Amazon.com</a
									> 1-Click® service, first add the gift card funds to Your Account.
								</p>
								<p>
									If you have questions about redeeming your gift card, please visit <a
										href="https://panel.ezpaypin.com/www.amazon.com/gc-redeem"
										rel="noopener noreferrer"
										target="_blank"
										style="color: rgb(3, 155, 229);">www.amazon.com/gc-redeem</a
									>.
								</p>
								<h3>Terms and Conditions</h3>
								<p>Restrictions apply, see amazon.com/gc-legal</p>
								<h3>Legal Disclaimer</h3>
								<p>
									Restrictions apply, see <a
										href="https://panel.ezpaypin.com/amazon.com/gc-legal"
										rel="noopener noreferrer"
										target="_blank"
										style="color: rgb(3, 155, 229);">amazon.com/gc-legal</a
									>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
