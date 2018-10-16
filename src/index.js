import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './css/foundation.css'
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Moment from 'react-moment';
import * as serviceWorker from './serviceWorker';




ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

