<script>
	import { chatStore, hasUnread, unreadCount } from "$lib/ChatWidget/chatStore.js";

	// PHK brand color
	const BRAND_COLOR = "#FF6B35";

	let isHovered = $state(false);
	let isPressed = $state(false);

	function handleClick() {
		chatStore.toggle();
	}

	function handleKeydown(event) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<button
	class="chat-launcher"
	class:is-hovered={isHovered}
	class:is-pressed={isPressed}
	style="--brand-color: {BRAND_COLOR}"
	onclick={handleClick}
	onkeydown={handleKeydown}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	onmousedown={() => (isPressed = true)}
	onmouseup={() => (isPressed = false)}
	aria-label={$hasUnread ? `Open chat, ${$unreadCount} unread messages` : "Open chat"}
	aria-expanded={false}
	type="button"
>
	<!-- Chat icon (when closed) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="icon chat-icon"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>

	<!-- Unread badge -->
	{#if $hasUnread && $unreadCount > 0}
		<span class="unread-badge" aria-label="Unread messages">
			{$unreadCount > 9 ? "9+" : $unreadCount}
		</span>
	{/if}
</button>

<style>
	.chat-launcher {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background-color: var(--brand-color);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		z-index: 50;
	}

	.chat-launcher:hover,
	.chat-launcher.is-hovered {
		transform: scale(1.05);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.chat-launcher:active,
	.chat-launcher.is-pressed {
		transform: scale(0.95);
	}

	.icon {
		width: 1.75rem;
		height: 1.75rem;
		color: white;
	}

	.unread-badge {
		position: absolute;
		top: -0.25rem;
		right: -0.25rem;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.375rem;
		background-color: #dc2626;
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>
