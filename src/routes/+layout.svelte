<script>
  import { page } from "$app/stores";
  import { pageMounted } from "$stores";
  import { onMount, tick } from "svelte";
  import { getErrorString } from "$lib/helpers";
  import { afterNavigate } from "$app/navigation";
  import Toast from "$lib/Components/Toast.svelte";
  import ApiStatusBanner from "$lib/Components/ApiStatusBanner.svelte";
  import { getFlash } from "sveltekit-flash-message";
  import { apiStatus } from "$lib/stores/apiStatus";
  import ChatWidget from "$lib/ChatWidget/ChatWidget.svelte";

  import "../app.scss";
  import "swiper/css";
  import "swiper/css/autoplay";
  import "swiper/css/pagination";

  let { children } = $props();
  let ChatWidgetComponent = $state(null);

  onMount(async () => {
    // Lazy load ChatWidget after initial page load
    ChatWidgetComponent = ChatWidget;
  });

  const flash = getFlash(page);

  // Sync API status with page data
  $effect(() => {
    if ($page.data?.apiError) {
      apiStatus.setOffline("API error detected");
    } else if ($page.data) {
      // Page loaded successfully, API is working
      apiStatus.setOnline();
    }
  });

  afterNavigate(async () => {
    // Preline v2.4.1 delays its own init by 2000ms, so we poll until it's ready
    // rather than using a one-shot timer that fires before HSStaticMethods exists.
    try {
      let attempts = 0;
      const maxAttempts = 25; // 25 × 200ms = 5s max wait
      const prelineInit = setInterval(() => {
        // @ts-ignore
        if (window?.HSStaticMethods?.autoInit) {
          window.HSStaticMethods.autoInit();
          clearInterval(prelineInit);
        } else if (++attempts >= maxAttempts) {
          clearInterval(prelineInit);
        }
      }, 200);
    } catch (e) {
      console.log("---------------HSStaticMethods initialisation failed!-----------------");
    }
  });

  onMount(() => {
    $pageMounted = true;
  });
</script>

<svelte:head>
  <title>{($page.data?.seo?.title || "Welcome") + " | Hot Deals"}</title>
  <meta
    name="description"
    content={$page.data?.seo?.description ||
      "Experience a groundbreaking e-commerce revolution with Hot Deals, a subsidiary of MOZYFLEX LTD! We are  an online retailer specializing in the sale of digital gift cards, including popular brands such as iTunes, Google Play, Amazon, and more. Our platform allows customers to purchase and send digital gift cards instantly, making it the perfect solution for last-minute gifts, birthdays, holidays, and other special occasions. Our mission is to provide a seamless and convenient shopping experience for our customers, offering a wide selection of digital gift cards that can be easily purchased and sent to friends and loved ones. We strive to offer the best prices, fastest delivery, and exceptional customer service, ensuring that our customers return to us time and time again."} />

  <meta
    name="abstract"
    content={$page.data?.seo?.description ||
      "Experience a groundbreaking e-commerce revolution with Hot Deals, a subsidiary of MOZYFLEX LTD! We are  an online retailer specializing in the sale of digital gift cards, including popular brands such as iTunes, Google Play, Amazon, and more. Our platform allows customers to purchase and send digital gift cards instantly, making it the perfect solution for last-minute gifts, birthdays, holidays, and other special occasions. Our mission is to provide a seamless and convenient shopping experience for our customers, offering a wide selection of digital gift cards that can be easily purchased and sent to friends and loved ones. We strive to offer the best prices, fastest delivery, and exceptional customer service, ensuring that our customers return to us time and time again."} />
  <meta name="author" content="Ehikioya Daniel Akhile" />

  <meta itemprop="name" content={$page.data?.seo?.title || "Hot Deals Ltd"} />
  <link itemprop="url" href={$page.data?.seo?.url || "https://www.hotdeals.stafr.pro/"} />
  <meta name="theme-color" content="#facc15" />
  <meta name="apple-mobile-web-app-status-bar-style" content="#facc15" />

  <meta
    property="og:description"
    content={$page.data?.seo?.description ||
      "Experience a groundbreaking e-commerce revolution with Hot Deals, a subsidiary of MOZYFLEX LTD! We are  an online retailer specializing in the sale of digital gift cards, including popular brands such as iTunes, Google Play, Amazon, and more. Our platform allows customers to purchase and send digital gift cards instantly, making it the perfect solution for last-minute gifts, birthdays, holidays, and other special occasions. Our mission is to provide a seamless and convenient shopping experience for our customers, offering a wide selection of digital gift cards that can be easily purchased and sent to friends and loved ones. We strive to offer the best prices, fastest delivery, and exceptional customer service, ensuring that our customers return to us time and time again."} />
  <meta property="og:title" content={$page.data?.seo?.title || "Hot Deals Ltd"} />
  <meta property="og:site_name" content="Hot Deals" />
  <meta property="og:url" content={$page.data?.seo?.url || "https://www.hotdeals.stafr.pro/"} />
  <meta property="og:image" content={$page.data?.seo?.imgUrl || "/favicon.png"} />
  <meta property="og:type" content={$page.data?.seo?.pageType || "website"} />

  <meta name="twitter:card" content="summary_large_images" />
  <meta name="twitter:site" content="@phkhotdeals" />
  <meta name="twitter:creator" content="@leinad7th" />
  <meta name="twitter:url" content={$page.data?.seo?.url || "https://www.hotdeals.stafr.pro/"} />
  <meta
    name="twitter:description"
    content={$page.data?.seo?.description ||
      "Experience a groundbreaking e-commerce revolution with Hot Deals, a subsidiary of MOZYFLEX LTD! We are  an online retailer specializing in the sale of digital gift cards, including popular brands such as iTunes, Google Play, Amazon, and more. Our platform allows customers to purchase and send digital gift cards instantly, making it the perfect solution for last-minute gifts, birthdays, holidays, and other special occasions. Our mission is to provide a seamless and convenient shopping experience for our customers, offering a wide selection of digital gift cards that can be easily purchased and sent to friends and loved ones. We strive to offer the best prices, fastest delivery, and exceptional customer service, ensuring that our customers return to us time and time again."} />
  <meta name="twitter:title" content={$page.data?.seo?.title || "Hot Deals Ltd"} />
  <meta name="twitter:image" content={$page.data?.seo?.imgUrl || "/favicon.png"} />

  <meta name="robots" content="index,follow" />
</svelte:head>

<ApiStatusBanner />

{#key $flash}
  {#if $flash}
    <div class="fixed end-3 top-24 z-[100] space-y-3">
      <Toast positioned={false} type={$flash?.type} msg={$flash.msg} dismissable on:toastClosed={() => ($flash = undefined)}>
        {#if $flash.errors}
          <ul class="ml-4 list-disc text-xs capitalize">{@html getErrorString($flash.errors)}</ul>
        {/if}
      </Toast>
    </div>
  {/if}
{/key}

{@render children()}

{#if ChatWidgetComponent}
  <ChatWidgetComponent />
{/if}
