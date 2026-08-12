// __tests__/log-page.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WaterLogForm from '@/app/log/page';

jest.mock('@/utils/api', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('WaterLogForm', () => {
  it('renders form correctly', () => {
    render(<WaterLogForm />);
    expect(screen.getByText('Log Water Intake')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Intake in ml')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
