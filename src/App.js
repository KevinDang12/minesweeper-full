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
                            <Route exact path={url} element={<Board />}/>
                            <Route exact path={url + "/:id"} element={<Board />}/>
                            <Route path={url + "/load"} element={<Load />}/>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
