import React, {Component} from 'react';
import {Tile} from './Tile';

const styles = {
    board: {
        display: 'flex',
        flexFlow: 'row wrap',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
}

let board;
const boardSize = 5;

export class Board extends Component {

    // state = {
    //     adjacentMines: 0
    // }

    checkAdjacent = (tile) => {

        const area = [
            -1, -1,
            -1, 0,
            -1, 1,
            0, -1,
            0, 1,
            1, -1,
            1, 0,
            1, 1,
        ]

        let adjacent = [];
        let tileX = tile.props.x;
        let tileY = tile.props.y;

        for (let i = 0; i < area.length; i += 2) {
            let adjacentX = area[i];
            let adjacentY = area[i + 1];

            let currentX = adjacentX + tileX;
            let currentY = adjacentY + tileY;

            if (currentX >= 0 && currentY >= 0 && currentX < boardSize && currentY < boardSize) {
                adjacent.push(board[currentX][currentY]);
            }
        }

        return adjacent;
    }

    numOfAdjacentMines = (adjacent) => {
        let count = 0;
        for (const tile of adjacent) {
            if (tile.props.hasMine) {
                count += 1;
            }
        }
        return count;
    }

    displayBoard = () => {
        let x, y;
        let rows = [];
        board = [];

        for (y = 0; y < boardSize; y++) {
            for (x = 0; x < boardSize; x++) {
                let mine = Math.random() < 0.25;
                let tile = <Tile x={x} y={y} hasMine={mine}/>;
                rows.push(tile);
            }
            board.push(rows);
            rows = [];
        }

        for (x = 0; x < boardSize; x++) {
            for (y = 0; y < boardSize; y++) {
                const numOfMines = this.numOfAdjacentMines(this.checkAdjacent(board[x][y]));
                console.log(board[x][y].props.adjacentMines);
                // board[x][y].setState({adjacentMines: numOfMines});
                // board[x][y].setState({numOfAdjacentMines: numOfMines});
            }
        }

        return board;
    };

    render() {
        return(
            <div className={"board"} style={{padding: '100px'}}>
                {this.displayBoard()}
            </div>
        );
    }
}