import React, {Component} from "react";
import {baseUrl} from "./Base";
const loggedInUser = localStorage.getItem('id');

export class Deposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                userid: loggedInUser,
                type: 'Deposit',
                amount:'',
            },
        };

        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleTextareaChange(event) {
        this.setState({
            data: Object.assign({}, this.state.data, {
                [event.target.name]: event.target.value,
            }),
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state.data;
        console.log(data.userid)
        console.log(data.type)
        console.log(data.amount)
        fetch( baseUrl() + `deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    }


    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label className= "input-label">
                    Type of transaction:
                    <textarea className= "input" name="type" value={this.state.data.type}/>
                </label>
                <br/>
                <label className= "input-label">
                    Amount:
                    <textarea className= "input" name="amount" value={this.state.data.amount} onChange={this.handleTextareaChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}


export default Deposit;
