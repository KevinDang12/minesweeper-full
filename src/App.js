import './App.css';
import React, {Component} from 'react';
import {Board} from './Components/Board'

class App extends Component {

    state = {
        boardSize: 8
    }

    render() {
        return (
            <div>
                <Board/>
            </div>
        );
    }
}

export default App;
