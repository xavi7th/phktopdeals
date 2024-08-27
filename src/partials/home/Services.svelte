<script>
  import { eSimIcon, gamesIcon, giftCardIcon, softwareIcon, topUpIcon } from "$lib/Components/iconPaths";

  /** @type {import('$lib/types').Service[]} */
  let services = [
    {
      title: 'Top Up',
      desc: 'Shop with cryptos online! Recharge utilities and mobile balances using cryptocurrencies. Available in 165+ countries',
      cta: 'Top Up Now',
      icon: topUpIcon,
      url: '/shop',
      isPopular: false,
    },
    {
      title: 'eSims',
      desc: 'Explore our diverse range of eSIMs - local, global, and regional packages, all at the most competitive prices',
      cta: 'Learn More',
      icon: eSimIcon,
      url: '/shop',
      isPopular: false,
    },
    {
      title: 'Gift Cards',
      desc: 'Explore a vast selection of everyday vouchers. Experience the ease and security of online shopping with cryptos',
      cta: 'Discover Products',
      icon: giftCardIcon,
      url: '/shop',
      isPopular: true,
    },
    {
      title: 'Games',
      desc: 'Instantly buy games with cryptocurrency (Steam, PlayStation, Nintendo, Xbox, etc). Online shop with Binance Pay is now supported in our store',
      cta: 'Buy Now',
      icon: gamesIcon,
      url: '/shop',
      isPopular: false,
    },
    {
      title: 'Softwares',
      desc: 'Unlock a vast software range for Windows, Mac, and Linux using cryptos. Online shop with Coinbase now supported',
      cta: 'Learn More',
      icon: softwareIcon,
      url: '/shop',
      isPopular: false,
    },
  ]
</script>

<section class="services max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 class="text-title">What You can do</h2>
    <p class="mt-1 text-gray-600 dark:text-neutral-400">Whatever your needs, our services evolve according to your needs.</p>
  </div>

  <div class="flex justify-center items-center">
    <label class="relative min-w-14 text-sm text-gray-500 ms-3 dark:text-neutral-400">
      <span class="absolute -top-4 start-auto -translate-x-1/2">
        <span class="flex items-center">
          <svg class="w-14 h-8 -me-6" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z" fill="currentColor" class="fill-gray-300 dark:fill-neutral-700"/>
          </svg>
          <span class="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold tracking-wide uppercase bg-brand-600 text-white rounded-full py-1.5 px-3.5">Check out our active services</span>
        </span>
      </span>
    </label>
  </div>

  <div class="mt-24 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:items-center">

    {#each services as service}
      <div class="service-card flex flex-col text-center rounded-2xl p-8 bg-gradient-to-b from-brand-200 {service.isPopular ? 'border-2 dark:border-brand-700 border-brand-600 shadow-xl' : 'border border-gray-200 dark:border-neutral-800 shadow-md'}">

        {#if service.isPopular}
          <p class="mb-3">
            <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-brand-100 text-brand-800 dark:bg-brand-600 dark:text-white">Most popular</span>
          </p>
        {/if}

        <h4 class="font-medium text-lg text-gray-600 dark:text-neutral-200 h-24 -mt-6 stroke-black">{@html service.icon}</h4>
        <span class="font-bold text-xl text-gray-600 dark:text-neutral-200">{service.title}</span>
        <p class="mt-7 text-xs text-gray-500 dark:text-neutral-500 line-clamp-4 hover:line-clamp-none"> {service.desc}</p>

        <a class="rounded-full mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium border shadow-sm disabled:opacity-50 disabled:pointer-events-none focus:outline-none
        {service.isPopular ? 'border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:bg-brand-700'
            : 'text-gray-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 border-gray-200 dark:border-neutral-700 bg-gray-200 focus:bg-gray-50 hover:bg-gray-50 dark:bg-transparent'}" href={service.url}>
          {service.cta}
        </a>

      </div>
    {/each}

  </div>

</section>


<style lang="scss">
  .service-card{
    --tw-gradient-from-position: 5%;
    --tw-gradient-to-position: 45%;
  }
</style>
