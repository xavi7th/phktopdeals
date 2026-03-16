<script>
  let { customer = null } = $props();

  function formatAccountAge(days) {
    if (days === null || days === undefined) return "N/A";
    if (days < 30) return `${days} days`;
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    }
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
</script>

<div class="p-4">
  <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Customer Info</h3>

  {#if customer}
    <div class="space-y-4">
      <!-- Customer Type -->
      <div>
        <span
          class="inline-flex items-center rounded px-2 py-1 text-xs font-medium {customer.type === 'user'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}">
          {customer.type === "user" ? "Registered User" : "Guest"}
        </span>
      </div>

      <!-- Name -->
      <div>
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Name</p>
        <p class="text-sm text-gray-900 dark:text-white">{customer.name || "N/A"}</p>
      </div>

      <!-- Email -->
      {#if customer.email}
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Email</p>
          <p class="break-all text-sm text-gray-900 dark:text-white">{customer.email}</p>
        </div>
      {/if}

      <!-- Account Age -->
      {#if customer.account_age_days !== null}
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Account Age</p>
          <p class="text-sm text-gray-900 dark:text-white">
            {formatAccountAge(customer.account_age_days)}
          </p>
        </div>
      {/if}

      <!-- Past Conversations -->
      {#if customer.past_conversations !== undefined}
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Past Conversations</p>
          <p class="text-sm text-gray-900 dark:text-white">
            {customer.past_conversations}
          </p>
        </div>
      {/if}
    </div>
  {:else}
    <p class="text-sm text-gray-500 dark:text-gray-400">No customer info available</p>
  {/if}
</div>
