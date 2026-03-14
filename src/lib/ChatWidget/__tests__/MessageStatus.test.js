import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import MessageStatus from "$lib/ChatWidget/MessageStatus.svelte";

describe("MessageStatus", () => {
  it("should render sending status by default", () => {
    const { container } = render(MessageStatus);
    expect(container.querySelector(".status-sending")).not.toBeNull();
  });

  it("should render sent status", () => {
    const { container } = render(MessageStatus, { status: "sent" });
    expect(container.querySelector(".status-sent")).not.toBeNull();
  });

  it("should render delivered status", () => {
    const { container } = render(MessageStatus, { status: "delivered" });
    expect(container.querySelector(".status-delivered")).not.toBeNull();
  });

  it("should render read status", () => {
    const { container } = render(MessageStatus, { status: "read" });
    expect(container.querySelector(".status-read")).not.toBeNull();
  });
});
