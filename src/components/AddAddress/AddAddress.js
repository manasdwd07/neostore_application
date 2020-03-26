import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import UserProfile from '../UserProfile/UserProfile';
import Header from '../Header/Header';
import { addCustomerAddress } from '../../api/api';
import sweetalert2 from 'sweetalert2';

export class OrderPage extends Component {
    constructor(props){
        super(props);
        this.state={
            address:'',
            pincode:'',
            city:'',
            state:'',
            country:''
        }
    }
    submitHandler=async(e)=>{
        e.preventDefault();
        // const [address,pincode,city,state,country]=this.state
        const address=this.state.address;
        const pincode=this.state.pincode;
        const city=this.state.city;
        const state=this.state.state;
        const country=this.state.country;
        
        if(address!==''&&pincode!==''&&city!==''&&state!==''&&country!==''){
            const userData={
                'address':`${address}`,
                'pincode':`${pincode}`,
                'city':`${city}`,
                'state':`${state}`,
                'country':`${country}`
            }
            const result=await addCustomerAddress(userData)
            .then(res=>{
                sweetalert2.fire({
                    "title": 'Address added successfully',
                    'text': 'Congratulations, your address has been added',
                    "icon": 'success'
                })                

            }).catch(err=>{
                sweetalert2.fire({
                    "title": 'OOPS, Error occured',
                    'text': `Please check the Error :- ${err}`,
                    "icon": 'error'
                })
            }) 
         }
         else{
             sweetalert2.fire({
                 'title':'OOPS..... Some error occured',
                 'text':'Please enter all the fields',
                 'icon':'warning'
             })
         }
    }
    render() {
        const data1=localStorage.getItem('loginUserData')
        const userData=JSON.parse(data1);
        
        return (
            <div>
                
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                {userData ? 
                <div className="container m-4">
                    <div className="row">
                        <div className="col-12">
                            <h1>My Account</h1>
                        </div>
                        
                        
                    </div><hr/>
                    <div className="row">
                        <div className="col-6 text-center">
                            <img src={userIcon} alt="userIcon" height="30%" style={{borderRadius:"100%"}}/>
                            <h4 className="text-danger mt-2">{userData.customer_details.first_name} {userData.customer_details.last_name}</h4>
                            <div className="mb-2"><Link to="/order"><Button variant="outlined" fullWidth><ReorderIcon/> &nbsp;Order</Button></Link></div>
                            <div className="mb-2"><Link to="/profile"><Button variant="outlined" fullWidth><PersonIcon/> &nbsp; Profile</Button></Link></div>
                            <div className="mb-2"><Link to ="/address"><Button variant="outlined" fullWidth><MenuBookIcon/> &nbsp; Addresses</Button></Link></div>
                            <div className="mb-2"><Link to ="/changePassword"><Button variant="outlined" fullWidth><SyncAltIcon/> &nbsp; Change Password</Button></Link></div>
                        </div>
                        <div className="col-6 mt-2">
                            
                            <div className="container">
                                
                                {userData.cart_count==0 ? 
                            <div>
                                <div className="text-center">
                                    <h1 className="font-weight-larger mb-5">No Orders Found</h1>
                                    <Link to="/products" className="btn btn-info">Go to Product Page</Link>
                                </div>
                            </div>:
                                <div>
                                    <div className="container" style={{border:"1px solid grey",borderRadius:"7%"}}>
                                        <form>
                                        <div className="form-group mt-3">
                                                <label className="lead"> Enter Address</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({address:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="lead"> Enter Pincode</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({pincode:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="lead"> Enter City Name</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({city:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="lead"> Enter State</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({state:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="lead"> Enter Country</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({country:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3 mb-3">
                                                <button className="btn btn-primary" onClick={this.submitHandler}>Register</button> 
                                            </div>
                                        </form>
                                    </div>
                                </div>}    
                            
                                
                            </div>
                            
                        </div>
                    </div>
                </div>:<div>
                                <div className="container text-center mt-5 mb-5">
                                    <h5>Hi guest, sorry but you are not logged in..</h5>
                                    <h5>Please Login to continue to orders Page</h5>
                                    <Link to="/login" className="btn btn-warning m-4">Go to Login Page</Link>
                                </div>
                    </div>}
            </div>
        )
    }
}

export default OrderPage
