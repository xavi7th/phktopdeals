<script>
  import Header from "$partials/Header.svelte";
  import Footer from "$partials/Footer.svelte";
  import { cartStore, cartCount } from "$stores/cartStore.js";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let { data, children } = $props();

  // For guest users, update cart count from localStorage on mount (client-side only)
  // This avoids SSR hydration mismatch — headerCartCount is initialized as 0, updated on client
  let headerCartCount = $state(data.isAuthenticated ? (data.cart_count ?? 0) : 0);

  onMount(() => {
    if (!data.isAuthenticated && browser) {
      cartStore.initialize();
      // Update header count from guest cart store after mount
      const unsubscribe = cartCount.subscribe((value) => {
        headerCartCount = value;
      });
      return () => unsubscribe();
    }
  });
</script>

<Header wallet_balance={data.wallet_balance} cart_count={headerCartCount} />

{@render children?.()}
<Footer />
