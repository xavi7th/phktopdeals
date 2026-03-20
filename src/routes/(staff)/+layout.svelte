<script>
  import { page } from "$app/state";
  import { staffInboxStore } from "$lib/stores/staffInboxStore.js";
  import { togglePresence } from "$lib/api/staffApi.js";
  import Badge from "$lib/Components/Badge.svelte";
  import NotificationToast from "$lib/Components/NotificationToast.svelte";
  import {
    unviewedCount,
    visibleNotifications,
    removeNotification,
    decrementUnviewed,
  } from "$lib/stores/notificationStore.js";

  let { data, children } = $props();

  const { user } = data;
  let isOnline = $state(true);

  async function handlePresenceToggle() {
    const newStatus = !isOnline;
    const result = await togglePresence(newStatus);
    if (result?.success) {
      isOnline = newStatus;
      staffInboxStore.setOnline(newStatus);
    }
  }

  function handleNotificationClick(event) {
    const { conversationId } = event.detail;
    decrementUnviewed();
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-neutral-900">
  <!-- Staff Header -->
  <header class="border-b border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase() || "S"}
        </div>
        <div>
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Staff Dashboard</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {user?.name}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Online/Offline Toggle -->
        <button
          onclick={handlePresenceToggle}
          class="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors {isOnline
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}">
          <span class="relative flex h-2.5 w-2.5">
            {#if isOnline}
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            {/if}
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full {isOnline ? 'bg-green-500' : 'bg-gray-400'}"></span>
          </span>
          {isOnline ? "Online" : "Offline"}
        </button>

        <!-- Notification Badge -->
        <a href="/chat" class="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <div class="absolute -top-1 -end-1">
            <Badge count={$unviewedCount} pulse={$unviewedCount > 0} />
          </div>
        </a>

        <!-- Navigation -->
        <a href="/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Back to Site</a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    {@render children?.()}
  </main>

  <!-- Notification Toasts -->
  {#each $visibleNotifications as notification (notification.id)}
    <div class="fixed end-3 top-20 z-50 space-y-2">
      <NotificationToast
        title={notification.title}
        message={notification.message}
        type={notification.type}
        conversationId={notification.conversationId}
        on:click={handleNotificationClick}
      />
    </div>
  {/each}
</div>
