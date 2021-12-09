import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../Utils/Common";
import ref from './ref.png'
import "./edit.css";
function Edit() {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState(false);
  const [telForm, setTelForm] = useState(false);
  const [error, setError] = useState(null);
  const [teleLoading, setTeleLoading] = useState(false);
  const [statusVal, setStatusVal] = useState("");
  const [chatId, setChatId] = useState("");
  const setFormData = (data) => {
    const formElement = document.getElementById("acForm");
    formElement.fname.value = data.first_name;
    formElement.lname.value = data.last_name;
    formElement.email.value = data.email;
    formElement.phnum.value = data.phone_number;
    formElement.acnum.value = data.ac_number;
    formElement.addr.value = data.address;
    console.log(data.status);
    if (data.status) {
      setChatId(data.chat_id);
      setStatusVal("Active");
      setStatus(data.status);
    } else {
      setStatusVal("Inactive");
      setStatus(data.status);
    }
  };

  // handle button click of login form
  const handleActivation = () => {
    const chatId = document.getElementById("chat_id").value;
    const teleUser = document.getElementById("tele_username").value;
    setError(null);
    setTeleLoading(true);
    axios
      .post(`${process.env.REACT_APP_HOST}:4000/users/activation`, {
        token: getToken(),
        chat_id: chatId,
        tele_username: teleUser,
      })
      .then((response) => {
        setTelForm(false);
        setTeleLoading(false);
        setRefresh(refresh + 1);
      })
      .catch((error) => {
        setTeleLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  useEffect(() => {
    console.log(refresh);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_HOST}/users/acdetails`, {
        token: getToken(),
      })
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [refresh]);
  return (
    <div>
      <h1>Account Details: </h1>
      <div className="refresh">
        <button className="refr" onClick={() => {
            setRefresh(refresh + 1);
          }} ><img src={ref} width="20px" alt="refresh"/></button>
        {/* <input
          type="button"
          className="ref"
          value="refresh"
          onClick={() => {
            setRefresh(refresh + 1);
          }}
        /> */}
      </div>
      {loading ? <div className="loadclass"><span className="loader-11"></span></div> : null}
      <div className="acDetails">
        <form id="acForm">
          <div className="inputCont">
            {" "}
            First Name:{" "}
            <input
              type="text"
              className="formInput"
              name="fname"
              id="fname"
              disabled
            />
          </div>
          <div className="inputCont">
            Last Name:{" "}
            <input
              type="text"
              className="formInput"
              name="lname"
              id="lname"
              disabled
            />
          </div>
          <div className="inputCont">
            Email:{" "}
            <input
              type="text"
              className="formInput"
              name="email"
              id="email"
              disabled
            />
          </div>
          <div className="inputCont">
            Phone Number:{" "}
            <input
              type="text"
              className="formInput"
              name="phnum"
              id="phnum"
              disabled
            />
          </div>
          <div className="inputCont">
            A/c number:{" "}
            <input
              type="text"
              className="formInput"
              name="acnum"
              id="acnum"
              disabled
            />
          </div>
          <div className="inputCont">
            Address:{" "}
            <input
              type="text"
              className="formInput"
              name="addr"
              id="addr"
              disabled
            />
          </div>
        </form>
        <h2>Telegram Activation</h2>
        <form id="mainTeleForm">
          <div className="inputCont">
            {" "}
            Status:{" "}
            <input
              type="text"
              className="formInput"
              name="status"
              id="status"
              value={statusVal}
              disabled
            />
          </div>
          {status ? (
            <div className="inputCont">
              {" "}
              Chat ID:{" "}
              <input
                type="text"
                className="formInput"
                name="chat_id"
                id="chat_id"
                value={chatId}
                disabled
              />
              <input type="button"  className="fBtn" value="ReActivate" onClick={()=>{setStatus(false);setTelForm(true);}} />
            </div>
          ) : (
            <div className="inputCont">
              {" "}
              <input
                type="button"
                className="fBtn"
                value="Get Updates"
                onClick={() => {
                  setTelForm(true);
                }}
              />
            </div>
          )}
        </form>
      </div>
      <div className="teleDetails">
        {telForm ? (
          <form id="teleFormReg">
            <span>
              Subscribe to our Bot{" "}
              <a
                href="https://t.me/pesbankbot"
                target="_blank"
                rel="noreferrer noopener"
              >
                @pesbankbot
              </a>{" "}
              and type command "<b>/updates</b>". Then Enter your Telegram
              username & Chat ID <br/>
            </span>
            <div className="inputCont">
              Telegram username:{" "}
              <input
                type="text"
                className="formInput"
                name="tele_username"
                id="tele_username"
              />
            </div>
            <div className="inputCont">
              Chat ID:{" "}
              <input
                type="text"
                className="formInput2"
                name="chat_id"
                id="chat_id"
              /> <br/>
            </div>
            <input
              type="button"
              className="fBtn"
              value={teleLoading ? "Loading..." : "Activate"}
              onClick={handleActivation}
            />
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
            <br />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default Edit;
