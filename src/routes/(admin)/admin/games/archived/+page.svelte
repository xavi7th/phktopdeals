<script>
  import ProductListings from "../../ProductListings.svelte";

  let { data } = $props();
  let games = $derived(data.games);
  let meta = $derived(data.meta);
</script>

<ProductListings products={games} {meta} basePageUrl="/admin/games" cardType="Game" hasAction={true} isArchivedView />
