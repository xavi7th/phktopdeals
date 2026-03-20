import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/svelte";
import RatingModal from "../RatingModal.svelte";

// Mock fetch
global.fetch = vi.fn();

describe("RatingModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockReset();
  });

  describe("star display", () => {
    it("shows rating prompt", () => {
      render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      expect(screen.getByText("Rate your experience")).toBeTruthy();
    });

    it("shows 5 clickable stars", () => {
      render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      const buttons = screen.getAllByRole("radio");
      expect(buttons).toHaveLength(5);
    });
  });

  describe("comment field", () => {
    it("shows comment field after star selection", async () => {
      render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[3]);

      expect(screen.getByLabelText(/additional comments/i)).toBeTruthy();
    });
  });

  describe("rating submission", () => {
    it("submits rating to API", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { id: "1", stars: 5 } }),
      });

      const { component } = render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[4]);

      const submitBtn = screen.getByText("Submit Rating");
      await fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/rate"),
          expect.objectContaining({
            method: "POST",
            body: expect.stringContaining('"stars":5'),
          }),
        );
      });
    });

    it("shows thank you message after submission", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { id: "1", stars: 5 } }),
      });

      render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[3]);

      const submitBtn = screen.getByText("Submit Rating");
      await fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Thank you!")).toBeTruthy();
      });
    });

    it("shows error on API failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to submit" }),
      });

      render(RatingModal, {
        props: { conversationId: "test-conv" },
      });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[2]);

      const submitBtn = screen.getByText("Submit Rating");
      await fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/failed to submit/i)).toBeTruthy();
      });
    });
  });

  describe("skip functionality", () => {
    it("calls onclose when skip clicked", async () => {
      const onClose = vi.fn();

      render(RatingModal, {
        props: { conversationId: "test-conv", onclose: onClose },
      });

      const skipBtn = screen.getByText("Skip");
      await fireEvent.click(skipBtn);

      expect(onClose).toHaveBeenCalled();
    });
  });
});
