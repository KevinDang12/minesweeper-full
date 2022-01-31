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

    state = {
        color: 'rgb(161,160,160)',
        click: false,
        hasMine: this.props.hasMine,
        adjacentMines: 0,
        x: this.props.x,
        y: this.props.y,
        image: null
    }

    changeMine = (value) => {
        this.setState({adjacentMines: value});
    }

    changeColor = () => {
        if (this.state.hasMine) {
            this.setState({color: 'rgb(255,0,0)'});
            this.setState({image: mine});
            this.setState({click: true});

        } else if (this.state.image !== flag) {
            this.setState({color: 'rgb(255,255,255)'});
            this.setState({click: true});
        }
    }

    testText () {
        console.log("test");
    }

    flag = (e) => {
        e.preventDefault();
        if (this.state.click === false) {
            if (this.state.image === flag) {
                this.setState({image: one}); // index of hasMine - 1 from image array

            } else if (this.state.value !== flag) {
                this.setState({image: flag});
            }
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
                <img src = {this.state.image}/>
                {/*{this.state.value}*/}
            </button>
        );
    }
}