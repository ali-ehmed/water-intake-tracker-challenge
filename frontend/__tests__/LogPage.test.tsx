import { render, screen } from '@testing-library/react';
import LogPage from '../pages/log';

test('renders log form', () => {
  render(<LogPage />);
  expect(screen.getByText(/Log Water Intake/i)).toBeInTheDocument();
});
