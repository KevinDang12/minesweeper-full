import './App.css';
import React, {Component} from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Load from './components/Load';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

class App extends Component {

    state = {
        boardSize: 8
    }

    render() {
        const { boardSize } = this.state;
        
        return (
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Board boardSize={boardSize}/>}/>
                        {/* <Route path="/newgame"/> */}
                        {/* <Route path="/save" element={<Save
                            boardSize={boardSize}
                            boardData = {boardData}
                            firstClick = {firstClick}
                            totalMines = {totalMines}
                            mineCounter = {mineCounter}
                            endGame = {endGame}
                            counter = {counter}
                            timer = {timer}
                            paused = {paused}
                        />}/> */}
                        <Route path="/load" element={<Load />}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
