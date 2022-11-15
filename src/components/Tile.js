import React, {Component} from 'react';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import four from '../img/4.png';
import five from '../img/5.png';
import six from '../img/6.png';
import seven from '../img/7.png';
import eight from '../img/8.png';
import mine from '../img/bomb.png';
import flag from '../img/flag.png';

/**
 * Tile Component to that make up the minesweeper board, it shows an image on the number of adjacent mines,
 * a flag marker, a mine, or no image if there are no adjacent mines
 */
export class Tile extends Component {

    /**
     * Set the image of the tile for the number of adjacent mines,
     * a flag indicator, or a mine if the game has ended
     * @returns {null|*} Null if there are no adjacent mines, else a minesweeper image
     */
    getImage() {
        const images = [one, two, three, four, five, six, seven, eight, mine, flag];
        const {value, click, endGame} = this.props;

        if (value === "F") {
            return images[9];

        } else if (value === "X" && endGame) {
            return images[8];

        } else if (value > 0 && click) {
            return images[value - 1];
        }
        return null;
    }

    render() {
        const {color} = this.props;

        return(
            <button
                className={"tile"}
                onContextMenu={this.props.onRightClick}
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: color,
                    margin: '0.5px'}}
                disabled={this.props.disabled}
                onClick={this.props.onLeftClick}>
                <img src={this.getImage()}/>
            </button>
        );
    }
}