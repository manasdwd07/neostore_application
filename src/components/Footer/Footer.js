import React, { Component } from 'react';

import {Link,BrowserRouter} from 'react-router-dom';
export class Footer extends Component {
    constructor(props){
        super(props);
    }

    emailChangeHandler=()=>{

    }

    subscribeHandler=()=>{

    }

    render() {
        return (
            <div>
                <footer style={{backgroundColor:"black",right:"0",left:"0",bottom:"0"}}>
                    <div className="row text-center" style={{ color: "white" }}>
                        <div className="col-lg-4" style={{marginTop:"3%"}}>
                            <h4>ABOUT COMPANY</h4>
                            <br/>
                            <p>NeoSOFT Technologies is here at your quick and easy service for shopping.</p>
                            <p>Contact Information</p>
                            <p>Email: contact@neosofttech.com</p>
                            <p>Phone: +91 0000000000</p>
                            <p>MUMBAI, INDIA</p>
                        </div>
                        <div className="col-lg-4"style={{marginTop:"3%"}}>
                            <h4>INFORMATION</h4>
                            <br/>
                            <a href="http://180.149.241.208:3022/2019-06-28T06-10-29.263ZTerms_and_Conditions.pdf" target="_blank" style={{textDecoration:"none",color:"white"}}>Terms and conditions</a><br/>
                            <a href="http://180.149.241.208:3022/2019-06-28T06-11-38.277ZGuarantee_ReturnPolicy.pdf" target="_blank" style={{textDecoration:"none",color:"white"}}>Guarantee and Return Policy</a><br/>
                            <Link to="/contactForm" style={{textDecoration:"none",color:"white"}}>Contact Us</Link><br/>
                            <a href="#" style={{textDecoration:"none",color:"white"}}>Privacy Policy</a><br/>
                            <a href="#" style={{textDecoration:"none",color:"white"}}>Locate Us</a>
                        </div>
                        <div className="col-lg-4 text-center"style={{marginTop:"3%"}}>
                            <h4>NEWSLETTER</h4>
                            <br/>
                            <p>Sign up to get exclusive offer from our favorite brands and to be well up in the news</p>
                            <input type="email" placeholder="your email id.." onChange={this.emailChangeHandler}/><br/><br/>
                            <button className="btn bg-white" onClick={this.subscribeHandler}>Subscribe</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <pre className="text-center" style={{color:"grey"}}>Copyright 2020 NeoSOFT Technologies All rights reserved | Design By Manas Dwivedi | @manasdwd07</pre>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer
