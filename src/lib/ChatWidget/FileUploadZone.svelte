<script>
  import { getGuestToken } from "./guestStore.js";

  let { conversationId = null, onupload = null, onerror = null } = $props();

  let isDragging = $state(false);
  let isUploading = $state(false);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  /**
   * Validate file type and size.
   * @param {File} file
   * @returns {{valid: boolean, error?: string}}
   */
  function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: "Only JPG, PNG, WebP, and PDF files are allowed",
      };
    }

    if (file.size > MAX_SIZE) {
      return {
        valid: false,
        error: "File size must be less than 10MB",
      };
    }

    return { valid: true };
  }

  /**
   * Upload a file.
   * @param {File} file
   */
  async function uploadFile(file) {
    const validation = validateFile(file);
    if (!validation.valid) {
      onerror?.({ message: validation.error, file });
      return;
    }

    isUploading = true;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversation_id", conversationId);

      const guestToken = getGuestToken();
      const headers = {};
      if (guestToken) {
        headers["X-Guest-Token"] = guestToken;
      }

      const response = await fetch("/api/v1/chat/attachments", {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        onerror?.({
          message: result.message || "Upload failed",
          file,
        });
        return;
      }

      onupload?.({
        url: result.data.url,
        thumbnailUrl: result.data.thumbnail_url,
        filename: result.data.filename,
        mimeType: result.data.mime_type,
        size: result.data.size,
        isPdf: result.data.is_pdf,
      });
    } catch {
      onerror?.({ message: "Network error during upload", file });
    } finally {
      isUploading = false;
    }
  }

  /**
   * Handle file input change.
   * @param {Event} e
   */
  function handleFileChange(e) {
    const input = /** @type {HTMLInputElement} */ (e.target);
    const file = input.files?.[0];
    if (file) {
      uploadFile(file);
    }
    input.value = "";
  }

  /**
   * Handle drag over.
   * @param {DragEvent} e
   */
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
  }

  /**
   * Handle drag leave.
   * @param {DragEvent} e
   */
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
  }

  /**
   * Handle drop.
   * @param {DragEvent} e
   */
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }

  /**
   * Trigger file picker.
   */
  function openFilePicker() {
    document.getElementById("file-input")?.click();
  }
</script>

<div class="relative" ondragover={handleDragOver} ondragleave={handleDragLeave} ondrop={handleDrop} role="button" tabindex="0" onclick={openFilePicker} onkeydown={(e) => e.key === "Enter" && openFilePicker()}>
  <slot {isUploading} {isDragging} />

  {#if isDragging}
    <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-orange-500 bg-orange-50">
      <span class="text-sm font-medium text-orange-600">Drop file here</span>
    </div>
  {/if}

  <input type="file" id="file-input" accept=".jpg,.jpeg,.png,.webp,.pdf" onchange={handleFileChange} class="hidden" disabled={isUploading} />
</div>
