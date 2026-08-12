import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

function App() {
  return <h1>Hello, Water Tracker!</h1>;
}

test('renders the heading', () => {
  render(<App />);
  const heading = screen.getByText(/hello, water tracker/i);
  expect(heading).toBeInTheDocument();
});