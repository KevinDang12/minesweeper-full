const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(cors());

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../build");
const FILE = 'saveFile.json';

app.use(express.static(buildPath));

/**
 * Display the Front-end minesweeper games when the users are
 * on the following pathname
 */
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})

/**
 * Read the save file to get the list of saved minesweeper games
 * @param {*} boards The boards array to store the objects of the minesweeper games
 */
const read = () => {
    try {
        let data = fs.readFileSync(FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Overwrite the existing save file, or create a new save file if it does not exists with the save data
 * @param {*} boards The array of minesweeper games to save to the save file.
 */
const write = (boards) => {
    fs.writeFile(FILE, JSON.stringify(boards), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

/**
 * GET Request when the user finds the list of boards
 * from the backend
 */
app.get("/api/boards", (req, res) => {
    let boards = read();
    res.send(boards);
});

/**
 * GET Request when the user gets a board using
 * an id
 */
app.get('/api/boards/:id', (req, res) => {

    let boards = read();
    
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

    let boards = [];

    let unix_timestamp = Math.floor(Date.now());

    const board = {
        id: req.body.id,
        boardSize: req.body.boardSize,
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

    if (fs.existsSync(FILE)) {
        boards = read();
    }
    
    boards.push(board);
    
    write(boards);

    res.send(board);
});

/**
 * PUT Request update an existing minesweeper save game
 */
app.put('/api/boards/:id', (req, res) => {

    let boards = read();

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
    board.totalMines = req.body.totalMines;
    board.boardData = req.body.boardData;
    board.start = req.body.start;

    write(boards);

    res.send(board);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}\nThe Server is running`));