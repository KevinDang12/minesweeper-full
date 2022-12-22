const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const boards = [];

/**
 * GET Request when the user first access the backend
 */
app.get('/', (req, res) => {
    res.send('You can access the Minesweeper server by going to the /api/boards directory');
});

/**
 * GET Request when the user finds the list of boards
 * from the backend
 */
app.get("/api/boards", (req, res) => {
    res.send(boards);
});

/**
 * GET Request when the user gets a board using
 * an id
 */
app.get('/api/boards/:id', (req, res) => {
    const board = boards.find(b => b.id === req.params.id);

    if (!board) { // 404 object not found
        res.status(404).send('The board with the given ID was not found.');
    }

    res.send(board);
});

/**
 * POST Request add a save minesweeper game to the back-end
 */
app.post('/api/boards', (req, res) => {
    let unix_timestamp = Math.floor(Date.now());

    const board = {
        id: req.body.id,
        boardSize: req.body.boardSize,
        counter: req.body.counter,
        endGame: req.body.endGame,
        firstClick: req.body.firstClick,
        mineCounter: req.body.mineCounter,
        name: req.body.name,
        unixTime: unix_timestamp,
        paused: req.body.paused,
        counter: req.body.counter,
        totalMines: req.body.totalMines,
        boardData: req.body.boardData,
        start: req.body.start
    }

    boards.push(board);
    res.send(board);
});

/**
 * PUT Request update an existing minesweeper save game
 */
app.put('/api/boards/:id', (req, res) => {
    const board = boards.find(b => b.id === req.params.id);

    if (!board) {
        return res.status(404).send('The board with the given ID was not found.');
    }

    let unix_timestamp = Math.floor(Date.now());

    board.unixTime = unix_timestamp;
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
    board.start = req.body.start;

    res.send(board);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));