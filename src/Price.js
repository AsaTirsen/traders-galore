import io from "socket.io-client";
import {useEffect, useState} from 'react';

export function Price(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = io('https://trading-server.asatirsen.me', {
            transports: ['websocket']
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
    return data;
}

export default Price;
