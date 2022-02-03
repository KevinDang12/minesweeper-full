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

export class Board extends Component {

    state = {
        boardSize: this.props.boardSize,
        boardData: this.initTileProperties(this.props.boardSize),
        // mineCount: this.countMines(this.state.boardData)
    };

    // reset() {
    //     let newGame = this.initTileProperties(this.props.size);
    //     this.setState({boardData: newGame});
    // }

    displayBoard(data) {
        return data.map(row => {
            return row.map(item => {
                return(
                    <div>
                        <Tile onClick={() => this.onClick(item.x, item.y)}
                              onContextMenu={(e) => this.onContextMenu(e, item.x, item.y)}
                              color={item.color}
                        />
                    </div>
                );
            })
        })
    };

    countMines(data) {
        const size = this.props.boardSize;
        let mineCount = 0;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (data[x][y].hasMine) {
                    mineCount += 1;
                }
            }
        }

        return mineCount;
    }

    initTileProperties(size) {
        let tileProps = [];

        for (let x = 0; x < size; x++) {
            tileProps.push([]);
            for (let y = 0; y < size; y++) {
                tileProps[x][y] = {
                    x: x,
                    y: y,
                    value: "",
                    color: 'rgb(161,160,160)',
                    click: false,
                    hasMine: Math.random() < 0.25,
                    flagged: false,
                    adjacentMines: 0,
                    disable: false,
                }
            }
        }

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                let tile = tileProps[x][y];
                tile.adjacentMines = this.numOfAdjacentMines(this.checkAdjacent(tile, size, tileProps));
            }
        }
        return tileProps;
    }

    checkAdjacent(tile, size, data) {

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

            if (currentX >= 0 && currentY >= 0 && currentX < size && currentY < size) {
                adjacent.push(data[currentX][currentY]);
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
        let data = this.state.boardData;

        let tile = data[x][y];
        console.log(tile.x);
        console.log(tile.y);

        if (!tile.click && !tile.flagged) {
            // this.setState({color: 'rgb(255,255,255)'});
            tile.color = 'rgb(255,255,255)';
            this.clearArea(tile);

        } else if (tile.hasMine) {
            this.revealMines();
        }

        this.setState({boardData: data});
        //update boarddata
    }

    onContextMenu(e, x, y) {
        e.preventDefault();

        let data = this.state.boardData[x][y];
        let tile = data[x][y];
        console.log(tile.x);
        console.log(tile.y);

        if (tile.flag) {
            tile.flag = false;
            tile.value = ""; // index of hasMine - 1 from image array

        } else if (!tile.flag) {
            tile.flag = true;
            tile.value = "F";
        }

        this.setState({boardData: data});
    }

    clearArea(tile) {
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
            let adjacent = this.checkAdjacent(tile);

            for (const value of adjacent) {
                this.clearArea(value);
            }
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