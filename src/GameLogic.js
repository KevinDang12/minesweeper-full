import { useLocation, useParams } from 'react-router-dom';

/**
 * Find the parameters from the Child component that is called on
 * @param {*} Child Name of the component to find the parameters
 * @returns The component with the properties and the parameters for the id
 */
export function withRouter( Child ) {
    return ( props ) => {
        const params = useParams();
        const location = useLocation();
        return <Child { ...props } params={ params } location={ location } />;
    }
}

/**
 * Initiate the properties of each Tile component
 * @param size The rows and columns of the board
 * @returns {*[]} Board data of the rows and columns
 */
export function initTileProperties(size) {
    let tileProps = [];

    for (let x = 0; x < size; x++) {
        tileProps.push([]);
        for (let y = 0; y < size; y++) {
            tileProps[x][y] = {
                x: x,
                y: y,
                value: "",
                color: 'rgb(161,160,160)',
                click: false,
                hasMine: false,
                flagged: false,
                adjacentMines: 0,
                disabled: false,
            }
        }
    }
    return tileProps;
}

/**
 * Set the format of the timer into mm:ss
 * @param time The number of seconds that has passed
 * @returns {string} String format of the timer
 */
export function timeFormat(time) {
    if (time <= 0) {
        return "00:00";

    } else if (time > 0 && time < 60) {
        if (time < 10) {
            return "00:0" + time;
        } else {
            return "00:" + time;
        }
    } else if (time >= 60) {
        let seconds = String(time % 60);
        let minutes = String(Math.floor(time / 60));

        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return minutes + ":" + seconds;
    }
}

/**
 * Gather the adjacent tiles
 * @param tile The current tile to check for adjacent mines
 * @returns {*[]} The adjacent tiles
 */
export function checkAdjacent(tile, size, data) {

    const area = [
        -1, -1,
        -1, 0,
        -1, 1,
        0, -1,
        0, 1,
        1, -1,
        1, 0,
        1, 1,
    ]

    let adjacent = [];
    let tileX = tile.x;
    let tileY = tile.y;

    for (let i = 0; i < area.length; i += 2) {
        let adjacentX = area[i];
        let adjacentY = area[i + 1];

        let currentX = adjacentX + tileX;
        let currentY = adjacentY + tileY;

        if (currentX >= 0 && currentY >= 0 && currentX < size && currentY < size) {
            adjacent.push(data[currentX][currentY]);
        }
    }
    return adjacent;
}

/**
 * Find the number of tiles that has a Mine
 * @param adjacent List of adjacent tiles
 * @returns {number} Number of adjacent tiles with a Mine
 */
export function numOfAdjacentMines(adjacent) {
    let count = 0;
    for (const tile of adjacent) {
        if (tile.hasMine) {
            count += 1;
        }
    }
    return count;
}

/**
 * Reveal the location of the mines that the user did not find, the correct tiles flagged containing a mine,
 * and the incorrect tiles flagged not containing a mine.
 * @returns {*[]} Board game data with the correct and incorrect mine locations
 */
export function revealMines(size, data) {

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let tile = data[x][y];

            if (tile.hasMine && !tile.flag) {
                tile.value = "X";
                tile.color = 'rgb(255,0,0)';

            } else if (!tile.hasMine && tile.flag) {
                tile.color = 'rgb(255,106,0)';

            } else if (tile.hasMine && tile.flag) {
                tile.color = 'rgb(13,154,5)';

            }
            tile.disabled = true;
        }
    }
    return data;
}