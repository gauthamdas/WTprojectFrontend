import React from 'react'
import './footer.css'
export default function Footer(props) {

    return (
        <div style={{position:"absolute", top:"1300px"}}>
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>IMPORTANT NOTE:- </h6>PES Bank never asks for your user id / password / pin no. through phone call / SMSes / e-mails. Any such phone call / SMSes / e-mails asking you to reveal credential or OTP through SMS could be attempt to withdraw money from your account.NEVER share these details to anyone. PES Bank wants you to be secure <br/>
            </div>
            <h6>ABOUT Us:- </h6><p className="text-justify">PES BANK (PSBK) , is an Indian Public Sector Banking and Financial services statutory body headquartered in PES University. The legacy of over 25 years, accredits PES Bank as the most trusted Bank by Indians in recent times.<br/>
        PES Bank with 1/10th market share, serves over 2 lakh customers through its vast network of over 220 branches, 62 ATMs/ADWMs, with an undeterred focus on innovation, and customer centricity, which stems from the core values of the Bank - Service, Transparency, Ethics, Politeness and Sustainability.<br/>
        The Bank has successfully diversified businesses through its various subsidiaries PES Insurance,PES invest(PEStock) etc. It has spread its presence all around Bangalore<br/>Growing with times, PES Bank continues to redefine banking in India, as it aims to offer responsible and sustainable Banking solutions..</p>

        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by WTProj Communications
            </p>
          </div>
        </div>
      </div>
</footer>
        
        </div>
    )
}
