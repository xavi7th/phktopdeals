<script>
  import ArchiveList from "$lib/Components/ArchiveList.svelte";
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-neutral-100">Chat Archives</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-neutral-400">View and manage archived conversations</p>
    </div>
  </div>

  <ArchiveList />
</div>
