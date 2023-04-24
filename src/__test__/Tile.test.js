import React from 'react';
import {render, screen} from '@testing-library/react';
import Tile from '../components/Tile';

/**
 * Test the Tile component to make sure it renders
 * by getting the data-testid from the Tile component
 */
test('renders Tile component', () => {
  render(<Tile
    onRightClick={() => {}}
    onLeftClick={() => {}}
    disabled={false}
    color={'rgb(161,160,160)'}
    click={false}
    endGame={false}
    value={0}
  />);
  const tileElement = screen.getByTestId('tile');
  expect(tileElement).toBeInTheDocument();
});
