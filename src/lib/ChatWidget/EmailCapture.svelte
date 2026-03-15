<script>
  import { setGuestEmail } from "./guestStore.js";

  let email = $state("");
  let error = $state("");
  let loading = $state(false);

  /**
   * Validate email format.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  /**
   * Handle form submission.
   * @param {Event} e
   */
  async function handleSubmit(e) {
    e.preventDefault();
    error = "";

    // Validate email
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
      const response = await fetch("/api/v1/chat/guest/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        error = result.message || "Failed to start chat. Please try again.";
        return;
      }

      // Store guest session
      setGuestEmail(email.trim(), result.data.guest_token, result.data.conversation_id);

      // Emit success event for parent to handle
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

  let { onsuccess = null } = $props();
</script>

<div class="p-4">
  <h3 class="mb-2 text-lg font-semibold text-gray-800">Start a Chat</h3>
  <p class="mb-4 text-sm text-gray-600">Enter your email to begin a conversation with our support team.</p>

  <form onsubmit={handleSubmit}>
    <div class="mb-4">
      <label for="guest-email" class="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
      <input
        type="email"
        id="guest-email"
        bind:value={email}
        placeholder="you@example.com"
        disabled={loading}
        class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100" />
      {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
      {/if}
    </div>

    <button type="submit" disabled={loading} class="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
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
