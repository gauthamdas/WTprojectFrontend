import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getToken } from '../Utils/Common';
import './upi.css';
require('dotenv').config();

const convertTowords = require('convert-rupees-into-words')

function Upi() {
    const [paymentDone, setPaymentDone] = useState({flag: false, amt: null, to_upi: null, trans_id: null})
    const [requireAuth, setRequireAuth] = useState(false)
    const [processing, setProcessing] = useState(false)
    const { register, handleSubmit, setValue , reset} = useForm({defaultValues: {pin: ''}});
    const [error, setError] = useState(null);
    const onPay = data =>{ 
        setError(null);
        setProcessing(true);
        axios.post(`${process.env.REACT_APP_HOST}:4000/upi/payment`, {token: getToken(), upi_id: data.upiId, upi_pin: data.pin, amt: data.amt}).then(response => {
          setProcessing(false);
          setPaymentDone({flag: response.data.flag, amt: response.data.amt, to_upi: response.data.to_upi, trans_id: response.data.transId})
        }).catch(error => {
          setProcessing(false);
          if (error.response.status === 401) setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
        });
    }

    const onSubmit = data =>{
        setError(null); 
        setRequireAuth(true)
    }
    
    const ToWords = (e) => {
        document.getElementById('words').innerHTML = (convertTowords((e.target.value!==''?parseInt(e.target.value):0)));
    }

    if (paymentDone.flag){
        return <>
                <h3>Payment Successfull</h3><br /><br />
                <span>Amount: </span>{paymentDone.amt} <br /><br />
                <span>To: </span>{paymentDone.to_upi} <br /><br />
                <span>Transaction Id: </span>{paymentDone.trans_id} <br /><br />
                <input type="button" value="Ok" onClick={()=>{setValue("pin","");setPaymentDone({flag: false, amt: null, to_upi: null, trans_id: null});setRequireAuth(false);reset({})}} />
               </>
    }

    if (processing) return <h3>Processing</h3>;

    return (
        <div>
            <h1>UPI</h1>
            {(requireAuth)?
            <>
                <h3>Enter UPI </h3>
                <form className="pinForm" id="pinForm" onSubmit={handleSubmit(onPay)}>
                <input type="password" maxLength='4' autoComplete="new-password" onKeyPress={(event) => {if (!(RegExp('[0-9]').test(event.key))) {event.preventDefault();}}} {...register("pin") } />
                <input type="submit" value="Pay" />
                <input type="button" value="Cancel" onClick={()=>{setValue("pin","");setRequireAuth(false);}} />
                </form>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            </>
            :
            <>
            <form className="upiForm" onSubmit={handleSubmit(onSubmit)}>
                <label>Enter Recipient's UPI id: <input type="text" {...register("upiId", { pattern: RegExp('[A-Za-z0-9]@[a-zA-Z]') })} /></label>
                <label >Enter the amount: <input type="number" onInput={ToWords} {...register("amt", { min: 1, max: 1000000}) } /></label><span id="words"></span>
                <input type="submit" value="Proceed" />
            </form>
            </> 
            }  
        </div>
    )
}
export default Upi;