import React from 'react'
import axios from 'axios';
import './signup.css'
export default function Signup() {
  const handleSubmit = (data)=>{
    data.preventDefault();
    console.log(data.target.old.value, data.target.new.value)
    axios.post(`${process.env.REACT_APP_HOST}/changepass`, {old: data.target.old.value, new: data.target.new.value}).then(response => {
      alert('Password Changed');
    }).catch(error => {
      alert('invalid password')
    });
  }
    return (
        <div>
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>
            Old password<input type="password" name="old"/><br/>
            New password<input type="password" name="new"/>
            <button type="submit" >Change</button>
          </form>
        </div> 
    )
}
