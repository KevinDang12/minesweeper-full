import React, {Component} from 'react';
import one from '../1.png';
import two from '../2.png';
import three from '../3.png';
import four from '../4.png';
import five from '../5.png';
import six from '../6.png';
import seven from '../7.png';
import eight from '../8.png';
import mine from '../bomb.png';
import flag from '../flag.png';

export class Tile extends Component {

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
                onContextMenu={this.props.onContextMenu}
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: color,
                    margin: '0.5px'}}
                disabled={this.props.disabled}
                onClick={this.props.onClick}>
                <img src={this.getImage()}/>
            </button>
        );
    }
}