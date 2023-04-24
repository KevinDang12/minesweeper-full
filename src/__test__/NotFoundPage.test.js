import React from 'react';
import {render, screen} from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage';

/**
 * Test the NotFoundPage component to make sure it renders
 * by getting the data-testid from the NotFoundPage component
 */
test('renders NotFoundPage component', () => {
  render(<NotFoundPage/>);
  const notFoundPageElement = screen.getByTestId('not-found-page');
  expect(notFoundPageElement).toBeInTheDocument();
});
