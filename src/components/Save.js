import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Save.css';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:5000/api/boards`
});

class Save extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mineCounter: this.props.mineCounter,
            counter: this.props.counter,
            boardSize: this.props.boardSize,
            boardData: this.props.boardData,
            firstClick: this.props.firstClick,
            totalMines: this.props.totalMines,
            mineCounter: this.props.mineCounter,
            endGame: this.props.endGame,
            counter: this.props.counter,
            timer: this.props.timer,
            paused: this.props.paused
        }

        this.getNameValue = this.getNameValue.bind(this);
        this.save = this.save.bind(this);
    }

    getNameValue(e) {
        const key = e.target.id;
        const value = e.target.value

        this.setState({[key]: value});
    }

    save() {

        console.log(this.state.name);

        const text = {
            name: this.state.name,
            mineCounter: this.state.mineCounter,
            counter: this.state.counter,
            boardSize: this.state.boardSize,
            boardData: this.state.boardData,
            firstClick: this.state.firstClick,
            totalMines: this.state.totalMines,
            mineCounter: this.state.mineCounter,
            endGame: this.state.endGame,
            counter: this.state.counter,
            timer: this.state.timer,
            paused: this.state.paused
        }

        console.log(text);

        let func = api.post;
        let url = "/";

        func(url, text)
            .then(result => {
                if (this.state.created) {
                    alert("Game Saved.");
                }
                this.setState({
                    name: "",
                });
            })
            .catch(err => {
                console.log(err.response);
        });
    };
    
    render() {
        const { mineCounter, counter, boardSize } = this.state;
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
                        <Form.Label>Your total time: {counter}</Form.Label>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Your board length: {boardSize}</Form.Label>
                    </Form.Group>

                    <Button variant="warning" size={"lg"} onClick={this.save}>Save</Button>
                </Form>
            </div>
        );
    }
}

export default Save;