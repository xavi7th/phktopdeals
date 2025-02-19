<!-- EXAMPLE USAGE -->

<!--
<script>
  import TapToCopy from '$lib/Components/TapToCopy.svelte';
</script>

// Basic usage
<TapToCopy text="Click to copy this text" />

// Custom copy text (different from displayed text)
<TapToCopy text="My public key" copyText="abcd1234wxyz5678" />

// Custom success message
<TapToCopy text="Special code" successMessage="Copied to clipboard!" />

// Using with a slot for custom content
<TapToCopy copyText="Text to be copied">
  <div class="flex items-center">
    <span>Custom formatted content</span>
    <img src="/icon.png" alt="icon" />
  </div>
</TapToCopy>
-->

<script>
  import { onMount } from 'svelte';

  // Props
  export let text = ''; // Text to copy (optional if using slot)
  export let copyText = text; // Text to actually copy (can be different from displayed text)
  export let successMessage = 'Copied!';
  export let duration = 5000; // Duration to show success message in ms

  let className;

  export { className as class };
  // State
  let copied = false;
  let iconSize = 18;
  let mounted = false;

  // Initialize when component is mounted
  onMount(() => {
    mounted = true;
    return () => mounted = false;
  });

  // Handle copy action
  async function copyToClipboard() {
    const textToCopy = copyText || text;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copied = true;

      // Reset after specified duration
      setTimeout(() => {
        if (mounted) copied = false;
      }, duration);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
</script>

<div
  class="tap-to-copy relative cursor-pointer inline-flex items-center group"
  on:click={copyToClipboard}
  role="button"
  tabindex="0"
  aria-label="Copy to clipboard"
  on:keydown={(e) => e.key === 'Enter' && copyToClipboard()}
>
  <slot>
    {#if text}
      <span class="mr-2">{text}</span>
    {/if}
  </slot>

  <span class="copy-icon relative">
    {#if copied}
      <!-- Success checkmark icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-green-500 ml-2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>

      <!-- Success message tooltip -->
      <span class="success-tooltip absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs py-1 px-2 rounded opacity-90">
        {successMessage}
      </span>
    {:else}
      <!-- Copy icon -->
       <span>
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width={iconSize}
           height={iconSize}
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round"
           class="text-gray-500 group-hover:text-gray-700 ml-2 {className}"
         >
           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
         </svg>
       </span>
    {/if}
  </span>
</div>

<style>
  .tap-to-copy {
    transition: all 0.2s ease;
  }

  .tap-to-copy:hover {
    opacity: 0.9;
  }

  .success-tooltip {
    white-space: nowrap;
    animation: fadeOut 2s ease forwards;
  }

  @keyframes fadeOut {
    0% { opacity: 0; }
    20% { opacity: 0.9; }
    80% { opacity: 0.9; }
    100% { opacity: 0; }
  }
</style>
