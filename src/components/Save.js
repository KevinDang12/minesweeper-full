import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Save.css';
import axios from 'axios';
import { timeFormat } from '../GameLogic.js'

const api = axios.create({
    baseURL: `http://localhost:5000/api/boards`
});

/**
 * Component to save the current Minesweeper game
 * and display information of the current game
 */
class Save extends Component {

    constructor(props) {
        super(props);

        const {id} = this.props;

        this.state = {
            name: "",
            id: (id) ? id : null
        }

        this.getNameValue = this.getNameValue.bind(this);
        this.save = this.save.bind(this);
    }

    /**
     * Set the name of the save file
     * @param {*} e 
     */
    getNameValue(e) {
        const key = e.target.id;
        const value = e.target.value

        this.setState({[key]: value});
    }

    /**
     * Save the JSON of the Minesweeper game to the backend server
     */
    save() {
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

        let url = "/";
        let func = api.post;

        if (this.state.id) {
            url += this.state.id;
            func = api.put;
        }

        func(url, text)
            .then(result => {
                if (this.state.created) {
                    alert("Game Saved.");
                }
                this.setState({
                    name: "",
                });

                this.props.callBack()
            })
            .catch(err => {
                console.log(err.response);
        });
    };
    
    render() {
        const { mineCounter, counter, boardSize } = this.props;
        return (
            <div align="center">
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