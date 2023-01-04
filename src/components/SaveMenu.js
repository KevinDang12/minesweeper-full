import React, { Component } from 'react';
import { date } from '../GameLogic.js'
import './SaveMenu.css';
import { Button, Form } from 'react-bootstrap';
import Save from './Save.js';

/**
 * Get the list of Boards
 */
class SaveMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newSave: false,
            id: null
        }
    }

    /**
     * Pass the data of the save board to update
     * @param {*} id Get the board using the id
     */
    saveBoard = (id) => {
        const board = this.props.data.boards.find(b => b.id === id);
        this.setState({newSave: true, id: board.id});
    }

    render() {
        const { saveRequest, goToBoard, createNewSave } = this.props;
        const { newSave, id } = this.state;
        const { boards } = this.props.data;

        return (
            <div>
                {(newSave === false) ? 
                    <div className="save-files" align="center">
                        <h2>Select a save slot or create a new save</h2>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Save #</th>
                                    <th>Save Time</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.map((board, index) => 
                                    <tr key={board.id} onClick={() => this.saveBoard(board.id)}>
                                        <td>{index + 1}</td>
                                        <td>{date(board.unixTime)}</td>
                                        <td>{board.name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Form>
                            <div className='float-container'>
                                <div className='float-child-left'>
                                    <Button variant="success" size={"lg"} onClick={createNewSave}>New Save</Button>
                                </div>
                                <div className='float-child-right'>
                                    <Button variant="danger" size={"lg"} onClick={goToBoard}>Back</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                : 
                    <Save 
                        id={id}
                        saveRequest={() => saveRequest()}
                        goToBoard={() => goToBoard()}
                        data={this.props.data}
                    />
                }
            </div>
        );
    }
}

export default SaveMenu;
