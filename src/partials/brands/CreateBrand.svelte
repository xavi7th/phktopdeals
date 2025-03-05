<!--
export let data;
<CreateBrand brandForm={data.brandForm} />

//Then in page.Server.js
const brandForm = await superValidate(event, arktype(brandSchema, { defaults: brandDefaults }));
-->

<script>
  import Modal from "$partials/Modal.svelte";
  import { brandDefaults } from "$lib/schemas";
  import { superForm } from "sveltekit-superforms";
  import Portal from "$lib/Components/Portal.svelte";
  import { plusIcon } from "$lib/Components/iconPaths";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";

  /**
   * @typedef Props
   * @property { Record<string, any> } brandForm
   * @property { import('$lib/types.js').ProductBrand } [brand]
   * @property { string } [name]
   * @property { (event: MouseEvent) => void | undefined } [onclick]
   * @property { boolean } [create]
   */

  /**
   * @type {Props}
   */
  let {
    create = false,
    brandForm,
    brand = brandDefaults,
    name = crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    onclick = (e) => {
      brand = brandDefaults;
    },
  } = $props();

  let mounted = $state(false);
  let actionBtnColor = $derived(
    brand.id ? "bg-amber-700 hover:bg-amber-800 hover:text-neutral-50 focus:bg-amber-800 border-amber-600 py-1 px-2" : "bg-teal-900 hover:bg-teal-800 hover:text-neutral-50 focus:bg-teal-800 border-teal-600/50",
  );
  let triggerBtnColor = $derived(
    create
      ? "w-40 font-medium text-white px-4 py-3 bg-brand-600 hover:bg-brand-700 focus:bg-brand-700"
      : "font-semibold text-brand-600 hover:text-brand-800 focus:text-brand-800 dark:text-brand-500 dark:hover:text-brand-400 dark:focus:text-brand-400",
  );

  const { form, errors, timeout, submitting, delayed, enhance } = superForm(brandForm, {
    id: "brand-form" + name,
    delayMs: 500,
    timeoutMs: 8000,
    async onResult({ result }) {
      console.log(result);

      if (result.type === "redirect") {
        // @ts-ignore
        window.HSOverlay?.close(`#brand-modal`);
        await new Promise((r) => setTimeout(r, 300));
      }
    },
  });

  $effect(() => {
    $form = brand;
    mounted = true;
  });
</script>

<button
  type="button"
  class="inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent text-sm focus:outline-none disabled:pointer-events-none disabled:opacity-50 {triggerBtnColor}"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="brand-modal"
  data-hs-overlay="#brand-modal"
  {onclick}>
  {#if create}
    {@html plusIcon}
  {/if}
  {create ? "Create Brand" : "Edit"}
</button>

{#if create}
  <Portal shouldMount={mounted}>
    <Modal title="{brand.id ? 'Edit Existing' : 'Create'} Brand" name="brand-modal" on:close={() => (brand = brandDefaults)}>
      <svelte:fragment slot="content">
        <form id="brand-form" method="POST" action="/admin/brands{brand.id ? '?/editBrand' : '?/createBrand'}" use:enhance>
          <div class="flex flex-col gap-y-3 p-4">
            <input type="text" name="id" value={brand.id} readonly class="hidden" />

            <FloatingTextInput name="name" label="Brand Name" bind:value={$form.name} isError={!!$errors.name} msg={$errors.name} />
          </div>
        </form>
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <LoadingButton form="brand-form" class="w-auto px-3 py-2 font-medium {actionBtnColor} transition-colors duration-300" label="{brand.id ? 'Edit' : 'Create'} Brand" {timeout} {delayed} {submitting} />
      </svelte:fragment>
    </Modal>
  </Portal>
{/if}
