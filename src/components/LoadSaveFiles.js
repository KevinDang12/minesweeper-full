import React, { Component } from 'react';
import axios from 'axios';
import './Load.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { date } from '../GameLogic.js';

const api = axios.create({
    baseURL: `${window.location.origin}/api/boards`
});

/**
 * Get the list of Boards from the backend server
 * and load a minesweeper game
 */
class LoadSaveFiles extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            loading: false,
            error: false
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
            this.setState({ error: false, loading: true });
            let data = await api.get('/').then(({data}) => data);
            this.setState({ boards: data });
            this.setState({ loading: false });
        } catch (err) {
            console.log(err);
            this.setState({ error: true, loading: false });
        }
    }

    render() {
        const { boards } = this.state;

        let content = '';
        const url = "/minesweeper";

        if (this.state.loading) {
            content = <div className='message'>Loading...</div>

        } else if (this.state.error) {
            content = <div className='error'>An error ocurred. Please try again later.</div>

        } else {
            content = (
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
            )
        }

        return content;
    }
}

export default LoadSaveFiles;