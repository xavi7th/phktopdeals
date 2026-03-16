<script>
  let { message } = $props();

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function isStaffMessage(sender) {
    return sender?.type === "user" && sender?.name;
  }

  // Determine if this is a staff message or customer message
  $: isStaff = isStaffMessage(message.sender);
  $: senderName = message.sender?.name || "Guest";
</script>

<div class="flex {isStaff ? 'justify-end' : 'justify-start'}">
  <div class="max-w-[70%] {isStaff ? 'order-2' : 'order-1'}">
    <!-- Sender Name (for customer messages) -->
    {#if !isStaff}
      <p class="mb-1 ml-1 text-xs font-medium text-gray-600 dark:text-gray-400">
        {senderName}
      </p>
    {/if}

    <!-- Message Bubble -->
    <div class="rounded-lg px-3 py-2 {isStaff ? 'rounded-br-sm bg-orange-500 text-white' : 'rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-neutral-700 dark:text-white'}">
      <p class="whitespace-pre-wrap break-words text-sm">
        {message.content}
      </p>
    </div>

    <!-- Timestamp -->
    <p class="mt-1 text-xs text-gray-400 dark:text-gray-500 {isStaff ? 'mr-1 text-right' : 'ml-1'}">
      {formatTime(message.created_at)}
    </p>
  </div>
</div>
