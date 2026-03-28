<script>
  import heroImg from "$lib/images/static-page-hero.webp";

  let { title, subtitle = undefined } = $props();
</script>

<section class="page-hero relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gray-900 sm:min-h-[320px]">
  <img
    class="absolute inset-0 h-full w-full object-cover"
    src={heroImg}
    alt=""
    aria-hidden="true" />
  <div class="absolute inset-0 bg-black/60"></div>

  <div class="relative z-10 mx-auto w-full max-w-[85rem] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
    <div class="mx-auto mb-4 h-1 w-16 rounded-full bg-brand-400"></div>
    <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h1>
    {#if subtitle}
      <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>
    {/if}
  </div>
</section>
