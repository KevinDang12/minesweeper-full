import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Save.css';
import axios from 'axios';
import { timeFormat } from '../GameLogic.js'

const api = axios.create({
    baseURL: `http://localhost:5000/api/boards`
});

class Save extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
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
            mineCounter: this.props.mineCounter,
            counter: this.props.counter,
            boardSize: this.props.boardSize,
            boardData: this.props.boardData,
            firstClick: this.props.firstClick,
            totalMines: this.props.totalMines,
            endGame: this.props.endGame,
            timer: this.props.timer,
            paused: this.props.paused
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
        const { mineCounter, counter, boardSize } = this.props;
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
                        <Form.Label>Your total time: {timeFormat(counter)}</Form.Label>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Your board length: {boardSize}</Form.Label>
                    </Form.Group>

                    <Button variant="success" size={"lg"} onClick={this.save}>Save</Button>
                    <Button variant="danger" size={"lg"} onClick={this.props.onClick}>Back</Button>
                </Form>
            </div>
        );
    }
}

export default Save;