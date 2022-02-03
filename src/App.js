import './App.css';
import React, {Component} from 'react';
import {Board} from './Components/Board'

class App extends Component {

    state = {
        boardSize: 8
    }

    render() {

        const {boardSize} = this.state;
        return (
            <div>
                <Board boardSize={boardSize}/>
            </div>
        );
    }
}

export default App;
