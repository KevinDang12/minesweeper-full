const express = require('express');
const Joi = require("joi");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const boards = [
    {   id: 1,
        boardSize: 3,
        counter: 0,
        endGame: false,
        firstClick: false,
        mineCounter: 0,
        name: "test",
        paused: false,
        counter: 0,
        totalMines: 0,
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

function validateData(detail) {
    const schema = {
        boardSize: Joi.number(),
        counter: Joi.number(),
        endGame: Joi.boolean(),
        firstClick: Joi.boolean(),
        mineCounter: Joi.number(),
        name: Joi.string(),
        paused: Joi.boolean(),
        counter: Joi.number(),
        totalMines: Joi.number(),
        boardData: []
    }

    return Joi.validate(detail, schema);
}

app.get('/', (req, res) => {
    res.send('You can access the Minesweeper server by going to the /api/boards directory');
});

app.get("/api/boards", (req, res) => {
    res.send(boards);
});

app.get('/api/boards/:id', (req, res) => {
    const board = boards.find(b => b.id === parseInt(req.params.id));
    if (!board) { // 404 object not found
        res.status(404).send('The student with the given ID was not found.')
    }
    res.send(board);
});

app.post('/api/boards', (req, res) => {
    // const { error } = validateData(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    const board = {
        id: boards.length + 1,
        boardSize: req.body.boardSize,
        counter: req.body.counter,
        endGame: req.body.endGame,
        firstClick: req.body.firstClick,
        mineCounter: req.body.mineCounter,
        name: req.body.name,
        paused: req.body.paused,
        counter: req.body.counter,
        totalMines: req.body.totalMines,
        boardData: req.body.boardData
    }

    boards.push(board);
    res.send(board);
});

app.put('/api/boards/:id', (req, res) => {
    const board = boards.find(b => b.id === parseInt(req.params.id));

    if (!board) {
        return res.status(404).send('The student with the given ID was not found.');
    }

    // const { error } = validateData(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    board.boardSize = req.body.boardSize;
    board.counter = req.body.counter;
    board.endGame = req.body.endGame;
    board.firstClick = req.body.firstClick;
    board.mineCounter = req.body.mineCounter;
    board.name = req.body.name;
    board.paused = req.body.paused;
    board.counter = req.body.counter;
    board.totalMines = req.body.totalMines;
    board.boardData = req.body.boardData;

    res.send(board);
});

app.delete('/api/boards/:id', (req, res) => {
    const board = boards.find(b => b.id === parseInt(req.params.id));
    
    if (!board) {
        return res.status(404).send('The student with the given ID was not found.');
    }

    const index = boards.indexOf(board);
    boards.splice(index, 1);
    res.send(board);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
