<script>
  let { thumbnailUrl = null, fullUrl = null, filename = "", isPdf = false, size = "md" } = $props();

  let isModalOpen = $state(false);

  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  /**
   * Open full-size modal.
   */
  function openModal() {
    if (!isPdf && fullUrl) {
      isModalOpen = true;
    }
  }

  /**
   * Close modal.
   */
  function closeModal() {
    isModalOpen = false;
  }

  /**
   * Handle backdrop click.
   * @param {MouseEvent} e
   */
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  /**
   * Handle keyboard close.
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  /**
   * Format file size for display.
   * @param {number} bytes
   * @returns {string}
   */
  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isPdf}
  <!-- PDF: Show as downloadable link -->
  <a href={fullUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100">
    <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-2 8h2v6h-2v-6zm-2 0h2v6H9v-6zm-2 0h2v6H7v-6z" />
    </svg>
    <span class="truncate">{filename}</span>
  </a>
{:else if thumbnailUrl}
  <!-- Image: Show thumbnail with lightbox -->
  <button type="button" onclick={openModal} class="{sizes[size]} overflow-hidden rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
    <img src={thumbnailUrl} alt={filename} class="h-full w-full object-cover transition-transform hover:scale-105" />
  </button>
{/if}

{#if isModalOpen && fullUrl}
  <!-- Lightbox Modal -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onclick={handleBackdropClick} onkeydown={handleKeydown} role="dialog" aria-modal="true" aria-label="Full size image">
    <button type="button" onclick={closeModal} class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close">
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <img src={fullUrl} alt={filename} class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
  </div>
{/if}
