<!-- EXAMPLE USAGE

const { form, errors, message, delayed, submitting, timeout, enhance} = superForm(data.form, {
  delayMs: 500,
  timeoutMs: 8000,
});

<ConfirmAction action="?/create" method="DELETE" formData={data.form}>
  <div class="form-group">
    <input name="name" class="hidden" value={slider.id} />
  </div>

  <LoadingButton class="bg-red-600 py-1 px-2 text-xs uppercase hover:bg-gray-100 text-white hover:text-red-600 hover:border-red-600 focus:bg-gray-100 focus:text-red-600 focus:border-red-600" label="Delete" />
</ConfirmAction> -->

<script>
  import { browser } from '$app/environment';
  import { superForm } from 'sveltekit-superforms';
  import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';

  /**
   * @typedef Props
   * @property {string} action
   * @property {Record<string, any>} formData
   * @property {string} msg
  */

  /** @type {Props} */
  let { action, formData, msg = "Are you sure you want to proceed?" } = $props();
  let name = "form-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10);

  const { form, errors, message, delayed, submitting, timeout, enhance, constraints } = superForm(formData, { delayMs: 500, timeoutMs: 8000 });

  /** @type {HTMLDialogElement}*/
  let dialog;
  /** @type {HTMLFormElement}*/
  let formElement;

  /** @param {any} event*/
  function handleSubmit(event) {
    if (!browser) return;

    if (event.submitter) {
      event.cancel();
      dialog?.showModal();
    }
  }

  function confirmSubmit() {
    if (formElement) {
      formElement.requestSubmit();
    }
    if (! $submitting) {
      dialog?.close();
    }
  }

  function cancelSubmit() {
    dialog?.close();
  }
</script>

<dialog bind:this={dialog} class="min-w-96 p-6 rounded-lg shadow-xl backdrop:bg-black/70 dark:backdrop:bg-black/60 backdrop:backdrop-blur-md bg-gray-200 dark:bg-neutral-800 dark:border-gray-500 border-2">
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200">Confirm Action</h2>
    <p class="text-gray-700 dark:text-gray-300 py-4">{msg}</p>
    <div class="flex justify-end space-x-3">
      <button class="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ring-2 ring-gray-500 focus:ring-gray-600" on:click={cancelSubmit}>Cancel</button>
      <LoadingButton class="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto"  {timeout} {delayed} {submitting} on:click={confirmSubmit} label="Yes, Continue" />
    </div>
  </div>
</dialog>

<form method="POST" bind:this={formElement} action={action} use:enhance={{ onSubmit: handleSubmit }} {name} id={name}>
  <slot {form} {errors} {constraints} {message} />
</form>
