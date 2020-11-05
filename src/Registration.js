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
        })
        this.setState = {
                data: Object.assign({}, this.state.data, {
                    [event.target.name]: null,
                }),
            };
    }

    render() {
        return (
            <article className="main">
                <form id="contact-form" className="form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <h3 className="centre-text">Create user account</h3>
                    <label className="input-label">Email address</label>
                    <input type="email" className="input" id="longerinput" name="email" value={this.state.data.email}
                           onChange={this.handleTextareaChange}/>
                    <br/>
                    <label className="input-label" >Password</label>
                    <input type="password" className="input" id="longerinput" autoComplete="current-password" name="password"
                           value={this.state.data.password} onChange={this.handleTextareaChange}/>
                    <button type="submit" className="button">Submit</button>
                </form>
            </article>
        );
    }
}

export default Registration;
