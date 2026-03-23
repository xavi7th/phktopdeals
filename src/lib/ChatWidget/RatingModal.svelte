<script>
  import StarRating from "./StarRating.svelte";
  import { submitRating } from "./chat.remote.js";

  let { conversationId = null, onsubmit = null, onclose = null } = $props();

  let rating = $state(0);
  let comment = $state("");
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let error = $state("");

  /**
   * Handle rating submission.
   */
  async function handleSubmit() {
    if (rating === 0) {
      error = "Please select a rating";
      return;
    }

    isSubmitting = true;
    error = "";

    try {
      const result = await submitRating({
        conversationId,
        stars: rating,
        comment: comment.trim() || undefined,
      });

      if (!result.success) {
        error = result.error || "Failed to submit rating";
        return;
      }

      isSubmitted = true;
      onsubmit?.({ rating, comment });
    } catch {
      error = "Network error. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }

  /**
   * Handle close.
   */
  function handleClose() {
    onclose?.();
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
  <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
    {#if isSubmitted}
      <div class="text-center">
        <div class="mb-4 text-5xl">🎉</div>
        <h3 class="mb-2 text-lg font-semibold text-gray-800">Thank you!</h3>
        <p class="mb-4 text-sm text-gray-600">Your feedback helps us improve our service.</p>
        <button type="button" onclick={handleClose} class="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">Close</button>
      </div>
    {:else}
      <h3 class="mb-2 text-lg font-semibold text-gray-800">Rate your experience</h3>
      <p class="mb-4 text-sm text-gray-600">How was your conversation with our support team?</p>

      <div class="mb-4 flex justify-center">
        <StarRating bind:rating size="lg" />
      </div>

      {#if rating > 0}
        <div class="mb-4">
          <label for="rating-comment" class="mb-1 block text-sm font-medium text-gray-700">Additional comments (optional)</label>
          <textarea
            id="rating-comment"
            bind:value={comment}
            rows="3"
            placeholder="Tell us more about your experience..."
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
        </div>
      {/if}

      {#if error}
        <p class="mb-4 text-sm text-red-600">{error}</p>
      {/if}

      <div class="flex gap-3">
        <button type="button" onclick={handleClose} class="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Skip</button>
        <button
          type="button"
          onclick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          class="flex-1 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {#if isSubmitting}
            Submitting...
          {:else}
            Submit Rating
          {/if}
        </button>
      </div>
    {/if}
  </div>
</div>
