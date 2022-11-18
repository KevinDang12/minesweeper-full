import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tile from './Tile';
import Save from './Save';
import Game from './Game';
import { initTileProperties, checkAdjacent, numOfAdjacentMines, revealMines } from '../GameLogic.js'

const styles = {
    boardRow: {
        flexFlow: 'row',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        display: 'flex',
    }
}

/**
 * The minesweeper board game that displays the tiles in the same number of rows and columns
 */
class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardData: initTileProperties(this.props.boardSize),
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
    reset() {
        clearInterval(this.timer);
        this.setState({
            boardData: initTileProperties(this.props.boardSize),
            firstClick: false,
            totalMines: 0,
            endGame: false,
            mineCounter: 0,
            counter: 0,
            paused: false,
            saved: false
        });
    };

    /**
     * Save Current Minesweeper Game
     */
    saveRequest() {
        const { saved, paused } = this.state;

        if (saved === true) {
            if (!paused) {
                this.setState({paused: false});
                this.incrementTimer();
            }
            this.setState({saved: false});
            
        } else {
            this.setState({paused: true});
            clearInterval(this.timer);
            this.setState({saved: true});
        }
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
                rows.push(
                    <Tile
                        key={item.x + " " + item.y}
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

    /**
     * Pause or Resume Game Timer
     */
    pauseOrPlay() {
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
                tile.adjacentMines = numOfAdjacentMines(checkAdjacent(tile, this.props.boardSize, this.state.boardData));

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
     * Left mouse click, start the game timer on first click and open the selected tile
     * @param x X coordinate of the selected tile
     * @param y Y coordinate of the selected tile
     */
    onClick(x, y) {
        let {boardData, firstClick} = this.state;

        if (!firstClick) {
            this.setState({firstClick: true});
            boardData = this.findAdjacentMines(x, y, boardData);
            this.incrementTimer();
        }

        this.clearArea(x, y, boardData);
        this.setState({boardData: boardData});
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
            data = revealMines(this.props.boardSize, this.state.boardData);
            this.setState({endGame: true});

        } else if (!tile.click && !tile.flag) {
            tile.click = true;
            tile.value = tile.adjacentMines;
            tile.color = 'rgb(255,255,255)';

            if (tile.adjacentMines === 0) {
                let adjacent = checkAdjacent(tile, this.props.boardSize, this.state.boardData);
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

    render() {
        const { boardData, counter, saved, firstClick, totalMines, mineCounter, endGame, timer, paused} = this.state;
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
                    </div> 
                    : 
                    <Game
                        boardData={boardData}
                        firstClick={firstClick}
                        mineCounter={mineCounter}
                        endGame={endGame}
                        counter={counter}
                        paused={paused}
                        reset={() => this.reset()}
                        pauseOrPlay={() => this.pauseOrPlay()}
                        saveRequest={() => this.saveRequest()}
                        displayBoard={() => this.displayBoard(boardData)}
                    />
                }
            </div>
        );
    }
}

export default Board;