import React, { Component } from 'react';
import axios from 'axios';
import './Load.css';
import { timeFormat } from '../GameLogic.js'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
        this.state = {
            boards: [],
        }
    }

    componentDidMount() {
        this.getBoards();
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

    /**
     * Delete the board from the backend server using the id
     * @param {*} id The id of the board stored on the backend server
     */
    deleteBoard = async(id) => {
        try {
            let data = await api.delete(`/${id}`);
            console.log(data);
            this.getBoards();
        } catch (err) {
            console.log(err);
        }
    }

    date = (unixTime) => {
        let date = new Date(unixTime);

        let hours = date.getHours();

        let minutes = date.getMinutes();

        let seconds = date.getSeconds();

        let twelveClock = (hours > 12) ? "PM" : "AM";

        hours = (hours > 12) ? hours - 12 : hours;

        let day = date.getDate()

        let month = date.getMonth() + 1;

        let year = date.getFullYear();

        let time = `${year}/${month}/${day} ${hours}:${minutes}:${seconds} ${twelveClock}`;

        return time;
    }

    render() {
        const { boards } = this.state;
        return (
            <div>
                <h1 align="center">Your Save Files</h1>
                {(boards.length <= 0) ? <h3 align="center">It appears you don't have any saved games.</h3> : 
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Save Time</th>
                            <th>Name</th>
                            <th>Delete</th>
                            <th>Load</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map(board => 
                            <tr key={board.id}>
                                <td>{this.date(board.unixTime)}</td>
                                <td>{board.name}</td>
                                <td><button onClick={() => this.deleteBoard(board.id)}>X</button></td>
                                <td>
                                    <Link to={"/minesweeper-full/" + board.id}><Button>Load</Button></Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                }
            </div>
        );
    }
}

export default Load;
