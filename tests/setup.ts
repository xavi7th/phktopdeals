import "@testing-library/svelte";
import { vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  get length() {
    return 0;
  },
};
Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

// Mock BroadcastChannel
class MockBroadcastChannel {
  onmessage: ((event: MessageEvent) => void) | null = null;
  constructor(public name: string) {}
  postMessage(message: unknown) {}
  close() {}
  addEventListener(type: string, handler: (event: MessageEvent) => void) {
    if (type === "message") {
      this.onmessage = handler;
    }
  }
  removeEventListener() {}
}
Object.defineProperty(window, "BroadcastChannel", {
  value: MockBroadcastChannel,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({ width: 100, height: 100, top: 0, left: 0, right: 100, bottom: 100 });

// Silence Svelte 5 warnings in tests
vi.spyOn(console, "warn").mockImplementation((message) => {
  if (typeof message === "string" && message.includes("Svelte 5")) {
    return;
  }
  console.warn(message);
});
