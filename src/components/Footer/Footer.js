import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {URL} from '../../api/api';
import { CircularProgress } from '@material-ui/core';
export class Footer extends Component {
    constructor(props){
        super(props);
        this.state={
            
            footerData:[]
        
        }
    }

    // Getting footer data on component mount
    componentDidMount(){
        axios.get(`${URL}getData`)
        .then(res=>{
            this.setState({
                footerData:res.data.company_details
            })
            
        })
        .catch(err=>{
            alert(`Error: ${err}`)
        })
    }

    emailChangeHandler=()=>{

    }

    subscribeHandler=()=>{

    }
    
    // Below Handler for opening terms and conditions in blank tab
    termsAndConditions=async (e)=>{
        await axios.get(`${URL}getTermsAndConditions`)
            .then(res=>{
                window.open(`${URL}${res.data.termsAndConditions_details[0].fileName}`,'_blank')
            }).catch(err=>{
                alert('invoice error ',err);
                
            })
    }

    // Below handler for opening guarentee details in blank tab
    guarentee=async (e)=>{
        await axios.get(`${URL}getGuarantee`)
            .then(res=>{
                window.open(`${URL}${res.data.guarantee_details[0].fileName}`,'_blank')
            }).catch(err=>{
                alert('invoice error ',err);
                
            })
    }

    render() {
        return (
            <div>
                {this.state.footerData.length? <footer style={{backgroundColor:"black",right:"0",left:"0",bottom:"0"}}>
                    <div className="row text-center" style={{ color: "white" }}>
                        <div className="col-lg-4" style={{marginTop:"3%"}}>
                            <h4>ABOUT COMPANY</h4>
                            <br/>
                            <p>{this.state.footerData[0].about_company}</p>
                            <p>Contact Information</p>
                            <p>Email: {this.state.footerData[0].email}</p>
                            <p>Phone: {this.state.footerData[0].phone_no}</p>
                            <p>{this.state.footerData[0].address}</p>
                        </div>
                        <div className="col-lg-4"style={{marginTop:"3%"}}>
                            <h4>INFORMATION</h4>
                            <br/>
                            <button className="btn" onClick={e=>this.termsAndConditions(e)} style={{textDecoration:"none",color:"white"}}>Terms and conditions</button><br/>
                            <button className="btn" onClick={e=>this.guarentee(e)}  style={{textDecoration:"none",color:"white"}}>Guarantee and Return Policy</button><br/>
                            <Link to="/contactForm" style={{textDecoration:"none",color:"white"}}>Contact Us</Link><br/>
                            <Link to='/' style={{textDecoration:"none",color:"white"}}>Privacy Policy</Link><br/>
                            <Link to='/' style={{textDecoration:"none",color:"white"}}>Locate Us</Link>
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
                </footer>:<CircularProgress color="inherit"/>}
            </div>
        )
    }
}

export default Footer
