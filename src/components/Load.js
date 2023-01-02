import React, { Component } from 'react';
import axios from 'axios';
import './Load.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { date } from '../GameLogic.js';

const api = axios.create({
    baseURL: `http://localhost:5000/api/boards`
});

/**
 * Get the list of Boards
 * Delete on the of saved games
 * Update the name of your game
 * Load a game that you selected
 */
class Load extends Component {
    
    constructor(props) {
        super(props);
        localStorage.setItem('reset', JSON.stringify({ reset: false }));
        this.state = {
            boards: [],
        }
    }

    componentDidMount() {
        this.getBoards();
    }

    componentDidUpdate() {
        // Prevents the user from going back to the previous page
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }

    /**
     * Get the list of boards saved on the backend server
     */
    getBoards = async() => {
        try {
            let data = await api.get('/').then(({data}) => data);
            this.setState({boards: data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { boards } = this.state;
        const url = "/minesweeper-full";

        return (
            <div>
                <h1 align="center">Save Files</h1>
                {(boards.length <= 0) ? <h3 align="center">It appears there aren't any saved games yet.</h3> : 
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
                                    <Link to={url + "/game/" + board.id}><Button>Load</Button></Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                }
                <div className='newGame' align='center'>
                    <Link to={url + "/game"}><Button>New Game</Button></Link> 
                </div>
            </div>
        );
    }
}

export default Load;
