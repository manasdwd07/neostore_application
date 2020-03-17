import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import UserProfile from '../UserProfile/UserProfile';

export class OrderPage extends Component {
    
    render() {
        const data1=localStorage.getItem('loginUserData')
        const userData=JSON.parse(data1);
        
        return (
            <div>
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
                            
                            <div className="container card">
                                {console.log("Cart Count",userData.cart_count)}
                                {userData.cart_count<=0 ? 
                            <div>
                                Sorry there are no items in your cart
                                </div>:
                                <div>
                                    <p>Your orders are :</p>
                                </div>}    
                            
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderPage