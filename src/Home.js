import io from 'socket.io-client';
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
import { useMediaQuery } from 'react-responsive';


const loggedIn = localStorage.getItem('token');
const loggedInUser = localStorage.getItem('id');
console.log(loggedInUser)

const Home = () => {
    const [data, setData] = useState([]);
    //const { register, handleSubmit, errors } = useForm();
    // const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('');
    const [user, setUser] = useState("");
    const isSmallerScreen = useMediaQuery({ query: '(max-width: 500px)' })
    const isBiggerScreen = useMediaQuery({ query: '(min-width: 501px)' })
    // 1. listen for a price change event and update the state

    useEffect(() => {
        console.log("before socket")
        const socket = io('https://trading-server.asatirsen.me', {
            transports: ['websocket', 'polling']
        });
        console.log(socket);
        // const socket = io('http://localhost:1343', { //try wss...
        //     transports: ['websocket', 'polling']
        // });
        socket.on('stocks', grannySmith => {
            console.log(grannySmith)
            setData(currentData => [...currentData, grannySmith]);
        });
        return () => {
            socket.close();
        };
    }, []);

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
                    console.log(res.data[0])
                    setBalance(res.data[0].cash_balance)
                });
        }
    }, []);


    return (
        <article className='main'>
            <h1>Trade here</h1>
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
                <p>Current price is: {data.slice(-1).map((obj) => {
                    return obj.value.toFixed(2)
                })}</p>
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

