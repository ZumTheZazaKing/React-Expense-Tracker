import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import reportWebVitals from './reportWebVitals';

import { MoneyTeller } from './MoneyTeller.js';
import { TransHistory } from './TransHistory.js';
import { Input } from './Input.js';


function App(){
  return <div>

    <h3>Expense Tracker</h3>

    <MoneyTeller/>
    <TransHistory/>
    <Input/>
  </div>
}


const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
