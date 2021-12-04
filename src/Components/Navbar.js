import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './navbar.css'
export default function Navbar({soc: socket, ...props}) {

  useEffect(() => {
    socket.on("payment_notification",(data) => {
      let msg = document.createElement('div');
      msg.setAttribute("id", data.transaction_id);
      msg.classList.add("message");  
      msg.innerHTML = `${data.from_name} paid you ${data.amt}`;
      document.getElementById('message_list').appendChild(msg);
      setTimeout(() => {
        document.getElementById(data.transaction_id).remove();
      }, 3000);
      console.log(data)
    })
  }, [socket]);
    return (
        <div>
          <div id="message_list"></div>
            <div className="header">
          {(props.auth)?
          <>
          <Link className="link" to='/dashboard'>
          <div className="homeTab">
              Home
            </div>
            </Link>
            <div className="transferTab">
            Transfers
            <div className="transferItems">
            <Link className="link" to='/upi'>
            <p className="item">UPI</p>
             </Link>
            <Link className="link" to='/neftrtgs'>
            <p className="item">NEFT/RTGS</p>
             </Link>
            </div>
            </div>
            <Link className="link" to='/transactions'>
            <div className="transacTab">
            Transactions
            </div>
            </Link>
            <Link className="link" to='/edit'>
            <div className="editTab">
            Edit Account
            </div>
            </Link>
            </>
          :
            <>
            <Link className="link" to='/home'>
            <div className="homeTab">
              Home
            </div>
            </Link>
            <Link className="link" to='/invest'>
            <div className="investTab">
            Investments
            </div>
            </Link>
            <Link className="link" to='/insure'>
            <div className="insureTab">
            Insurance
            </div>
            </Link>
            <Link className="link" to='/login'>
            <div className="loginTab">
            Login
            </div>
            </Link>
            </>
            }
    
          </div>
        </div>
    )
}
