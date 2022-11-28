import React, { Component } from 'react';
import { timeFormat } from '../GameLogic.js'
import './SaveMenu.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Save from './Save.js';

const api = axios.create({
    baseURL: `http://localhost:5000/api/boards`
});

/**
 * Get the list of Boards
 */
class SaveMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newSave: false,
            board: {}
        }
    }

    // overWriteBoard = async(id) => {
    //     try {
    //         let data = await api.get(`/${id}`).then(({data}) => data);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    saveBoard = (id) => {
        const board = this.props.boards.find(b => b.id === id);
        this.setState({newSave: true, board: board});
    }

    render() {
        const { boards, saved, saveRequest, callBack } = this.props;
        const { newSave, board } = this.state;
        return (
            <div>
                {(newSave === false) ? 
                    <div className="save-files" align="center">
                        <h2>Select a save slot or create a new save</h2>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Board Size</th>
                                    <th>Total Number of Mine</th>
                                    <th>Number of Mines Remaining</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.map(board => 
                                    <tr key={board.id} onClick={() => this.saveBoard(board.id)}>
                                        <td>{board.name}</td>
                                        <td>{board.boardSize}</td>
                                        <td>{board.totalMines}</td>
                                        <td>{board.mineCounter}</td>
                                        <td>{timeFormat(board.counter)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Form>
                            <Button variant="success" size={"lg"} onClick={this.props.createNewSave}>New Save</Button>
                            <Button variant="danger" size={"lg"} onClick={this.props.callBack}>Back</Button>
                        </Form>
                    </div>
                : 
                    <Save 
                        onClick={() => saveRequest()}
                        callBack={() => callBack()}
                        boardData={board.boardData}
                        boardSize={board.boardSize}
                        firstClick={board.firstClick}
                        totalMines={board.totalMines}
                        mineCounter={board.mineCounter}
                        endGame={board.endGame}
                        counter={board.counter}
                        timer={board.timer}
                        paused={board.paused}
                        saved={saved}
                    />
                }
            </div>
        );
    }
}

export default SaveMenu;
