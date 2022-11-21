import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { timeFormat } from '../GameLogic.js'

const styles = {
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
class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { boardData, counter, mineCounter, firstClick, endGame, paused } = this.props;

        return(
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <div style={styles.menuBar}>
                    <div style={styles.counter}>Mines Remaining: {mineCounter}</div>
                    <div style={styles.timer}>Time: {timeFormat(counter)}</div>
                    <div style={styles.reset}>
                        <Button variant="primary" size={"lg"} disabled={!firstClick} onClick={this.props.reset}>Reset</Button>
                    </div>
                    <div style={styles.reset}>
                        <Button variant="danger" size={"lg"} onClick={this.props.pauseOrPlay} disabled={endGame || !firstClick}>{paused ? "Resume" : "Pause"}</Button>
                    </div>
                    <div style={styles.reset}>
                        <Button variant="warning" size={"lg"} onClick={this.props.saveRequest} disabled={endGame || !firstClick}>Save</Button>
                    </div>
                </div>

                <div className={"board"} style={styles.board}>
                    {this.props.displayBoard(boardData)}
                </div>
            </div>
        );
    }
}

export default Game;