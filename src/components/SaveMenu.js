import React, { Component } from 'react';
import { timeFormat } from '../GameLogic.js'
import { Button, Form } from 'react-bootstrap';

/**
 * Get the list of Boards
 * Delete on the of saved games
 * Update the name of your game
 * Load a game that you selected
 */
class SaveMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { boards } = this.props;
        return (
            <div align="center">
                <h1>Your Save Files</h1>
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
                                <tr key={board.id}>
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
        );
    }
}

export default SaveMenu;
