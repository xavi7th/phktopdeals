<script>
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

    let count = 0;
</script>

<div class="container py-28 lg:py-40 px-4">
    <div>
      <main class="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
        <div class="w-full pr-20">
            <div class="">
                <enhanced:img class="w-full h-auto rounded-xl" src="$lib/images/games-6.avif?aspect=400:320&fit=cover" alt="hero-img-thumb" />
            </div>
        </div>
        <div>
          <div class="w-full">
            <div>
                <div class="title text-black dark:text-white" style="font-size: 40px; font-weight: bold;">The Title</div>
            </div>
          </div>
          <div class="bg-brand-100 p-4 rounded-lg mt-5">
            <div class="flex flex-col sm:gap-4 gap-2">
              <div class="relative">
                <div class="flex items-center h-full w-[100px] absolute top-[50%] translate-y-[-50%] left-4 rounded-lg overflow-hidden">
                  <p>Your Email: </p>
                </div>
                <input type="text" class="py-3 px-4 pl-[100px] block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50
                disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Your Email">
              </div>
              <div class="relative">
                <div class="flex items-center h-full w-[70px] absolute top-[50%] translate-y-[-50%] left-4 rounded-lg overflow-hidden">
                  <p>Count: </p>
                </div>
                <input type="number" class="py-3 pl-[67px] px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50
                disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Count" bind:value={count}>
                <div class="flex h-[35px] w-[70px] absolute top-[50%] translate-y-[-50%] right-2 rounded-lg overflow-hidden">
                  <button type="button" class="px-2 h-full inline-flex items-center font-medium border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" style="width: 200px; justify-content: center;" on:click={() => count++}>
                    +
                  </button>
                  <button type="button" class="px-2 h-full inline-flex items-center font-medium border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" style="width: 200px; justify-content: center;" disabled={count <= 0 ? true : false} on:click={() => count--}>
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-brand-100 p-4 rounded-t-lg mt-5">
            <div class="flex sm:flex-row flex-col sm:gap-4 gap-2">
              <select id="platform-select" data-hs-select={platformSelectOptions} class="hidden">
                  <option value="">Choose</option>
                  <option value="AF" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/af.png' alt='Af' />"}`}'>
                    Steam
                  </option>
                  <option value="AX" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}'>
                    EA Games
                  </option>
                  <option value="AL" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}'>
                    Battle.net
                  </option>
                  <option value="DZ" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}'>
                    Ubisoft
                  </option>
                  <option value="AS" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}'>
                    American Samoa
                  </option>
              </select>
              <button type="button" class="py-1.5 px-5 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" style="width: 200px; justify-content: center;">
                  Add To Cart
              </button>
            </div>
            <div class="py-2 md:py-3 flex-1 mt-4">
  
              <div class="flex flex-wrap items-start gap-1.5 border-t-2 pt-3">
                {#each Array(10) as item}
                  <span class="inline-flex items-center py-1 px-2 rounded-full text-sm bg-brand-200 text-brand-900 dark:bg-brand-800/30 dark:text-brand-400">10 USDT</span>
                {/each}
              </div>
            </div>
          </div>
          <div class="bg-brand-100 p-4 flex gap-3 items-center">
            <p>Payment Method:</p>
            <select id="platform-select" data-hs-select={platformSelectOptions} class="hidden">
              <option value="">Choose</option>
              <option value="AF" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png' alt='Af' />"}`}' selected>
                Binance
              </option>
              <option value="AX" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}'>
                EA Games
              </option>
              <option value="AL" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}'>
                Battle.net
              </option>
              <option value="DZ" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}'>
                Ubisoft
              </option>
              <option value="AS" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}'>
                American Samoa
              </option>
            </select>
          </div>
          <div class="bg-brand-100 p-4 flex flex-col gap-3 justify-center items-center">
            <p class="text-left">The platform does not support single brushing or rebates. Please be cautious of fraud and do not fill in other people's top-up accounts to prevent scams.</p>
            <button type="button" class="py-1.5 px-10 mt-10 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" style="justify-content: center;">
              Buy Now $ 4,000
            </button>
          </div>
        </div>
      </main>
    </div>
    <div class="bg-brand-100 p-4 rounded-lg">
        <div>
          <div>
            <div>
              <div>
                <div class="py-4">
                  <span class="text-2xl font-bold">Product Description</span>
                </div>
                <div style="transform: translateX(165px) translateX(-50%); transition-duration: 0.3s;"></div>
              </div>
            </div>
            <div>
              <div>
                <div class="question-item space-y-4">
                  <!-- <h3 class="mb-4">Product Description</h3> -->
                  <p>Amazon.com Gift Cards* never expire and can be redeemed towards millions of items at www.amazon.com</p>
                  <h3>Redemption</h3>
                  <p>To redeem your gift card, follow these steps:</p>
                  <p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visit <a href="https://panel.ezpaypin.com/www.amazon.com/redeem" rel="noopener noreferrer" target="_blank" style="color: rgb(3, 155, 229);">www.amazon.com/redeem</a></p>
                  <p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter the Claim Code when prompted.</p>
                  <p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift card funds will be applied automatically to eligible orders during the checkout process.</p>
                  <p>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You must pay for any remaining balance on your order with another payment method.</p>
                  <p>&nbsp;</p>
                  <p>Your gift card claim code may also be entered when prompted during checkout. To redeem your gift card using the <a href="https://www.amazon.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(3, 155, 229);">Amazon.com</a> 1-Click® service, first add the gift card funds to Your Account.</p>
                  <p>If you have questions about redeeming your gift card, please visit <a href="https://panel.ezpaypin.com/www.amazon.com/gc-redeem" rel="noopener noreferrer" target="_blank" style="color: rgb(3, 155, 229);">www.amazon.com/gc-redeem</a>.</p>
                  <h3>Terms and Conditions</h3>
                  <p>Restrictions apply, see amazon.com/gc-legal</p>
                  <h3>Legal Disclaimer</h3>
                  <p>Restrictions apply, see <a href="https://panel.ezpaypin.com/amazon.com/gc-legal" rel="noopener noreferrer" target="_blank" style="color: rgb(3, 155, 229);">amazon.com/gc-legal</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
  