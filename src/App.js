import './App.css';
import React from 'react';
import Board from './components/Board';
import Header from './components/Header';
import LoadSaveFiles from './components/LoadSaveFiles';
import NotFoundPage from './components/NotFoundPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * TODO:
 * Timer Does not start or default to the saved time
 * 404 error when trying get a game that you saved ^?
 */

/**
 * Display the Header and the Minesweeper Game
 */
export default function App() {
    const url = "/minesweeper"
    return (
        <Router forceRefresh={true}>
            <div>
                <Header />
                <div className='Heading'>
                    <Routes>
                        <Route exact path={url} element={<LoadSaveFiles />}/>
                        <Route exact path={url + "/game/:id"} element={<Board />}/>
                        <Route path={url + "/game"} element={<Board />}/>
                        <Route path="*" element={<NotFoundPage />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}