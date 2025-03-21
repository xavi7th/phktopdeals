<script>
  import { brandDefaults } from "$lib/schemas.js";
  import Table from "$lib/Components/Table.svelte";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import CreateCategory from "$partials/categories/CreateCategory.svelte";
  import ConfirmAction from '$lib/Components/ConfirmAction.svelte';
  import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';

  let { data } = $props();

  let { categories } = data;

  let curCategory = $state(brandDefaults);
</script>

{#await categories}
  <TableSkeleton />
{:then categories}
  <Table tCaption="Categories" tDescription="Add Category, edit and more." navData={{ ...categories.metadata, basePageUrl: "/admin/categories" }}>
    <svelte:fragment slot="tableAction">
      <div class="grid gap-3 md:flex md:items-center md:justify-between">
        <!-- <div class="px-4 py-3">
          <div class="relative max-w-xs">
            <label for="hs-table-search" class="sr-only">Search</label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Search for items" />
            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
            </div>
          </div>
        </div> -->

        <div>
          <div class="inline-flex gap-x-2">
            <CreateCategory categoryForm={data.form} category={curCategory} create />
          </div>
        </div>
      </div>
    </svelte:fragment>

    <svelte:fragment slot="thead">
      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-lg font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Category Name</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-lg font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
      </th>
    </svelte:fragment>

    {#each categories.data || [] as category}
      <tr>
        <td class="whitespace-nowrap px-6">
          <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <span class="block text-start text-sm font-semibold text-gray-800 dark:text-neutral-200">{category.name}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="flex gap-3 px-6 py-1.5">
            <CreateCategory
              categoryForm={data.form}
              {category}
              onclick={() => {
                curCategory = category;
              }} />

            <ConfirmAction action="?/deleteCategory" formData={data.form} msg="Are you sure you want to delete this category?">
              <div class="form-group">
                <input type="text" name="id" class="hidden" value={category.id} />
              </div>

              <LoadingButton class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500 m-0 border-0 bg-transparent p-0 shadow-none" label="Delete" overwriteStyles />
            </ConfirmAction>

            <!-- <form method="POST" action="?/deleteCategory" class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500">
              <input type="text" name="id" class="hidden" value={category.id} />
              <button type="submit" class="m-0 border-0 bg-transparent p-0 shadow-none">Delete</button>
            </form> -->
          </div>
        </td>
      </tr>
    {:else}
      <tr>
        <td class="size-px whitespace-nowrap" colspan="4">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-200">THERE ARE NO CATEGORIES CREATED YET. CREATE CATEGORIES SO THAT YOU CAN CREATE PRODUCTS</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}
  </Table>
{/await}
