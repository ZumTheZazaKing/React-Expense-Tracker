import React, { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import reportWebVitals from './reportWebVitals';

import { MoneyTeller } from './MoneyTeller.js';
import { TransHistory } from './TransHistory.js';
import { Input } from './Input.js';

function App(){

  let [income, setIncome] = useState(localStorage.getItem("zumthezazaking_expenseTracker_income")||0);
  let [balance, setBalance] = useState(localStorage.getItem("zumthezazaking_expenseTracker_balance")||0);
  let [expense, setExpense] = useState(localStorage.getItem("zumthezazaking_expenseTracker_expense")||0);

  let [history, setHistory] = useState(JSON.parse(localStorage.getItem("zumthezazaking_expenseTracker_history"))||[]);

  let [inputTitle, setInputTitle] = useState("");
  const changeTitle = e => setInputTitle(e.target.value);
  let [inputAmount, setInputAmount] = useState("");
  const changeAmount = e => setInputAmount(e.target.value);

  let historyAllRef = useRef();

  function processTransaction(e){
    e.preventDefault();

    let currentDateTime = Date().toLocaleString();
    currentDateTime = currentDateTime.slice(0,currentDateTime.indexOf("G"));

    setBalance(Number(balance) + Number(inputAmount));
    localStorage.setItem("zumthezazaking_expenseTracker_balance", Number(balance) + Number(inputAmount));

    if(inputAmount.search(/-/g) !== -1){
      setExpense(Number(expense) + Number(inputAmount));
      localStorage.setItem("zumthezazaking_expenseTracker_expense", Number(expense) + Number(inputAmount));

    } else {
      setIncome(Number(income) + Number(inputAmount));
      localStorage.setItem("zumthezazaking_expenseTracker_income", Number(income) + Number(inputAmount));

    }

    setHistory([{title: inputTitle,time:currentDateTime, amount:parseFloat(inputAmount).toFixed(2)}, ...history])
    localStorage.setItem("zumthezazaking_expenseTracker_history", JSON.stringify([{title: inputTitle, time:currentDateTime, amount:parseFloat(inputAmount).toFixed(2)}, ...history]));

    setInputTitle("");
    setInputAmount("");

  }

  return <div className="container">

    <h3>Expense Tracker</h3>
    <br/>
    <MoneyTeller
    income={income}
    balance={balance}
    expense={expense}/>
    <br/>
    <TransHistory 
    history={history} 
    historyAllRef={historyAllRef}/>
    <br/>
    <Input
    inputTitle={inputTitle}
    inputAmount={inputAmount}
    changeTitle={changeTitle}
    changeAmount={changeAmount}
    processTransaction={processTransaction}/>
    
  </div>
}


const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
