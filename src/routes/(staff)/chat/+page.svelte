<script>
  import { onMount } from "svelte";
  import { staffInboxStore } from "$lib/stores/staffInboxStore.js";
  import { audioPreferences } from "$lib/stores/audioPreferences.js";
  import { fetchStaffInbox, fetchConversationMessages, claimConversation, transferConversation, resolveConversation, sendStaffMessage } from "$lib/api/staffApi.js";
  import { subscribeToStaffInbox, unsubscribeFromStaffInbox } from "$lib/stores/staffInboxEvents.js";
  import QueueSidebar from "./QueueSidebar.svelte";
  import ConversationPanel from "./ConversationPanel.svelte";
  import CustomerInfoPanel from "./CustomerInfoPanel.svelte";

  let { data } = $props();

  let audioEnabled = $state(true);

  function toggleAudio() {
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
      audioPreferences.unmute();
    } else {
      audioPreferences.mute();
    }
  }

  // Initialize store with server data and WebSocket
  onMount(() => {
    if (data.inbox) {
      staffInboxStore.setInbox(data.inbox);
    }
    if (data.staffList) {
      staffInboxStore.setStaffList(data.staffList);
    }

    // Subscribe to WebSocket events for real-time updates
    subscribeToStaffInbox();

    // Cleanup WebSocket on unmount
    return () => {
      unsubscribeFromStaffInbox();
    };
  });

  async function handleSelectConversation(conversation) {
    staffInboxStore.selectConversation(conversation.id, conversation);

    const result = await fetchConversationMessages(conversation.id);
    if (result?.success && result.data) {
      staffInboxStore.setMessages(result.data);
    }
  }

  async function handleClaim(conversationId) {
    const result = await claimConversation(conversationId);
    if (result?.success) {
      // Refresh inbox to update queues
      const inboxResult = await fetchStaffInbox();
      if (inboxResult?.success && inboxResult.data) {
        staffInboxStore.setInbox(inboxResult.data);
      }
    }
    return result;
  }

  async function handleTransfer(conversationId, staffId) {
    const result = await transferConversation(conversationId, staffId);
    if (result?.success) {
      // Refresh inbox
      const inboxResult = await fetchStaffInbox();
      if (inboxResult?.success && inboxResult.data) {
        staffInboxStore.setInbox(inboxResult.data);
      }
      // Clear selection if transferring out
      staffInboxStore.selectConversation(null, null);
    }
    return result;
  }

  async function handleResolve(conversationId) {
    const result = await resolveConversation(conversationId);
    if (result?.success) {
      // Refresh inbox
      const inboxResult = await fetchStaffInbox();
      if (inboxResult?.success && inboxResult.data) {
        staffInboxStore.setInbox(inboxResult.data);
      }
      // Clear selection
      staffInboxStore.selectConversation(null, null);
    }
    return result;
  }

  async function handleSendMessage(conversationId, content) {
    const result = await sendStaffMessage(conversationId, content);
    if (result?.success && result.data?.message) {
      staffInboxStore.addMessage(result.data.message);
    }
    return result;
  }

  async function handleLoadMore(cursor) {
    staffInboxStore.setLoadingMessages(true);
    const result = await fetchConversationMessages($staffInboxStore.selectedConversationId, cursor);
    if (result?.success && result.data) {
      staffInboxStore.appendMessages(result.data);
    }
    return result;
  }

  function handleCannedResponseSelect(response) {
    // Optional: track analytics or do something with selected canned response
    console.log("Canned response selected:", response.title);
  }
</script>

<div class="flex h-[calc(100vh-64px)]">
  <!-- Queue Sidebar -->
  <div data-tour="queue-sidebar" class="relative w-80 flex-shrink-0 border-r border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
    <!-- Mute Toggle -->
    <button
      onclick={toggleAudio}
      class="absolute right-2 top-2 z-10 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
      title={audioEnabled ? "Mute notifications" : "Unmute notifications"}>
      {#if audioEnabled}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      {/if}
    </button>
    <QueueSidebar
      queue={$staffInboxStore.queue}
      myChats={$staffInboxStore.myChats}
      otherActiveChats={$staffInboxStore.otherActiveChats}
      selectedConversationId={$staffInboxStore.selectedConversationId}
      isLoading={$staffInboxStore.isLoading}
      onSelect={handleSelectConversation}
      onClaim={handleClaim} />
  </div>

  <!-- Conversation Panel -->
  <div data-tour="conversation-panel" class="flex min-w-0 flex-1 flex-col">
    {#if $staffInboxStore.selectedConversationId}
      <ConversationPanel
        conversation={$staffInboxStore.selectedConversation}
        messages={$staffInboxStore.messages}
        customer={$staffInboxStore.customer}
        staffList={$staffInboxStore.staffList}
        pagination={$staffInboxStore.pagination}
        onLoadMore={handleLoadMore}
        onTransfer={(staffId) => handleTransfer($staffInboxStore.selectedConversationId, staffId)}
        onResolve={() => handleResolve($staffInboxStore.selectedConversationId)}
        onSendMessage={(content) => handleSendMessage($staffInboxStore.selectedConversationId, content)}
        onCannedResponseSelect={handleCannedResponseSelect} />
    {:else}
      <div class="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
        <div class="text-center">
          <svg class="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p class="text-lg font-medium">Select a conversation</p>
          <p class="text-sm">Choose a chat from the queue to start responding</p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Customer Info Panel -->
  {#if $staffInboxStore.selectedConversationId && $staffInboxStore.customer}
    <div class="w-72 flex-shrink-0 border-l border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
      <CustomerInfoPanel customer={$staffInboxStore.customer} />
    </div>
  {/if}
</div>
