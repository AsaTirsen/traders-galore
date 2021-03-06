import React, {useState} from "react";
import {baseUrl} from "./Base";
//import Price from "./Price";
import "./style/App.css"
import { useHistory } from 'react-router-dom';

const loggedInUser = localStorage.getItem('id');
let units = 0;

export function Purchases() {

    function setItem(items) {
        console.log(items)
        fetch(baseUrl() + `buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items}),
        })
            .then(data => data.json())
    }


    const price = parseFloat(localStorage.getItem("price"));
    console.log(price);
    const [itemInput, setItemInput] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setItem({
            userid: loggedInUser,
            total: parseInt(itemInput) * price,
            units: itemInput,
            unit_price: price,
            type: 'Purchase'
        })
        units = itemInput;
        console.log(itemInput)
        setItemInput("");
        setPurchasePrice(true);
        setTimeout(() => {
            history.push('./');
        }, 5000)
    };


    return (
        <article className="main">
            <div>
                <h1>Buy Apples</h1>
                { price && <>
                <form onSubmit={handleSubmit}>
                    <label className='input-label'>
                        <p className="centre-text">Amount of apples</p>
                        <input className='input' type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                </> }
                <div className="centre-text">{(purchasePrice && <p>You bought {units} apple stock for {price.toFixed(2)} money per unit at a total
                    of {(units * price).toFixed(2)}</p>)}</div>
            </div>
        </article>
    )
}

export default Purchases;
