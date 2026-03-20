<script>
  import Header from "$partials/Header.svelte";
  import Footer from "$partials/Footer.svelte";

  let { data, children } = $props();
</script>

<Header wallet_balance={data.wallet_balance} />

{@render children?.()}
<Footer />
