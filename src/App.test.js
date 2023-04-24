import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

/**
 * Test the App component to make sure it renders
 */
test('renders App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Minesweeper/i);
  expect(linkElement).toBeInTheDocument();
});
