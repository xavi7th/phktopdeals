<script>
  import { onMount } from "svelte";
  import Launcher from "./Launcher.svelte";
  import { chatStore, conversationId, conversationStatus, handoffStatus } from "./chatStore.js";
  import ChatWindow from "./ChatWindow.svelte";
  import { checkAuth } from "./chat.remote.js";
  import EmailCapture from "./EmailCapture.svelte";
  import { guestStore, setGuestEmail, getGuestEmail, getGuestToken, getGuestConversationId } from "./guestStore.js";
  import { inactivityStore } from "./inactivityStore.js";

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

  // Start/stop inactivity tracking based on conversation state
  // Track for 'active' status OR 'waiting' handoff status
  $effect(() => {
    const currentConversationId = $conversationId;
    const currentStatus = $conversationStatus;
    const currentHandoffStatus = $handoffStatus;

    const shouldTrack = currentConversationId && (currentStatus === "active" || currentHandoffStatus === "waiting");

    if (shouldTrack) {
      inactivityStore.startTracking();
    } else {
      inactivityStore.stopTracking();
    }
  });

  // Cleanup on unmount
  $effect(() => {
    return () => {
      inactivityStore.stopTracking();
    };
  });
</script>

<Launcher />

{#if view === "loading"}
  <!-- Loading state - could show a spinner -->
{:else if view === "email"}
  <EmailCapture onsuccess={handleEmailSuccess} />
{:else}
  <ChatWindow {isAuthenticated} />
{/if}

<!-- Show connection warning if disconnected -->
{#if $inactivityStore.connectionStatus === "disconnected"}
  <div class="connection-warning">Connection unstable. Your session may timeout.</div>
{/if}

<style>
  .connection-warning {
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    z-index: 999;
    padding: 0.5rem 1rem;
    background-color: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    color: #92400e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
