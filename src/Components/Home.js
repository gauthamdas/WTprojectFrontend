import React from 'react';
import hp from './1626096258626.png';
import ps from './plst.png';
import as from './apst.png';
import logo from './PES bank.png'
function Home() {
  return (
    <div>
    <img src={logo} alt='no img'style={{zIndex: "1",position:"absolute",left:"40px",top:"50px",width: "250px",height: "100px"}}/>
        <div style={{fontSize:"50px",fontWeight:"bold",top:"170px",left:"40px",zIndex:2, position: "absolute"}} >India's fastest growing<br/>MultiPurpose Bank <br/></div>
        <div style={{fontSize:"20px",fontWeight:"600",top:"400px",left:"40px",zIndex:2, position: "absolute"}}>Open a savings account,recharge & pay bills,<br/>tickets,invest in stocks &<br/>
         mutual funds, and do a lot more via our App.</div>
         <div style={{fontSize:"20px",fontWeight:"600",top:"700px",left:"40px",zIndex:2, position: "absolute"}}>Download our app on Android or iOS</div>
         <img src={ps} alt='no img'style={{zIndex: "1",position:"absolute",left:"40px",top:"650px",width: "150px",height: "50px"}}/>
         <img src={as} alt='no img'style={{zIndex: "1",position:"absolute",left:"220px",top:"650px",width: "160px",height: "50px"}}/>
        <img src={hp} alt='no img'style={{zIndex: "1",position:"absolute",left:"760px",top:"120px",width: "40%",height: "500px"}}/>
    </div>
  );
}
export default Home;