const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const boards = [
    {   id: 1,
        name: "test",
        boardSize: 3,
        firstClick: false,
        totalMines: 0,
        mineCounter: 0,
        endGame: false,
        counter: 0,
        timer: null,
        paused: false,
        boardData: [
            [{
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 0,
                y: 0
                }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 0,
                y: 1
            }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 0,
                y: 2
            }], [{
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 1,
                y: 0
                }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 1,
                y: 1
            }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 1,
                y: 2
            }], [{
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 2,
                y: 0
                }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 2,
                y: 1
            }, {
                adjacentMines: 0,
                click: false,
                color: "rgb(161,160,160)",
                disabled: false,
                flagged: false,
                hasMine: false,
                value: 1,
                x: 2,
                y: 2
            }],
        ],
    }
];

app.get('/', (req, res) => {
    res.send('You can access the Minesweeper server by going to the /api/boards directory');
});

app.get("/api/boards", (req, res) => {
    res.send(boards);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
