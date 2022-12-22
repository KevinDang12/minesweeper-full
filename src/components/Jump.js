import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function Jump(props) {
    let navigate = useNavigate();

    const jumpToRoute = () => {
        try {
            const id = props.onClick();
            let path = '/minesweeper-full/game/' + id;
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