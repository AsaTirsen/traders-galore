import React, {useState} from "react";
import {baseUrl} from "./Base";
import Price from "./Price";
import "./style/App.css"


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


    const price = Price().slice(-1).map((obj) => {
        return obj.value.toFixed(2)
    })[0];
    console.log(price);
    const [itemInput, setItemInput] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(false)

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
        setPurchasePrice(true)
    };


    return (
        <article className="main">
            <div>
                <h1>Buy Apples</h1>
                <form onSubmit={handleSubmit}>
                    <label className='input-label'>
                        <p className="centre-text">Amount of apples</p>
                        <input className='input' type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div className="centre-text">{(purchasePrice && <p>You sold {units} apples for {price} money per unit at a total
                    of {(units * price).toFixed(2)}</p>)}</div>
            </div>
        </article>
    )
}

export default Purchases;
