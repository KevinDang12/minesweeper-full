import React from 'react';
import {render, screen} from '@testing-library/react';
import Board from '../components/Board';

/**
 * Test the Board component to make sure it renders
 * by getting the data-testid from the Board component
 */
test('renders Board', () => {
  render(<Board />);
  const boardElement = screen.getByTestId('board');
  expect(boardElement).toBeInTheDocument();
});
