import React from 'react';
import {useParams} from 'react-router-dom';

/**
 * Find the parameters from the Child component that is called on
 * @param {*} Child Name of the component to find the parameters
 * @return {JSX.Element} The component with
 * the properties and the parameters for the id
 */
export function router(Child) {
  const routerParameters = ( props ) => {
    const params = useParams();
    return <Child { ...props } params={ params }/>;
  };

  return routerParameters;
}

/**
 * Initiate the properties of each Tile component
 * @param {number} size The rows and columns of the board
 * @return {*[]} Board data of the rows and columns
 */
export function initTileProperties(size) {
  const tileProps = [];

  for (let x = 0; x < size; x++) {
    tileProps.push([]);
    for (let y = 0; y < size; y++) {
      tileProps[x][y] = {
        x: x,
        y: y,
        value: 0,
        color: 'rgb(161,160,160)',
        click: false,
        hasMine: false,
        flagged: false,
        adjacentMines: 0,
        disabled: true,
      };
    }
  }
  return tileProps;
}

/**
 * Show the date the minesweeper game was saved.
 * @param {*} unixTime The recorded unix time
 * when the minesweeper game was saved.
 * @return {string} The date of the saved minesweeper
 * game in year/month/day hour:minute:seconds in AM/PM
 */
export function date(unixTime) {
  const date = new Date(unixTime);

  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());
  let seconds = String(date.getSeconds());

  const twelveClock = (hours > 12) ? 'PM' : 'AM';

  hours = (hours > 12) ? hours - 12 : hours;

  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = String(date.getFullYear());

  minutes = minutes.padStart(2, '0');
  seconds = seconds.padStart(2, '0');
  day = day.padStart(2, '0');
  month = month.padStart(2, '0');
  year = year.padStart(2, '0');

  const time =
  `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${twelveClock}`;

  return time;
}

/**
 * Set the format of the timer into mm:ss
 * @param {number} counter The number of seconds that has passed
 * @return {string} String format of the timer
 */
export function timeFormat(counter) {
  const minutes = String(Math.floor(counter / 60)).padStart(2, '0');
  const seconds = String(counter % 60).padStart(2, '0');

  return minutes + ':' + seconds;
}

/**
 * Gather the adjacent tiles
 * @param {Tile} tile The current tile to check for adjacent mines
 * @param {number} size The size of the board
 * @param {[]} data The minesweeper board data
 * @return {[]} The arrays containing the data of adjacent tiles
 */
export function checkAdjacent(tile, size, data) {
  const area = [
    -1, -1,
    -1, 0,
    -1, 1,
    0, -1,
    0, 1,
    1, -1,
    1, 0,
    1, 1,
  ];

  const adjacent = [];
  const tileX = tile.x;
  const tileY = tile.y;

  for (let i = 0; i < area.length; i += 2) {
    const adjacentX = area[i];
    const adjacentY = area[i + 1];

    const currentX = adjacentX + tileX;
    const currentY = adjacentY + tileY;

    if (currentX >= 0 && currentY >= 0 && currentX < size && currentY < size) {
      adjacent.push(data[currentX][currentY]);
    }
  }
  return adjacent;
}

/**
 * Find the number of tiles that has a mine
 * @param {[]} adjacent List of adjacent tiles
 * @return {number} Number of adjacent tiles with a mine
 */
function numOfAdjacentMines(adjacent) {
  let count = 0;
  for (const tile of adjacent) {
    if (tile.hasMine) {
      count += 1;
    }
  }
  return count;
}

/**
 * Check for the number of adjacent mines on a tile and
 * the total number of mines on a board
 * @param {number} tileX X coordinate of the tile
 * @param {number} tileY Y coordinate of the tile
 * @param {[]} data Board data of the tiles in the game
 * @param {number} size Size of the board
 * @return {{}} The total number of mines and the board data
 */
export function numberOfMines(tileX, tileY, data, size) {
  data[tileX][tileY].hasMine = false;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const tile = data[x][y];

      if (tile === data[tileX][tileY]) continue;

      tile.hasMine = Math.random() < 0.2;
    }
  }

  let count = 0;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const tile = data[x][y];
      tile.adjacentMines = numOfAdjacentMines(checkAdjacent(tile, size, data));

      if (tile.hasMine) {
        tile.value = 'X';
        count += 1;
      } else {
        tile.value = tile.adjacentMines;
      }
    }
  }

  const result = {
    count: count,
    data: data,
  };

  return result;
}

/**
 * Reveal the location of the mines that the user did not find,
 * the correct tiles flagged containing a mine,
 * and the incorrect tiles flagged not containing a mine.
 * @param {number} size The size of the minesweeper board
 * @param {[]} data The minesweeper game data
 * @return {[]} Board game data with the correct and incorrect mine locations
 */
export function revealMines(size, data) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const tile = data[x][y];

      if (tile.hasMine && !tile.flag) {
        tile.value = 'X';
        tile.color = 'rgb(255,0,0)';
      } else if (!tile.hasMine && tile.flag) {
        tile.color = 'rgb(255,106,0)';
      } else if (tile.hasMine && tile.flag) {
        tile.color = 'rgb(13,154,5)';
      }
      tile.disabled = true;
    }
  }
  return data;
}
