<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let { topUps, meta } = data;
</script>

<ProductListings products={topUps} {meta} basePageUrl="/admin/top-up" cardType="Top Up" {hasAction} isArchivedView />
