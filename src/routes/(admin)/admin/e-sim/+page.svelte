<script>
  import ProductListings from "../ProductListings.svelte";

  let { data } = $props();
  let eSims = $derived(data.eSims);
  let meta = $derived(data.meta);
</script>

<ProductListings products={eSims} {meta} basePageUrl="/admin/e-sim" cardType="E-Sim" />
