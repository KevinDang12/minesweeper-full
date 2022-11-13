const express = require('express');
const app = express();

app.use(express.json());

const boards = [

];

app.get('/', (req, res) => {
    res.send('You can access the Minesweeper server by going to the /api/boards directory');
});

app.get("/api/boards", (req, res) => {
    res.send(boards);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
