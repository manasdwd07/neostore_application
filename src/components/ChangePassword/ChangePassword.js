import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import userIcon from '../../assets/images/profile-placeholder.png';
import IconButton from "@material-ui/core/IconButton";
import Header from '../Header/Header';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from '@material-ui/core/FormHelperText'
import { resetPassword } from '../../api/api';
import sweetalert2 from 'sweetalert2';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            oldpassError: '',
            newPassError: '',
            confirmPasswordError: '',


        }
    }


    // Handler for onChange events
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }

    // Handler for showing and hiding password from input boxes
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleMouseDownPassword = () => {
        this.setState({
            showPassword: true
        })
    }

    // For handling old password change and errors
    handleoldpassChange = (e) => {
        if (e.target.value === '') {
            this.setState({ oldpassError: 'Please enter Old password' })
        }
        else {
            this.setState({ oldpassError: '' })
        }
    }

    // For handling new password change and errors
    handleNewPassChange = (e) => {
        const passwordFormat = /^[A-Za-z]\w{7,11}$/;
        if (e.target.value === '') {
            this.setState({ newPassError: 'Please enter new password ' })
        }
        else if (e.target.value.match(passwordFormat)) {
            this.setState({ newPassError: '' })
        }
        else {
            this.setState({ newPassError: `8-12 characters allowed` })
        }
    }

    // Handle confirm password change and errors
    handleCPassChange = (e) => {

        if (e.target.value ==='') {
            this.setState({ confirmPasswordError: 'Please enter confirm password ' })
        }
        else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ confirmPasswordError: 'Enter same as new password' })
        }
        else if (this.state.newPassword === this.state.confirmPassword) {
            this.setState({ confirmPasswordError: '' })
        }
        else {
            this.setState({ confirmPasswordError: '' })
        }
    }

    // Handler for onClick event for changing password
    submitHandler=async ()=>{
        const data={
            "oldPass":`${this.state.oldPassword}`,
            "newPass":`${this.state.newPassword}`,
            "confirmPass":`${this.state.confirmPassword}`
        }
        await resetPassword(data)
        .then(res=>{
            sweetalert2.fire({
                "title": 'Successfull',
                'text': 'Password changed successfully',
                "icon": 'success'
            })
            this.props.history.push('/profile')
        }).catch(err=>{
            sweetalert2.fire({
                "title": 'Error',
                'text': 'Some error occured',
                "icon": 'error'
            })
        })
    }

    render() {
        const data1 = localStorage.getItem('loginUserData')
        const userData = JSON.parse(data1);

        return (
            <div> <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
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

                                            <div className="text-center " style={{ border: "1px groove", borderRadius: "5px" }}>
                                                <div className="m-3"><h2>ChangePassword</h2></div>
                                                <div className="mr-3 ml-3"><hr /></div>
                                                <div class="  m-3">
                                                    
                                                    <FormControl className="formControl" variant="outlined" error={this.state.oldpassError ? true : false}
                                                        onChange={this.handleoldpassChange} onBlur={this.handleoldpassChange}>
                                                        <InputLabel htmlFor="outlined-adornment-password"> Old Password</InputLabel>
                                                        <OutlinedInput
                                                            id="password"
                                                            name="oldPassword"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                           
                                                            onChange={this.handleChange}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.handleClickShowPassword}
                                                                        onMouseDown={this.handleMouseDownPassword}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            labelWidth={110}
                                                        />
                                                        <FormHelperText id="component-error-text">{this.state.oldpassError}</FormHelperText>

                                                    </FormControl>
                                                </div>

                                                <div class=" m-3">
                                                    
                                                    <FormControl className="formControl" variant="outlined"
                                                        error={this.state.newPassError ? true : false}
                                                        onChange={this.handleNewPassChange} onBlur={this.handleNewPassChange}>
                                                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                                        <OutlinedInput
                                                            id="password"
                                                            name="newPassword"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                           
                                                            onChange={this.handleChange}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.handleClickShowPassword}
                                                                        onMouseDown={this.handleMouseDownPassword}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            labelWidth={120}
                                                        />
                                                        <FormHelperText id="component-error-text">{this.state.newPassError}</FormHelperText>

                                                    </FormControl>
                                                </div>

                                                <div class=" m-3">
                                                    
                                                    <FormControl className="formControl" variant="outlined"
                                                        error={this.state.confirmPasswordError ? true : false}
                                                        onChange={this.handleCPassChange} onBlur={this.handleCPassChange}>
                                                        <InputLabel htmlFor="outlined-adornment-password"> Confirm Password</InputLabel>
                                                        <OutlinedInput
                                                            id="password"
                                                            name="confirmPassword"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                           
                                                            onChange={this.handleChange}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.handleClickShowPassword}
                                                                        onMouseDown={this.handleMouseDownPassword}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            labelWidth={150}
                                                        />
                                                        <FormHelperText id="component-error-text">{this.state.confirmPasswordError}</FormHelperText>
                                                    </FormControl>
                                                </div>
                                                <div className="btn btn-danger m-3" onClick={this.submitHandler}>Submit</div>
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

export default ChangePassword