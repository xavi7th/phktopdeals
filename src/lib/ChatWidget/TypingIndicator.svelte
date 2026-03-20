<script>
  import { browser } from "$app/environment";

  let { isTyping = false } = $props();

  const DEBOUNCE_MS = 300;
  let showIndicator = $state(false);
  let timeoutId = null;

  $effect(() => {
    if (!browser) return;

    if (isTyping) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Show indicator immediately when typing starts
      showIndicator = true;
    } else {
      // Debounce hiding the indicator
      timeoutId = setTimeout(() => {
        showIndicator = false;
      }, DEBOUNCE_MS);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
</script>

{#if showIndicator}
  <div class="typing-indicator" role="status" aria-live="polite">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
{/if}

<style>
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.625rem 0.875rem;
    background: #f3f4f6;
    border-radius: 0.75rem;
    border-bottom-left-radius: 0.25rem;
    width: fit-content;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    background: #9ca3af;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) {
    animation-delay: -0.32s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
</style>
