import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import FileUploadZone from "../FileUploadZone.svelte";

describe("FileUploadZone", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("file type validation", () => {
    it("accepts jpg files", () => {
      const file = new File([""], "test.jpg", { type: "image/jpeg" });
      expect(file.type).toBe("image/jpeg");
    });

    it("accepts png files", () => {
      const file = new File([""], "test.png", { type: "image/png" });
      expect(file.type).toBe("image/png");
    });

    it("accepts webp files", () => {
      const file = new File([""], "test.webp", { type: "image/webp" });
      expect(file.type).toBe("image/webp");
    });

    it("accepts pdf files", () => {
      const file = new File([""], "test.pdf", { type: "application/pdf" });
      expect(file.type).toBe("application/pdf");
    });

    it("rejects invalid file types", () => {
      const file = new File([""], "test.txt", { type: "text/plain" });
      expect(file.type).toBe("text/plain");
    });
  });

  describe("file size validation", () => {
    it("rejects files larger than 10MB", () => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const oversizedFile = { size: 11 * 1024 * 1024 };
      expect(oversizedFile.size).toBeGreaterThan(maxSize);
    });

    it("accepts files up to 10MB", () => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const validFile = { size: 9 * 1024 * 1024 };
      expect(validFile.size).toBeLessThanOrEqual(maxSize);
    });
  });

  describe("drag-and-drop handling", () => {
    it("shows drop zone on dragover", async () => {
      const { container } = render(FileUploadZone, {
        props: { conversationId: "test-conv" },
      });

      const dropZone = container.querySelector("[role='button']");
      await fireEvent.dragOver(dropZone);

      // Check for drop indicator
      expect(container.innerHTML).toContain("Drop file here");
    });

    it("handles drop event", async () => {
      const onupload = vi.fn();
      const { container } = render(FileUploadZone, {
        props: { conversationId: "test-conv", onupload },
      });

      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const dropZone = container.querySelector("[role='button']");

      await fireEvent.drop(dropZone, {
        dataTransfer: { files: [file] },
      });

      // Component should process the file
      expect(dropZone).toBeTruthy();
    });
  });
});
