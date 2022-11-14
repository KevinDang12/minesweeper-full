import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Save.css';

class Save extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mineCounter: this.props.mineCounter,
            timer: this.props.timer,
            boardSize: this.props.boardSize
        }

        this.getNameValue = this.getNameValue.bind(this);
    }

    getNameValue(e) {
        const key = e.target.id;
        const value = e.target.value

        this.setState({[key]: value});
    }
    
    render() {
        const { mineCounter, timer, boardSize } = this.state;
        return (
            <div align="center">
                {/* <h1>Save File Name, Mine Count, Time, Board Size</h1> */}
                <br/>
                <Form>
                    <Form.Group className='form'>
                        <Form.Label>Save Name:</Form.Label>
                        <Form.Control value={this.state.name} id="name" type="text" placeholder="Give a name for your save" onChange={this.getNameValue}/>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Your total number of mines: {mineCounter}</Form.Label>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Your total time: {timer}</Form.Label>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Your board length: {boardSize}</Form.Label>
                    </Form.Group>

                    <Button variant="outline-primary" size={"lg"} onClick={this.save}>Save</Button>
                </Form>
            </div>
        );
    }
}

export default Save;