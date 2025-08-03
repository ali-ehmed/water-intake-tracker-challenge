import { render, screen, fireEvent } from "@testing-library/react";
import LogPage from "../app/log/page";

describe("LogPage", () => {
  it("renders all input fields and submit button", () => {
    render(<LogPage />);

    expect(screen.getByLabelText(/user id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/water intake/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("submits the form with input values", () => {
    render(<LogPage />);

    fireEvent.change(screen.getByLabelText(/user id/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2025-08-02" },
    });
    fireEvent.change(screen.getByLabelText(/water intake/i), {
      target: { value: "500" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  });
});
