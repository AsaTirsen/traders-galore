import React, {useState, useEffect} from "react";
import {baseUrl} from "./Base";
import "./style/App.css";
import "./style/Form.css";
import { useHistory } from 'react-router-dom';

const loggedInUser = localStorage.getItem('id');


let money = '';

export function Deposits() {

    function setItem(items) {
        console.log(items)
        fetch(baseUrl() + `deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items}),
        })
            .then(data => data.json())
            .then(balanceFetch);
    }

    const [itemInput, setItemInput] = useState('');
    const [withdrawalComplete, setWithdrawalComplete] = useState(false)
    const [balance, setBalance] = useState('');
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        setItem({
            userid: loggedInUser,
            amount: itemInput,
            type: 'Deposit'
        })
        money = itemInput;
        setItemInput('');
        setWithdrawalComplete(true)
        setTimeout(() => {
            history.push('./');
        }, 3000)
    };

    function balanceFetch() {
        fetch(baseUrl() + `${loggedInUser}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data[0])
                setBalance(res.data[0].cash_balance)
            });
    }

    useEffect(() => {
        fetch(baseUrl() + `${loggedInUser}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data[0])
                setBalance(res.data[0].cash_balance)
            });
    }, []);


    return (
        <article className="main">
        <div>
            <h1>Deposit money to your account</h1>

            <form onSubmit={handleSubmit}>
                <label className='input-label'>
                    <p className='centre-text'>Amount to deposit</p>
                    <input className='input' type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                </label>
                <button type="submit">Submit</button>
            </form>
            <div className='centre-text'>{(withdrawalComplete && <p>You deposited {money} money.</p>)}</div>
            {loggedInUser && <>
                <p className="centre-text">Your balance is: { balance ? balance.toFixed(2) : 0 } </p>
            </>
            }
        </div>
        </article>
    )
}

export default Deposits;
