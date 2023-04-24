import React from 'react';
import {render, screen} from '@testing-library/react';
import {Jump} from '../components/Jump';

/**
 * Test the Jump component to make sure it renders
 * by getting the data-testid from the Jump component
 */
test('renders Jump', () => {
  render(<Jump
    onClick={() => {}}
  />);
  const jumpElement = screen.getByTestId('jump');
  expect(jumpElement).toBeInTheDocument();
});
