<script>
  import { onMount } from "svelte";
  import Launcher from "./Launcher.svelte";
  import ChatWindow from "./ChatWindow.svelte";
  import EmailCapture from "./EmailCapture.svelte";
  import { guestStore, setGuestEmail, getGuestEmail, getGuestToken } from "./guestStore.js";
  import { chatStore } from "./chatStore.js";

  let view = $state("loading"); // 'loading' | 'email' | 'chat'
  let isAuthenticated = $state(false);

  // Check auth state and guest session
  onMount(async () => {
    // Check if user is authenticated
    try {
      const response = await fetch("/api/v1/user", {
        credentials: "include",
      });
      isAuthenticated = response.ok;
    } catch {
      isAuthenticated = false;
    }

    // Check for existing guest session
    const guestEmail = getGuestEmail();
    const guestToken = getGuestToken();

    if (isAuthenticated || (guestEmail && guestToken)) {
      // Has valid session (auth or guest)
      view = "chat";

      // If guest, set conversation in chatStore
      if (!isAuthenticated && guestToken) {
        // Could fetch existing conversation here
      }
    } else {
      // No session, show email capture
      view = "email";
    }
  });

  /**
   * Handle successful email capture.
   * @param {Object} data
   */
  function handleEmailSuccess(data) {
    view = "chat";
    chatStore.setConversation(data.conversationId, "active");
  }
</script>

<Launcher />

{#if view === "loading"}
  <!-- Loading state - could show a spinner -->
{:else if view === "email"}
  <EmailCapture onsuccess={handleEmailSuccess} />
{:else}
  <ChatWindow />
{/if}
