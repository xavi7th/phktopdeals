<script>
  import { fade, slide } from "svelte/transition";

  let { message, isNew = false } = $props();

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function isStaffMessage(sender) {
    return sender?.type === "user" && sender?.name;
  }

  // Determine if this is a staff message or customer message using Svelte 5 $derived
  let isStaff = $derived(isStaffMessage(message.sender));
  let senderName = $derived(message.sender?.name || "Guest");
</script>

<div class="flex {isStaff ? 'justify-end' : 'justify-start'}" in:fade={{ duration: 200 }}>
  <div class="max-w-[70%] {isStaff ? 'order-2' : 'order-1'}">
    <!-- Sender Name (for customer messages) -->
    {#if !isStaff}
      <p class="mb-1 ml-1 text-xs font-medium text-gray-600 dark:text-gray-400">
        {senderName}
      </p>
    {/if}

    <!-- Message Bubble -->
    <div class="rounded-lg px-3 py-2 transition-all duration-200 {isStaff ? 'rounded-br-sm bg-orange-500 text-white' : 'rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-neutral-700 dark:text-white'}">
      <p class="whitespace-pre-wrap break-words text-sm">
        {message.content}
      </p>
    </div>

    <!-- Timestamp & Status -->
    <p class="mt-1 text-xs text-gray-400 dark:text-gray-500 {isStaff ? 'mr-1 text-right' : 'ml-1'}">
      {formatTime(message.created_at)}
      {#if isStaff && message.sender_type === "staff"}
        {#if message.read_at}
          <span class="ml-1 text-green-600" title="Read">✓✓</span>
        {:else if message.delivered_at}
          <span class="ml-1 text-gray-400" title="Delivered">✓</span>
        {:else}
          <span class="ml-1 text-gray-400" title="Sending...">⏱</span>
        {/if}
      {/if}
    </p>
  </div>
</div>
