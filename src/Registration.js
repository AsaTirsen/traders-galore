import React, {Component} from "react";
import {baseUrl} from "./Base";


export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
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
        console.log(data)
        fetch(baseUrl() + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        this.setState = {
            data: {
                email:"",
                password:""
            }
        };
    }

    render() {
        return (
            <form id="contact-form" className="form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                <h3>Skapa användare</h3>
                <label className="input-label">Emailadress</label>
                <input type="email" className="input" name="email" value={this.state.data.email} onChange={this.handleTextareaChange}/>
                <br/>
                <label className="input-label">Lösenord</label>
                <input type="password" className="input" autoComplete="current-password" name="password" value={this.state.data.password} onChange={this.handleTextareaChange}/>
                <button type="submit" className="button">Submit</button>
            </form>
        );
    }
}

export default Registration;
