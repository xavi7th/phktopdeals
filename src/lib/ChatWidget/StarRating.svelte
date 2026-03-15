<script>
  let { rating = $bindable(0), readonly = false, size = "md" } = $props();

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  /**
   * Handle star click.
   * @param {number} value
   */
  function handleClick(value) {
    if (!readonly) {
      rating = value;
    }
  }

  /**
   * Handle keyboard navigation.
   * @param {KeyboardEvent} e
   * @param {number} value
   */
  function handleKeydown(e, value) {
    if (!readonly && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      rating = value;
    }
  }
</script>

<div class="flex items-center gap-1" role="radiogroup" aria-label="Rating">
  {#each [1, 2, 3, 4, 5] as value}
    <button
      type="button"
      class="rounded focus:outline-none focus:ring-2 focus:ring-orange-500 {readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform"
      onclick={() => handleClick(value)}
      onkeydown={(e) => handleKeydown(e, value)}
      disabled={readonly}
      aria-checked={rating === value}
      role="radio">
      <svg class="{sizes[size]} {value <= rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span class="sr-only">{value} star{value !== 1 ? "s" : ""}</span>
    </button>
  {/each}
</div>
