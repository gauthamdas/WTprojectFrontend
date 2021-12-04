import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import NeftRtgs from "./Components/NeftRtgs";
import Upi from "./Components/Upi";
import Edit from "./Components/Edit";
import Transactions from "./Components/Transactions";
import io from 'socket.io-client';
import Signup from "./Components/Signup";
const socket = io(`${process.env.REACT_APP_HOST}:4001`);
function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_HOST}:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
        setAuth(true);
        // socket.emit("test","hi");
        // setTimeout(()=>{socket.emit("test","1");setTimeout(()=>{socket.emit("test","2");setTimeout(()=>{socket.emit("test","3");setTimeout(()=>{socket.emit("test","4");setTimeout(()=>{socket.emit("test","5");},500);},500);},500);},500);},500);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
        setAuth(false);
      });
      return () => {
        socket.disconnect({token: getToken()});
      }
  }, []);

  useEffect(() => {
    if(auth) {
      socket.emit("auth",{token: getToken()});
    }
  }, [auth]);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar {...{ auth }} soc={socket}/>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/invest" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/insure" component={Home} />
              <Route path="/contact" component={Home} />
              <PublicRoute
                path="/home"
                component={Home}
              />
              <PublicRoute
                path="/login"
                component={Login}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                socket={socket}
              />
              <PublicRoute
                path="/signup"
                component={Signup}
                
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                socket={socket}
              />
              <PrivateRoute
                path="/upi"
                component={Upi}
              />
              <PrivateRoute
                path="/neftrtgs"
                component={NeftRtgs}
              />
              <PrivateRoute
                path="/edit"
                component={Edit}
              />
              <PrivateRoute
                path="/transactions"
                component={Transactions}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
