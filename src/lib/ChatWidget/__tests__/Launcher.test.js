import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Launcher from "$lib/ChatWidget/Launcher.svelte";
import { chatStore } from "$lib/ChatWidget/chatStore.js";

describe("Launcher", () => {
	it("should render chat launcher button", () => {
		const { getByRole } = render(Launcher);
		const button = getByRole("button", { name: /open chat/i });
		expect(button).toBeInTheDocument();
	});

	it("should toggle chat on click", async () => {
		const { getByRole } = render(Launcher);
		const button = getByRole("button");

		await fireEvent.click(button);
		expect($chatStore.isOpen).toBe(true);

		await fireEvent.click(button);
		expect($chatStore.isOpen).toBe(false);
	});

	it("should show unread badge when has unread", async () => {
		chatStore.setUnread(true, 3);

		const { getByText } = render(Launcher);
		const badge = getByText("3");
		expect(badge).toBeInTheDocument();
	});

	it("should handle keyboard toggle", async () => {
		const { getByRole } = render(Launcher);
		const button = getByRole("button");

		await fireEvent.keyDown(button, { key: "Enter" });
		expect($chatStore.isOpen).toBe(true);
	});
});
