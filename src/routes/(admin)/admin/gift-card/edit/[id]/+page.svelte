<script>
  import GiftCardForm from "../../create/GiftCardForm.svelte";

  let { data } = $props();
  let { brands, regions, categories } = data;
</script>

<GiftCardForm giftCardForm={data.giftCardForm} brandForm={data.brandForm} {brands} {regions} {categories} />
