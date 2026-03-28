<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let { games, meta } = data;
</script>

<ProductListings products={games} {meta} basePageUrl="/admin/games" cardType="Game" {hasAction} isArchivedView />
