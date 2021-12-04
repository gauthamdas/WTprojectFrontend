import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './neftrtgs.css';

const convertTowords = require('convert-rupees-into-words')

function NeftRtgs() {
    const [requireAuth, setRequireAuth] = useState(false)
    // const [processing, setProcessing] = useState(false)
    const { register, handleSubmit, setValue } = useForm({defaultValues: {pin: ''}});

    const onPay = data =>{ 
        console.log(data);
    }

    const onSubmit = data =>{ 
        setRequireAuth(true)
        console.log(data);
    }
    
    const ToWords = (e) => {
        document.getElementById('words').innerHTML = (convertTowords((e.target.value!==''?parseInt(e.target.value):0)));
    }

    return (
        <div>
            <h1>NEFT/RTGS</h1>
            {(requireAuth)?
            <>
                <h3>Enter Transaction Password : </h3>
                <form className="passForm" id="passForm" onSubmit={handleSubmit(onPay)}>
                <input type="password"  {...register("pass") } />
                <input type="submit" value="Pay" />
                <input type="button" value="Cancel" onClick={()=>{setValue("pass","");setRequireAuth(false);}} />
                </form>
            </>
            :
            <>
            <form className="nRForm" onSubmit={handleSubmit(onSubmit)}>
                <label>Enter Recipient A/c number: <input type="text" pattern="[0-9]{3}" onKeyPress={(event) => {if (!(RegExp('[0-9]').test(event.key))) {event.preventDefault();}}} {...register("acNum")} /></label>
                <label>IFSC: <input type="text" {...register("ifsc", { pattern: RegExp('([A-Z]{4}[0-9][A-Z]{6})*') })} /></label>
                <label >Enter the amount: <input type="number" onInput={ToWords} {...register("amt", { min: 1, max: 1000000}) } /></label><span id="words"></span>
                <input type="submit" value="Proceed" />
            </form>
            </> 
            }  
        </div>
    )
}

export default NeftRtgs;
