<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let { eSims, meta } = data;
</script>

<ProductListings products={eSims} {meta} basePageUrl="/admin/e-sim" cardType="E-Sim" {hasAction} isArchivedView />
