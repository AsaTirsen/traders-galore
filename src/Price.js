// import {useEffect, useState} from 'react';
// import {w3cwebsocket as W3CWebSocket} from "websocket";
//
// const client = new W3CWebSocket('wss://trading-server.asatirsen.me');
// //const client = new W3CWebSocket('ws://127.0.0.1:1343');
//
//
// export function Price() {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         client.onopen = () => {
//             console.log("client open");
//         }
//         client.onmessage = (message) => {
//             const dataFromServer = JSON.parse(message.data);
//             console.log(dataFromServer.time);
//             console.log(dataFromServer.value);
//             setData(currentData => [...currentData, dataFromServer])
//             console.log(data);
//         };
//     }, );
//     localStorage.setItem('price', data.slice(-1).map((obj) => {
//         return obj.value.toFixed(2)
//     })[0]);
//     return data;
// }
//
//
//
// export default Price;
