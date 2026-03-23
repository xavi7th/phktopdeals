<script>
  import { onMount } from "svelte";
  import Launcher from "./Launcher.svelte";
  import { chatStore } from "./chatStore.js";
  import ChatWindow from "./ChatWindow.svelte";
  import { checkAuth } from "./chat.remote.js";
  import EmailCapture from "./EmailCapture.svelte";
  import { guestStore, setGuestEmail, getGuestEmail, getGuestToken, getGuestConversationId } from "./guestStore.js";

  let view = $state("loading"); // 'loading' | 'email' | 'chat'
  let isAuthenticated = $state(false);

  // Check auth state and guest session
  onMount(async () => {
    // Check if user is authenticated
    try {
      isAuthenticated = await checkAuth();
    } catch {
      isAuthenticated = false;
    }

    // Check for existing guest session
    const guestEmail = getGuestEmail();
    const guestToken = getGuestToken();

    if (isAuthenticated || (guestEmail && guestToken)) {
      // Has valid session (auth or guest)
      view = "chat";

      // If guest, restore conversation into chatStore
      if (!isAuthenticated && guestToken) {
        const guestConversationId = getGuestConversationId();
        if (guestConversationId) {
          chatStore.setConversation(guestConversationId, "active");
        }
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
  <ChatWindow {isAuthenticated} />
{/if}
