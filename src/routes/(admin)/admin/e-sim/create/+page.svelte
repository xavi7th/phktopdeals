<script>
    import Modal from "../../../../shared/Modal.svelte";

    /**
	 * @type {string}
	 */
    let title;
    $: formType = 'create';
</script>

<!-- Card Section -->
<div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Card -->
    <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
      <form>
        <!-- Section -->
        <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              E-sim Management
            </h2>
          </div>
          <!-- End Col -->
          
          <div class="sm:col-span-3">
            <label for="af-submit-application-full-name" class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
              Name
            </label>
          </div>
          <!-- End Col -->
  
          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input id="af-submit-application-full-name" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label for="af-submit-application-resume-cv" class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
              Image
            </label>
          </div>
          <!-- End Col -->
  
          <div class="sm:col-span-9">
            <label for="af-submit-application-resume-cv" class="sr-only">Choose file</label>
            <input type="file" name="af-submit-application-resume-cv" id="af-submit-application-resume-cv" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0
              file:bg-gray-100 file:me-4
              file:py-2 file:px-4
              dark:file:bg-neutral-700 dark:file:text-neutral-400">
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label for="af-submit-application-full-name" class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
              Cost
            </label>
          </div>
          <!-- End Col -->
  
          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input id="af-submit-application-full-name" type="number" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label for="af-submit-application-full-name" class="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
              Min
            </label>
          </div>
          <!-- End Col -->
  
          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input id="af-submit-application-full-name" type="number" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            </div>
          </div>
          <!-- End Col -->
        </div>
        <button type="button" class="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none">
          Save
        </button>
      </form>
    </div>
    <!-- End Card -->
  </div>
  <!-- End Card Section -->

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