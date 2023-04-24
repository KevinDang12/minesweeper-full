import React from 'react';
import {render, screen} from '@testing-library/react';
import Game from '../components/Game';

/**
 * Test the Game component to make sure it renders
 * by getting the data-testid from the Game component
 */
test('Renders Game component', () => {
  render(<Game
    reset={() => {}}
    saveRequest={() => {}}
    startGame={() => {}}
    displayBoard={[]}
    data={{
      mineCounter: 0,
      firstClick: false,
      endGame: false,
      start: false,
      counter: 0,
    }}
  />);
  const gameElement = screen.getByTestId('game');
  expect(gameElement).toBeInTheDocument();
});
