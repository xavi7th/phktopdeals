<script>
  import PageSkeleton from "$lib/Components/PageSkeleton.svelte";

  export let data;

  $: ({ pageData } = data);
</script>

<svelte:head>
  <title>Email Preview for Voucher | PHKHotDeals</title>
  <meta name="description" content="Create Voucher Codes ahead that will get sent to the customers when purchases are made." />
</svelte:head>

{#await pageData}
  <PageSkeleton />
{:then pageData}
  {@html pageData.data}
{:catch}
  <tr>
    <td class="js-enabled size-px whitespace-nowrap" colspan="4">
      <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
        <div class="flex items-center justify-center">
          <span class="inline-flex text-xl text-gray-600 dark:text-neutral-400">There was an error loading the data. reload the page to try again</span>
        </div>
      </div>
    </td>
  </tr>
{/await}
