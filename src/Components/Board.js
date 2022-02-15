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
    },
    counter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reset: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export class Board extends Component {

    state = {
        boardData: this.initTileProperties(this.props.boardSize),
        firstClick: false,
        totalMines: 0,
        mineCounter: 0,
        endGame: false,
        counter: 0
    };

    reset = () => {
        this.setState({
            boardData: this.initTileProperties(this.props.boardSize),
            firstClick: false,
            totalMines: 0,
            mineCounter: 0,
            endGame: false,
            counter: 0
        });
    };

    displayBoard(data) {
        let rows = [];
        let board = [];

        data.map(row => {
            row.map(item => {
                rows.push(
                    <Tile
                        onClick={() => this.onClick(item.x, item.y)}
                        onContextMenu={(e) => this.onContextMenu(e, item.x, item.y)}
                        color={item.color}
                        value={item.value}
                        disabled={item.disabled}
                        click={item.click}
                        endGame={this.state.endGame}
                    />
                );
            });
            board.push(<div style={styles.board}>{rows}</div>);
            rows = [];
        });

        return board;
    };

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
                    hasMine: false,
                    flagged: false,
                    adjacentMines: 0,
                    disabled: false,
                }
            }
        }
        return tileProps;
    }

    findAdjacentMines(tileX, tileY, data) {
        const size = this.props.boardSize;

        data[tileX][tileY].hasMine = false;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = data[x][y];

                if (tile === data[tileX][tileY]) continue;

                tile.hasMine = Math.random() < 0.2;
            }
        }

        let count = 0;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = data[x][y];
                tile.adjacentMines = this.numOfAdjacentMines(this.checkAdjacent(tile));

                if (tile.hasMine) {
                    tile.value = "X";
                    count += 1;

                } else {
                    tile.value = tile.adjacentMines;
                }
            }
        }
        this.setState({
            totalMines: count,
            mineCounter: count});
        return data;
    }

    checkAdjacent(tile) {
        const size = this.props.boardSize;
        let data = this.state.boardData;

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

        if (!this.state.firstClick) {
            this.setState({firstClick: true});
            data = this.findAdjacentMines(x, y, data);
            this.incrementTimer();
        }
        this.clearArea(x, y, data);
        this.setState({boardData: data});
    }

    clearArea(x, y, data) {
        let tile = data[x][y];

        if (tile.hasMine && !tile.flag) {
            data = this.revealMines();
            this.setState({endGame: true});

        } else if (!tile.click && !tile.flag) {
            tile.click = true;
            tile.value = tile.adjacentMines;
            tile.color = 'rgb(255,255,255)';

            if (tile.adjacentMines === 0) {
                let adjacent = this.checkAdjacent(tile);
                for (const value of adjacent) {
                    this.clearArea(value.x, value.y, data);
                }
            }
        }

        const count = this.state.mineCounter;
        if (count === 0) {
            data = this.endGame(data, count);
        }

        return data;
    }

    onContextMenu(e, x, y) {
        e.preventDefault();

        let data = this.state.boardData;
        let count = this.state.mineCounter;
        let tile = data[x][y];

        if (tile.disabled) {
            return;
        }

        if (this.state.firstClick) {
            if (tile.flag) {
                tile.flag = false;
                if (tile.hasMine) {
                    tile.value = "X";
                } else {
                    tile.value = tile.adjacentMines;
                }
                if (count < this.state.totalMines) count += 1;

            } else if (!tile.flag && !tile.click) {
                tile.flag = true;
                tile.value = "F";
                if (count > 0) count -= 1;
            }

            if (count === 0) {
                data = this.endGame(data, count);
            }

            this.setState({mineCounter: count});
            this.setState({boardData: data});
        }
    }

    revealMines() {
        const size = this.props.boardSize;
        let data = this.state.boardData;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = data[x][y];

                if (tile.hasMine && !tile.flag) {
                    tile.value = "X";
                    tile.color = 'rgb(255,0,0)';

                } else if (!tile.hasMine && tile.flag) {
                    tile.color = 'rgb(255,106,0)';

                } else if (tile.hasMine && tile.flag) {
                    tile.color = 'rgb(13,154,5)';

                }
                tile.disabled = true;
            }
        }
        return data;
    }

    checkWin(count) {
        const size = this.props.boardSize;
        let data = this.state.boardData;

        if (count === 0) {
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    let tile = data[x][y];
                    if ((!tile.hasMine && !tile.click) || (tile.hasMine && !tile.flag)) return false;
                }
            }

            return true;
        }
        return false;
    }

    endGame(data, count) {
        const size = this.props.boardSize;

        if (this.checkWin(count) === true) {
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    let tile = data[x][y];
                    if (!tile.hasMine) {
                        tile.color = 'rgb(201,253,241)';
                    }
                    tile.disabled = true;
                }
            }
        }
        clearInterval(this.test);
        return data;
    }

    incrementTimer() {
        let test = setInterval(() => {
            if (this.state.endGame || !this.state.firstClick) {
                clearInterval(test);
                return;
            }

            if (this.state.counter <= 3600) {
                this.setState({counter: this.state.counter + 1});
            }
        }, 1000);
    }

    timeFormat(time) {
        if (time <= 0) {
            return "00:00";

        } else if (time > 0 && time < 60) {
            if (time < 10) {
                return "00:0" + time;
            } else {
                return "00:" + time;
            }
        } else if (time >= 60) {
            let seconds = String(time % 60);
            let minutes = String(Math.floor(time / 60));

            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            return minutes + ":" + seconds;
        }
    }

    render() {
        const {boardData, counter} = this.state;

        return(
            <div>
                <div style={styles.counter}>MineCount: {this.state.mineCounter}</div>
                <div style={styles.reset}>
                    <button onClick={this.reset} style={styles.reset}>Reset</button>
                </div>
                <div>{this.timeFormat(counter)}</div>
                <div className={"board"} style={{padding: '100px'}}>
                    {this.displayBoard(boardData)}
                </div>
            </div>
        );
    }
}