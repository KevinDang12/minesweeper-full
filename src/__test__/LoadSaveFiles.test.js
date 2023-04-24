import React from 'react';
import {cleanup, render} from '@testing-library/react';
import LoadSaveFiles from '../components/LoadSaveFiles';
import {BrowserRouter} from 'react-router-dom';
import mockAxios from 'axios';
import {act} from 'react-dom/test-utils';
import {waitFor} from '@testing-library/dom';

// cleaning up the mess left behind the previous test
afterEach(cleanup);

/**
 * Test the LoadSaveFiles component to make sure it renders
 * by getting the data-testid from the LoadSaveFiles component
 * with no files
 */
test('Render the LoadSaveFiles component with no files', async () => {
  let getByTestId;
  await act(async () => {
    const {getByTestId: element} = render(
        <BrowserRouter>
          <LoadSaveFiles/>
        </BrowserRouter>,
    );
    getByTestId = element;
  });

  expect(getByTestId('no-files'))
      .toHaveTextContent('It appears there aren\'t any saved games yet.');
});

/**
 * Test the LoadSaveFiles component to make sure it renders
 * by getting the data-testid from the LoadSaveFiles component
 * with one file
 */
test('Render the LoadSaveFiles component with one file', async () => {
  mockAxios.get.mockResolvedValueOnce(
      {data: [{
        'id': 'b9ae0f7d-85cb-4699-b97b-0c649d962fd2',
        'boardSize': 8,
        'endGame': false,
        'firstClick': false,
        'mineCounter': 0,
        'name': 'a',
        'unixTime': 1680294916380,
        'paused': true,
        'counter': 0,
        'totalMines': 0,
      }]});

  let getByTestId;

  await act(async () => {
    const {getByTestId: element} = render(
        <BrowserRouter>
          <LoadSaveFiles/>
        </BrowserRouter>,
    );
    getByTestId = element;
  });

  const resolved = await waitFor(() => getByTestId('save-files'));
  expect(resolved).toBeInTheDocument();
});
