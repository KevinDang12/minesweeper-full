import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <div className="header">
            <ul className="header-left">
                <li className="logo">Minesweeper</li>
            </ul>

            <ul className="header-right">
                <li><Link to="/newgame">New Game</Link></li>
                <li><Link to="/save">Save</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
        </div>
    );
}

export default Header;