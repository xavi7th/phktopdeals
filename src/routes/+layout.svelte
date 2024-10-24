<script>
  import { page } from "$app/stores";
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>


<svelte:head>
  <title>{($page.data?.seo?.title || 'Welcome') + ' | PHKHotDeals'}</title>
  <meta name="description" content="{$page.data?.seo?.description || 'Experience a groundbreaking e-commerce revolution with PHKHotDeals! Our blockchain-powered platform seamlessly integrates cryptocurrency transactions, offering over 190,000 virtual items worldwide. Step into the future of online shopping with instant delivery, support for 90+ cryptocurrencies, and strategic partnerships. Join PHKHotDeals and transform the way you shop online.'}" />

  <meta name="abstract" content="{$page.data?.seo?.description || 'Experience a groundbreaking e-commerce revolution with PHKHotDeals! Our blockchain-powered platform seamlessly integrates cryptocurrency transactions, offering over 190,000 virtual items worldwide. Step into the future of online shopping with instant delivery, support for 90+ cryptocurrencies, and strategic partnerships. Join PHKHotDeals and transform the way you shop online.'}" />
  <meta name="author" content="Ehikioya Daniel Akhile">

  <meta itemprop="name" content="{$page.data?.seo?.title || 'PHKHotDeals Ltd'}">
  <link itemprop="url" href="{$page.data?.seo?.url || 'https://www.phkhotdeals.com/'}">
  <meta name="theme-color" content="#facc15">
  <meta name="apple-mobile-web-app-status-bar-style" content="#facc15">

  <meta property="og:description" content="{$page.data?.seo?.description || 'Experience a groundbreaking e-commerce revolution with PHKHotDeals! Our blockchain-powered platform seamlessly integrates cryptocurrency transactions, offering over 190,000 virtual items worldwide. Step into the future of online shopping with instant delivery, support for 90+ cryptocurrencies, and strategic partnerships. Join PHKHotDeals and transform the way you shop online.'}" />
  <meta property="og:title" content="{$page.data?.seo?.title || 'PHKHotDeals Ltd'}" />
  <meta property="og:site_name" content="PHKHotDeals" />
  <meta property="og:url" content="{$page.data?.seo?.url || 'https://www.phkhotdeals.com/'}" />
  <meta property="og:image" content="{$page.data?.seo?.imgUrl || '/favicon.png'}" />
  <meta property="og:type" content="{$page.data?.seo?.pageType || 'website'}" />

  <meta name="twitter:card" content="summary_large_images" />
  <meta name="twitter:site" content="@phkhotdeals" />
  <meta name="twitter:creator" content="@leinad7th" />
  <meta name="twitter:url" content="{$page.data?.seo?.url || 'https://www.phkhotdeals.com/'}" />
  <meta name="twitter:description" content="{$page.data?.seo?.description || 'Experience a groundbreaking e-commerce revolution with PHKHotDeals! Our blockchain-powered platform seamlessly integrates cryptocurrency transactions, offering over 190,000 virtual items worldwide. Step into the future of online shopping with instant delivery, support for 90+ cryptocurrencies, and strategic partnerships. Join PHKHotDeals and transform the way you shop online.'}" />
  <meta name="twitter:title" content="{$page.data?.seo?.title || 'PHKHotDeals Ltd'}" />
  <meta name="twitter:image" content="{$page.data?.seo?.imgUrl || '/favicon.png'}" />

  <meta name="robots" content="noindex,nofollow">
</svelte:head>



<slot></slot>
