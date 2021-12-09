import React from 'react';
import logo from './PES bank.png'
import st from './stock.jpg'
function Invest() {
  return (
    <div style={{paddingTop:"20px",overflow:"hidden"}}>
    <img src={logo} alt='no img'style={{zIndex: "1",position:"absolute",left:"40px",top:"50px",width: "250px",height: "100px"}}/>
        <div style={{fontSize:"30px",fontWeight:"bold",top:"300px",left:"40px",zIndex:200, position: "absolute"}} >Investing in Stocks has never been easy.<br/>Open your Demat account today</div>
        <div style={{fontSize:"20px",fontWeight:"60",top:"700px",left:"420px",zIndex:200, position: "absolute"}}>Keep checking this section for more updates...</div>
        <img src={st} alt='no img'style={{zIndex: "1",position:"absolute",left:"630px",top:"120px",width: "630px",height: "420px"}}/>
    </div>
  );
}
export default Invest;