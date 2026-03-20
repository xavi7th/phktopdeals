import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/svelte";
import StarRating from "../StarRating.svelte";

describe("StarRating", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("star selection", () => {
    it("renders 5 stars", () => {
      render(StarRating, { props: { rating: 0 } });

      const buttons = screen.getAllByRole("radio");
      expect(buttons).toHaveLength(5);
    });

    it("highlights selected stars", async () => {
      const { component } = render(StarRating, { props: { rating: 3 } });

      const buttons = screen.getAllByRole("radio");
      expect(buttons[0]).toHaveAttribute("aria-checked", "false");
      expect(buttons[2]).toHaveAttribute("aria-checked", "true");
    });

    it("updates rating on click", async () => {
      const { component } = render(StarRating, { props: { rating: 0 } });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[3]);

      expect(component.rating).toBe(4);
    });

    it("supports keyboard navigation", async () => {
      const { component } = render(StarRating, { props: { rating: 0 } });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.keyDown(buttons[2], { key: "Enter" });

      expect(component.rating).toBe(3);
    });
  });

  describe("readonly mode", () => {
    it("does not change rating when readonly", async () => {
      const { component } = render(StarRating, {
        props: { rating: 2, readonly: true },
      });

      const buttons = screen.getAllByRole("radio");
      await fireEvent.click(buttons[4]);

      expect(component.rating).toBe(2);
    });
  });

  describe("sizes", () => {
    it("applies size classes correctly", () => {
      const { container } = render(StarRating, {
        props: { rating: 3, size: "lg" },
      });

      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("w-8", "h-8");
    });
  });
});
