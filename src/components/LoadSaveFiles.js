import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {date} from './GameLogic.js';
import './LoadSaveFiles.css';

/**
 * Get the list of Boards from the backend server
 * and load a minesweeper game
 * @return {JSX.Element} A table of saved minesweeper games
 */
export default function LoadSaveFiles() {
  const url = '/minesweeper';

  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Get the list of boards saved on the backend server
   */
  const getBoards = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/boards/`);
      if (response && response.data) {
        setBoards(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBoards();
  }, []);

  if (loading) {
    return <div className='message'>Loading Data...</div>;
  } else if (boards) {
    return (
      <div className='Load-Menu'>
        <h1>Save Files</h1>
        {(boards.length <= 0) ?
        <h3 data-testid="no-files">
            It appears there aren&apos;t any saved games yet.
        </h3> :
        <div data-testid="save-files">
          <table className='table'>
            <thead>
              <tr>
                <th>Save #</th>
                <th>Save Time</th>
                <th>Name</th>
                <th>Load</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board, index) =>
                <tr key={board.id}>
                  <td>{index + 1}</td>
                  <td>{date(board.unixTime)}</td>
                  <td>{board.name}</td>
                  <td>
                    <Link to={url + '/game/' + board.id}>
                      <Button>Load</Button>
                    </Link>
                  </td>
                </tr>,
              )}
            </tbody>
          </table>
        </div>
        }
        <div className='newGame'>
          <Link to={url + '/game'}><Button>New Game</Button></Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className='error' data-testid='error'>
          An error ocurred. Please try again later.
      </div>
    );
  }
}
