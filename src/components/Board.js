import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tile from './Tile';
import Save from './Save';
import Game from './Game';
import SaveMenu from './SaveMenu';
import {initTileProperties, numberOfMines,
  checkAdjacent, revealMines, router} from './GameLogic.js';
import axios from 'axios';
import {useStopwatch} from 'react-timer-hook';
import PropTypes from 'prop-types';

const styles = {
  boardRow: {
    flexFlow: 'row',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
  },
};

Board.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

/**
 * The minesweeper board game that displays
 * the tiles in the same number of rows and columns
 * @param {*} props The properties of the board
 * @return {JSX.Element} The minesweeper board
 */
function Board(props) {
  const id = props.params.id;
  const boardSize = 8;

  const [boardData, setBoardData] = useState(initTileProperties(boardSize));
  const [firstClick, setFirstClick] = useState(false);
  const [totalMines, setTotalMines] = useState(0);
  const [mineCounter, setMineCounter] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [paused, setPaused] = useState(false);
  const [saved, setSaved] = useState(false);
  const [boards, setBoards] = useState([]);
  const [start, setStart] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [newSave, setNewSave] = useState(false);

  /**
     * React Timer Hook
     */
  const {
    seconds,
    minutes,
    hours,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useStopwatch({autoStart: false});

  /**
     * If a board id was found,
     * get the board data from the database
     */
  useEffect(() => {
    if (id) {
      axios.get(`${window.location.origin}/api/boards/` + id)
          .then((result) => {
            const {
              boardData,
              firstClick,
              totalMines,
              mineCounter,
              endGame,
              counter,
              start,
            } = result.data;

            // Set the timer to the time that was saved on the backend server
            const time = new Date();
            time.setSeconds(time.getSeconds() + counter);
            resetTimer(time, true);

            setBoardData(boardData);
            setFirstClick(firstClick);
            setTotalMines(totalMines);
            setMineCounter(mineCounter);
            setEndGame(endGame);
            setPaused(false);
            setStart(start);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [id]);

  /**
     * Check if the timer has exceeded 60 minutes
     */
  useEffect(() => {
    if (hours === 1) {
      pauseTimer();
    }
  });

  /**
     * If the game is being saved,
     * pause the game timer and prepare the board data to be saved
     */
  const saveRequest = () => {
    if (saved) {
      setNewSave(true);
      setSaved(false);
    } else {
      setNewSave(false);
      setSaved(true);
    }

    if (!paused) {
      pauseTimer();
      setPaused(true);
    } else {
      startTimer();
      setPaused(false);
    }

    getBoards();
  };

  /**
     * Reset the minesweeper game
     */
  const reset = () => {
    setBoardData(initTileProperties(boardSize));
    setFirstClick(false);
    setTotalMines(0);
    setMineCounter(0);
    setEndGame(false);
    setPaused(false);
    setSaved(false);
    setStart(false);
    const stopwatchOffset = new Date();
    resetTimer(stopwatchOffset, false);
  };

  /**
     * Display the minesweeper game using the game data
     * @param {[]} data Array of minesweeper tiles
     * @return {[]} Minesweeper board arranged in the
     * same number of rows and columns
     */
  const displayBoard = (data) => {
    let rows = [];
    const board = [];

    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        rows.push(
            <Tile
              key={parseInt(x.toString() + y.toString())}
              onLeftClick={() => leftClick(x, y)}
              onRightClick={(e) => rightClick(e, x, y)}
              color={data[x][y].color}
              value={data[x][y].value}
              disabled={data[x][y].disabled}
              click={data[x][y].click}
              endGame={endGame}
            />,
        );
      }
      board.push(<div key={x} style={styles.boardRow}>{rows}</div>);
      rows = [];
    }

    return board;
  };

  /**
     * Set the number of adjacent mines for
     * each tile and find the total mines
     * @param {number} tileX X coordinate of the tile
     * @param {number} tileY Y coordinate of the tile
     * @param {[]} boardData Board data of the tiles in the game
     * @return {[]} The board data
     */
  const findAdjacentMines = (tileX, tileY, boardData) => {
    const {data, count} = numberOfMines(tileX, tileY, boardData, boardSize);

    setTotalMines(count);
    setMineCounter(count);

    return data;
  };

  /**
     * Left mouse click, start the game timer on first
     * click and open the selected tile
     * @param {number} x X coordinate of the selected tile
     * @param {number} y Y coordinate of the selected tile
     */
  const leftClick = (x, y) => {
    const data = [...boardData];

    if (!firstClick) {
      setFirstClick(true);
      setBoardData(findAdjacentMines(x, y, data));
    }
    clearArea(x, y);
  };

  /**
     * If the user click on a mine, the game will end, if
     * a tile is not flagged or clicked, the selected tile,
     * and the adjacent tiles will be opened on the board
     * @param {number} x X-coordinates of the selected tile
     * @param {number} y Y-coordinates of the selected tile
     * @param {[]} data Board game data to update
     */
  const clearArea = (x, y) => {
    const data = [...boardData];
    const tile = data[x][y];

    if (tile.hasMine && !tile.flag) {
      setBoardData(revealMines(boardSize, data));
      pauseTimer();
      setEndGame(true);
      return;
    } else if (!tile.click && !tile.flag) {
      tile.click = true;
      tile.value = tile.adjacentMines;
      tile.color = 'rgb(255,255,255)';

      if (tile.adjacentMines === 0) {
        const adjacent = checkAdjacent(tile, boardSize, data);
        for (const value of adjacent) {
          clearArea(value.x, value.y);
        }
      }
      setBoardData(data);
      return;
    }

    if (mineCounter === 0) {
      setBoardData(winGame(data, mineCounter));
    }
  };

  /**
     * Overwrites the default right mouse click, adds a flag
     * on a tile if it has not yet been selected by the user
     * @param {MouseEvent} e Mouse event to prevent menu from
     * appearing on the tile
     * @param {number} x X-coordinates of the selected tile
     * @param {number} y -coordinates of the selected tile
     */
  const rightClick = (e, x, y) => {
    e.preventDefault();

    let data = [...boardData];
    let count = mineCounter;
    const tile = data[x][y];

    if (tile.disabled) {
      return;
    }

    if (firstClick) {
      if (tile.flag) {
        tile.flag = false;
        if (tile.hasMine) {
          tile.value = 'X';
        } else {
          tile.value = tile.adjacentMines;
        }
        if (count < totalMines) count += 1;
      } else if (!tile.flag && !tile.click) {
        tile.flag = true;
        tile.value = 'F';
        if (count > 0) count -= 1;
      }

      if (count === 0) {
        data = winGame(data, count);
      }

      setMineCounter(count);
      setBoardData(data);
    }
  };

  /**
     * Check the entire minesweeper board on whether the user
     * open all the tiles and flagged the tiles containing
     * the mines
     * @param {number} count Number of mines left on the board
     * @return {Boolean} True if the all tiles are opened and mines are flagged,
     * else False if there are still tiles not opened and mines are not flagged
     */
  const checkWin = (count) => {
    if (count === 0) {
      for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
          const tile = boardData[x][y];
          if ((!tile.hasMine && !tile.click) ||
          (tile.hasMine && !tile.flag)) return false;
        }
      }
      setEndGame(true);
      pauseTimer();
      return true;
    }
    return false;
  };

  /**
     * End the game if all the tiles with mines are
     * found and the tiles are opened, the game timer will stop
     * @param {[]} data Board game data to update
     * @param {number} count Number of mines left on the board
     * @return {[]} The board game data with its tiles disabled
     */
  const winGame = (data, count) => {
    if (checkWin(count) === true) {
      for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
          const tile = data[x][y];
          if (!tile.hasMine) {
            tile.color = 'rgb(201,253,241)';
          }
          tile.disabled = true;
        }
      }
    }
    return data;
  };

  /**
     * Start the minesweeper game
     */
  const startGame = () => {
    const data = [...boardData];
    const size = boardSize;
    startTimer();

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = data[x][y];
        tile.disabled = false;
      }
    }
    setBoardData(data);
    setStart(true);
  };

  /**
     * Go back to the board if the user does
     * not want to save the game
     */
  const goToBoard = () => {
    setSaved(false);
    setPaused(false);
    startTimer();
  };

  /**
     * Show the save menu if it exists to allow the user to overwrite
     * an existing save or create a new save
     */
  const createNewSave = () => {
    setNewSave(true);
  };

  /**
     * Get the list of boards saved on the backend server
     */
  const getBoards = async () => {
    try {
      setSaveError(false);
      const data = await axios.get(`${window.location.origin}/api/boards/`)
          .then(({data}) => data);
      setBoards(data);
    } catch (err) {
      console.log(err);
      setSaveError(true);
    }
  };

  /**
     * Data to be passed to the child components
     */
  const data = {
    boards: boards,
    boardSize: boardSize,
    boardData: boardData,
    saved: saved,
    firstClick: firstClick,
    totalMines: totalMines,
    mineCounter: mineCounter,
    endGame: endGame,
    paused: paused,
    newSave: newSave,
    start: start,
    counter: (minutes * 60) + seconds,
  };

  return (
    <div data-testid="board">
      {(saved) ?
      <div>
        {(boards.length > 0 && !newSave) ?
        <SaveMenu
          goToBoard={goToBoard}
          createNewSave={createNewSave}
          saveRequest={saveRequest}
          data={data}
        /> :
        <Save
          saveRequest={saveRequest}
          goToBoard={goToBoard}
          data={data}
          saveError={saveError}
        />
        }
      </div> :
      <Game
        data={data}
        reset={reset}
        startGame={startGame}
        saveRequest={saveRequest}
        displayBoard={displayBoard(boardData)}
        hours={hours}
      />
      }
    </div>
  );
}

export default router(Board);
