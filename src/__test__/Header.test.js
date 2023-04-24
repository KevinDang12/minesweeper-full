import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from '../components/Header';
import {BrowserRouter} from 'react-router-dom';

/**
 * Test the Header component to make sure it renders
 * by getting the data-testid from the Header component
 */
test('renders Header', () => {
  render(<BrowserRouter>
    <Header/>
  </BrowserRouter>);
  const linkElement = screen.getByTestId('load-link');
  expect(linkElement).toHaveAttribute('href', '/minesweeper');
});
