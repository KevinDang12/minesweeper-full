import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Load.css';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {date} from './GameLogic.js';
import './LoadSaveFiles.css';

const api = axios.create({
  baseURL: `${window.location.origin}/api/boards`,
});

/**
 * Get the list of Boards from the backend server
 * and load a minesweeper game
 * @return {JSX.Element} A table of saved minesweeper games
 */
export default function LoadSaveFiles() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
     * Get the list of boards saved on the backend server
     */
  const getBoards = async () => {
    try {
      setError(false);
      setLoading(true);
      const data = await api.get('/').then(({data}) => data);
      setBoards(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  let content = '';
  const url = '/minesweeper';

  if (loading) {
    content = <div className='message'>Loading...</div>;
  } else if (error) {
    content =
    <div className='error'>
        An error ocurred. Please try again later.
    </div>;
  } else {
    content = (
      <div className='Load-Menu'>
        <h1>Save Files</h1>
        {(boards.length <= 0) ?
        <h3>
            It appears there aren`&apos;`t any saved games yet.
        </h3> :
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
        }
        <div className='newGame'>
          <Link to={url + '/game'}><Button>New Game</Button></Link>
        </div>
      </div>
    );
  }
  return content;
}
