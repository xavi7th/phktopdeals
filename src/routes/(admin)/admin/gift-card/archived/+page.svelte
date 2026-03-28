<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let { cards, meta } = data;
</script>

<ProductListings products={cards} {meta} basePageUrl="/admin/gift-card" cardType="Gift Card" {hasAction} isArchivedView />
