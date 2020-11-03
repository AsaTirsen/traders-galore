import io from "socket.io-client";
import {useEffect, useState} from 'react';

export function Price(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:1342', {
            transports: ['websocket', 'polling']
        });
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
