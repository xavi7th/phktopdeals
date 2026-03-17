import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import EscalationPrompt from "$lib/ChatWidget/components/EscalationPrompt.svelte";
import { chatStore } from "$lib/ChatWidget/chatStore.js";

describe("EscalationPrompt", () => {
  beforeEach(() => {
    sessionStorage.clear();
    chatStore.hideEscalation();
  });

  it("should not render when showEscalationPrompt is false", () => {
    const { container } = render(EscalationPrompt);
    expect(container.querySelector(".border-orange-200")).toBeNull();
  });

  it("should render escalation message when showEscalationPrompt is true", () => {
    // Set escalation state
    chatStore.showEscalation("Rate limit exceeded");

    const { container } = render(EscalationPrompt);
    expect(container.querySelector(".border-orange-200")).not.toBeNull();
    expect(screen.getByText(/unable to answer your queries/i)).toBeTruthy();
  });

  it("should have Transfer to Agent button", () => {
    chatStore.showEscalation("Test");

    render(EscalationPrompt);
    expect(screen.getByText("Transfer to Agent")).toBeTruthy();
  });

  it("should have Continue with AI button", () => {
    chatStore.showEscalation("Test");

    render(EscalationPrompt);
    expect(screen.getByText("Continue with AI")).toBeTruthy();
  });

  it("should call onContinueWithAi when Continue button clicked", async () => {
    const onContinueWithAi = vi.fn();
    chatStore.showEscalation("Test");

    const { getByText } = render(EscalationPrompt, {
      props: { onContinueWithAi },
    });

    await fireEvent.click(getByText("Continue with AI"));

    expect(onContinueWithAi).toHaveBeenCalledTimes(1);
  });

  it("should call onTransferToAgent when Transfer button clicked", async () => {
    const onTransferToAgent = vi.fn();
    chatStore.showEscalation("Test");

    const { getByText } = render(EscalationPrompt, {
      props: { onTransferToAgent },
    });

    await fireEvent.click(getByText("Transfer to Agent"));

    expect(onTransferToAgent).toHaveBeenCalledTimes(1);
  });

  it("should hide escalation prompt after Continue with AI is clicked", async () => {
    chatStore.showEscalation("Test");
    expect(chatStore.getState().showEscalationPrompt).toBe(true);

    const onContinueWithAi = vi.fn();
    const { container } = render(EscalationPrompt, {
      props: { onContinueWithAi },
    });

    await fireEvent.click(container.querySelector("button:first-child"));

    // After clicking continue, the prompt should hide
    expect(container.querySelector(".border-orange-200")).toBeNull();
  });
});
