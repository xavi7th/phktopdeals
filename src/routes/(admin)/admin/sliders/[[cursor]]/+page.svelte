<script>
  import Modal from "$partials/Modal.svelte";
  import CreateSlider from "./CreateSlider.svelte";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import ConfirmAction from "$lib/Components/ConfirmAction.svelte";
  import PageNavigation from "$lib/Components/PageNavigation.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";

  let { data } = $props();

  let { sliders } = data;

  let curSlider = $state({});
</script>

<div class="flex justify-between border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
  <h2 class="text-3xl font-semibold text-gray-800 dark:text-neutral-200">Home Page Sliders</h2>

  <div class="inline-flex gap-x-2">
    <CreateSlider form={data.form} hasFile slider={curSlider} />
  </div>
</div>

{#await sliders}
  <TableSkeleton />
{:then sliders}
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {#each sliders.data || [] as slider}
      <div class="flex flex-col justify-between rounded-lg border border-gray-200 bg-slate-50 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-md dark:shadow-neutral-700/40">
        <div class="-m-4 flex items-center justify-between border-b border-gray-200 p-4 dark:border-neutral-700">
          <h2 class="text-xl font-normal text-gray-800 dark:text-gray-400">
            <span class="capitalize">Slider {slider.id}</span>
          </h2>
        </div>
        <div class="mt-4 py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
          <div class="flex flex-col items-center gap-x-3" data-sveltekit-preload-data="false" data-sveltekit-preload-code="false">
            <a href={slider.url} target="_blank" data-sveltekit-reload>
              <img class="inline-block w-full rounded-full" src={slider.img_url} alt="Slider img" referrerpolicy="no-referrer" />
            </a>
            <span class="block text-wrap text-lg font-semibold text-gray-700 dark:text-neutral-300">
              SIZE: {slider.size}
            </span>
          </div>
        </div>
        <div class="-mx-3 flex items-center justify-between border-t border-gray-200 p-4 pb-0 dark:border-neutral-700">
          <button
            class="inline-flex w-auto items-center gap-x-1 rounded-md bg-orange-600 px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-orange-700 focus:bg-orange-700 focus:outline-none dark:text-white"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="slider-modal"
            data-hs-overlay="#slider-modal"
            on:click={() => {
              curSlider = slider;
            }}>
            EDIT
          </button>

          <ConfirmAction action="?/delete" formData={data.form} msg="Are you sure you want to delete this slider?">
            <div class="form-group">
              <input id={slider.id} name="id" class="hidden" value={slider.id} />
            </div>

            <LoadingButton
              class="rounded-md bg-red-600 px-2 py-1 text-xs uppercase text-white hover:border-red-600 hover:bg-gray-100 hover:text-red-600 focus:border-red-600 focus:bg-gray-100 focus:text-red-600"
              label="DELETE" />
          </ConfirmAction>
        </div>
      </div>
    {:else}
      <div class="bg-white dark:bg-white/10 shadow rounded-lg p-4 border dark:border-neutral-700 mt-10 col-span-2 lg:col-start-2">
        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div class="flex items-center gap-x-3 text-center">
            <div class="grow">
              <span class="block text-xl text-gray-600 dark:text-neutral-200">THERE ARE NO SLIDERS CREATED YET ON THE PLATFORM</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <PageNavigation navData={{ ...sliders.metadata, basePageUrl: "/admin/sliders" }} />
{/await}

<Modal
  title="Details"
  name="view-order-details"
  on:close={() => {
    setTimeout(() => history.back(), 600);
  }}>
  <div slot="content"></div>
</Modal>
