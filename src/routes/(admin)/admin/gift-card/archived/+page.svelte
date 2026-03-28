<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let cards = $derived(data.cards);
  let meta = $derived(data.meta);
</script>

<ProductListings products={cards} {meta} basePageUrl="/admin/gift-card" cardType="Gift Card" hasAction={true} isArchivedView />
