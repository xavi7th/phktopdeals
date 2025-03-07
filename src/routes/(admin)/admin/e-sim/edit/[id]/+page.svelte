<script>
  import ProductManagementForm from "../../../ProductManagementForm.svelte";

  let { data } = $props();
  let { brands, regions, categories } = data;
</script>

<ProductManagementForm productForm={data.eSimForm} brandForm={data.brandForm} {brands} {regions} {categories} productType="E-Sim" />
