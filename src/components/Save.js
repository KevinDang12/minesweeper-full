import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import './Save.css';
import axios from 'axios';
import {timeFormat, date} from './GameLogic.js';
import {v4 as uuid} from 'uuid';
import {Jump} from './Jump';
import PropTypes from 'prop-types';


Save.propTypes = {
  id: PropTypes.string,
  saveError: PropTypes.func.isRequired,
  saveRequest: PropTypes.func.isRequired,
  goToBoard: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

/**
 * Component to save the current Minesweeper game
 * and display information of the current game
 * @param {*} props The function to save the
 * minesweeper game and return the id of the save
 * @return {JSX.Element} A form to save the current
 * Minesweeper game
 */
export default function Save(props) {
  const {mineCounter, counter, boardSize} = props.data;
  const {saveError, saveRequest, goToBoard} = props;
  const urlId = props.id ? props.id : null;

  const [name, setName] = useState('');
  const [noName, setNoName] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(Math.floor(Date.now()));
  }, []);

  /**
     * Set the name of the save file
     * @param {Event} e
     */
  const getNameValue = (e) => {
    const value = e.target.value;
    setName(value);
  };

  /**
   * Save the Minesweeper game
   * or update an existing Minesweeper game
   * as a JSON to the backend server
   * @return {string} The id of the save
   */
  const saveGame = () => {
    const {
      mineCounter,
      boardSize,
      boardData,
      firstClick,
      totalMines,
      endGame,
      paused,
      start,
      counter,
    } = props.data;

    let id;

    if (!urlId) {
      id = uuid();
    } else {
      id = urlId;
    }

    const text = {
      id: id,
      name: name,
      mineCounter: mineCounter,
      boardSize: boardSize,
      boardData: boardData,
      firstClick: firstClick,
      totalMines: totalMines,
      endGame: endGame,
      paused: paused,
      start: start,
      counter: counter,
    };

    let url = `${window.location.origin}/api/boards/`;
    let func = axios.post;

    if (urlId) {
      id = urlId;
      url += urlId;
      func = axios.put;
    }

    if (name.length <= 0 || name === '') {
      setNoName(true);
      return;
    }

    func(url, text)
        .then(() => {
          alert('Your game is saved.');
          setNoName(false);
          goToBoard();
        })
        .catch((err) => {
          console.log(err.response);
          alert('Unable to save game');
          goToBoard();
        });

    return id;
  };

  return (
    <div className='Save-Game' data-testid="save">
      <br/>
      <Form>
        <Form.Group className='save'>
          <Form.Label>Save Name:</Form.Label>
          <Form.Control
            value={name}
            id="name"
            type="text"
            placeholder="Give a name for your save"
            onKeyDown={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }} onChange={getNameValue}/>
        </Form.Group>

        <Form.Group className='form'>
          <Form.Label>Save Time: {date(time)}</Form.Label>
        </Form.Group>

        <Form.Group className='form'>
          <Form.Label>Your total number of mines: {mineCounter}</Form.Label>
        </Form.Group>

        <Form.Group className='form'>
          <Form.Label>Your total time: {timeFormat(counter)}</Form.Label>
        </Form.Group>

        <Form.Group className='form'>
          <Form.Label>Your board length: {boardSize}</Form.Label>
        </Form.Group>

        {(noName) ?
            <p className='name'>You must include a name for your save file</p> :
            <></>
        }

        <div className='float-container'>
          <div className='float-child-left'>
            {(saveError) ?
                <Button
                  variant="success"
                  size={'lg'}
                  onClick={saveGame}>
                    Save
                </Button> :
                <Jump onClick={saveGame} />
            }
          </div>

          <div className='float-child-right'>
            <Button
              variant="danger"
              size={'lg'}
              onClick={saveRequest}>
                Back
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
