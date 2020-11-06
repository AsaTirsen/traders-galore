import React, {useState, useEffect} from "react";
import {baseUrl} from "./Base";
import Price from "./Price";
import "./style/App.css"
import { useHistory } from 'react-router-dom';

const loggedInUser = localStorage.getItem('id');

let money = '';

export function Withdrawals() {

    function setItem(items) {
        fetch(baseUrl() + `withdrawal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items}),
        })
            .then(data => data.json())
            .then(balanceFetch)
    }

    // const objectData = Price()
    // console.log(objectData);
    const price = Price().slice(-1).map((obj) => {
        return obj.value.toFixed(2)
    })[0];
    console.log(price);
    const [itemInput, setItemInput] = useState('');
    const [withdrawalComplete, setWithdrawalComplete] = useState(false)
    const [balance, setBalance] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setItem({
            userid: loggedInUser,
            amount: itemInput,
            type: 'Withdrawal'
        })
        money = itemInput;
        setItemInput('');
        setWithdrawalComplete(true)
        setTimeout(() => {
            history.push('./');
        }, 3000)
    };

    useEffect(() => {
        fetch(baseUrl() + `${loggedInUser}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data[0])
                setBalance(res.data[0].cash_balance)
            });
    }, []);

    function balanceFetch() {
        fetch(baseUrl() + `${loggedInUser}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data[0])
                setBalance(res.data[0].cash_balance)
            });
    }


    return (
        <article className="main">
            <div className="wrapper">
                <h1>Withdraw money from your account</h1>

                <form onSubmit={handleSubmit}>
                    <label className='input-label'>
                        <p className="centre-text">Amount to withdraw</p>
                        <input className='input' type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div className="centre-text">{(withdrawalComplete && <p>You withdrew {money} money.</p>)}</div>
                <p className="centre-text">Your balance is now { parseFloat(balance).toFixed(2)}</p>
            </div>
        </article>
    )
}

export default Withdrawals;
