import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import TypingIndicator from "$lib/ChatWidget/TypingIndicator.svelte";

describe("TypingIndicator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not render when isTyping is false", () => {
    const { container } = render(TypingIndicator, { isTyping: false });
    expect(container.querySelector(".typing-indicator")).toBeNull();
  });

  it("should render when isTyping is true", () => {
    const { container } = render(TypingIndicator, { isTyping: true });
    expect(container.querySelector(".typing-indicator")).not.toBeNull();
  });

  it("should hide indicator after 300ms debounce when typing stops", async () => {
    const { container, component } = render(TypingIndicator);

    // Start typing
    component.$set({ isTyping: true });
    expect(container.querySelector(".typing-indicator")).not.toBeNull();

    // Stop typing
    component.$set({ isTyping: false });

    // Indicator should still be visible during debounce
    expect(container.querySelector(".typing-indicator")).not.toBeNull();

    // Advance timers past debounce (300ms)
    vi.advanceTimersByTime(300);

    // Now indicator should be hidden
    await waitFor(() => {
      expect(container.querySelector(".typing-indicator")).toBeNull();
    });
  });

  it("should clear timeout if typing starts again before debounce completes", async () => {
    const { container, component } = render(TypingIndicator);

    // Start typing
    component.$set({ isTyping: true });
    expect(container.querySelector(".typing-indicator")).not.toBeNull();

    // Stop typing but restart before debounce completes
    component.$set({ isTyping: false });
    vi.advanceTimersByTime(200); // Less than 300ms debounce
    component.$set({ isTyping: true });

    // Advance remaining time
    vi.advanceTimersByTime(200);

    // Indicator should still be visible
    expect(container.querySelector(".typing-indicator")).not.toBeNull();
  });
});
