<script>
	import Modal from "$partials/Modal.svelte";
    import { dev } from '$app/environment';
    import Toast from '$lib/Components/Toast.svelte';
    import SuperDebug, { superForm } from 'sveltekit-superforms';
	import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
	import { invalidate, invalidateAll } from "$app/navigation";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    
    export let title = 'Create New Brand', delay = 3000, form; 
    /**
    * @type {any[]}
    */
    export let brands = [];

    const { form: formData, errors, message, enhance } = superForm(form, {
        delayMs: 500,
        timeoutMs: 8000,
    });

    let editContent = {
        id: 0,
    }

    const handleEdit = (/** @type {{ id: any; name: any; }} */ brand) => {
        editContent = {
            id: brand.id,
        }

        $formData.name = brand.name;
        $formData.uuid = brand.id;

        $message = {
            type: "grey",
            msg: ""
        }
    }

    const clearEdit = () => {
        editContent = {
            id: 0,
        }

        $formData.name = '';
        delete $formData.uuid;
        $message = {
            type: "grey",
            msg: ""
        }
    }

    $: if ($message && $message.type == 'success') {
      const button = document.getElementById('backButton');
      button?.click();
      setTimeout(() => {
        invalidate('brandlist');
      }, delay);
    }

</script>

{#if $message}
  <div class="fixed top-24 z-[100] end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<Modal title="Brand List" name="hs-static-list-modal" on:handleClick={clearEdit}>
    <div slot="content">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="max-h-[400px] overflow-y-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                    {#each brands || [] as brand (brand.id)}
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{brand.name}</td>
                            <td class="space-x-2 px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-brand-600 hover:text-brand-800 focus:outline-none focus:text-brand-800 disabled:opacity-50 disabled:pointer-events-none dark:text-brand-500 dark:hover:text-brand-400 dark:focus:text-brand-400" aria-haspopup="dialog" aria-expanded="true" aria-controls="hs-static-edit-modal" data-hs-overlay="#hs-static-edit-modal" on:click={() => {handleEdit(brand)}}>Edit</button>
                            <form action="?/deleteBrand" method="POST" class="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-red-500" use:enhance>
                                <input type="text" class="hidden" name="uuid" value={brand.id}>
                                <button type="submit" class="bg-transparent p-0 m-0 border-0 shadow-none">Delete</button>
                              </form>
                            </td>
                        </tr>
                    {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</Modal>
  

<Modal {title} name="hs-static-edit-modal">
    <div slot="form">
        <div class="max-w-md fixed left-0 bottom-0 z-[60]">
            <SuperDebug data={{$message, $formData, $errors}} label="My form data" collapsible={true} display={dev} />
        </div>
        <form method="POST" action={! editContent.id ? "/admin/gift-card?/createBrand" : "/admin/gift-card?/editBrand"} use:enhance>
            <div class="flex flex-col">
                {#if editContent.id}
                    <input type="text" name="uuid" class="hidden" value={editContent.id}>
                {/if}
                <div class="col-span-12">
                    <FloatingTextInput name="name" label="Brand Name" bind:value={$formData.name} isError={ !! $errors.name} msg={$errors.name}/>
                </div>
            </div>
            <button type="submit" id="submit-btn" class="hidden" />
        </form>
    </div>
    <div slot="footer">
        <button type="button" id="backButton" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-slate-600 text-white hover:bg-slate-700 focus:outline-none focus:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-static-list-modal" data-hs-overlay="#hs-static-list-modal">Back</button>
        <label for="submit-btn" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none">Save</label>
    </div>
</Modal>