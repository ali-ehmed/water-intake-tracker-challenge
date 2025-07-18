import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WaterLogForm from '../WaterLogForm';
import { api } from '@/services/api';

// Mock the API service
jest.mock('@/services/api', () => ({
  api: {
    logWaterIntake: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

describe('WaterLogForm', () => {
  const defaultProps = {
    userId: 'test-user',
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<WaterLogForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/water intake/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log intake/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    mockApi.logWaterIntake.mockResolvedValueOnce({} as any);
    
    render(<WaterLogForm {...defaultProps} />);
    
    const intakeInput = screen.getByLabelText(/water intake/i);
    const submitButton = screen.getByRole('button', { name: /log intake/i });
    
    fireEvent.change(intakeInput, { target: { value: '1500' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockApi.logWaterIntake).toHaveBeenCalledWith({
        userId: 'test-user',
        date: expect.any(String),
        intakeMl: 1500,
      });
    });
  });

  it('shows success message on successful submission', async () => {
    mockApi.logWaterIntake.mockResolvedValueOnce({} as any);
    
    render(<WaterLogForm {...defaultProps} />);
    
    const intakeInput = screen.getByLabelText(/water intake/i);
    const submitButton = screen.getByRole('button', { name: /log intake/i });
    
    fireEvent.change(intakeInput, { target: { value: '1500' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/water intake logged successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    mockApi.logWaterIntake.mockRejectedValueOnce(new Error('API Error'));
    
    render(<WaterLogForm {...defaultProps} />);
    
    const intakeInput = screen.getByLabelText(/water intake/i);
    const submitButton = screen.getByRole('button', { name: /log intake/i });
    
    fireEvent.change(intakeInput, { target: { value: '1500' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to log water intake/i)).toBeInTheDocument();
    });
  });
}); 