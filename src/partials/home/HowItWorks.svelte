<script>
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
</script>

<section class="w-full mt-20">
  <div class="container-fluid">
    <div class="row px-8">

      <div class="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
        <h2 class="text-title relative">
          How It Works

          <SvgIcon svgHeight={25} svgWidth={568} data-static class="absolute !w-1/4 -bottom-9 left-1/2">
            <path data-static opacity="1" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="1" stroke-width="5" stroke-linecap="round"/>
          </SvgIcon>
        </h2>
      </div>

      <ul class="relative flex sm:flex-row  sm:flex-nowrap flex-wrap gap-x-2 items-start sm:max-w-screen-md mx-auto">

        <li class="flex flex-col group mb-2">
          <div class="flex items-center gap-x-2 shrink basis-0 flex-1">
            <div class="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
              <enhanced:img class="shrink-0 size-20 rounded-md" src="$lib/images/steps/step-1-browse.png?enhance" alt=" icon" />
            </div>
            <div class="md:block hidden w-full h-px flex-1 border border-double border-brand-200 group-last:hidden"></div>
          </div>

          <div class="max-w-xs flex flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">
                Fund your account
              </h3>
              <p class="mt-2 text-gray-500 dark:text-neutral-400 text-sm">
                From your dashboard select add funds to top up your wallet balance using either Bitcoin, LiteCoin, USDT or your Debit Card
              </p>
            </div>
          </div>
        </li>

        <li class="flex flex-col group mb-2">
          <div class="flex items-center gap-x-2 shrink basis-0 flex-1">
            <div class="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
              <enhanced:img class="shrink-0 size-20 rounded-md" src="$lib/images/steps/step-2-add-to-cart.png?enhance" alt=" icon" />
            </div>
            <div class="md:block hidden w-full h-px flex-1 border border-double border-brand-200 group-last:hidden"></div>
          </div>

          <div class="max-w-xs flex flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">
                Browse our Catalog
              </h3>
              <p class="mt-2 text-gray-500 dark:text-neutral-400 text-sm">
                Select a product from our catalog and you will be taken to the product details page to process your order.
              </p>
            </div>
          </div>
        </li>

        <li class="flex flex-col group mb-2">
          <div class="flex items-center gap-x-2 shrink basis-0 flex-1">
            <div class="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
              <enhanced:img class="shrink-0 size-20 rounded-md" src="$lib/images/steps/step-3-make-payment.png?enhance" alt="partner-img-thumb" />
            </div>
            <div class="md:block hidden w-full h-px flex-1 border border-double border-brand-200 group-last:hidden"></div>
          </div>

          <div class="max-w-xs flex flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">
                Pay with Wallet
              </h3>
              <p class="mt-2 text-gray-500 dark:text-neutral-400 text-sm">
                Fill in the details of your purchase and accept the payment from your wallet.
              </p>
            </div>
          </div>
        </li>

        <li class="flex flex-col group mb-2">
          <div class="flex items-center gap-x-2 shrink basis-0 flex-1">
            <div class="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
              <enhanced:img class="shrink-0 size-20 rounded-md" src="$lib/images/steps/step-4-expect-email.png?enhance" alt="partner-img-thumb" />
            </div>
            <div class="w-full h-px flex-1 border border-double border-brand-200 group-last:hidden"></div>
          </div>

          <div class="max-w-xs flex flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">
                That’s it, Order processed!
              </h3>
              <p class="mt-2 text-gray-500 dark:text-neutral-400 text-sm">
                Your order will be processed immediately and you will be notified via email with your order details.
              </p>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </div>
</section>
