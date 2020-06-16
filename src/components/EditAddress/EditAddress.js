import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Button,FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Header from '../Header/Header';
import { editCustomerAddress } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import FormHelperText from "@material-ui/core/FormHelperText";

export class EditAddress extends Component {
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

    // Handler for onClick for editing address
    editHandler = async (e) => {

        e.preventDefault();
        const address1 = this.state.address;
        const pincode = this.state.pincode;
        const city = this.state.city;
        const state = this.state.state;
        const country = this.state.country;

        if (pincode.length !== 6 || isNaN(pincode)) {
            this.setState({
                pincodeErrorMessage: 'Pincode should be exact 6 numeric digits'
            })
        }

        else {
            this.setState({
                pincodeErrorMessage: ''
            })
            const userAddress = localStorage.getItem('editAddress');
            const address = JSON.parse(userAddress);
            const userData = {
                'address_id': `${address.address_id}`,
                'address': `${address1 ? address1:address.address}`,
                'pincode': `${pincode ? pincode:address.pincode}`,
                'city': `${city?city:address.city}`,
                'state': `${state?state:address.state}`,
                'country': `${country?country:state.country}`
            }
            await editCustomerAddress(userData)
                .then(res => {
                    sweetalert2.fire({
                        "title": 'Address edited successfully',
                        'text': 'Congratulations, your address has been edited',
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

    componentWillUnmount() {
        localStorage.removeItem('editAddress')
    }

    handleChangeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        const data1 = localStorage.getItem('loginUserData')
        const userData = JSON.parse(data1);


        const userAddress = localStorage.getItem('editAddress');
        console.log('userAddress in editAddress', userAddress);
        const address = JSON.parse(userAddress);

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


                                    <div>
                                        {/* <div className="container" style={{ border: "1px solid grey", borderRadius: "7%" }}>
                                            <form>
                                                <div className="form-group mt-3">
                                                    <label className="lead"> Enter Address</label>
                                                    <input type="text" className="form-control" defaultValue={address.address} onChange={(e) => { this.setState({ address: e.target.value }) }} />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="lead"> Enter Pincode</label>
                                                    <input type="text" className="form-control" defaultValue={address.pincode} onChange={(e) => { this.setState({ pincode: e.target.value }) }} />
                                                    <span className="text-danger">{this.state.pincodeErrorMessage}</span>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="lead"> Enter City Name</label>
                                                    <input tpye='text' className="form-control" defaultValue={address.city} onChange={(e) => { this.setState({ city: e.target.value }) }} />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="lead"> Enter State</label>
                                                    <input type='text' className="form-control" defaultValue={address.state} onChange={(e) => { this.setState({ state: e.target.value }) }} />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="lead"> Enter Country</label>
                                                    <input type='text' className="form-control" defaultValue={address.country} onChange={(e) => { this.setState({ country: e.target.value }) }} />
                                                </div>
                                                <div className="form-group mt-3 mb-3">
                                                    <button className="btn btn-primary" onClick={this.editHandler}>Edit</button>
                                                </div>
                                            </form>
                                        </div> */}

                                        <div className="container card ">
                                            <h3 className="mt-2">Edit Address</h3>
                                            <FormControl className="mb-3 mt-3" variant="outlined" onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                                <span>Address</span>
                                                <textarea className="form-control"
                                                    id="outlined-adornment-email"
                                                    type="text"
                                                    name="address"
                                                    autoComplete="off"
                                                    defaultValue={address.address}
                                                    onChange={this.handleChangeInput}
                                                    labelWidth={70}
                                                />
                                                <FormHelperText id="component-error-text">Max 100 characters</FormHelperText>
                                            </FormControl>

                                            <FormControl className="mb-3" variant="outlined" error={this.state.lastNameErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                                <span>Pincode</span>
                                                <input className="form-control"
                                                    id="outlined-adornment-email"
                                                    type="text"
                                                    name="pincode"
                                                    autoComplete="off"
                                                    defaultValue={address.pincode}
                                                    onChange={this.handleChangeInput}
                                                    labelWidth={100}
                                                />
                                                <FormHelperText id="component-error-text">{this.state.pincodeErrorMessage}</FormHelperText>
                                            </FormControl>


                                            <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                                <span>City</span>
                                                <input className="form-control"
                                                    id="outlined-adornment-password"
                                                    type="text"
                                                    name="city"
                                                    defaultValue={address.city}
                                                    onChange={this.handleChangeInput}
                                                    labelWidth={150}
                                                />
                                                <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>

                                            </FormControl>

                                            <FormControl className="mb-3" variant="outlined" error={this.state.emailErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                                <span>State</span>
                                                <input className="form-control"
                                                    id="outlined-adornment-email"
                                                    type="text"
                                                    name="state"
                                                    defaultValue={address.state}
                                                    onChange={this.handleChangeInput}
                                                    labelWidth={100}
                                                />
                                                <FormHelperText id="component-error-text">{this.state.emailErrorText}</FormHelperText>

                                            </FormControl>


                                            <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                                <span>Country</span>
                                                <input className="form-control"
                                                    id="outlined-adornment-password"
                                                    type="text"
                                                    name="country"
                                                    defaultValue={address.country}
                                                    onChange={this.handleChangeInput}
                                                    labelWidth={150}
                                                />
                                                <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>
                                                <button className="btn btn-info mt-3" disabled={this.state.disabled} onClick={this.editHandler}>Save</button>

                                            </FormControl>


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

export default EditAddress
