import React, { useState,useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import reportWebVitals from './reportWebVitals';

import { MoneyTeller } from './MoneyTeller.js';
import { TransHistory } from './TransHistory.js';
import { Input } from './Input.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQuSLV9BydFHRtg-x9kK9jeM0foZyOt3M",
  authDomain: "expense-tracker-d9bf2.firebaseapp.com",
  projectId: "expense-tracker-d9bf2",
  storageBucket: "expense-tracker-d9bf2.appspot.com",
  messagingSenderId: "180385147814",
  appId: "1:180385147814:web:3b0a82f9d205b930eb7d67",
  measurementId: "G-N4BC1MH8WZ"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

let mainOn = false;

function Main(){
  mainOn = true;
  let [income, setIncome] = useState(0);
  let [balance, setBalance] = useState(0);
  let [expense, setExpense] = useState(0);

  let [history, setHistory] = useState([]);

  let [currencyUnit, setCurrencyUnit] = useState("$");
  const changeCurrencyUnit = e => {setCurrencyUnit(e.target.value);docRef.update({currencyUnit:e.target.value})};

  let docRef = firestore.collection("users").doc(auth.currentUser.uid);

  function setValues(data){
    setBalance(data.balance);
    setIncome(data.income);
    setExpense(data.expense);
    setHistory(data.history);
    setCurrencyUnit(data.currencyUnit);
  }

  useEffect(() => {
    docRef.get().then(doc => {
      if(doc.exists){
        docRef.get().then(data => setValues(data.data()));
      } else {
        docRef.set({
          balance:0,
          income:0,
          expense:0,
          currencyUnit:"$",
          history:[]
        })
        docRef.get().then(data => setValues(data.data()));
      }
    })
  },[mainOn])



  let [inputTitle, setInputTitle] = useState("");
  const changeTitle = e => setInputTitle(e.target.value);
  let [inputAmount, setInputAmount] = useState("");
  const changeAmount = e => setInputAmount(e.target.value);


  let historyAllRef = useRef();
  let settingsMenuRef = useRef();

  function processTransaction(e){
    e.preventDefault();

    let currentDateTime = Date().toLocaleString();
    currentDateTime = currentDateTime.slice(0,currentDateTime.indexOf("G"));

    setBalance(Number(balance) + Number(inputAmount));
    docRef.update({balance:Number(balance) + Number(inputAmount)});

    if(inputAmount.search(/-/g) !== -1){
      setExpense(Number(expense) + Number(inputAmount));
      docRef.update({expense:Number(expense) + Number(inputAmount)});;

    } else {
      setIncome(Number(income) + Number(inputAmount));
      docRef.update({income:Number(income) + Number(inputAmount)});

    }

    setHistory([{title: inputTitle,time:currentDateTime, amount:parseFloat(inputAmount).toFixed(2)}, ...history]);
    docRef.update({history:[{title: inputTitle,time:currentDateTime, amount:parseFloat(inputAmount).toFixed(2)}, ...history]})

    setInputTitle("");
    setInputAmount("");

  }

  return <div className="container">
    
    <div id="settings" onClick={e => settingsMenuRef.current.className=""}><i className="fas fa-cog"></i></div>
    <div id="settingsMenu" className="hide" ref={settingsMenuRef}>
      <div id="settingsMenuContent">
        <p onClick={e => settingsMenuRef.current.className="hide"}>&times;</p>
        <form onSubmit={e => {e.preventDefault();}}>
          <label>Enter Currency Unit: </label><br/><br/>
          <input maxLength={3} placeholder="e.g. $, RM..." type="text" value={currencyUnit} onChange={changeCurrencyUnit} required/>
        </form>
        <br/>
        <SignOut/>
      </div>
    </div>

    <h3>Hello, {auth.currentUser.displayName}</h3>
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

function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return <div id="signIn">
    <h2>Expense Tracker</h2>
    <p>Track your expenses, transactions and more with this user-friendly app</p>
    <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
}

function SignOut(){
  return auth.currentUser && (
    <button id="signOut" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function App(){

  const [user] = useAuthState(auth);

  return <div>
    {user ? <Main/> : <SignIn/>}
  </div>
}



const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
