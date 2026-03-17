import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import CannedResponseDropdown from "../CannedResponseDropdown.svelte";

// Mock the API
vi.mock("$lib/api/staffApi.js", () => ({
  fetchCannedResponses: vi.fn().mockResolvedValue({
    success: true,
    data: {
      canned_responses: [
        {
          id: "1",
          title: "Greeting",
          content: "Hello {{customer_name}}, welcome!",
          category: "greeting",
          category_label: "Greeting",
        },
        {
          id: "2",
          title: "Order Status",
          content: "Your order {{order_id}} is being processed.",
          category: "order",
          category_label: "Order Related",
        },
      ],
      categories: [
        { value: "greeting", label: "Greeting" },
        { value: "order", label: "Order Related" },
      ],
    },
  }),
  previewCannedResponse: vi.fn().mockResolvedValue({
    success: true,
    data: {
      expanded_content: "Hello John, welcome!",
    },
  }),
}));

describe("CannedResponseDropdown", () => {
  const mockCustomer = { name: "John", id: "123" };
  const mockOnSelect = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    expect(screen.getByText("Canned Responses")).toBeDefined();
  });

  it("loads canned responses on mount", async () => {
    const { fetchCannedResponses } = await import("$lib/api/staffApi.js");

    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    await waitFor(() => {
      expect(fetchCannedResponses).toHaveBeenCalled();
    });
  });

  it("displays canned responses after loading", async () => {
    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Greeting")).toBeDefined();
      expect(screen.getByText("Order Status")).toBeDefined();
    });
  });

  it("shows category filter dropdown", async () => {
    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeDefined();
    });
  });

  it("expands macros when selecting a response", async () => {
    const user = userEvent.setup();
    const { previewCannedResponse } = await import("$lib/api/staffApi.js");

    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    await waitFor(() => {
      const greetingButton = screen.getByText("Greeting");
      expect(greetingButton).toBeDefined();
    });

    // Click on a canned response to preview
    await user.click(screen.getByText("Greeting"));

    // Should call preview
    await waitFor(() => {
      expect(previewCannedResponse).toHaveBeenCalled();
    });
  });

  it("displays loading state", () => {
    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    // Initially should show loading
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("shows empty state when no responses", async () => {
    const { fetchCannedResponses } = await import("$lib/api/staffApi.js");
    fetchCannedResponses.mockResolvedValueOnce({
      success: true,
      data: { canned_responses: [], categories: [] },
    });

    render(CannedResponseDropdown, {
      props: {
        customer: mockCustomer,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("No canned responses found")).toBeDefined();
    });
  });
});
