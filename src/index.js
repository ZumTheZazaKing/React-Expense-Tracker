import React, { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import reportWebVitals from './reportWebVitals';



function App(){

  let [income, setIncome] = useState(localStorage.getItem("zumthezazaking_expenseTracker_income")||0);
  let [balance, setBalance] = useState(localStorage.getItem("zumthezazaking_expenseTracker_balance")||0);
  let [expense, setExpense] = useState(localStorage.getItem("zumthezazaking_expenseTracker_expense")||0);

  let [history, setHistory] = useState(JSON.parse(localStorage.getItem("zumthezazaking_expenseTracker_history"))||[]);

  let [inputTitle, setInputTitle] = useState("");
  const changeTitle = e => setInputTitle(e.target.value);
  let [inputAmount, setInputAmount] = useState("");
  const changeAmount = e => setInputAmount(e.target.value);
  let [currencyUnit, setCurrencyUnit] = useState(localStorage.getItem("zumthezazaking_expenseTracker_currency") || "$");
  const changeCurrencyUnit = e => setCurrencyUnit(e.target.value);

  let historyAllRef = useRef();
  let settingsMenuRef = useRef();

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
    
    <div id="settings" onClick={e => settingsMenuRef.current.className=""}><i className="fas fa-cog"></i></div>
    <div id="settingsMenu" className="hide" ref={settingsMenuRef}>
      <div id="settingsMenuContent">
        <form onSubmit={e => {settingsMenuRef.current.className="hide"; e.preventDefault(); localStorage.setItem("zumthezazaking_expenseTracker_currency", currencyUnit)}}>
          <label>Enter Currency Unit: </label><br/><br/>
          <input maxLength={3} placeholder="e.g. $, RM..." type="text" value={currencyUnit} onChange={changeCurrencyUnit} required/>
          <input type="submit" value="Set"/>
        </form>
      </div>
    </div>

    <h3>Expense Tracker</h3>
    <br/>
    <MoneyTeller
    income={income}
    balance={balance}
    expense={expense}
    currencyUnit={currencyUnit}/>
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
