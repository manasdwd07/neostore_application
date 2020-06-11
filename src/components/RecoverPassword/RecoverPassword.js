import React, { Component } from 'react';
import Header from '../Header/Header';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Icon
} from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { recoverPassword } from '../../api/api';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import sweetalert2 from 'sweetalert2';
import FormHelperText from "@material-ui/core/FormHelperText";



export class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            authCode: 0,
            password: '',
            confirmPassword: '',
            authCodeErr: '',
            passwordErr: '',
            confirmPasswordErr: ''
        }
    }

    // Below Handlers for showing/hiding password in input field
    handleClickShowPassword = (e) => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleMouseDownPassword = (e) => {
        this.setState({
            showPassword: true
        })
    }

    // Submit handler for onClick event 
    handleSubmit = async (e) => {
        e.preventDefault();
        if (isNaN(this.state.authCode)) {
            this.setState({
                authCodeErr: 'It should be a number'
            })
        }
        else if (!(this.state.authCode >= 999 && this.state.authCode < 10000)) {
            this.setState({
                authCodeErr: 'Authentication code should be of 4 digits'
            })
        }
        else if (this.state.authCode === 0) {
            this.setState({
                authCodeErr: 'Please enter authentication code'
            })
        }
        else {
            this.setState({
                authCodeErr: ''
            })
        }
        const passwordFormat = /^[A-Za-z]\w{7,11}$/;
        if (this.state.password === "") {
            this.setState({
                passwordErr: `Please enter password`
            })
        }
        else if (!this.state.password.match(passwordFormat) == null) {
            this.setState({
                passwordErr: 'Invalid password format (8-12) alphanumeric allowed'
            })
        }

        if (this.state.confirmPassword === "") {
            this.setState({
                confirmPasswordErr: `Please enter password again`
            })
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                confirmPasswordErr: `Passwords don't match`
            })
        }
        else {
            this.setState({
                confirmPasswordErr: ''
            })
        }


        if (this.state.authCodeErr === '' && this.state.passwordErr === '' && this.state.confirmPasswordErr === '') {
            const data = {
                'otpCode': `${this.state.authCode}`,
                'newPass': `${this.state.password}`,
                'confirmPass': `${this.state.confirmPassword}`
            }
            const result = await recoverPassword(data)
                result.then(res => {

                    sweetalert2.fire({
                        'text': 'Password changed successfully, you can now login'
                    })
                    setTimeout(() => { this.props.history.push('/login') }, 2000);
                }).catch(err => {
                    sweetalert2.fire({
                        'text': `Error: ${err}`
                    })
                })
        }
        else {
            sweetalert2.fire({
                'text': 'Please enter all the fields correctly'
            })
        }
    }

    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="text-center container m-5">
                    <div className="card">
                        <div className="card-header m-5">
                            <p className="text-danger"> **Verification code has been sent to your registered email id**</p>
                            <h2>Recover Password</h2>

                        </div>
                        <div className="card-body">
                            {/* <input type="text" className="form-control  " placeholder="Authentcation code" onChange={(e)=>{this.setState({authCode:e.target.value})}}/> */}
                            <FormControl className="mb-3" variant="outlined" error={this.state.authCodeErr?true:false} onChange={(e) => {  this.setState({ authCode: e.target.value }) }}>
                                <InputLabel>Authentcation Code</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    type="text"
                                    endAdornment={<InputAdornment position="end">
                                        <Icon
                                            aria-label="toggle email visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            <TextFieldsIcon />
                                        </Icon>
                                    </InputAdornment>
                                    }


                                    labelWidth={100}
                                />
                                <FormHelperText id="component-error-text">{this.state.authCodeErr}</FormHelperText>

                            </FormControl>
                            <br />

                            <FormControl className="mb-3" variant="outlined" error={this.state.passwordErr?true:false} onChange={(e) => {  this.setState({ password: e.target.value })  }}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={100}
                                />
                                <FormHelperText id="component-error-text">{this.state.passwordErr}</FormHelperText>

                            </FormControl>
                            <br />
                            <FormControl className="mb-3" variant="outlined" error={this.state.confirmPasswordErr?true:false} onChange={(e) => {  this.setState({ confirmPassword: e.target.value })  }}>
                                <InputLabel>Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={100}
                                />
                                <FormHelperText id="component-error-text">{this.state.confirmPasswordErr}</FormHelperText>

                            </FormControl>
                            <br />
                            <FormControl>
                                <button className="btn btn-success" onClick={(e)=>this.handleSubmit(e)} >Submit</button>
                            </FormControl>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RecoverPassword
