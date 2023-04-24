import React from 'react';
import {render, screen} from '@testing-library/react';
import SaveMenu from '../components/SaveMenu';

/**
 * Test the SaveMenu component to make sure it renders
 * by getting the data-testid from the SaveMenu component
 */
test('renders SaveMenu component', () => {
  render(<SaveMenu
    saveRequest={() => {}}
    goToBoard={() => {}}
    createNewSave={() => {}}
    data={{
      boards: [],
    }}/>);
  const saveMenuElement = screen.getByTestId('save-menu');
  expect(saveMenuElement).toBeInTheDocument();
});
