<script>
  import Header from "$partials/Header.svelte";
  import Footer from "$partials/Footer.svelte";

  let { data } = $props();
</script>

<Header wallet_balance={data.wallet_balance} />

<slot></slot>

<Footer />
