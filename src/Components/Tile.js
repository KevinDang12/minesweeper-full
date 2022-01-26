import React, {Component} from 'react';

const styles = {
    tile: {
        height: '50px',
        width: '50px',
    },
}

export class Tile extends Component {
    render() {
        return(
            <button className={"tile"} style={styles.tile}>
                {this.props.value}
            </button>
        );
    }
}