import React, { Component } from 'react';
import axios from 'axios';
import { timeFormat } from '../GameLogic.js'
import { Link } from 'react-router-dom';

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

    state = {
        boards: [],
        loadData: {}
    }

    constructor(props) {
        super(props);

        this.getBoards();
    }

    getBoards = async() => {
        try {
            let data = await api.get('/').then(({data}) => data);
            this.setState({boards: data});
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    deleteBoard = async(id) => {
        try {
            let data = await api.delete(`/${id}`);
            console.log(data);
            this.getBoards();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { boards } = this.state;
        return (
            <div>
                <h1 align="center">Your Save Files</h1>
                {(boards.length <= 0) ? <h3 align="center">It appears you don't have any saved games.</h3> : 
                <table className='table'>
                    <tr>
                        <th>Name</th>
                        <th>Board Size</th>
                        <th>Total Number of Mine</th>
                        <th>Number of Mines Remaining</th>
                        <th>Time</th>
                        <th>Delete</th>
                        <th>Load</th>
                    </tr>
                    {boards.map(board => 
                        <tr key={board.x + " " + board.y}>
                            <td>{board.name}</td>
                            <td>{board.boardSize}</td>
                            <td>{board.totalMines}</td>
                            <td>{board.mineCounter}</td>
                            <td>{timeFormat(board.counter)}</td>
                            <td><button onClick={() => this.deleteBoard(board.id)}>X</button></td>
                            <td>
                                <Link to={"/minesweeper-full/" + board.id}>+</Link>
                            </td>
                        </tr>
                    )}
                </table>
                }
            </div>
        );
    }
}

export default Load;
