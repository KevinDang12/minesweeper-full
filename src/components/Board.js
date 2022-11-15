import React, {Component} from 'react';
import {Tile} from './Tile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Save from './Save';

const styles = {
    boardRow: {
        flexFlow: 'row',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        display: 'flex',
    },
    counter: {
        display: 'flex',
        justifyContent:'flex-end',
        fontSize: '25px',
        margin: '5px',
    },
    timer: {
        display: 'flex',
        justifyContent:'flex-end',
        fontSize: '25px',
        margin: '5px',
    },
    reset: {
        display: 'flex',
        justifyContent:'flex-end',
        margin: '5px',
    },
    board: {
        paddingTop: '10vh',
    },
    menuBar: {
        paddingTop: '10vh',
        textAlign: 'center',
        flexDirection: 'column',
        display: 'flex',
        justifyContent:'center',
        width: '40%',
        paddingRight: '20px'
    },
}

/**
 * The minesweeper board game that displays the tiles in the same number of rows and columns
 */
class Board extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            boardData: this.initTileProperties(this.props.boardSize),
            firstClick: false,
            totalMines: 0,
            mineCounter: 0,
            endGame: false,
            counter: 0,
            timer: null,
            paused: false,
            saved: false
        }
    }

    /**
     * Reset the minesweeper game
     */
    reset = () => {
        clearInterval(this.timer);
        this.setState({
            boardData: this.initTileProperties(this.props.boardSize),
            firstClick: false,
            totalMines: 0,
            endGame: false,
            mineCounter: 0,
            counter: 0,
            paused: false,
            saved: false
        });
    };

    saveRequest() {
        const {saved, paused} = this.state;

        if (saved === true) {
            this.setState({paused: false});
            this.incrementTimer();
            this.setState({saved: false});
            
        } else {
            this.setState({paused: true});
            clearInterval(this.timer);
            this.setState({saved: true});
        }
        
        console.log(saved);
        console.log(paused);
    }

    /**
     * Display the minesweeper game using the game data
     * @param data Array of minesweeper tiles
     * @returns {*[]} Minesweeper board arranged in the same number of rows and columns
     */
    displayBoard(data) {
        let rows = [];
        let board = [];

        data.map(row => {
            row.map(item => {
                // console.log(item);
                rows.push(
                    <Tile
                        onLeftClick={() => this.onClick(item.x, item.y)}
                        onRightClick={(e) => this.onContextMenu(e, item.x, item.y)}
                        color={item.color}
                        value={item.value}
                        disabled={item.disabled}
                        click={item.click}
                        endGame={this.state.endGame}
                    />
                );
            });
            board.push(<div style={styles.boardRow}>{rows}</div>);
            rows = [];
        });
        return board;
    };

    pauseOrPlay = () => {
        let { paused } = this.state;

        if (paused === true) {
            this.setState({paused: false});
            this.incrementTimer();
        } else {
            this.setState({paused: true});
            clearInterval(this.timer);
        }
        this.boardPlay(paused);
    }

    /**
     * Disable or enable board if the game is paused or not
     * @param {*} paused 
     */
    boardPlay(paused) {
        const { boardData } = this.state;

        for (const row of boardData) {
            for (const element of row) {
                element.disabled = (!paused) ? true : false;
            }
        }

        this.setState({boardData: boardData});
    }

    /**
     * Initiate the properties of each Tile component
     * @param size The rows and columns of the board
     * @returns {*[]} Board data of the rows and columns
     */
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

    /**
     * Check for the number of adjacent mines on a tile
     * @param tileX X coordinate of the tile
     * @param tileY Y coordinate of the tile
     * @param data board data of the tiles in the game
     * @returns {*} Updated data with the number of adjacent mines
     */
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

    /**
     * Gather the adjacent tiles
     * @param tile The current tile to check for adjacent mines
     * @returns {*[]} The adjacent tiles
     */
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

    /**
     * Find the number of tiles that has a Mine
     * @param adjacent List of adjacent tiles
     * @returns {number} Number of adjacent tiles with a Mine
     */
    numOfAdjacentMines(adjacent) {
        let count = 0;
        for (const tile of adjacent) {
            if (tile.hasMine) {
                count += 1;
            }
        }
        return count;
    }

    /**
     * Left mouse click, start the game timer on first click and open the selected tile
     * @param x X coordinate of the selected tile
     * @param y Y coordinate of the selected tile
     */
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

    /**
     * If the user click on a mine, the game will end, if a tile is not flagged or clicked, the selected tile,
     * and the adjacent tiles will be opened on the board
     * @param x X-coordinates of the selected tile
     * @param y Y-coordinates of the selected tile
     * @param data Board game data to update
     * @returns {*[]} Updated board game data
     */
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
            data = this.winGame(data, count);
        }

        return data;
    }

    /**
     * Overwrites the default right mouse click, adds a flag on a tile if it has not yet been selected by the user
     * @param e Mouse event to prevent menu from appearing on the tile
     * @param x X-coordinates of the selected tile
     * @param y Y-coordinates of the selected tile
     */
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
                data = this.winGame(data, count);
            }

            this.setState({mineCounter: count});
            this.setState({boardData: data});
        }
    }

    /**
     * Reveal the location of the mines that the user did not find, the correct tiles flagged containing a mine,
     * and the incorrect tiles flagged not containing a mine.
     * @returns {*[]} Board game data with the correct and incorrect mine locations
     */
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

    /**
     * Check the entire minesweeper board on whether the user open all the tiles and flagged the tiles containing
     * the mines
     * @param count Number of mines left on the board
     * @returns {boolean} True if the all tiles are opened and mines are flagged,
     * else False if there are still tiles not opened and mines are not flagged
     */
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
            this.setState({endGame: true});
            return true;
        }
        return false;
    }

    /**
     * End the game if all the tiles with mines are found and the tiles are opened, the game timer will stop
     * @param data Board game data to update
     * @param count Number of mines left on the board
     * @returns {*} The board game data with its tiles disabled
     */
    winGame(data, count) {
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
        return data;
    }

    /**
     * Start the game timer after the user clicks on the first tile on the minesweeper board
     */
    incrementTimer() {
        this.timer = setInterval(() => {
            if (this.state.endGame || !this.state.firstClick) {
                clearInterval(this.timer);
                return;
            }

            if (this.state.counter <= 3600 && !this.state.paused) {
                this.setState({counter: this.state.counter + 1});
            }
        }, 1000);
    }

    /**
     * Set the format of the timer into mm:ss
     * @param time The number of seconds that has passed
     * @returns {string} String format of the timer
     */
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
        const { boardData, counter, saved, firstClick, totalMines, mineCounter, endGame, timer, paused, boardSize} = this.state;
        return(
            <div>
                {(saved) ?
                    <div>
                        <Save 
                            onClick={() => this.saveRequest()}
                            boardData={boardData}
                            boardSize={this.props.boardSize}
                            firstClick={firstClick}
                            totalMines={totalMines}
                            mineCounter={mineCounter}
                            endGame={endGame}
                            counter={counter}
                            timer={timer}
                            paused={paused}
                            saved={saved}
                         />
                        {/* <Button variant="info" size={"lg"} onClick={this.save} disabled={this.state.endGame || !this.state.firstClick}>Save</Button> */}
                    </div> 
                    : 
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <div style={styles.menuBar}>
                            <div style={styles.counter}>Mine Count: {this.state.mineCounter}</div>
                            <div style={styles.timer}>Time: {this.timeFormat(counter)}</div>
                            <div style={styles.reset}>
                                <Button variant="outline-primary" size={"lg"} disabled={!this.state.firstClick} onClick={this.reset}>Reset</Button>
                            </div>
                            <div style={styles.reset}>
                                <Button variant="danger" size={"lg"} onClick={this.pauseOrPlay} disabled={this.state.endGame || !this.state.firstClick}>{this.state.paused ? "Resume" : "Pause"}</Button>
                            </div>
                            <div style={styles.reset}>
                                <Button variant="info" size={"lg"} onClick={() => this.saveRequest()} disabled={this.state.endGame || !this.state.firstClick}>Save</Button>
                            </div>
                        </div>

                        <div className={"board"} style={styles.board}>
                            {this.displayBoard(boardData)}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Board;