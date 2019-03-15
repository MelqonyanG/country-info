import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from "./components/App";
import './index.css'
import io from 'socket.io-client'
import data from './clientConfig.json';

const socket = io.connect(data.server.host + ':' + data.server.port);

socket.on('connect', function () {
  ReactDOM.render(<App socket={socket}/>, document.getElementById("root"));
});

export {socket};
