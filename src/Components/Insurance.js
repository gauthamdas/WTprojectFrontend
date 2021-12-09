import React from 'react';
import ip from './insurance.png';
function Insurance() {
  return (
    <div>
        <div style={{fontSize:"50px",fontWeight:"bold",top:"270px",left:"40px",zIndex:200, position: "absolute"}}>We,at PES BANK offer 3 kinds of insurance:- <br /></div>
        <div style={{fontSize:"20px",fontWeight:"600",top:"400px",left:"40px",zIndex:200, position: "absolute"}}>1.Family Health Insurance<br />
        2.Domestic Vehicle Insurance<br />
        3.Property Insurance<br /><br /><br /></div>
        <div style={{fontSize:"20px",fontWeight:"60",top:"700px",left:"420px",zIndex:200, position: "absolute"}}>Keep checking this section for more updates...</div>
        <img  src={ip} alt='sdf' style={{zIndex: "0",width: "1260px",height:"700px"}} />
    </div>
  );
}
export default Insurance;