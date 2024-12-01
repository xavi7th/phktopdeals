<script>
  import Hero from "$partials/home/Hero.svelte";
  import Services from "$partials/home/Services.svelte";
  import HowItWorks from "$partials/home/HowItWorks.svelte";
  import OurPartners from "$partials/home/OurPartners.svelte";
  import ProductSection from "$partials/home/ProductSection.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({ sections, services } = data);
</script>

<main class="flex flex-auto flex-col">
  <Hero />

  {#if sections && Object.entries(sections)}
    {#each Object.entries(sections.top) as [sectionTitle, content]}
      <ProductSection {sectionTitle} {content} />
    {/each}

    {#each Object.entries(sections.misc) as [sectionTitle, content], idx}
      {#if idx <= 2}
        <ProductSection {sectionTitle} {content} />
      {/if}
    {/each}

    {#each Object.entries(sections.misc) as [sectionTitle, content], idx}
      {#if idx > 2}
        <ProductSection {sectionTitle} {content} />
      {/if}
    {/each}
  {/if}

  <Services {services} />

  <section class="mt-32 w-full">
    <div class="container-fluid lg:container">
      <div class="row flex flex-col-reverse lg:flex-row">
        <div class="flex basis-full flex-col gap-6 text-center md:basis-3/5 md:pr-12 md:text-left">
          <h2 class="font-exo-2 mx-4 mb-2 mt-10 text-4xl font-bold text-[#6A6A6A] sm:ml-4 rtl:mr-6 dark:text-white">All Cards Purchase</h2>
          <p class="mx-4 text-xl dark:text-brand-600">
            Buy every gift card you need and enjoy special discounts! Gift Cards are perfect for rewarding teams, appreciating clients, or celebrating any occasion. Simplify your gifting process with our easy and
            cost-effective service.
          </p>
          <a href="/store/gift-cards" class="w-fit self-center rounded-full bg-brand-600 px-12 py-2 font-semibold text-white md:self-end">Order Card Now</a>
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
