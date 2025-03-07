<script>
  import ProductManagementForm from "../../../ProductManagementForm.svelte";

  let { data } = $props();
  let { brands, regions, categories } = data;
</script>

<ProductManagementForm productForm={data.topUpForm} brandForm={data.brandForm} {brands} {regions} {categories} productType="Top Up" />
