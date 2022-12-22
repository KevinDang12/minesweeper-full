import './App.css';
import React, { Component } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Load from './components/Load';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * Display the Header and the Minesweeper Game
 */
class App extends Component {
    render() {
        const url = "/minesweeper-full";     
        return (
            <Router forceRefresh={true}>
                <div>
                    <Header />
                    <div className='Heading'>
                        <Routes>
                            <Route exact path={url} element={<Load />}/>
                            <Route exact path={url + "/game/:id"} element={<Board />}/>
                            <Route path={url + "/game"} element={<Board />}/>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
