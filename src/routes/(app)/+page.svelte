<script>
	import Hero from '$partials/home/Hero.svelte';
	import Services from '$partials/home/Services.svelte';
	import HowItWorks from '$partials/home/HowItWorks.svelte';
	import OurPartners from '$partials/home/OurPartners.svelte';
	import ProductSection from '$partials/home/ProductSection.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({sections, filters} = data);

</script>
<main class="flex flex-col flex-auto">
  <Hero />

  <Services />

  {#each Object.entries(sections.top) as [sectionTitle, content]}
    <ProductSection {sectionTitle} {content} />
  {/each}

  <HowItWorks />


  {#each Object.entries(sections.misc) as [sectionTitle, content]}
    <ProductSection {sectionTitle} {content} />
  {/each}

  <section class="w-full mt-32">
    <div class="container-fluid lg:container">
      <div class="row flex">
        <div class="flex basis-3/5 flex-col gap-6 pr-12">
          <h2 class="font-exo-2 mx-4 mt-10 mb-2 text-4xl font-bold text-[#6A6A6A] rtl:mr-6 dark:text-white sm:ml-4">All Cards Purchase</h2>
          <p class="mx-4 text-xl">
            Buy every gift card you need and enjoy special discounts! Gift Cards are perfect for rewarding teams, appreciating clients, or celebrating any occasion.
            Simplify your gifting process with our easy and cost-effective service.
          </p>
          <button class="w-fit self-end rounded-[0.25rem] bg-primary-400 px-12 py-2 font-[900] text-[#ffffff]">Order Card Now</button>
        </div>
        <div class="basis-2/5">
          <enhanced:img src="$lib/images/orderNow.webp" />
        </div>
      </div>
    </div>
  </section>


  <OurPartners />
</main>
