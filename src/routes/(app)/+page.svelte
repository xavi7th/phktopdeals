<script>
  import { fade } from "svelte/transition";
  import Hero from "$partials/home/Hero.svelte";
  import Services from "$partials/home/Services.svelte";
  import HowItWorks from "$partials/home/HowItWorks.svelte";
  import OurPartners from "$partials/home/OurPartners.svelte";
  import ProductSection from "$partials/home/ProductSection.svelte";

  export let data;

  $: ({ pageData } = data);
</script>

{#snippet skeleton(section)}
  <div class="bg-gray-100 p-8 transition-colors duration-300 dark:bg-gray-900" class:mt-20={section === "hero"} transition:fade>
    <div class="container mx-auto">
      <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {#each { length: 4 } as _, i}
          <div class="animate-pulse" aria-busy="true">
            <div class="h-48 rounded-lg bg-white shadow-md dark:bg-gray-800">
              <div class="p-4">
                <div class="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div class="mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div class="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      {#if section !== "hero"}
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {#each { length: 4 } as _, i}
            <div class="animate-pulse" aria-busy="true">
              <div class="h-48 rounded-lg bg-white shadow-md dark:bg-gray-800">
                <div class="p-4">
                  <div class="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div class="mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div class="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/snippet}

<main class="flex flex-auto flex-col">
  <Hero {pageData} />

  {#await pageData}
    {@render skeleton()}
  {:then pageData}
    {#if pageData?.data?.sections && Object.entries(pageData.data.sections)}
      {#each Object.entries(pageData.data.sections.top) as [sectionTitle, content]}
        <ProductSection {sectionTitle} {content} />
      {/each}

      {#each Object.entries(pageData.data.sections.misc) as [sectionTitle, content], idx}
        {#if idx <= 2}
          <ProductSection {sectionTitle} {content} />
        {/if}
      {/each}

      {#each Object.entries(pageData.data.sections.misc) as [sectionTitle, content], idx}
        {#if idx > 2}
          <ProductSection {sectionTitle} {content} />
        {/if}
      {/each}
    {/if}
  {/await}

  <Services {skeleton} {pageData} />

  <section class="mt-32 w-full">
    <div class="container-fluid lg:container">
      <div class="row flex flex-col-reverse lg:flex-row">
        <div class="flex basis-full flex-col gap-6 text-center md:basis-3/5 md:pr-12 md:text-left">
          <h2 class="font-exo-2 mx-4 mb-2 mt-10 text-4xl font-bold text-[#6A6A6A] sm:ml-4 rtl:mr-6 dark:text-white">All Cards Purchase</h2>
          <p class="mx-4 text-xl dark:text-brand-600">
            Buy every gift card you need and enjoy special discounts! Gift Cards are perfect for rewarding teams, appreciating clients, or celebrating any occasion. Simplify your gifting process with our easy and
            cost-effective service.
          </p>
          <a href="/store/products/gift-cards" class="w-fit self-center rounded-full bg-brand-600 px-12 py-2 font-semibold text-white md:self-end">Order Card Now</a>
        </div>
        <div class="mx-auto w-4/5 basis-full md:w-full md:basis-2/5">
          <enhanced:img src="$lib/images/orderNow.webp" />
        </div>
      </div>
    </div>
  </section>

  <HowItWorks />

  <OurPartners />
</main>

<div>
      <a href="https://wa.me/+2348166272605?text=Hello PHKHotdeals, I need assistance" class="block fixed md:bottom-10 bottom-5 md:right-10 right-5 shadow-sm dark:shadow-neutral-600 rounded-full hover:scale-110 transition-transform duration-150 z-[999]" aria-label="whatsapp" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="md:size-16 size-14" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1faf38"/><stop offset="100%" stop-color="#60d669"/></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"/><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"/></svg>
      </a>
  </div>