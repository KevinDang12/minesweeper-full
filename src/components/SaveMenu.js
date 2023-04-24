import React, {useState} from 'react';
import {date} from './GameLogic.js';
import './SaveMenu.css';
import {Button, Form} from 'react-bootstrap';
import Save from './Save.js';
import PropTypes from 'prop-types';

SaveMenu.propTypes = {
  data: PropTypes.object.isRequired,
  saveRequest: PropTypes.func.isRequired,
  createNewSave: PropTypes.func.isRequired,
  goToBoard: PropTypes.func.isRequired,
};

/**
 * Get the list of Boards
 * @param {*} props The function to save the
 * minesweeper game and return the id of the save
 * @return {JSX.Element} A form to save the current
 * Minesweeper game
 */
export default function SaveMenu(props) {
  const [newSave, setNewSave] = useState(false);
  const [id, setId] = useState(null);

  const {saveRequest, goToBoard, createNewSave} = props;
  const {boards} = props.data;

  /**
   * Pass the data of the save board to update
   * @param {string} id Get the board using the id
   */
  const saveBoard = (id) => {
    const board = props.data.boards.find((b) => b.id === id);
    setNewSave(true);
    setId(board.id);
  };

  return (
    <div data-testid="save-menu">
      {(newSave === false) ?
      <div className="save-files">
        <h2>Select a save slot or create a new save</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Save #</th>
              <th>Save Time</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) =>
              <tr key={board.id} onClick={() => saveBoard(board.id)}>
                <td>{index + 1}</td>
                <td>{date(board.unixTime)}</td>
                <td>{board.name}</td>
              </tr>,
            )}
          </tbody>
        </table>

        <Form>
          <div className='float-container'>
            <div className='float-child-left'>
              <Button
                variant="success"
                size={'lg'}
                onClick={createNewSave}>
                  New Save
              </Button>
            </div>
            <div className='float-child-right'>
              <Button
                variant="danger"
                size={'lg'}
                onClick={goToBoard}>
                  Back
              </Button>
            </div>
          </div>
        </Form>
      </div> :
      <Save
        id={id}
        saveRequest={saveRequest}
        goToBoard={goToBoard}
        data={props.data}
      />
      }
    </div>
  );
}
