<script>
  import { startBulkOrderTour } from "$lib/tours";
  import TourTrigger from "$lib/Components/TourTrigger.svelte";
</script>

<div class="rounded-xl bg-white p-10 shadow-lg sm:mx-10 dark:bg-[#404040]">
  <TourTrigger startTour={startBulkOrderTour} />
  <h1 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Bulk Order</h1>
  <span class="text-sm text-slate-700 dark:text-slate-300">Download, list, and upload your bulk order—all in a snap!</span>
  <div class="mt-8 space-y-4">
    <div class="rounded-xl border border-dashed p-6 text-slate-800 dark:text-slate-200">
      <div class="flex flex-col items-center" data-tour="bulk-order-download">
        <a href="#">Bulk Order.xlsx</a>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center">
        <div class="grid size-20 place-content-center rounded-full border">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[45px]" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="#FFDA1C"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18v-3m0 0v-3m0 3H9m3 0h3M13 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V9m-6-6c.286.003.466.014.639.055q.308.075.578.24c.202.124.375.297.72.643l3.126 3.125c.346.346.518.518.642.72q.165.271.24.578c.04.173.051.354.054.639M13 3v2.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h2.802m0 0H19" />
          </svg>
        </div>
        <span class="text-[#FFDA1C]">Drage & Drop</span>
        <span>Or</span>
        <label data-tour="file-upload"
          class="block text-nowrap rounded-full border border-transparent bg-[#FFDA1C] p-6 py-2.5 text-sm text-[#713f12] shadow-md hover:bg-brand-500 focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          Browse File
          <input type="file" class="hidden" />
        </label>
      </div>
    </div>
    <div class="rounded-lg border border-[#FFDA1C] bg-[#FFDA1C10] p-4 dark:bg-[#FFDA1C60]">
      <p class="text-sm text-[#713f12] dark:text-[#FFDA1C]">Please do not do any changes in the excel title, Else your data might not be submitted.</p>
    </div>
  </div>
</div>
