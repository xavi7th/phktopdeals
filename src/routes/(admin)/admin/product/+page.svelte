<script>
  import ProductListings from "../ProductListings.svelte";

  let { data } = $props();
  let { products, meta } = data;
</script>

<ProductListings {products} {meta} basePageUrl="/admin/product" hasAction={false} cardType="All Products" />
