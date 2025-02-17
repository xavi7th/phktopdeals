<script>
  import ProcessPayment from './ProcessPayment.svelte';

  export let data;

  $: ({ currencies, wallet_balance } = data);
</script>

<svelte:head>
  <title>Choose Top Up Payment Method | PHKHotDeals</title>
  <meta name="description" content="Choose between manual crypto currency payments or paystack payments to top up your wallet and ensure seamless transactions when making purchases." />
</svelte:head>

<div class="relative">
  <section class="relative lg:min-h-[1000px] pb-80 sm:pb-[35rem] md:pb-96">
    <div class="absolute inset-x-0 bottom-0 z-10 lg:flex">
      <img class="hidden w-full md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png" alt="" />
      <img class="block w-full md:hidden opacity-60" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png" alt="" />
    </div>

    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-80">
      <div class="max-w-xl mx-auto text-center">
        <h1 class="text-2xl font-bold sm:text-4xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 dark:from-brand-300 to-black dark:to-white"> Choose a Payment Method </span>
        </h1>
        <p class="mt-5 text-base dark:text-gray-400 sm:text-lg">
          Top up your wallet easily using our different payment methods. We accept payments in Bitcoin, Ethereum, Litecoin, Bank Deposits, and various Online Payment channels for your convenience.
        </p>

        <div class="max-w-sm mx-auto mt-8 sm:mt-16">
          <div class="space-y-3">
            <div class="overflow-hidden transition-all duration-200 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-gray-200/30 rounded-md hover:bg-gray-100/80 hover:dark:bg-gray-50/20">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div>
                    <input type="radio" name="plan" id="crypto" class="w-5 h-5 text-blue-600 border-gray-500 rounded-full cursor-pointer" />
                  </div>
                  <label for="crypto" class="ml-5 mr-auto cursor-pointer">
                    <p class="text-xl text-left font-semibold text-black dark:text-gray-300">Crypto Payments</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Minimum deposit amount of $50 made using BTC, ETH or LTC cryptocurrencies</p>
                  </label>
                </div>
              </div>
            </div>

            <div class="overflow-hidden transition-all duration-200 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-gray-200/30 rounded-md hover:bg-gray-100/80 hover:dark:bg-gray-50/20">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div>
                    <input type="radio" name="plan" id="manual-paymernts" class="w-5 h-5 text-blue-600 border-gray-500 rounded-full cursor-pointer" />
                  </div>
                  <label for="manual-paymernts" class="ml-5 mr-auto cursor-pointer">
                    <p class="text-xl text-left font-semibold text-black dark:text-gray-300">Manual Bank Deposits</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Make payments to out bank accounts manually and notify us. We will top up your account once payment has been confirmed</p>
                  </label>
                  <span class="inline-block px-4 py-2 text-sm font-semibold text-brand-600 bg-brand-100 border border-brand-600 rounded-lg leading-none"> <span class="text-nowrap">5 - 24</span> hours </span>
                </div>
              </div>
            </div>

            <div class="overflow-hidden transition-all duration-200 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-gray-200/30 rounded-md hover:bg-gray-100/80 hover:dark:bg-gray-50/20">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div>
                    <input type="radio" name="plan" id="paystack" class="w-5 h-5 text-blue-600 border-gray-500 rounded-full cursor-pointer" />
                  </div>
                  <label for="paystack" class="ml-5 mr-auto cursor-pointer">
                    <p class="text-xl text-left font-semibold text-black dark:text-gray-300">Online Payments</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Automatic payments. Wallet top up is processed instantaneously.</p>
                  </label>
                  <span class="inline-block px-4 py-2 text-sm font-semibold text-green-600 bg-green-100 border border-green-600 rounded-full"> Instant </span>
                </div>
              </div>
            </div>
          </div>

          <ProcessPayment data={data.form} {currencies} {wallet_balance} />
        </div>

        <div class="grid grid-cols-1 px-20 mt-12 text-left gap-x-12 gap-y-8 sm:grid-cols-2 sm:px-0">
          <div class="flex items-center">
            <svg class="flex-shrink-0" width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.1667 14.187H20.3333C17.6637 14.187 15.5 16.3507 15.5 19.0203V19.8258C15.5 19.8258 18.0174 20.6314 22.75 20.6314C27.4826 20.6314 30 19.8258 30 19.8258V19.0203C30 16.3507 27.8363 14.187 25.1667 14.187Z"
                stroke="#28CC9D"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.7227 6.9369C18.7227 4.71276 20.5263 2.90912 22.7504 2.90912C24.9746 2.90912 26.7782 4.71276 26.7782 6.9369C26.7782 9.16104 24.9746 11.7702 22.7504 11.7702C20.5263 11.7702 18.7227 9.16104 18.7227 6.9369Z"
                stroke="#28CC9D"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.2231 15.8512H7.11157C3.73595 15.8512 1 18.5871 1 21.9628V22.9814C1 22.9814 4.18311 24 10.1674 24C16.1516 24 19.3347 22.9814 19.3347 22.9814V21.9628C19.3347 18.5871 16.5988 15.8512 13.2231 15.8512Z"
                fill="#0B1715"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.07422 6.68386C5.07422 3.87152 7.35485 1.59088 10.1672 1.59088C12.9795 1.59088 15.2602 3.87152 15.2602 6.68386C15.2602 9.4962 12.9795 12.7954 10.1672 12.7954C7.35485 12.7954 5.07422 9.4962 5.07422 6.68386Z"
                fill="#0B1715"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="ml-3 text-sm dark:text-gray-50">Over 100 wallet top up processed</p>
          </div>

          <div class="flex items-center">
            <svg class="flex-shrink-0" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 11H3C1.89543 11 1 11.8954 1 13V21C1 22.1046 1.89543 23 3 23H17C18.1046 23 19 22.1046 19 21V13C19 11.8954 18.1046 11 17 11Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"
                stroke="#28CC9D"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 7V6C15.0131 4.68724 14.5042 3.42303 13.5853 2.48539C12.6664 1.54776 11.4128 1.01346 10.1 1H10C8.68724 0.986939 7.42303 1.4958 6.48539 2.41469C5.54776 3.33357 5.01346 4.58724 5 5.9V7"
                stroke="#28CC9D"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="ml-3 text-sm dark:text-gray-50">Secured & safe online payment</p>
          </div>
        </div>
      </div>
    </div>
  </section>


</div>
