import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getToken } from '../Utils/Common';
import logo from './PES bank.png'
import './neftrtgs.css';
require('dotenv').config();

const convertTowords = require('convert-rupees-into-words')

function NeftRtgs() {
    const [paymentDone, setPaymentDone] = useState({flag: false, amt: null, to_ac: null, trans_id: null})
    const [requireAuth, setRequireAuth] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null);
    const { register, handleSubmit, setValue, reset} = useForm({defaultValues: {t_pass: ''}});

    const onPay = data =>{ 
        setError(null);
        setProcessing(true);
        axios.post(`${process.env.REACT_APP_HOST}/neftrtgs/payment`, {token: getToken(), ac_num: data.acNum, t_pass: data.t_pass, amt: data.amt}).then(response => {
          setProcessing(false); 
          setPaymentDone({flag: response.data.flag, amt: response.data.amt, to_ac: response.data.to_ac, trans_id: response.data.transId})
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
    console.log(requireAuth,'l')
    return (
        <div>
            <img src={logo} alt='no img' style={{zIndex: "1",position:"absolute",left:"40px",top:"50px",width: "250px",height: "100px"}}/>
            <h1 style={{marginTop:"100px"}}>NEFT/RTGS</h1>
            {(requireAuth)?
            <>
                
                <form className="passForm" id="passForm" onSubmit={handleSubmit(onPay)}>
                <label>Enter Transaction Password : </label>
                <input type="password" className="Tpass"  {...register("t_pass") } />
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                <input type="submit" className="payN" value="Pay" />
                <input type="button" className="cancleN" value="Cancel" onClick={()=>{console.log('r');setValue("t_pass","");setRequireAuth(false);}} />
                </form >
            </>
            :
            <>
            <form className="nRForm" onSubmit={handleSubmit(onSubmit)}>
                <label>Enter Recipient A/c number: <input type="text" pattern="[0-9]{6}" onKeyPress={(event) => {if (!(RegExp('[0-9]').test(event.key))) {event.preventDefault();}}} {...register("acNum")} /></label>
                <label>IFSC: <input type="text" {...register("ifsc", { pattern: RegExp('.+') })} /></label>
                <label >Enter the amount: <input type="number" onInput={ToWords} {...register("amt", { min: 1, max: 1000000}) } /></label><span id="words"></span>
                <input type="submit" className="proN" value="Proceed" />
            </form>
            </> 
            }  
        </div>
    )
}

export default NeftRtgs;
