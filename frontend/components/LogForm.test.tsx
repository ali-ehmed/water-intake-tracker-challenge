import React from 'react';
import { render } from '@testing-library/react';
import LogForm from './LogForm';

test('renders LogForm', () => {
  render(<LogForm onSubmit={jest.fn()} loading={false} />);
});
