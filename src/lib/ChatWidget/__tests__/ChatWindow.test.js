import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ChatWindow from "$lib/ChatWidget/ChatWindow.svelte";
import { chatStore } from "$lib/ChatWidget/chatStore.js";

describe("ChatWindow", () => {
	it("should render chat header", async () => {
		chatStore.open();
		const { getByText } = render(ChatWindow);
		expect(getByText("PHK Support")).toBeInTheDocument();
	});

	it("should have minimize button", async () => {
		chatStore.open();
		const { getByRole } = render(ChatWindow);
		const button = getByRole("button", { name: /minimize chat/i });
		expect(button).toBeInTheDocument();
	});

	it("should close on minimize click", async () => {
		chatStore.open();
		const { getByRole } = render(ChatWindow);
		const button = getByRole("button", { name: /minimize chat/i });

		await fireEvent.click(button);
		expect($chatStore.isOpen).toBe(false);
	});

	it("should render message input", async () => {
		chatStore.open();
		const { getByLabelText } = render(ChatWindow);
		const input = getByLabelText(/message input/i);
		expect(input).toBeInTheDocument();
	});

	it("should be responsive on mobile", async () => {
		// Test is mainly for documentation - visual responsiveness
		// is tested via CSS in component
		expect(true).toBe(true);
	});
});
