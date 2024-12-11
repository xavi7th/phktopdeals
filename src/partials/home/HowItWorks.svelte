<script>
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
</script>

<section class="mt-20 w-full">
  <div class="container-fluid">
    <div class="row px-8">
      <div class="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
        <h2 class="text-title relative">
          How It Works

          <SvgIcon svgHeight={25} svgWidth={568} data-static class="absolute -bottom-9 left-1/2 !w-1/4">
            <path data-static opacity="1" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="1" stroke-width="5" stroke-linecap="round" />
          </SvgIcon>
        </h2>
      </div>

      <ul class="relative mx-auto flex flex-wrap items-start gap-x-2 sm:max-w-screen-md sm:flex-row sm:flex-nowrap">
        <li class="group mb-2 flex flex-col">
          <div class="flex flex-1 shrink basis-0 items-center gap-x-2">
            <div class="inline-flex min-h-7 min-w-7 items-center justify-center align-middle text-xs">
              <enhanced:img class="size-20 shrink-0 rounded-md" src="$lib/images/steps/step-1-browse.png?enhance" alt=" icon" />
            </div>
            <div class="hidden h-px w-full flex-1 border border-double border-brand-200 group-last:hidden md:block"></div>
          </div>

          <div class="flex max-w-xs flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">Fund your account</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-neutral-400">From your dashboard select add funds to top up your wallet balance using either Bitcoin, LiteCoin, USDT or your Debit Card</p>
            </div>
          </div>
        </li>

        <li class="group mb-2 flex flex-col">
          <div class="flex flex-1 shrink basis-0 items-center gap-x-2">
            <div class="inline-flex min-h-7 min-w-7 items-center justify-center align-middle text-xs">
              <enhanced:img class="size-20 shrink-0 rounded-md" src="$lib/images/steps/step-2-add-to-cart.png?enhance" alt=" icon" />
            </div>
            <div class="hidden h-px w-full flex-1 border border-double border-brand-200 group-last:hidden md:block"></div>
          </div>

          <div class="flex max-w-xs flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">Browse our Catalog</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-neutral-400">Select a product from our catalog and you will be taken to the product details page to process your order.</p>
            </div>
          </div>
        </li>

        <li class="group mb-2 flex flex-col">
          <div class="flex flex-1 shrink basis-0 items-center gap-x-2">
            <div class="inline-flex min-h-7 min-w-7 items-center justify-center align-middle text-xs">
              <enhanced:img class="size-20 shrink-0 rounded-md" src="$lib/images/steps/step-3-make-payment.png?enhance" alt="partner-img-thumb" />
            </div>
            <div class="hidden h-px w-full flex-1 border border-double border-brand-200 group-last:hidden md:block"></div>
          </div>

          <div class="flex max-w-xs flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">Pay with Wallet</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-neutral-400">Fill in the details of your purchase and accept the payment from your wallet.</p>
            </div>
          </div>
        </li>

        <li class="group mb-2 flex flex-col">
          <div class="flex flex-1 shrink basis-0 items-center gap-x-2">
            <div class="inline-flex min-h-7 min-w-7 items-center justify-center align-middle text-xs">
              <enhanced:img class="size-20 shrink-0 rounded-md" src="$lib/images/steps/step-4-expect-email.png?enhance" alt="partner-img-thumb" />
            </div>
            <div class="h-px w-full flex-1 border border-double border-brand-200 group-last:hidden"></div>
          </div>

          <div class="flex max-w-xs flex-col dark:bg-neutral-900">
            <div class="py-5 pr-6">
              <h3 class="text-md font-bold text-gray-600 dark:text-white">That’s it, Order processed!</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-neutral-400">Your order will be processed immediately and you will be notified via email with your order details.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>
