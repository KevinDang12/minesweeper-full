import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 * Once the user saves their minesweeper game, redirect them
 * to the new URL of the minesweeper game
 * @param {*} props The function to save the minesweeper game and return the id of the save
 * @returns A button that saves and redirects the user to the new URL of the minesweeper game
 */
export function Jump(props) {
    let navigate = useNavigate();
    const url = "/minesweeper"

    /**
     * Redirect the user to the new URL after
     * saving their minesweeper game
     */
    const jumpToRoute = () => {
        try {
            const id = props.onClick();
            let path = url + '/game/' + id;
            navigate(path);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Button variant="success" size={"lg"} onClick={jumpToRoute}>Save</Button>
        </div>
    )
}