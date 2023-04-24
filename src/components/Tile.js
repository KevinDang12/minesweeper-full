import React from 'react';
import PropTypes from 'prop-types';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import four from '../img/4.png';
import five from '../img/5.png';
import six from '../img/6.png';
import seven from '../img/7.png';
import eight from '../img/8.png';
import mine from '../img/bomb.png';
import flag from '../img/flag.png';

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  click: PropTypes.bool.isRequired,
  endGame: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  onRightClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onLeftClick: PropTypes.func.isRequired,
};

/**
 * Tile Component to that make up the minesweeper board,
 * it shows an image on the number of adjacent mines,
 * a flag marker, a mine, or no image if there are no adjacent mines
 * @param {*} props The properties of the tile
 * @return {JSX.Element} The tile component
 */
export default function Tile(props) {
  const {color, onRightClick, disabled, onLeftClick} = props;

  /**
   * Set the image of the tile for the number of adjacent mines,
   * a flag indicator, or a mine if the game has ended
   * @return {null|*} Null if there are no
   * adjacent mines, else a minesweeper image
   */
  const getImage = () => {
    const images = [one, two, three, four, five, six, seven, eight, mine, flag];
    const {value, click, endGame} = props;

    if (value === 'F') {
      return images[9];
    } else if (value === 'X' && endGame) {
      return images[8];
    } else if (value > 0 && click) {
      return images[value - 1];
    }
    return null;
  };

  return (
    <button
      data-testid="tile"
      className={'tile'}
      onContextMenu={onRightClick}
      style={{
        height: '50px',
        width: '50px',
        backgroundColor: color,
        margin: '0.5px'}}
      disabled={disabled}
      onClick={onLeftClick}>
      <img src={getImage()} alt=""/>
    </button>
  );
}
