import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

/**
 * Displays the Header containing a link to the Minesweeper
 * game and a link to load a Minesweeper game
 * @returns The Header containing links to the
 * Load Component and the Minesweeper game
 */
function Header() {
    const location = useLocation();
    const url = "/minesweeper"
    return(
        <div className="header">
            <ul className="header-left">
                <li className="logo">
                    {(location.pathname === url) 
                    ? 
                        <Link to={url + "/game"}>Minesweeper</Link>
                    :
                        <p>Minesweeper</p>
                    }
                </li>
            </ul>

            <ul className="header-right">
                <li><Link to={url}>Load</Link></li>
            </ul>
        </div>
    );
}

export default Header;