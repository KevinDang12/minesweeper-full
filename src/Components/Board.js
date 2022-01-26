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
}

export class Board extends Component {

    displayBoard = () => {
        let j, i;
        let rows = [];
        let board = [];

        for (j = 0; j < 10; j++) {
            rows.push(<Tile value={0}/>)
        }

        for (i = 0; i < 10; i++) {
            board.push(<div style={styles.board}>{rows}</div>);
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