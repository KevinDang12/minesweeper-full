import './App.css';
import React, {Component} from 'react';
import { Board } from './components/Board'
import Header from './components/Header';
import Load from './components/Load';
import Save from './components/Save';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

class App extends Component {

    state = {
        boardSize: 8,
        boardData: [],
        firstClick: false,
        totalMines: 0,
        mineCounter: 0,
        endGame: false,
        counter: 0,
        timer: null,
        paused: false
    }

    render() {
        const {
            boardSize, 
            boardData,
            firstClick,
            totalMines,
            mineCounter,
            endGame,
            counter,
            timer,
            paused
        } = this.state;
        
        return (
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Board 
                            boardSize={boardSize}
                            boardData = {boardData}
                            firstClick = {firstClick}
                            totalMines = {totalMines}
                            mineCounter = {mineCounter}
                            endGame = {endGame}
                            counter = {counter}
                            timer = {timer}
                            paused = {paused}
                        />}/>
                        {/* <Route path="/newgame"/> */}
                        <Route path="/save" element={<Save
                            boardSize={boardSize}
                            boardData = {boardData}
                            firstClick = {firstClick}
                            totalMines = {totalMines}
                            mineCounter = {mineCounter}
                            endGame = {endGame}
                            counter = {counter}
                            timer = {timer}
                            paused = {paused}
                        />}/>
                        <Route path="/load" element={<Load />}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
