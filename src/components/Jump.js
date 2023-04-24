import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

Jump.propTypes = {
  onClick: PropTypes.func.isRequired,
};

/**
 * Once the user saves their minesweeper game, redirect them
 * to the new URL of the minesweeper game
 * @param {*} props The function to save the
 * minesweeper game and return the id of the save
 * @return {JSX.Element} A button that saves and
 * redirects the user to the new URL of the minesweeper game
 */
export function Jump(props) {
  const url = '/minesweeper/game/';

  /**
   * Redirect the user to the new URL after
   * saving their minesweeper game
   */
  const jumpToRoute = () => {
    try {
      const id = props.onClick();
      const path = url + id;
      window.history.pushState(null, '', path);
      window.dispatchEvent(new Event('popstate'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div data-testid="jump">
      <Button variant="success" size={'lg'} onClick={jumpToRoute}>Save</Button>
    </div>
  );
}
