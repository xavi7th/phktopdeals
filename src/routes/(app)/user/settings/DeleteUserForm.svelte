<script>
	import Modal from '$partials/Modal.svelte';
  import { animatedDotsSVG, spinnerSVG } from '$lib/Components/iconPaths';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';

  export let timeout, delayed, submitting, value = '', errors;
</script>

<section class="grid grid-cols-12 gap-y-8">
  <header class="col-span-12">
    <hr class="my-10">
    <h2 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Delete Account</h2>
    <p class="text-sm text-slate-700 dark:text-slate-300">
      Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
    </p>
  </header>

  <div class="col-span-12 flex justify-end mt-4 space-x-4">
    <button type="button" class="w-32 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none text-nowrap" aria-haspopup="dialog" aria-expanded="false" aria-controls="delete-account" data-hs-overlay="#delete-account">
      {#if timeout}
        Still Loading {@html animatedDotsSVG}
      {:else}
        Delete Account
        {#if delayed} {@html spinnerSVG} {/if}
      {/if}
    </button>
  </div>

  <Modal name="delete-account">
    <div slot="content">
      <div class="col-span-12">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Are you sure you want to delete your account?</h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
        </p>
      </div>
      <div class="mt-6">
        <FloatingTextInput name="verify_password" type="password" bind:value isError={ !! errors.verify_password} msg={errors.verify_password} label="Current Password" togglePw='"#verify_password"'/>
      </div>
    </div>

    <div slot="footer">
      <div class="flex justify-end space-x-4">
        <button type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg justify-center border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none text-nowrap" disabled={submitting}>
          {#if timeout}
            Still Loading {@html animatedDotsSVG}
          {:else}
            Delete Account
            {#if delayed} {@html spinnerSVG} {/if}
          {/if}
        </button>
      </div>
    </div>
  </Modal>
</section>
