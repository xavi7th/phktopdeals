<script>
  import ProductListings from "../ProductListings.svelte";

  let { data } = $props();
  let products = $derived(data.products);
  let meta = $derived(data.meta);
</script>

<ProductListings {products} {meta} basePageUrl="/admin/product" hasAction={false} cardType="All Products" />
