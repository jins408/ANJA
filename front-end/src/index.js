import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom'
import firebase from 'firebase'

var config = { apiKey: "AIzaSyClT8BESKIzQIZuPN0Xw8gks4w6HOTIiLM",
    authDomain: "taste-ac33e.firebaseapp.com",
    databaseURL: "https://taste-ac33e.firebaseio.com",
    projectId: "taste-ac33e",
    storageBucket: "taste-ac33e.appspot.com",
    messagingSenderId: "706725717763",
    appId: "1:706725717763:web:7631b8082177166451eb36",
    measurementId: "G-P3SKG9RZF8"};
firebase.initializeApp(config);
firebase.firestore().settings({});
// firebase.firestore().settings({timestampsInSnapshots:true});

var db = firebase.firestore();

window.db = db;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
