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
        const {value} = this.props;

        if (value.flag) {
            return "F";

        } else if (value.hasMine) {
            return "X";

        } else if (value.adjacentMines === 0) {
            return null;
        }

        return value.adjacentMines // of image in array
    }

    render() {
        const {color, value} = this.props;

        return(
            <button
                className={"tile"}
                onContextMenu={this.props.onContextMenu}
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: color,
                    margin: '0.5px'}}
                onClick={this.props.onClick}>
                {value}
            </button>
        );
    }
}