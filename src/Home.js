//import io from 'socket.io-client';
import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import "./style/App.css"
import {baseUrl} from './Base';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
} from 'recharts';
import {useMediaQuery} from 'react-responsive';
import {w3cwebsocket as W3CWebSocket} from "websocket";

//import Price from "./Price";


const loggedIn = localStorage.getItem('token');
const loggedInUser = localStorage.getItem('id');
console.log(loggedInUser)
const Home = () => {

    // let data = Price();
    // console.log(data);
    const [balance, setBalance] = useState('');
    const [user, setUser] = useState("");
    const isSmallerScreen = useMediaQuery({query: '(max-width: 500px)'})
    const isBiggerScreen = useMediaQuery({query: '(min-width: 501px)'})
    const client = new W3CWebSocket('wss://trading-server.asatirsen.me');
    const [data, setData] = useState([]);
    useEffect(() => {
        client.onopen = () => {
            console.log("client open");
        }
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setData(currentData => [...currentData, dataFromServer])
            localStorage.setItem('price', dataFromServer.value);
        };
    },);

    useEffect(() => {
        if (loggedIn) {
            fetch(baseUrl() + `login/${loggedInUser}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res.data[0])
                    setUser(res.data[0].email)
                });
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            fetch(baseUrl() + `${loggedInUser}`)
                .then(res => res.json())
                .then(res => {
                    setBalance(res.data[0].cash_balance)
                });
        }
    }, []);

    let currentPrice = parseFloat(localStorage.getItem('price'));

    return (
        <article className='main'>
            <h1>Trade apple stock here</h1>
            <div>
            </div>
            <div className='main-content'>
                <h2>Real Time pricechanges</h2>
                {isBiggerScreen && <>
                    <LineChart width={500} height={300} data={data}>
                        <XAxis dataKey="time"/>
                        <YAxis/>
                        <Line dataKey="value"/>
                    </LineChart>
                </>}
                {isSmallerScreen && <>
                    <LineChart width={300} height={200} data={data}>
                        <XAxis dataKey="time"/>
                        <YAxis/>
                        <Line dataKey="value"/>
                    </LineChart>
                </>}
            </div>
            <div className='side-content'>
                <h3>Purchase Granny Smith stock</h3>
                {data && <>
                    <p>Current price is: {currentPrice.toFixed(2)}</p></>}
                {loggedIn && <>
                    <h3 className='userGreeting'>Hello {user}</h3>
                    <p>Your balance is: {balance ? balance.toFixed(2) : 0} </p>
                </>
                }
                <div>
                    <Link to={`Purchases`} className='link-button' id='buy'>Buy</Link>
                    <Link to={`Sales`} className='link-button' id='sell'>Sell</Link>
                    <Link to={`Deposits`} className='link-button' id='deposit'>Deposit</Link>
                    <Link to={`Withdrawals`} className='link-button' id='withdraw'>Withdraw</Link>
                </div>
            </div>
        </article>
    );
};

export default Home;

