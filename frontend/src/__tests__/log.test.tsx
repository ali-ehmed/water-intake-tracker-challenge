// src/__tests__/log.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogPage from '@/pages/log';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('LogPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits valid data and shows success message', async () => {
    render(<LogPage />);

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2025-07-26' },
    });

    fireEvent.change(screen.getByLabelText(/Water Intake/i), {
      target: { value: '1800' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/✅ Logged successfully!/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error when intake is negative', async () => {
    render(<LogPage />);

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2025-07-26' },
    });

    fireEvent.change(screen.getByLabelText(/Water Intake/i), {
      target: { value: '-100' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Water intake must be 0 or more/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error when date is missing', async () => {
    render(<LogPage />);

    fireEvent.change(screen.getByLabelText(/Water Intake/i), {
      target: { value: '1800' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Date is required/i);
      if (!errorMessage) screen.debug(); // helpful for troubleshooting
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
