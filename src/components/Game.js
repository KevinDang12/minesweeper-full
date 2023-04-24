import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {timeFormat} from './GameLogic.js';
import PropTypes from 'prop-types';

const styles = {
  counter: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '25px',
    margin: '5px',
  },
  timer: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '25px',
    margin: '5px',
  },
  reset: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '5px',
  },
  board: {
    paddingTop: '10vh',
  },
  menuBar: {
    paddingTop: '10vh',
    textAlign: 'center',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    width: '40%',
    paddingRight: '20px',
  },
};

Game.propTypes = {
  reset: PropTypes.func.isRequired,
  saveRequest: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  displayBoard: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

/**
 * The minesweeper board game that displays the
 * tiles in the same number of rows and columns
 * @param {*} props The properties of the game
 * @return {JSX.Element} The minesweeper board with the menubar
 */
export default function Game(props) {
  const {data, reset, saveRequest, startGame, displayBoard} = props;
  const {mineCounter, firstClick, endGame, start, counter} = data;

  return (
    <div
      data-testid="game"
      style={{display: 'flex', flexDirection: 'row', width: '100%'}}
    >
      <div style={styles.menuBar}>
        <div style={styles.counter}>Mines Remaining: {mineCounter}</div>
        <div style={styles.timer}>Time: {timeFormat(counter)}</div>
        <div style={styles.reset}>
          <Button
            variant="primary"
            size={'lg'}
            disabled={!start}
            onClick={reset}>
            Reset
          </Button>
        </div>

        <div style={styles.reset}>
          <Button
            variant="warning"
            size={'lg'}
            onClick={saveRequest}
            disabled={endGame || !start}>
            Save
          </Button>
        </div>

        {(!start && !firstClick) ?
          <div style={styles.reset}>
            <Button
              variant="danger"
              size={'lg'}
              onClick={startGame}
            >Start
            </Button>
          </div> :
          <></>
        }
      </div>

      <div className={'board'} style={styles.board}>
        {displayBoard}
      </div>
    </div>
  );
}
