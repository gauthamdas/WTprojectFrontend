import axios from 'axios';
import React from 'react';
import { useCallback, useState } from "react";
import { getUser, removeUserSession, getToken } from '../Utils/Common';
import './dashboard.css';
import eo from '../eyeopen.png';
import ec from '../eyeclose.png';
require('dotenv').config();


function Dashboard({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const user = getUser();
  const [balance, setBalance] = useState("₹ X,XX,XXX")
  const [eyeToggle, setEyeToggle] = useState(eo)
  const isLogged = useCallback((val) => {
          hasAuth(val);
          hasAuthLoading(!val);
          socket.emit("leave_room",getToken());
        },
        [hasAuth,hasAuthLoading,socket],
      );

  //Fetch Balance
  const getBalance = () =>{
    if (eyeToggle == eo){
    axios.post(`${process.env.REACT_APP_HOST}:4000/users/fetchBalance`, { token: getToken() }).then(response => {
      setBalance("₹ "+response.data.balance);
    }).catch(error => {
      console.log(error.response.data.message)
    });
    setEyeToggle(ec);
    }else{
      setBalance("₹ X,XX,XXX");
      setEyeToggle(eo);
    }
  }

  // handle click event of logout button
  const handleLogout = () => {
    socket.disconnect({token: getToken()});
    isLogged(false);
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1> 
      Welcome {user.name}!<br /><br />
      <div className="displayBal">
        {/* <span>Balance: </span>{balance}
        <input type="button" value="Fetch Balance" onClick={getBalance} /> */}
        <div class="card">
    <span class="title">PES Bank</span>
    <span class="bank-logo">
</span>
    <img class="mc" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/320px-MasterCard_logo.png"/>
    <span class="holo-back"></span>
    <span class="holo"></span>
    <br/>
    <span class="number">5467 5670 7623 0945</span><br/><br/>
    <span class="small-type">Available Balance</span><br/><br/>
    <span class="emboss exp">{balance}</span> <button className="null" onClick={getBalance}><img src={eyeToggle} class="eye"/></button> <br/><br/>
    <span class="name">{user.name.toUpperCase()}</span>
  </div>
      </div>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
