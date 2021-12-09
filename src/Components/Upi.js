import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getToken } from '../Utils/Common';
import './upi.css';
import logo from './PES bank.png'
import qr from './qr.jpg';
import upi from './upi.jpg'
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
        axios.post(`${process.env.REACT_APP_HOST}/upi/payment`, {token: getToken(), upi_id: data.upiId, upi_pin: data.pin, amt: data.amt}).then(response => {
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
                <div>
            <div className="wrapperAlert">

  <div className="contentAlert">

    <div className="topHalf">

      <span><svg viewBox="0 0 512 512" className="mark" width="100" title="check-circle">
        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
        </svg></span>
      <h1 className="h">Payment Successfull</h1>
                <span className="det">Amount: </span>{paymentDone.amt} <br/>
                <span className="det">To: </span>{paymentDone.to_upi} <br/>
                <span className="det">Txn ID: </span>{paymentDone.trans_id} <br/>      

</div>
        </div></div>
                <input type="button" value="Ok" onClick={()=>{setValue("t_pass","");setPaymentDone({flag: false, amt: null, to_ac: null, trans_id: null});setRequireAuth(false);reset({})}} />
        </div>
               </>
    }

    if (processing) return <h3>Processing</h3>;
    console.log(requireAuth)
    return (
        <div>
            <img src={logo} alt='no img' style={{zIndex: "1",position:"absolute",left:"40px",top:"50px",width: "250px",height: "100px"}}/>
            <div style={{position:"absolute",left:"40px",top:"150px"}}>
            <img src={upi} alt='no img ' style={{zIndex: "0",position:"absolute",left:"250px",top:"-110px",width: "250px",height: "130px"}}/>
            <img src={qr} alt='no img ' style={{zIndex: "0",position:"absolute",left:"800px",top:"50px",width: "300px",height: "300px"}}/>
            <div style={{fontSize:"20px",fontWeight:"60",top:"160px",left:"1100px",zIndex:2,position:"absolute"}}>Your QR code</div>
            <h1>UPI</h1>
            {(requireAuth)?
            <>
                <form className="pinForm" id="pinForm" onSubmit={handleSubmit(onPay)}>
                <label>Enter UPI Pin</label>
                <input type="password" maxLength='4' autoComplete="new-password" onKeyPress={(event) => {if (!(RegExp('[0-9]').test(event.key))) {event.preventDefault();}}} {...register("pin") } />
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                <input type="submit" className="payU" value="Pay" />
                <input type="button" className="cancleU" value="Cancel" onClick={()=>{setValue("pin","");setRequireAuth(false);}} />
                </form>
            </>
            :
            <>
            <form className="upiForm" onSubmit={handleSubmit(onSubmit)}>
                <label >Enter Recipient's UPI id: <input type="text" className="inputCont"{...register("upiId", { pattern: RegExp('[A-Za-z0-9]@[a-zA-Z]') })} /></label>
                <label >Enter the amount: <input type="number" className="inputCont" onInput={ToWords} {...register("amt", { min: 1, max: 1000000}) } /></label><span id="words"></span>
                <input type="submit" className="proU" value="Proceed" />
            </form>
            </> 
            }  
            </div>
        </div>
    )
}
export default Upi;