import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import WaterIntakeForm from "./WaterIntakeForm";
import React from "react";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

// Mock SWR mutate
jest.mock("swr", () => ({
  mutate: jest.fn(),
}));

// Mock sonner toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useLogWaterIntake hook
const mockTrigger = jest.fn();
jest.mock("@/lib/api", () => ({
  useLogWaterIntake: () => ({
    trigger: mockTrigger,
    isMutating: false,
  }),
}));

describe("WaterIntakeForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTrigger.mockResolvedValue(undefined);
  });
  it("renders input and button", () => {
    render(<WaterIntakeForm />);
    expect(screen.getByPlaceholderText(/e.g., 250/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log intake/i })).toBeInTheDocument();
  });

  it("submits correct value", async () => {
    render(<WaterIntakeForm />);
    const input = screen.getByPlaceholderText(/e.g., 250/i);
    const button = screen.getByRole("button", { name: /log intake/i });

    fireEvent.change(input, { target: { value: "300" } });
    expect(input).toHaveValue(300);

    fireEvent.click(button);

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        userId: "user1",
        date: expect.any(String),
        intakeMl: 300,
      });
    });
  });
});
