import React, { Component } from 'react';
import { timeFormat } from '../GameLogic.js'
import './SaveMenu.css';
import { Button, Form } from 'react-bootstrap';
import Save from './Save.js';

/**
 * Get the list of Boards
 */
class SaveMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newSave: false,
            id: null
        }
    }

    saveBoard = (id) => {
        const board = this.props.boards.find(b => b.id === id);
        this.setState({newSave: true, id: board.id});
    }

    render() {
        const { boards, saved, saveRequest, callBack, createNewSave } = this.props;
        const { newSave, id } = this.state;
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
                            <Button variant="success" size={"lg"} onClick={createNewSave}>New Save</Button>
                            <Button variant="danger" size={"lg"} onClick={callBack}>Back</Button>
                        </Form>
                    </div>
                : 
                    <Save 
                        id={id}
                        onClick={() => saveRequest()}
                        callBack={() => callBack()}
                        boardData={this.props.boardData}
                        boardSize={this.props.boardSize}
                        firstClick={this.props.firstClick}
                        totalMines={this.props.totalMines}
                        mineCounter={this.props.mineCounter}
                        endGame={this.props.endGame}
                        counter={this.props.counter}
                        timer={this.props.timer}
                        paused={this.props.paused}
                        saved={saved}
                    />
                }
            </div>
        );
    }
}

export default SaveMenu;
