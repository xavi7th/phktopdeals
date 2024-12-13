<!-- @see https://tiptap.dev/docs/editor -->
<!-- Example usage -->
<!-- import WysiwygEditor from "$lib/Components/FormInputs/TipTapEditor.svelte"; -->
<!-- <TipTapEditor name="description" label="Product Description" msg={form?.success || form?.errors?.description && form?.errors?.description[0]}/> -->

<!-- <div class="col-span-12">
  <WysiwygEditor name="faqs" bind:val={$formData.faqs} label="Card FAQs" msg={$errors?.faqs?.[0]} />
</div> -->
<script>
  import { Editor } from "@tiptap/core";
  import SvgIcon from "../SvgIcon.svelte";
  import Link from "@tiptap/extension-link";
  import StarterKit from "@tiptap/starter-kit";
  import FormMessage from "../FormMessage.svelte";
  import Underline from "@tiptap/extension-underline";
  import Placeholder from "@tiptap/extension-placeholder";
  import { onMount, onDestroy, afterUpdate, tick } from "svelte";
  import { blockquotesIcon, boldIcon, bulletPointsIcon, cancelChainLinkIcon, chainLinkIcon, codesIcon, italicsIcon, numberedBulletsIcon, redoIcon, strikethroughIcon, underlineIcon, undoIcon } from "../iconPaths";

  /** @type {string|undefined} */
  export let label;

  /** @type {string} */
  export let name = "tiptap-textarea-" + crypto.randomUUID();

  /** @type {string|undefined|null} */
  export let val;

  /** @type {HTMLElement} */
  let element;

  /** @type { import('@tiptap/core').Editor } */
  let editor;

  /** @type {string|string[]|undefined} */
  export let msg = [];

  export let isError = true;

  let setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL for this link", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  let isUpdating = false;

  onMount(() => {
    editor = new Editor({
      editorProps: {
        attributes: {
          class: "prose prose-sm xl:prose-md m-5 focus:outline-none",
        },
      },
      element: element,
      extensions: [
        StarterKit.configure({
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal list-inside text-gray-800 dark:text-white",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "text-accent-foreground p-2 text-gray-800 sm:text-xl dark:text-white",
            },
          },
          bulletList: {
            HTMLAttributes: {
              class: "list-disc list-inside text-gray-800 dark:text-white",
            },
          },
          heading: {
            levels: [1, 2, 3, 4],
            HTMLAttributes: {
              class: "tiptap-heading",
            },
          },
          paragraph: {
            HTMLAttributes: {
              class: "text-gray-800 dark:text-neutral-200",
            },
          },
          bold: {
            HTMLAttributes: {
              class: "font-bold",
            },
          },
        }),
        Placeholder.configure({
          placeholder: "Type your content here...",
          emptyNodeClass: "text-gray-400 dark:text-neutral-200",
        }),
        Underline,
        Link.configure({
          HTMLAttributes: {
            class: "inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-white",
          },
        }),
      ],
      content: val || "",
      onTransaction: () => {
        isUpdating = true;

        editor = editor; // force re-render so `editor.isActive` works as expected

        // val = editor.getHTML(); // This returns ONLY the HTML content without the container
        if (editor.options.element.innerHTML.includes("Type your content here")) {
          val = null;
        } else {
          val = editor.options.element.innerHTML.replace('contenteditable="true"', "");
        }
        tick().then(() => (isUpdating = false));
      },
      onPaste(/** @type { ClipboardEvent } */ event, /** @type { import('@tiptap/pm/model').Slice } */ slice) {
        isUpdating = true;
        editor.commands.setContent(event.clipboardData?.getData("text/plain") || "");
        tick().then(() => (isUpdating = false));
      },
      // onBeforeCreate({ editor }) {
      //   // Before the view is created.
      // },
      // onCreate({ editor }) {
      //   // The editor is ready.
      // },
      // onUpdate({ editor }) {
      //   // The content has changed.
      // },
      // onSelectionUpdate({ editor }) {
      //   // The selection has changed.
      // },
      // onFocus({ editor, event }) {
      //   // The editor is focused.
      // },
      // onBlur({ editor, event }) {
      //   // The editor isn’t focused anymore.
      // },
      // onDestroy() {
      //   // The editor is being destroyed.
      // },
      // onDrop(/** @type { DragEvent } */ event, /** @type { import('@tiptap/pm/model').Slice } */ slice, /** @type { boolean } */ moved) {
      //   // The editor is being pasted into.
      // },
      // onContentError({ editor, error, disableCollaboration }) {
      //   // The editor content does not match the schema.
      // },
    });
  });

  afterUpdate(() => {
    if (!isUpdating) {
      // Update the editor contents when the reactive val is updated outside this component, but don't trigger this on internal updates to val
      editor.commands.setContent(val || "");
    }
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div
  class="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800
      {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
      {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}"
  class:pt-6={label}>
  {#if label}
    <label for="product_category" class="s-kc2lUeBIIpXP pointer-events-none absolute start-0 top-0 h-full -translate-y-2 truncate border border-transparent p-4 text-xs capitalize text-gray-500 dark:text-neutral-500">
      {label}
    </label>
  {/if}

  <div>
    {#if editor}
      <div class="flex gap-x-0.5 border-b border-gray-200 p-2 align-middle dark:border-neutral-700">
        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                    {editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          H1
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                    {editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          H2
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                    {editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          H3
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().setParagraph().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                    {editor.isActive('paragraph') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          P
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().setBold().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                    {editor.isActive('bold') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={boldIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleItalic().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('italic') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={italicsIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleUnderline().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('underline') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={underlineIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleStrike().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('strike') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={strikethroughIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={setLink}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('bold') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={chainLinkIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.can().unsetLink()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('bold') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={cancelChainLinkIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleOrderedList().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('orderedList') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={numberedBulletsIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleBulletList().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('bulletList') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={bulletPointsIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleBlockquote().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('blockquote') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={blockquotesIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().toggleCodeBlock().run()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
                      {editor.isActive('codeBlock') ? 'bg-gray-100 text-brand-600' : 'text-gray-800'}">
          <SvgIcon class="size-4 shrink-0" slot={codesIcon} />
        </button>

        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <SvgIcon class="size-4 shrink-0" slot={undoIcon} />
        </button>
        <button
          on:click|preventDefault|stopPropagation={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <SvgIcon class="size-4 shrink-0" slot={redoIcon} />
        </button>
      </div>
    {/if}

    <div class="h-[10rem] overflow-auto" bind:this={element} />

    <textarea {name} id={name} bind:value={val} class="hidden"></textarea>
  </div>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}
</div>

<style global lang="scss">
  .ProseMirror:focus {
    outline: none;
  }

  .tiptap ul p,
  .tiptap ol p {
    display: inline;
  }

  .tiptap p {
    @apply text-neutral-400;
  }

  .tiptap p.is-editor-empty:first-child::before {
    font-size: 14px;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
    color: #9ca3af !important;
  }
</style>
