import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Save.css';
import axios from 'axios';
import { timeFormat, date } from '../GameLogic.js';
import { v4 as uuid } from 'uuid';
import { Jump } from './Jump';

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
        const time = Math.floor(Date.now());

        this.state = {
            name: "",
            id: (id) ? id : null,
            noName: false,
            time: time
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
     * or update an existing Minesweeper game
     */
    save() {

        const { mineCounter, counter, boardSize, boardData, firstClick, totalMines, endGame, timer, paused, start } = this.props.data;

        const id = uuid();

        const text = {
            id: id,
            name: this.state.name,
            mineCounter: mineCounter,
            counter: counter,
            boardSize: boardSize,
            boardData: boardData,
            firstClick: firstClick,
            totalMines: totalMines,
            endGame: endGame,
            timer: timer,
            paused: paused,
            start: start
        }

        let url = "/";
        let func = api.post;

        if (this.state.id) {
            url += this.state.id;
            func = api.put;
        }

        if (this.state.name.length <= 0 || this.state.name === "") {
            this.setState({noName: true})
            return;
        }

        func(url, text)
            .then(result => {  
                alert("Game Saved.");
                
                this.setState({
                    name: "",
                    full: false
                });

                this.props.callBack()

            })
            .catch(err => {
                console.log(err.response);
        });

        return id;
    };
    
    render() {
        const { mineCounter, counter, boardSize } = this.props.data;

        return (
            <div align="center">
                <br/>
                <Form>
                    <Form.Group className='save'>
                        <Form.Label>Save Name:</Form.Label>
                        <Form.Control value={this.state.name} id="name" type="text" placeholder="Give a name for your save" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={this.getNameValue}/>
                    </Form.Group>

                    <Form.Group className='form'>
                        <Form.Label>Save Time: {date(this.state.time)}</Form.Label>
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

                    {(this.state.noName) ? 
                        <p className='message'>You must include a name for your save file</p> 
                    :
                        <></>
                    }

                    <div className='float-container'>
                        <div className='float-child-left'>
                            <Jump onClick={this.save} />
                        </div>

                        <div className='float-child-right'>
                            <Button variant="danger" size={"lg"} onClick={this.props.onClick}>Back</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Save;