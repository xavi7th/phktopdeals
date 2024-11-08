<script>
	import Hero from '$partials/home/Hero.svelte';
	import Services from '$partials/home/Services.svelte';
	import HowItWorks from '$partials/home/HowItWorks.svelte';
	import OurPartners from '$partials/home/OurPartners.svelte';
	import ProductSection from '$partials/home/ProductSection.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({sections, services} = data);
</script>

<main class="flex flex-col flex-auto">
  <Hero />

  {#each Object.entries(sections.top) as [sectionTitle, content]}
    <ProductSection {sectionTitle} {content} />
  {/each}

  <Services {services}/>

  {#each Object.entries(sections.misc) as [sectionTitle, content], idx}
    {#if idx <= 2}
      <ProductSection {sectionTitle} {content} />
    {/if}
  {/each}

  <HowItWorks />

  {#each Object.entries(sections.misc) as [sectionTitle, content], idx}
    {#if idx > 2}
      <ProductSection {sectionTitle} {content} />
    {/if}
  {/each}

  <section class="w-full mt-32">
    <div class="container-fluid lg:container">
      <div class="row flex flex-col-reverse lg:flex-row">
        <div class="flex basis-full md:basis-3/5 flex-col gap-6 text-center md:text-left md:pr-12">
          <h2 class="font-exo-2 mx-4 mt-10 mb-2 text-4xl font-bold text-[#6A6A6A] rtl:mr-6 dark:text-white sm:ml-4">All Cards Purchase</h2>
          <p class="mx-4 text-xl dark:text-brand-600">
            Buy every gift card you need and enjoy special discounts! Gift Cards are perfect for rewarding teams, appreciating clients, or celebrating any occasion.
            Simplify your gifting process with our easy and cost-effective service.
          </p>
          <a href="/store/gift-cards" class="w-fit self-center md:self-end rounded-full bg-brand-600 px-12 py-2 font-semibold text-white">Order Card Now</a>
        </div>
        <div class="basis-full md:basis-2/5 w-4/5 md:w-full mx-auto ">
          <enhanced:img src="$lib/images/orderNow.webp" />
        </div>
      </div>
    </div>
  </section>


  <OurPartners />
</main>
