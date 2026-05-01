<script>
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { clearCachePattern } from "$lib/cache";

  let { data } = $props();
  let { user, message } = $derived(data);

  onMount(async () => {
    if (!browser) return;
    const productId = page.url.searchParams.get("productId");
    if (productId) {
      await clearCachePattern(`api:GET:products/${productId}`);
    }
  });
</script>

<main class="container">
  <div class="row">
    <section class="py-18 cols-12 flex h-[90dvh] flex-col items-center justify-center gap-y-12 lg:py-20">
      <svg viewBox="0 0 24 24" class="w-[90px] sm:w-[150px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M8.5 12.5L10.5 14.5L15.5 9.5" class="stroke-black dark:stroke-white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
            stroke-width="1.5"
            stroke-linecap="round"
            class="rotate stroke-green-500">
          </path>
        </g>
      </svg>
      <div class="flex max-w-screen-sm flex-col items-center justify-center gap-y-12 px-3">
        <h2 class="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-500">Congratulations {user.full_name} !</h2>

        <p class="text-center text-lg dark:text-white">
          <span class="mb-4 block font-semibold">{@html message}</span>
          <span class="block">Please check your email inbox for a confirmation email with details about your purchase. You can also view your order details in your dashboard.</span>
        </p>

        <a
          href="/"
          data-sveltekit-reload
          class="inline-flex items-center rounded-lg border border-transparent bg-brand px-6 py-3 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          Go Back Home
        </a>
      </div>
    </section>
  </div>
</main>

<style>
  .rotate {
    transform-origin: center;
    animation: rotate 2s infinite linear;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
