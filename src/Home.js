import io from 'socket.io-client';
import React from 'react';
import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
} from 'recharts';

const socket = io('http://localhost:1342', {
    transports: ['websocket', 'polling']
});




const Home = () => {
    const [data, setData] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [amount, setAmount] = useState('');
    const onSubmit = number => {
        console.log(number);
        setAmount(number)
    }
    console.log(amount);
    //skicka data till databasen
    //set data = ""

    // 1. listen for a price change event and update the state
    useEffect(() => {
        socket.on('stocks', grannySmith => {
            console.log(grannySmith)
            setData(currentData => [...currentData, grannySmith]);
        });
    }, []);

    return (
        <main>
            <article className='main'>
                <h1>Trade here</h1>
                <div className='textarea'>
                    <p>Here is the price development for our apples</p>
                </div>
            </article>
            <div>
                <h1>Real Time pricechanges</h1>
                <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Line dataKey="value"/>
                </LineChart>
            </div>
            <div>
                <h1>Purchase Granny Smith stock</h1>
                <p>Current price is: {data.slice(-1).map((obj) => {
                    return obj.value.toFixed(2)
                })}</p>
                <p>How many units do you wish to purchase?</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Amount</label>
                    <input type="text" id="name" name="amount" ref={register({ required: true, maxLength: 7 })} />
                    {errors.name && errors.name.type === "required" && <span>This is required</span>}
                    {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span> }
                    <input type="submit" />
                </form>
                <p>You want to buy {amount.amount} at a price of </p>
            </div>
        </main>
    );
};

export default Home;

