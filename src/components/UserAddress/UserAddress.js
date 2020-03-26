import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import UserProfile from '../UserProfile/UserProfile';
import Header from '../Header/Header';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getCustomerAddress } from '../../api/api';
import sweetalert2 from 'sweetalert2';

export class OrderPage extends Component {
    constructor(props){
        super(props);
        this.state={
            userAddress:[],
            
        }
    }
    async componentDidMount(){
        const result=await getCustomerAddress()
        .then(res=>{
            this.setState({
                userAddress:res.data[0].customer_address,
                
            })
            
        }).catch(err=>{
            sweetalert2.fire({
                'title':'Error in getting Address Api',
                'text':`${err}`,
                'icon':'error'
            })
        })
    }

    deleteHandler=(id)=>{

    }
    render() {
        const data1 = localStorage.getItem('loginUserData')
        const userData = JSON.parse(data1);

        return (
            <div>

                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                {userData ?
                    <div className="container m-4">
                        <div className="row">
                            <div className="col-12">
                                <h1>My Account</h1>
                            </div>


                        </div><hr />
                        <div className="row">
                            <div className="col-6 text-center">
                                <img src={userIcon} alt="userIcon" height="30%" style={{ borderRadius: "100%" }} />
                                <h4 className="text-danger mt-2">{userData.customer_details.first_name} {userData.customer_details.last_name}</h4>
                                <div className="mb-2"><Link to="/order"><Button variant="outlined" fullWidth><ReorderIcon /> &nbsp;Order</Button></Link></div>
                                <div className="mb-2"><Link to="/profile"><Button variant="outlined" fullWidth><PersonIcon /> &nbsp; Profile</Button></Link></div>
                                <div className="mb-2"><Link to="/address"><Button variant="outlined" fullWidth><MenuBookIcon /> &nbsp; Addresses</Button></Link></div>
                                <div className="mb-2"><Link to="/changePassword"><Button variant="outlined" fullWidth><SyncAltIcon /> &nbsp; Change Password</Button></Link></div>
                            </div>
                            <div className="col-6 mt-2">

                                <div className="container">

                                    <div className="mt-4 mb-4" style={{ border: "1px groove", borderRadius: "5px" }}>
                                        <div className="card-header"><h2>Addresses</h2></div>
                                        {this.state.userAddress ? this.state.userAddress.map(el=>{return              <div className="">
                                            <div className=" card-body m-2" style={{ border: "1px groove", borderRadius: "5px" }}>
                                                <div className="row m-1">
                                                    <div className="col-11">
                                                        <span className="add">{el.address}
                                                        </span>
                                                    </div>
                                                    <div className="col-1">
                                                        <div onClick={this.deleteHandler()}><DeleteForeverIcon /></div>
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="col-11">
                                                        <span className="city">{el.city}</span> <span className="pincode">{el.pincode}</span>
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="col-11">
                                                        <span className="state">{el.state}</span> <span className="country">{el.country}</span>
                                                    </div>

                                                </div>
                                                <div className="row m-1">
                                                    <div className="col-11">
                                                        <div className="btn btn-primary px-3">Edit</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>}):<div className="text-center">
                                                <CircularProgress color="inherit"/>
                                            </div>}
                                        <div className="col-12 mb-2">
                                            <Link to="/addAddress" className="btn btn-light">Add Address</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div> : <div>
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
