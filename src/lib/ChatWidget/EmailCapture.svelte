<script>
  import { animate } from "motion";
  import { onMount, untrack } from "svelte";
  import { chatStore } from "./chatStore.js";
  import { browser } from "$app/environment";
  import { setGuestEmail } from "./guestStore.js";
  import { startGuestChat } from "./chat.remote.js";
  import Portal from "$lib/Components/Portal.svelte";

  let email = $state("");
  let error = $state("");
  let emailCaptureElement;
  let loading = $state(false);
  let shouldMount = $state(false);
  let isAnimating = $state(false);

  const BRAND_COLOR = "#6C5702";
  const ANIMATION_DURATION = 0.5;

  onMount(() => {
    shouldMount = true;
  });

  // Animate open/close
  $effect(() => {
    if (!browser || !emailCaptureElement || untrack(() => isAnimating)) return;

    if ($chatStore.isOpen) {
      isAnimating = true;
      animate(
        emailCaptureElement,
        { opacity: [0, 1], scale: [0.9, 1], y: [20, 0] },
        { duration: ANIMATION_DURATION, easing: "ease-out" }
      ).finished.then(() => (isAnimating = false));
    } else {
      isAnimating = true;
      animate(
        emailCaptureElement,
        { opacity: [1, 0], scale: [1, 0.9], y: [0, 20] },
        { duration: ANIMATION_DURATION, easing: "ease-in" }
      ).finished.then(() => (isAnimating = false));
    }
  });

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    error = "";

    if (!email.trim()) {
      error = "Email is required";
      return;
    }

    if (!isValidEmail(email)) {
      error = "Please enter a valid email address";
      return;
    }

    loading = true;

    try {
      const result = await startGuestChat({ email: email.trim() });

      if (!result.success) {
        error = result.error || "Failed to start chat. Please try again.";
        return;
      }

      setGuestEmail(email.trim(), result.data.guest_token, result.data.conversation_id);
      onsuccess?.({
        conversationId: result.data.conversation_id,
        guestToken: result.data.guest_token,
        isNew: result.data.is_new,
      });
    } catch {
      error = "Network error. Please try again.";
    } finally {
      loading = false;
    }
  }

  function handleClose() {
    chatStore.close();
  }

  let { onsuccess = null } = $props();
</script>

<Portal {shouldMount}>
  {#if $chatStore.isOpen}
    <div
      bind:this={emailCaptureElement}
      class="email-capture-window"
      style="--brand-color: {BRAND_COLOR}"
      role="dialog"
      aria-label="Start chat"
      aria-modal="true">
      <header class="email-capture-header">
        <div class="header-content">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <div class="header-text">
            <h3 class="title">PHK Support</h3>
            <p class="subtitle">We typically reply within minutes</p>
          </div>
        </div>
        <button class="close-btn" onclick={handleClose} aria-label="Close" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <div class="form-container">
        <p class="intro-text">Enter your email to start a conversation with our support team.</p>

        <form onsubmit={handleSubmit}>
          <div class="mb-4">
            <label for="guest-email" class="label">Email Address</label>
            <input
              type="email"
              id="guest-email"
              bind:value={email}
              placeholder="you@example.com"
              disabled={loading}
              class="input" />
            {#if error}
              <p class="error-text">{error}</p>
            {/if}
          </div>

          <button type="submit" disabled={loading} class="submit-btn">
            {#if loading}
              <span class="flex items-center justify-center gap-2">
                <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Starting...
              </span>
            {:else}
              Start Chat
            {/if}
          </button>
        </form>
      </div>
    </div>
  {/if}
</Portal>

<style>
  .email-capture-window {
    position: fixed;
    bottom: 6.5rem;
    right: 1.5rem;
    width: 23.75rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .email-capture-header {
    background: var(--brand-color);
    color: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .header-text {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .subtitle {
    font-size: 0.75rem;
    opacity: 0.9;
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.25rem;
    color: white;
    transition: background 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .form-container {
    padding: 1.25rem;
  }

  .intro-text {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #4b5563;
  }

  .label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .input {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .input:focus {
    border-color: var(--brand-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  }

  .input:disabled {
    background: #f3f4f6;
  }

  .error-text {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #dc2626;
  }

  .submit-btn {
    width: 100%;
    border-radius: 0.5rem;
    background: var(--brand-color);
    padding: 0.625rem 1rem;
    font-weight: 500;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #e55a2b;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 48rem) {
    .email-capture-window {
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
  }
</style>
