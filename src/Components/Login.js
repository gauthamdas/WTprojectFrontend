import React, { useState } from 'react';
import { useCallback } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import './login.css';
import logo from './PES bank.png'
require('dotenv').config();

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const isLogged = useCallback((val) => {
          hasAuthLoading(!val);
          hasAuth(val);
        },
        [hasAuth,hasAuthLoading],
      );

  // handle button click of login form
  const handleLogin = () => {   
    setError(null);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_HOST}/users/signin`, { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      isLogged(true)
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
  if (loading) return(<div>Loading</div>)

  return (
    <div>
      <img src={logo} alt='no img'style={{zIndex: "1",position:"absolute",left:"40px",top:"50px",width: "250px",height: "100px"}}/>
    <div className="loginC">
      <div class="containerL">
  <div class="brand-title">PES Bank</div>
  <div class="inputs">
    <label>Username</label>
    <input type="text" className="loginInput" {...username} autoComplete="new-password" />
    <label>Password</label>
    <input type="password" className="loginInput" {...password} autoComplete="new-password" />
    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
    <input type="button" className="loginBtn" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
  </div>
</div>
</div>

    {/* <div className="login">
      <div className="loginHead" >Login</div>
      <div>
        Username<br />
        <input type="text" className="loginInput" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" className="loginInput" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" className="loginBtn" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br /> <br />
      <div ><small>Need an account? </small><Link className="signUpBtn" to='/signup'>Sign up</Link></div>
    </div> */}
    </div>
  );
}
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default Login;