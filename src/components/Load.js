import React, { Component } from 'react';
import axios from 'axios';
import './Load.css';
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

    /**
     * Show the date the minesweeper game was saved.
     * @param {*} unixTime The recorded unix time when the minesweeper game was saved.
     * @returns The date of the saved minesweeper game in year/month/day hour:minute:seconds in AM/PM
     */
    date = (unixTime) => {

        let date = new Date(unixTime);

        let hours = String(date.getHours());
        let minutes = String(date.getMinutes());
        let seconds = String(date.getSeconds());

        let twelveClock = (hours > 12) ? "PM" : "AM";

        hours = (hours > 12) ? hours - 12 : hours;

        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        let year = String(date.getFullYear());

        minutes = minutes.padStart(2, '0');
        seconds = seconds.padStart(2, '0');
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        year = year.padStart(2, '0');

        let time = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${twelveClock}`;

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
