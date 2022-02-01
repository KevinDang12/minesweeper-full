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

const boardSize = 8;

export class Board extends Component {

    state = {
        boardData: this.initTileProperties(this.props.boardSize),
        mineCount: 0
    };

    displayBoard(data) {
        let x, y;
        let rows = [];
        let board = [];

        for (x = 0; x < 10; x++) {
            for (y = 0; y < 10; y++) {
                rows.push(<Tile/>); // bind some things to this handleClick, handleRightClick
            }
            board.push(<div style={styles.board}>{rows}</div>);
            rows = [];
        }

        return board;
    };

    initTileProperties(size) {
        let tileProps = [];
        let mineCount = 0;

        for (let x = 0; x < size; x++) {
            tileProps.push([]);
            for (let y = 0; y < size; y++) {
                tileProps[x][y] = {
                    x: x,
                    y: y,
                    color: 'rgb(161,160,160)',
                    click: false,
                    hasMine: Math.random() < 0.25,
                    flagged: false,
                    adjacentMines: 0,
                    disable: false,
                }

                if (tileProps[x][y].hasMine) {
                    mineCount += 1;
                }
            }
        }

        this.setState({mineCount: mineCount});

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                let tile = tileProps[x][y];
                tile.adjacentMines = this.numOfAdjacentMines(this.checkAdjacent(tile));
            }
        }
        return tileProps;
    }

    checkAdjacent(tile) {

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
        let tileX = tile.x;
        let tileY = tile.y;

        for (let i = 0; i < area.length; i += 2) {
            let adjacentX = area[i];
            let adjacentY = area[i + 1];

            let currentX = adjacentX + tileX;
            let currentY = adjacentY + tileY;

            if (currentX >= 0 && currentY >= 0 && currentX < boardSize && currentY < boardSize) {
                adjacent.push(this.state.boardData[currentX][currentY]);
            }
        }
        return adjacent;
    }

    numOfAdjacentMines(adjacent) {
        let count = 0;
        for (const tile of adjacent) {
            if (tile.hasMine) {
                count += 1;
            }
        }
        return count;
    }

    onClick(x, y) {
        let tile = this.state.boardData[x][y];

        if (!tile.click && !tile.flagged) {
            this.setState({color: 'rgb(255,255,255)'});
        }
    }

    onContextMenu(e) {
        e.preventDefault();
        if (this.state.value === "F") {
            this.setState({value: ""}); // index of hasMine - 1 from image array

        } else if (this.state.value !== "F") {
            this.setState({value: "F"});
        }
    }

    clearArea() {
        let tile = this.state.boardData;

        if (tile.click) return;

        if (tile.hasMine) {
            this.revealMines();
            return;
        }

        if (!tile.flag) {
            tile.click = true;
            if (this.state.mineCount > 0)
                this.setState({mineCount: this.state.mineCount - 1});
            return;
        }

        if (tile.adjacentMines === 0) {
            this.checkAdjacent(tile).forEach(tile => this.clearArea);
        }
    }

    revealMines() {
        const size = this.props.size;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = this.state.boardData[x][y];
                tile.disable = true;

                // reveal Mines
            }
        }
    }

    checkWin() {
        const size = this.props.size;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = this.state.boardData[x][y];

                if (!tile.hasMine && !tile.click) return false;
            }
        }
        return true;
    }

    endGame() {
        const size = this.props.size;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = this.state.boardData[x][y];
                tile.disable = true;

                // pass to child
            }
        }
    }

    render() {
        return(
            <div className={"board"} style={{padding: '100px'}}>
                {this.displayBoard(this.state.boardData)}
            </div>
        );
    }
}