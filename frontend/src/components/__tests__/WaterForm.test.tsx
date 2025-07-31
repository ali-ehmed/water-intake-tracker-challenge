import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WaterForm from '../WaterForm';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('WaterForm', () => {
  it('renders the form correctly', () => {
    render(<WaterForm />);
    expect(screen.getByPlaceholderText('Enter water intake in ml')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('View Summary')).toBeInTheDocument();
  });

  it('shows error if fields are empty', async () => {
    render(<WaterForm />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText(/please fill out/i)).toBeInTheDocument();
  });

  it('submits correctly with valid data', async () => {
    render(<WaterForm />);
    fireEvent.change(screen.getByPlaceholderText(/water intake/i), { target: { value: '1500' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2025-08-01' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/logged successfully/i)).toBeInTheDocument();
    });
  });
});
