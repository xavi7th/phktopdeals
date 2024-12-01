<div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="inline-block min-w-full p-1.5 align-middle">
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">Users</h2>
          </div>
        </div>

        <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead class="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" class="py-3 ps-6 text-start">
                <label for="hs-at-with-checkboxes-main" class="flex">
                  <input
                    type="checkbox"
                    class="shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:checked:border-brand-500 dark:checked:bg-brand-500 dark:focus:ring-offset-gray-800"
                    id="hs-at-with-checkboxes-main"
                  />
                  <span class="sr-only">Checkbox</span>
                </label>
              </th>

              <th scope="col" class="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Name</span>
                </div>
              </th>

              <th scope="col" class="px-6 py-3 text-start">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Brand</span>
                </div>
              </th>

              <th scope="col" class="px-6 py-3 text-start">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Flexible</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Created At</span>
                </div>
              </th>

              <th scope="col" class="px-6 py-3 text-end"></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
            <tr>
              <td class="size-px whitespace-nowrap">
                <div class="py-3 ps-6">
                  <label for="hs-at-with-checkboxes-1" class="flex">
                    <input
                      type="checkbox"
                      class="shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:checked:border-brand-500 dark:checked:bg-brand-500 dark:focus:ring-offset-gray-800"
                      id="hs-at-with-checkboxes-1"
                    />
                    <span class="sr-only">Checkbox</span>
                  </label>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                  <div class="flex items-center gap-x-3">
                    <img
                      class="inline-block size-[38px] rounded-full"
                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Avatar"
                    />
                    <div class="grow">
                      <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Product Name</span>
                      <span class="block text-sm text-gray-500 dark:text-neutral-500">Product Type</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="h-px w-72 whitespace-nowrap">
                <div class="px-6 py-3">
                  <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">brand</span>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="px-6 py-3">
                  <span class="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-1.5 py-1 text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                    <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    True
                  </span>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="px-6 py-3">
                  <span class="text-sm text-gray-500 dark:text-neutral-500">28 Dec, 12:12</span>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="flex gap-3 px-6 py-1.5">
                  <a class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500" href="#">Edit</a>
                  <a class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500" href="#">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
          <div>
            <p class="text-sm text-gray-600 dark:text-neutral-400">
              <span class="font-semibold text-gray-800 dark:text-neutral-200">12</span>
              results
            </p>
          </div>

          <div>
            <div class="inline-flex gap-x-2">
              <button
                type="button"
                class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg
                  class="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Prev
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                Next
                <svg
                  class="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
