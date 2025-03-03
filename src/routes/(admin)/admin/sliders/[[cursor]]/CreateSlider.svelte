<script>
  import Modal from "$partials/Modal.svelte";
  import { plusIcon } from '$lib/Components/iconPaths';
  import { fileProxy, superForm } from "sveltekit-superforms";
  import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingFileInput from '$lib/Components/FormInputs/FloatingFileInput.svelte';
  import FloatingSelectInput from '$lib/Components/FormInputs/FloatingSelectInput.svelte';

  let { form, hasFile = false, slider = {id: undefined} } = $props();

  const { form: formData, errors, timeout, submitting, delayed, enhance } = superForm(form, {
    delayMs: 500,
    timeoutMs: 8000,
    async onResult({ result }) {
      if (result.type === 'redirect') {
        window.HSOverlay?.close("#slider-modal");
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  });

  let imgDimensions = $derived($formData.size == 'small' ? "460x160" : "1920x1080");

  const file = fileProxy(formData, 'image');

  $effect(() => {
    $formData = slider;
  });

  let btnColor = $derived(slider.id ? 'bg-amber-700 hover:bg-amber-800 hover:text-neutral-50 focus:bg-amber-800 border-amber-600' : 'bg-teal-900 hover:bg-teal-800 hover:text-neutral-50 focus:bg-teal-800 border-teal-600/50')
</script>

<button
  type="button"
  class="inline-flex w-40 items-center justify-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm bg-brand-600 hover:bg-brand-700 focus:bg-brand-700 font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="slider-modal"
  data-hs-overlay="#slider-modal" on:click={() => {slider = {id: undefined}}}>
  {@html plusIcon}
  Add Slider
</button>

<Modal title="{slider.id ? 'Edit Existing' : 'Create'} Slider" name="slider-modal">
  <svelte:fragment slot="content">
    <form id="slider-form" method="POST" action="{slider.id ? '?/update' : '?/create'}" enctype="{hasFile ? 'multipart/form-data' : 'text/plain'}" use:enhance>
      <div class="flex flex-col p-4 gap-y-3">
        <input type="text" name="id" value={slider.id} readonly class="hidden">
        <FloatingSelectInput class="flex-1" name="size" label="Slider Position" bind:value={$formData.size} isError={!!$errors.size} msg={$errors.size}>
          <option value="large">Large Slider Position</option>
          <option value="small">Small Slider Position</option>
        </FloatingSelectInput>

        <div class="flex flex-1 gap-x-2 items-center">
          <img class="inline-block rounded-full h-16 w-16" src={slider.img_url} alt="Slider img"/>

          <FloatingFileInput class="grow" name="image" label="Slider Image (Dimensions: {imgDimensions})" accept="image/*" bind:files={$file} isError={!!$errors.image} msg={$errors.image} />
        </div>

        <FloatingTextInput name="url" label="Url (optional)" bind:value={$formData.url} isError={!!$errors.url} msg={$errors.url} />
      </div>
    </form>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    <LoadingButton form="slider-form" class="w-auto py-2 px-3 font-medium {btnColor} transition-colors duration-300" label="{slider.id ? 'Edit' : 'Create'} Slider"  {timeout} {delayed} {submitting}/>
  </svelte:fragment>
</Modal>
