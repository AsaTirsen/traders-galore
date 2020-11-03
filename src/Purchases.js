import React, {useState} from "react";
import {baseUrl} from "./Base";
import Price from "./Price";

const loggedInUser = localStorage.getItem('id');

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

    const objectData = Price()
    console.log(objectData);
    const price = objectData.slice(-1).map((obj) => {
        return obj.value.toFixed(2)
    })[0];
    console.log(price);
    const [itemInput, setItemInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setItem({
            userid: loggedInUser,
            total: parseInt(itemInput) * price,
            units: itemInput,
            unit_price: price,
            type: 'Purchase'
        })
        console.log(itemInput)
        setItemInput("");
    };

    return (
        <div className="wrapper">
            <h1>Buy Apples</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <p>Amount of apples</p>
                    <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>You bought {itemInput} for {price} money per unit at a total of {parseInt(itemInput) * price}</p>
        </div>
    )
}

export default Purchases;
