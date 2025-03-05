<script>
  let { skeleton, pageData } = $props();
</script>

<section class="services mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  <div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
    <h2 class="text-title">What You can do</h2>
    <p class="mt-1 text-gray-600 dark:text-neutral-400">Whatever your needs, our services evolve according to your needs.</p>
  </div>

  <div class="flex items-center justify-center">
    <label class="relative ms-3 min-w-14 text-sm text-gray-500 dark:text-neutral-400">
      <span class="absolute -top-4 start-auto -translate-x-1/2">
        <span class="flex items-center">
          <svg class="-me-6 h-8 w-14" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
              fill="currentColor"
              class="fill-gray-300 dark:fill-neutral-700" />
          </svg>
          <span class="mt-3 inline-block whitespace-nowrap rounded-full bg-brand-600 px-3.5 py-1.5 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white">Check out our active services</span>
        </span>
      </span>
    </label>
  </div>

  {#await pageData}
    {@render skeleton()}
  {:then pageData}
    <div class="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-center">
      {#each pageData.data.services as service}
        <div
          class="service-card flex flex-col rounded-2xl bg-gradient-to-b from-brand-200 p-8 text-center {service.isMobileHidden ? 'hidden lg:block' : ''} {service.isPopular
            ? 'border-2 border-brand-600 shadow-xl dark:border-brand-700'
            : 'border border-gray-200 shadow-md dark:border-neutral-800'}">
          {#if service.isPopular}
            <p class="mb-3">
              <span class="inline-flex items-center gap-1.5 rounded-lg bg-brand-100 px-3 py-1.5 text-xs font-semibold uppercase text-brand-800 dark:bg-brand-600 dark:text-white">Most popular</span>
            </p>
          {/if}

          <h4 class="-mt-6 h-24 stroke-black text-lg font-medium text-gray-600 dark:text-neutral-200">{@html service.icon}</h4>
          <span class="text-xl font-bold text-gray-600 dark:text-neutral-200">{service.title}</span>
          <p class="mt-7 line-clamp-4 text-xs text-gray-500 hover:line-clamp-none dark:text-neutral-500">{service.desc}</p>

          <a
            class="mt-5 inline-flex items-center justify-center gap-x-2 rounded-full border px-4 py-3 text-sm font-medium shadow-sm focus:outline-none disabled:pointer-events-none disabled:opacity-50
              {service.isPopular
              ? 'border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:bg-brand-700'
              : 'border-gray-200 bg-gray-200 text-gray-800 hover:bg-gray-50 focus:bg-gray-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'}"
            href={service.url}>
            {service.cta}
          </a>
        </div>
      {/each}
    </div>
  {:catch error}
    <!-- pageData was rejected -->
  {/await}
</section>

<style lang="scss">
  .service-card {
    --tw-gradient-from-position: 5%;
    --tw-gradient-to-position: 45%;
  }
</style>
