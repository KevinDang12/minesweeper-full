import './App.css';
import React from 'react';
import Board from './components/Board';
import Header from './components/Header';
import LoadSaveFiles from './components/LoadSaveFiles';
import NotFoundPage from './components/NotFoundPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/**
 * Display the Header and the Minesweeper Game
 * @return {JSX.Element} The Minesweeper Game
 */
export default function App() {
  const url = '/minesweeper';
  return (
    <Router>
      <div>
        <Header />
        <div className='Heading'>
          <Routes>
            <Route exact path={url} element={<LoadSaveFiles />}/>
            <Route exact path={url + '/game/:id'} element={<Board />}/>
            <Route path={url + '/game'} element={<Board />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
