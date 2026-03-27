<script>
  import { animate } from "motion";
  import { onMount, untrack } from "svelte";
  import { browser } from "$app/environment";
  import RatingModal from "./RatingModal.svelte";
  import { sendAiMessage } from "./chat.remote.js";
  import Portal from "$lib/Components/Portal.svelte";
  import MessageStatus from "./MessageStatus.svelte";
  import TypingIndicator from "./TypingIndicator.svelte";
  import EscalationPrompt from "./components/EscalationPrompt.svelte";
  import { chatStore, isChatOpen, messages, conversationStatus, conversationId, isAiTyping } from "$lib/ChatWidget/chatStore.js";
  import { inactivityStore } from "./inactivityStore.js";

  // Props
  let { isAuthenticated = false } = $props();

  // PHK brand colors
  const BRAND_COLOR = "#6C5702";
  const SECONDARY_COLOR = "#2D3436";
  const ANIMATION_DURATION = 0.5; // 500ms

  let userEmail = $state("");
  let shouldMount = $state(false);
  let messagesContainer = $state();
  let inputValue = $state("");
  let chatWindowElement = $state();
  let isAnimating = $state(false);
  let messageInput = $state();
  let isOtherUserTyping = $state(false);
  let messageObserver;
  let showRatingModal = $state(false);
  let hasSubmittedRating = $state(false);

  // Mount after hydration to avoid SSR issues
  onMount(() => {
    shouldMount = true;

    // Fetch user email if authenticated
    if (isAuthenticated) {
      fetch("/api/v1/user", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          userEmail = data.email || "";
        })
        .catch(() => {
          // User fetch failed, ignore
        });
    }

    // Set up IntersectionObserver for read receipts
    messageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageEl = entry.target;
            const messageId = messageEl.dataset.messageId;
            // Mark message as read when visible
            if (messageId) {
              // TODO: Call API to mark as read
              console.log("Message visible:", messageId);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    return () => {
      if (messageObserver) {
        messageObserver.disconnect();
      }
    };
  });

  // Animate open/close and focus input
  $effect(() => {
    if (!browser || untrack(() => isAnimating)) return;

    if ($isChatOpen) {
      // Animate in
      isAnimating = true;
      animate(
        chatWindowElement,
        {
          opacity: [0, 1],
          scale: [0.9, 1],
          y: [20, 0],
        },
        {
          duration: ANIMATION_DURATION,
          easing: "ease-out",
        },
      ).finished.then(() => {
        isAnimating = false;
        // Focus input when chat opens
        messageInput?.focus();
      });
    } else {
      // Animate out
      isAnimating = true;
      animate(
        chatWindowElement,
        {
          opacity: [1, 0],
          scale: [1, 0.9],
          y: [0, 20],
        },
        {
          duration: ANIMATION_DURATION,
          easing: "ease-in",
        },
      ).finished.then(() => {
        isAnimating = false;
      });
    }
  });

  // Auto-scroll to bottom when new messages arrive
  $effect(() => {
    const msgs = $messages; // track dependency
    if (!messagesContainer || !msgs.length) return;

    requestAnimationFrame(() => {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  });

  // Show rating modal when conversation is resolved
  $effect(() => {
    if ($conversationStatus === "resolved" && !hasSubmittedRating) {
      showRatingModal = true;
    }
  });

  function handleMinimize() {
    chatStore.close();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text || !$conversationId) return;

    inputValue = "";

    // Record user activity (resets warning since this is a real message)
    inactivityStore.recordLocalActivity();

    chatStore.addMessage({
      id: crypto.randomUUID(),
      content: text,
      sender: "user",
      created_at: new Date().toISOString(),
    });

    chatStore.setAiTyping(true);

    try {
      const result = await sendAiMessage({ conversationId: $conversationId, message: text });

      if (result.success) {
        chatStore.addMessage({
          id: result.data.message.id,
          content: result.data.message.content,
          sender: "ai",
          created_at: result.data.message.created_at,
        });
        if (result.metadata?.should_escalate) {
          chatStore.showEscalation(result.metadata.reason);
        }
      } else {
        chatStore.addMessage({
          id: crypto.randomUUID(),
          content: result.error || "Sorry, something went wrong. Please try again.",
          sender: "ai",
          created_at: new Date().toISOString(),
        });
      }
    } catch {
      chatStore.addMessage({
        id: crypto.randomUUID(),
        content: "Sorry, something went wrong. Please try again.",
        sender: "ai",
        created_at: new Date().toISOString(),
      });
    } finally {
      chatStore.setAiTyping(false);
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      handleMinimize();
    }
  }

  function handleRatingClose() {
    showRatingModal = false;
  }

  function handleRatingSubmit() {
    hasSubmittedRating = true;
    showRatingModal = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<Portal {shouldMount}>
  {#if $isChatOpen}
    <div bind:this={chatWindowElement} class="chat-window" style="--brand-color: {BRAND_COLOR}; --secondary-color: {SECONDARY_COLOR}" role="dialog" aria-label="Chat window" aria-modal="true">
      <!-- Header -->
      <header class="chat-header">
        <div class="header-content">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-icon">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <div class="header-text">
            <h3 class="title">{isAuthenticated && userEmail ? userEmail : "PHK Support"}</h3>
            <p class="subtitle">
              {#if isAuthenticated && userEmail}
                <span class="badge authenticated">Logged in</span>
              {:else}
                <span class="badge guest">Guest</span>
                • We typically reply within minutes
              {/if}
            </p>
          </div>
        </div>
        <button class="close-btn" onclick={handleMinimize} aria-label="Minimize chat" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </header>

      <!-- Messages -->
      <div class="messages" bind:this={messagesContainer} role="log" aria-live="polite">
        {#if $messages.length === 0}
          <div class="empty-state">
            <p>Send us a message and we'll get back to you!</p>
          </div>
        {:else}
          {#each $messages as message (message.id)}
            <div class="message" class:user={message.sender === "user"} class:bot={message.sender === "bot" || message.sender === "ai"} data-message-id={message.id}>
              <div class="message-bubble">
                {message.content || message.text}
              </div>
              <div class="message-meta">
                <span class="message-time">
                  {new Date(message.created_at || message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {#if message.sender === "user"}
                  <MessageStatus status={message.status || "sent"} />
                {/if}
              </div>
            </div>
          {/each}
        {/if}
        <!-- Typing indicator -->
        {#if isOtherUserTyping || $isAiTyping}
          <TypingIndicator isTyping={true} />
        {/if}

        <!-- Escalation prompt -->
        <EscalationPrompt onTransferToAgent={() => chatStore.requestHandoff()} />
      </div>

      <!-- Input -->
      <form class="input-area" onsubmit={handleSubmit}>
        <input bind:this={messageInput} type="text" class="message-input" placeholder="Type your message..." bind:value={inputValue} aria-label="Message input" />
        <button class="send-btn" type="submit" aria-label="Send message" disabled={!inputValue.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  {/if}
</Portal>

{#if showRatingModal && $conversationId}
  <RatingModal conversationId={$conversationId} onclose={handleRatingClose} onsubmit={handleRatingSubmit} />
{/if}

<style>
  .chat-window {
    position: fixed;
    bottom: 6.5rem;
    right: 1.5rem;
    width: 23.75rem;
    height: 31.25rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1000;
    /* Glassmorphism effect */
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .chat-header {
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

  .badge {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 0.25rem;
  }

  .badge.authenticated {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
  }

  .badge.guest {
    background: rgba(255, 255, 255, 0.2);
    color: white;
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

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6b7280;
    text-align: center;
    font-size: 0.875rem;
  }

  .message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
  }

  .message.user {
    align-self: flex-end;
    align-items: flex-end;
  }

  .message.bot {
    align-self: flex-start;
    align-items: flex-start;
  }

  .message-bubble {
    padding: 0.625rem 0.875rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .message.user .message-bubble {
    background: var(--brand-color);
    color: white;
    border-bottom-right-radius: 0.25rem;
  }

  .message.bot .message-bubble {
    background: #f3f4f6;
    color: var(--secondary-color);
    border-bottom-left-radius: 0.25rem;
  }

  .message-meta {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
  }

  .message-time {
    font-size: 0.625rem;
    color: #9ca3af;
  }

  .input-area {
    padding: 0.75rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 0.5rem;
    background: white;
  }

  .message-input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    font-size: 0.875rem;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .message-input:focus {
    border-color: var(--brand-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  }

  .send-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--brand-color);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition:
      transform 0.2s,
      opacity 0.2s;
  }

  .send-btn:hover:not(:disabled) {
    transform: scale(1.05);
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .send-btn .icon {
    width: 1rem;
    height: 1rem;
  }

  /* Responsive: Full-screen on mobile */
  @media (max-width: 48rem) {
    .chat-window {
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
  }
</style>
