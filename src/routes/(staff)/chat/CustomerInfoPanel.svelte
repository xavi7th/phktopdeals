<script>
  import { onMount } from "svelte";
  import { fetchCustomerOrders } from "$lib/api/staffApi.js";

  let { customer = null, showOrders = true } = $props();

  let orders = $state([]);
  let isLoadingOrders = $state(false);
  let showOrdersSection = $state(showOrders);

  onMount(async () => {
    if (customer?.id && customer.type === "user") {
      await loadOrders();
    }
  });

  async function loadOrders() {
    if (!customer?.id) return;
    isLoadingOrders = true;
    try {
      const result = await fetchCustomerOrders({ app_user_id: customer.id });
      if (result?.success) {
        orders = result.data.orders || [];
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      isLoadingOrders = false;
    }
  }

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

  function getStatusBadgeClass(status) {
    const classes = {
      finished: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      waiting: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      expired: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    };
    return classes[status] || classes.waiting;
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

      <!-- Order History Toggle -->
      {#if customer.type === "user" && customer.id}
        <div class="border-t border-gray-200 pt-4 dark:border-neutral-700">
          <button onclick={() => (showOrdersSection = !showOrdersSection)} class="flex w-full items-center justify-between text-left">
            <p class="text-sm font-medium text-gray-900 dark:text-white">Recent Orders</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform text-gray-500 transition-transform {showOrdersSection ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if showOrdersSection}
            <div class="mt-3">
              {#if isLoadingOrders}
                <p class="text-sm text-gray-500 dark:text-gray-400">Loading orders...</p>
              {:else if orders.length === 0}
                <p class="text-sm text-gray-500 dark:text-gray-400">No orders found</p>
              {:else}
                <div class="space-y-2">
                  {#each orders.slice(0, 5) as order (order.id)}
                    <div class="rounded border border-gray-200 p-2 dark:border-neutral-700">
                      <div class="flex items-center justify-between">
                        <p class="truncate text-xs font-medium text-gray-900 dark:text-white">
                          {order.product_name}
                        </p>
                        <span class="{getStatusBadgeClass(order.status)} inline-flex rounded px-1.5 py-0.5 text-xs">
                          {order.status_label}
                        </span>
                      </div>
                      <div class="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{order.order_number || "N/A"}</span>
                        <span>{formatDate(order.created_at)}</span>
                      </div>
                      <div class="mt-1 text-xs font-medium text-gray-900 dark:text-white">
                        {order.currency}
                        {order.amount.toFixed(2)}
                      </div>
                    </div>
                  {/each}
                  {#if orders.length > 5}
                    <p class="text-center text-xs text-gray-500 dark:text-gray-400">
                      +{orders.length - 5} more orders
                    </p>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <p class="text-sm text-gray-500 dark:text-gray-400">No customer info available</p>
  {/if}
</div>
