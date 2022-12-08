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
            id: (id) ? id : null,
            full: false
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
     * Check the number of saved minesweeper games if it 
     * is greater than or equal to 10
     * @returns True if the length is greater than 10 else false
     */
    checkBoards = async() => {
        let data = await api.get('/').then(({data}) => data);
        if (data.length >= 10) {
            return true;
        }
        return false;
    }

    /**
     * Save the JSON of the Minesweeper game to the backend server
     * or update an existing Minesweeper game
     */
    save() {

        const { mineCounter, counter, boardSize, boardData, firstClick, totalMines, endGame, timer, paused } = this.props.data;

        const text = {
            name: this.state.name,
            mineCounter: mineCounter,
            counter: counter,
            boardSize: boardSize,
            boardData: boardData,
            firstClick: firstClick,
            totalMines: totalMines,
            endGame: endGame,
            timer: timer,
            paused: paused
        }

        let url = "/";
        let func = api.post;

        if (this.state.id) {
            url += this.state.id;
            func = api.put;
        }

        this.checkBoards();

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
                if (this.checkBoards) {
                    this.setState({full: true})
                }
                console.log(err.response);
        });
    };
    
    render() {
        const { mineCounter, counter, boardSize } = this.props.data;
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

                {(this.state.full) ? 
                    <p className='message'>You cannot have more than 10 save files, either delete or update one of your save files</p> 
                :
                    <></>
                }
            </div>
        );
    }
}

export default Save;