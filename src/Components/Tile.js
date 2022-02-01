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

/*
 * Change the adjacent mines value on set up
 */

export class Tile extends Component {

    state ={
        color: 'rgb(161,160,160)',
        value: ""
    }

    getImage = () => {
        if (this.state.value === "F") {
            return "Flag";

        } else if (this.state.value === "X") {
            return "Mine icon";

        } else if (this.state.value === "") {
            return null;
        }

        return this.state.value // of image in array
    }

    changeColor = () => {
        this.setState({color: 'rgb(255,255,255)'});
        // if (this.state.hasMine) {
        //     this.setState({color: 'rgb(255,0,0)'});
        //     this.setState({value: "X"});
        //     this.setState({click: true});
        //
        // } else if (this.state.value !== "F") {
        //     this.setState({color: 'rgb(255,255,255)'});
        //     this.setState({click: true});
        // }
    }

    flag = (e) => {
        e.preventDefault();
        if (this.state.value === "F") {
            this.setState({value: ""}); // index of hasMine - 1 from image array

        } else if (this.state.value !== "F") {
            this.setState({value: "F"});
        }
    }

    render() {
        return(
            <button
                className={"tile"}
                onContextMenu={this.flag}
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: this.state.color,
                    margin: '0.5px'}}
                onClick={this.changeColor}>
                {this.state.value}
            </button>
        );
    }
}