<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let topUps = $derived(data.topUps);
  let meta = $derived(data.meta);
</script>

<ProductListings products={topUps} {meta} basePageUrl="/admin/top-up" cardType="Top Up" {hasAction} isArchivedView />
