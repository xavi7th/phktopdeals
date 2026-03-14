<script>
  import { connectionStatus, reconnectAttempts } from "$lib/stores/echoStore.js";

  /** @type {"connected" | "connecting" | "reconnecting" | "disconnected"} */
  let status = $state("disconnected");
  let attempts = $state(0);

  // Subscribe to stores
  connectionStatus.subscribe((value) => {
    status = value;
  });

  reconnectAttempts.subscribe((value) => {
    attempts = value;
  });

  const STATUS_CONFIG = {
    connected: { color: "#22c55e", label: "Connected", icon: "wifi" },
    connecting: { color: "#eab308", label: "Connecting...", icon: "wifi" },
    reconnecting: { color: "#f97316", label: `Reconnecting (${attempts})...`, icon: "wifi-off" },
    disconnected: { color: "#ef4444", label: "Offline", icon: "wifi-off" },
  };
</script>

{#if status !== "connected"}
  <div class="connection-status status-{status}" style="--status-color: {STATUS_CONFIG[status].color}">
    <span class="dot"></span>
    <span class="label">{STATUS_CONFIG[status].label}</span>
  </div>
{/if}

<style>
  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.5rem;
    background: var(--status-color);
    border-radius: 9999px;
    font-size: 0.625rem;
    color: white;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .dot {
    width: 0.375rem;
    height: 0.375rem;
    background: currentColor;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  .status-connected .dot {
    animation: none;
  }

  .status-reconnecting .dot,
  .status-connecting .dot {
    animation: blink 0.75s infinite;
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

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
</style>
