import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WaterLogForm } from '../WaterLogForm';

// Mock the API hook
jest.mock('../../hooks/useWaterApi', () => ({
  useWaterLog: () => ({
    logWater: jest.fn(),
    isLoading: false,
    error: null,
    success: false,
    resetState: jest.fn(),
  }),
}));

describe('WaterLogForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<WaterLogForm />);
    
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/water intake/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log water/i })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<WaterLogForm />);
    
    const intakeInput = screen.getByLabelText(/water intake/i);
    const submitButton = screen.getByRole('button', { name: /log water/i });
    
    // Enter invalid intake (0)
    fireEvent.change(intakeInput, { target: { value: '0' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/intake must be at least 1ml/i)).toBeInTheDocument();
    });
  });

  it('quick amount buttons work correctly', () => {
    render(<WaterLogForm />);
    
    const glassButton = screen.getByText(/glass \(250ml\)/i);
    fireEvent.click(glassButton);
    
    const intakeInput = screen.getByDisplayValue('250');
    expect(intakeInput).toBeInTheDocument();
  });
}); 