import { getEchoClient, disconnectEcho } from "./echoClient.js";
import { staffInboxStore } from "./staffInboxStore.js";
import { fetchStaffInbox } from "$lib/api/staffApi.js";

let staffChannel = null;
let presenceChannel = null;

/**
 * Subscribe to staff inbox events
 * Should be called when staff chat page mounts
 */
export function subscribeToStaffInbox() {
  const echo = getEchoClient();

  // Subscribe to staff inbox channel for real-time updates
  staffChannel = echo
    .private("staff.inbox")
    .listen(".conversation.created", (event) => {
      console.log("New conversation:", event.conversation);
      // Refresh inbox to get new conversation in queue
      refreshInbox();
    })
    .listen(".conversation.claimed", (event) => {
      console.log("Conversation claimed:", event);
      // If claimed by someone else, remove from our view
      // If claimed by us, it will appear in myChats after refresh
      refreshInbox();
    })
    .listen(".conversation.transferred", (event) => {
      console.log("Conversation transferred:", event);
      // Refresh inbox - conversation may have moved to different staff
      refreshInbox();
    })
    .listen(".conversation.resolved", (event) => {
      console.log("Conversation resolved:", event);
      // Remove from active queues
      refreshInbox();
    })
    .listen(".message.sent", (event) => {
      console.log("New message:", event);
      // If this is the active conversation, add the message
      const currentConversationId = getCurrentConversationId();
      if (currentConversationId === event.message?.conversation_id) {
        staffInboxStore.addMessage(event.message);
      } else {
        // Just refresh the inbox to update preview
        refreshInbox();
      }
    });

  // Subscribe to presence channel for staff online status
  presenceChannel = echo
    .join("staff.presence")
    .here((users) => {
      console.log("Staff online:", users);
      // Update staff list with online statuses
    })
    .joining((user) => {
      console.log("Staff joined:", user);
    })
    .leaving((user) => {
      console.log("Staff left:", user);
    });

  console.log("Subscribed to staff inbox events");
}

/**
 * Unsubscribe from staff inbox events
 * Should be called when staff chat page unmounts
 */
export function unsubscribeFromStaffInbox() {
  if (staffChannel) {
    staffChannel.stopListening(".conversation.created");
    staffChannel.stopListening(".conversation.claimed");
    staffChannel.stopListening(".conversation.transferred");
    staffChannel.stopListening(".conversation.resolved");
    staffChannel.stopListening(".message.sent");
    staffChannel.unsubscribe();
    staffChannel = null;
  }

  if (presenceChannel) {
    presenceChannel.leave();
    presenceChannel = null;
  }

  disconnectEcho();
  console.log("Unsubscribed from staff inbox events");
}

/**
 * Refresh inbox data from server
 */
async function refreshInbox() {
  const result = await fetchStaffInbox();
  if (result?.success && result.data) {
    staffInboxStore.setInbox(result.data);
  }
}

/**
 * Get current selected conversation ID from store
 */
function getCurrentConversationId() {
  let currentId = null;
  staffInboxStore.subscribe((state) => {
    currentId = state.selectedConversationId;
  })();
  return currentId;
}

/**
 * Notify other staff that this staff is viewing a conversation
 */
export function notifyViewingConversation(conversationId) {
  if (presenceChannel) {
    // Could broadcast that we're viewing this conversation
    // For now, just log it
    console.log("Viewing conversation:", conversationId);
  }
}
