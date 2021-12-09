import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { getToken } from '../Utils/Common';
import ref from './ref.png'
import './transactions.css'

function Transactions() {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const appendHistoryData = (data)=>{
        const divContainer = document.getElementById('log');
        divContainer.innerHTML = "";
        data.reverse().forEach(element => {
            if (element.type==="credit"){
                let item = `<div class='credit'><b>${element.mode}</b><br><span>${element.from_name} has paid you ₹ ${element.amt}</span><br><small><b>DateTime: </b>${element.time}</small></div>`
                divContainer.innerHTML += item;
            }else{
                let item = `<div class='debit'><b>${element.mode}</b><br><span>You paid ${element.to_name} ₹ ${element.amt}</span><br><small><b>DateTime: </b>${element.time}</small></div>`
                divContainer.innerHTML += item;
            }
        });
    } 

    useEffect(() => {
        console.log(refresh)
        setLoading(true);
        axios.post(`${process.env.REACT_APP_HOST}/users/history`, { token: getToken() }).then(response => {
            appendHistoryData(response.data.transHistory)
            setLoading(false);
          }).catch(error => {
            setLoading(false);
            console.log(error);
          });
    },[refresh])
    return (
        <div>
            <h1>Transaction History</h1><div className="refresh"><button className="refr" onClick={() => {
            setRefresh(refresh + 1);
          }} ><img src={ref} width="20px" alt="refresh"/></button></div>
            {loading?<div className="loadclass"><span className="loader-11"></span></div>:null}
            <div id="log"></div>
        </div>
    )
}

export default Transactions;
