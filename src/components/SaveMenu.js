import React, { Component } from 'react';
import { timeFormat } from '../GameLogic.js'

/**
 * Get the list of Boards
 * Delete on the of saved games
 * Update the name of your game
 * Load a game that you selected
 */
class SaveMenu extends Component {

    state = {
        boards: []
    }

    constructor(props) {
        super(props);
        this.getBoards();
    }

    render() {
        const { boards } = this.state;
        return (
            <div>
                <h1 align="center">Your Save Files</h1>
                    <table className='table'>
                        <tr>
                            <th>Name</th>
                            <th>Board Size</th>
                            <th>Total Number of Mine</th>
                            <th>Number of Mines Remaining</th>
                            <th>Time</th>
                        </tr>
                        {boards.map(board => 
                            <tr key={board.x + " " + board.y}>
                                <td>{board.name}</td>
                                <td>{board.boardSize}</td>
                                <td>{board.totalMines}</td>
                                <td>{board.mineCounter}</td>
                                <td>{timeFormat(board.counter)}</td>
                            </tr>
                        )}
                    </table>
            </div>
        );
    }
}

export default SaveMenu;
