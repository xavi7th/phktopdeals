<script>
  /** @type {"sending" | "sent" | "delivered" | "read"} */
  let { status = "sending" } = $props();

  const STATUS_ICONS = {
    sending: "clock",
    sent: "single-check",
    delivered: "double-check",
    read: "double-check-blue",
  };
</script>

<span class="message-status status-{status}" title={status}>
  {#if status === "sending"}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  {:else if status === "sent"}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  {:else if status === "delivered"}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
      <polyline points="18 6 9 17 4 12"></polyline>
      <polyline points="22 6 13 17"></polyline>
    </svg>
  {:else if status === "read"}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="icon read">
      <polyline points="18 6 9 17 4 12" stroke="#6C5702"></polyline>
      <polyline points="22 6 13 17" stroke="#6C5702"></polyline>
    </svg>
  {/if}
</span>

<style>
  .message-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .icon {
    width: 0.875rem;
    height: 0.875rem;
  }

  .status-sending .icon {
    color: #9ca3af;
    animation: pulse 1.5s infinite;
  }

  .status-sent .icon {
    color: #9ca3af;
  }

  .status-delivered .icon {
    color: #9ca3af;
  }

  .status-read .icon {
    color: #6c5702;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
