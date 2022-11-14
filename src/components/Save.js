import React, {Component} from 'react';

class Save extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mineCounter: this.props.mineCounter,
            timer: this.props.timer,
            boardSize: this.props.boardSize
        }
    }
    
    render() {
        const { mineCounter, timer, boardSize } = this.state;
        return (
            <div align="center">
                <h1>Save File Name, Mine Count, Time, Board Size</h1>
                <h5>Your total number of mines: {mineCounter}</h5>
                <h5>Your total time: {timer}</h5>
                <h5>Your board length: {boardSize}</h5>
            </div>
        );
    }
}

export default Save;