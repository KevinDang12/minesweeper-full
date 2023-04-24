import React from 'react';
import {render, screen} from '@testing-library/react';
import Save from '../components/Save';

/**
 * Test the Save component to make sure it renders
 * by getting the data-testid from the Save component
 */
test('renders Save Components', () => {
  render(<Save
    data={{
      mineCounter: 0,
      counter: 0,
      boardSize: 0,
    }}
    saveError={() => {}}
    saveRequest={() => {}}
    goToBoard={() => {}}
  />);
  const saveElement = screen.getByTestId('save');
  expect(saveElement).toBeInTheDocument();
});
