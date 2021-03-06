import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Header from '../Header/Header';
import { addCustomerAddress } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import {
    FormControl,
    
} from '@material-ui/core';
import FormHelperText from "@material-ui/core/FormHelperText";

export class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            pincode: '',
            city: '',
            state: '',
            country: '',
            pincodeErrorMessage: ''
        }
    }

    handleChangeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    resetForm=()=>{
        this.setState({
            address:'',
            pincode:'',
            city:'',
            state:'',
            country:''

        })
    }

    // Submit Handler for onClick Event
    submitHandler = async (e) => {
        e.preventDefault();
        const address = this.state.address;
        const pincode = this.state.pincode;
        const city = this.state.city;
        const state = this.state.state;
        const country = this.state.country;

        if (address !== '' && pincode !== '' && city !== '' && state !== '' && country !== '') {
            if (pincode.length !== 6 || isNaN(pincode)) {
                this.setState({
                    pincodeErrorMessage: 'Pincode should be exact 6 numeric digits'
                })
            }

            else {
                this.setState({
                    pincodeErrorMessage: ''
                })
                const userData = {
                    'address': `${address}`,
                    'pincode': `${pincode}`,
                    'city': `${city}`,
                    'state': `${state}`,
                    'country': `${country}`
                }
                await addCustomerAddress(userData)
                    .then(res => {
                        sweetalert2.fire({
                            "title": 'Address added successfully',
                            'text': 'Congratulations, your address has been added',
                            "icon": 'success'
                        })
                        this.props.history.push('/address');

                    }).catch(err => {
                        sweetalert2.fire({
                            "title": 'OOPS, Error occured',
                            'text': `Please check the Error :- ${err}`,
                            "icon": 'error'
                        })
                    })
            }
        }
        else {
            sweetalert2.fire({
                'title': 'OOPS..... Some error occured',
                'text': 'Please enter all the fields',
                'icon': 'warning'
            })
        }
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


                                    {/* <div>
                                    <div className="container" style={{border:"1px solid grey",borderRadius:"7%"}}>
                                        <form>
                                        <div className="form-group mt-3">
                                                <label className="lead"> Enter Address</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({address:e.target.value})}}/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="lead"> Enter Pincode</label>
                                                <input className="form-control" onChange={(e)=>{this.setState({pincode:e.target.value})}}/>
                                                <span className="text-danger">{this.state.pincodeErrorMessage}</span>
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
                                </div>     */}


                                    {/* ---------------------------------------- */}
                                    <div className="container card ">
                                        <h3 className="mt-2">Add Address</h3>
                                        <FormControl className="mb-3 mt-3" variant="outlined" onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                            <label>Address</label>
                                            <textarea className="form-control"
                                                id="outlined-adornment-email"
                                                type="text"
                                                name="address"
                                                autoComplete="off"
                                                placeholder="Enter full address"
                                                onChange={this.handleChangeInput}
                                                labelWidth={70}
                                            />
                                            <FormHelperText id="component-error-text">Max 100 characters</FormHelperText>
                                        </FormControl>

                                        <FormControl className="mb-3" variant="outlined" error={this.state.lastNameErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                            <label>Pincode</label>
                                            <input className="form-control"
                                                id="outlined-adornment-email"
                                                type="text"
                                                name="pincode"
                                                autoComplete="off"
                                                placeholder="Enter pincode"
                                                onChange={this.handleChangeInput}
                                                labelWidth={100}
                                            />
                                            <FormHelperText id="component-error-text">{this.state.pincodeErrorMessage}</FormHelperText>
                                        </FormControl>

                                        
                                        <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                            <label>City</label>
                                            <input className="form-control"
                                                id="outlined-adornment-password"
                                                type="text"
                                                name="city"
                                                placeholder="Enter your city name"
                                                onChange={this.handleChangeInput}
                                                labelWidth={150}
                                            />
                                            <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>

                                        </FormControl>

                                        <FormControl className="mb-3" variant="outlined" error={this.state.emailErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                            <label>State</label>
                                            <input className="form-control"
                                                id="outlined-adornment-email"
                                                type="text"
                                                name="state"
                                                placeholder="Enter your state"
                                                onChange={this.handleChangeInput}
                                                labelWidth={100}
                                            />
                                            <FormHelperText id="component-error-text">{this.state.emailErrorText}</FormHelperText>
                                            
                                        </FormControl>


                                        <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                            <label>Country</label>
                                            <input className="form-control"
                                                id="outlined-adornment-password"
                                                type="text"
                                                name="country"
                                                placeholder="Enter your Country"
                                                onChange={this.handleChangeInput}
                                                labelWidth={150}
                                            />
                                            <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>
                                            <button className="btn btn-info mt-3" disabled={this.state.disabled} onClick={this.submitHandler}>Save</button>
                                            
                                        </FormControl>


                                    </div>
                                    {/* --------------------------------------------- */}


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

export default AddAddress
