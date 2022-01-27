import React, {Component} from 'react';

/*
 * OnClick change button to white
 * Right Click on button:
 * - Add flag
 * - remove flag
 * - can be done on gray button
 */

export class Tile extends Component {

    state = {
        color: 'rgba(161,160,160,0.8)',
        value : "",
        click: false
    }

    changeColor = () => {
        console.log('Left click');
        if (this.state.value === "") {
            this.setState({color: 'rgb(255,255,255)'});
            this.setState({click: true});
        }
    }

    flag = (e) => {
        e.preventDefault();
        if (this.state.click === false) {
            if (this.state.value === "F") {
                this.setState({value: ""});
                console.log("none");
            } else if (this.state.value === "") {
                this.setState({value: "F"});
                console.log("Flag");
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
                {this.state.value}
            </button>
        );
    }
}