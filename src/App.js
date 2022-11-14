import './App.css';
import React, {Component} from 'react';
import { Board } from './components/Board'
import Header from './components/Header';
import Load from './components/Load';
import Save from './components/Save';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

class App extends Component {

    state = {
        boardSize: 8
    }

    render() {
        const {boardSize} = this.state;
        return (
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Board boardSize={boardSize}/>}/>
                        {/* <Route path="/newgame"/> */}
                        <Route path="/save" element={<Save />}/>
                        <Route path="/load" element={<Load />}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
