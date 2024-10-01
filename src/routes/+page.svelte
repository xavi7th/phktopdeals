<script>
	import Hero from '$partials/home/Hero.svelte';
	import Services from '$partials/home/Services.svelte';
	import OurPartners from '$partials/home/OurPartners.svelte';
	import HowItWorks from '$partials/home/HowItWorks.svelte';
	import HomeList from '$partials/home/HomeList.svelte';

</script>
<main class="flex flex-col flex-auto">
  <Hero />

  <Services />

  <HomeList title="Hot Deals" list={null} />

  <HomeList title="Games" list={null} />

  <HomeList title="Today's Special" list={null} />

  <HowItWorks />

  <HomeList title="Today's Special" list={null} />

  <OurPartners />
</main>
