<script>
    import Modal from "$partials/Modal.svelte";

    let title = '';
    $: formType = 'create';
</script>

<Modal {title} name="hs-static-create-modal">
    <div slot="content">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">John Brown</td>
                    <td class="space-x-2 px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-brand-600 hover:text-brand-800 focus:outline-none focus:text-brand-800 disabled:opacity-50 disabled:pointer-events-none dark:text-brand-500 dark:hover:text-brand-400 dark:focus:text-brand-400" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-static-create-modal" data-hs-overlay="#hs-static-edit-modal">Edit</button>
                      <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-brand-400">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</Modal>
  
<Modal {title} name="hs-static-edit-modal">
    <div slot="content">
      <div class="flex flex-col">
        <div class="space-y-3">
          <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Title</label>
          <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Title">
        </div>
      </div>
    </div>
</Modal>