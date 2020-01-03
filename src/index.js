import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import InitialComponent from "./components/InitialComponent"


ReactDOM.render(
    <InitialComponent/>
    , document.getElementById('root'));
serviceWorker.register();