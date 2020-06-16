import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Button } from '@material-ui/core';
import { Link ,Redirect} from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Header from '../Header/Header';
import {getProfileData} from '../../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';



export class OrderPage extends Component {
    constructor(props){
        super(props);
        this.state={
            userData:{},
            profileImage:''
        }
    }   


    // For getting user profile data on component mount
   async componentDidMount(){
         await getProfileData()
        .then((res)=>{
        
            this.setState({
                userData:res.data.customer_proile,
                profileImage:res.data.customer_proile.profile_img
            })
        })
        
    }

    render() {
        if  (!localStorage.getItem('loginUserData')){return <Redirect to="/login"/>}

        return (
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="container m-4">
                    <div className="row">
                        <div className="col-12">
                            <h1>My Account</h1>
                        </div>


                    </div><hr />
                    {this.state.userData.first_name?
                    <div className="row">
                        <div className="col-6 text-center">
                            <img src={userIcon} alt="userIcon" height="30%" style={{ borderRadius: "100%" }} />
                            <h4 className="text-danger mt-2">{this.state.userData.first_name} {this.state.userData.last_name}</h4>
                            <div className="mb-2"><Link to ="/order"><Button variant="outlined" fullWidth><ReorderIcon /> &nbsp;Order</Button></Link></div>
                            <div className="mb-2"><Link to ="/profile"><Button variant="outlined" fullWidth><PersonIcon /> &nbsp; Profile</Button></Link></div>
                            <div className="mb-2"><Link to ="/address"><Button variant="outlined" fullWidth><MenuBookIcon /> &nbsp; Addresses</Button></Link></div>
                            <div className="mb-2"><Link to="/changePassword"><Button variant="outlined" fullWidth><SyncAltIcon /> &nbsp; Change Password</Button></Link></div>
                        </div>
                        <div className="col-6 mt-2">

                            <div className="container card">
                                <div className="col-12">
                                    <h2 className="mb-5">Profile</h2>
                                    <hr />
                                    <div className="row mb-4 mt-5">
                                        <div className="col-4 mt-4 mb-4">
                                            <p className="font-weight-bolder">First Name</p>
                                            <p className="font-weight-bolder">Last Name</p>
                                            <p className="font-weight-bolder">Gender</p>
                                            <p className="font-weight-bolder">Date Of Birth</p>
                                            <p className="font-weight-bolder">Mobile Number</p>
                                            <p className="font-weight-bolder">Email</p>

                                        </div>
                                        <div className='col-2'></div>
                                        <div className="col-6 mt-4 mb-4">
                                            <p>{this.state.userData.first_name}</p>
                                            <p>{this.state.userData.last_name}</p>
                                            <p>{this.state.userData.gender}</p>
                                            <p>{this.state.userData.dob ? moment(this.state.userData.dob).subtract(10, 'days').calendar() :'not yet added'}</p>
                                            <p>{this.state.userData.phone_no}</p>
                                            <p>{this.state.userData.email}</p>
                                            <hr/>
                                            <Link to="/editProfile" className="btn"><EditIcon/>&nbsp;Edit</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>:<div className="row container text-center"><CircularProgress className="text-center" color="primary"/></div>}
                </div>
            </div>
        )
    }
}

export default OrderPage
