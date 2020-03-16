import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import {
    Button,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    Radio,
    InputAdornment,
    Icon,
    Input,
    InputLabel,
    OutlinedInput
} from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import sweetalert2 from 'sweetalert2';
import { registerUser } from '../../api/api';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pass: '',
            confirmPass: '',
            phone_no: '',
            gender: '',
            register: false,
            showPassword: false,
        }
    }



    handleRegister = async (e) => {
        e.preventDefault();
        let userInfo = {
            'first_name': `${this.state.first_name}`,
            'last_name': `${this.state.last_name}`,
            'email': `${this.state.email}`,
            'pass': `${this.state.pass}`,
            'confirmPass': `${this.state.confirmPass}`,
            'phone_no': `${this.state.phone_no}`,
            'gender': `${this.state.gender}`
        }

        const result = await registerUser(userInfo)
            .then((res) => {
                sweetalert2.fire({
                    "title": 'Registration successful',
                    'text': 'You can now login',
                    "icon": 'success'
                })
                this.setState({ register: true })
                this.props.history.push('/login')

            }).catch((err) => {
                sweetalert2.fire({
                    "title": "OOPS... Some error occured",
                    'text': `Please re-check the entries.. Details of error: ${err}`,
                    'icon': 'warning'
                })
            })
    }
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

    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-lg-6 ">
                        <button className="btn-danger mt-2" style={{ marginLeft: "40%" }}>
                            <GoogleLogin
                                clientId="206257001886-huhdn3bomsbobi025n76vo8qf6gdn8tk.apps.googleusercontent.com"
                                
                                
                                
                                cookiePolicy={'single_host_origin'}
                            />,
                       </button>
                    </div>
                    <div className="col-lg-6">
                        <button className="btn" style={{ width: "50px" }}>
                            Login with Fb
                        </button>
                    </div>



                </div>
                <hr />
                <div className="card container" width="80%">

                    <div style={{ marginLeft: "30%", width: "50%" }}>
                        <div className="card-body container">
                            <h2>Register to NeoSTORE</h2><br /><br />

                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ first_name: e.target.value }) } }}>
                                <InputLabel>Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="text"
                                    name="first_name"
                                    onChange={this.handleChange}
                                    // value={this.state.password}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle email visibility"

                                            >
                                                <TextFieldsIcon />
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ last_name: e.target.value }) } }}>
                                <InputLabel>Last Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="text"
                                    name="last_name"
                                    onChange={this.handleChange}
                                    // value={this.state.password}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle email visibility"

                                            >
                                                <TextFieldsIcon />
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={100}
                                />
                            </FormControl>

                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ email: e.target.value }) } }}>
                                <InputLabel>Email Address</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    // value={this.state.password}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle email visibility"

                                            >
                                                <MailIcon />
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={100}
                                />
                            </FormControl>

                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ pass: e.target.value }) } }}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    onChange={this.handleChange}
                                    // value={this.state.password}

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
                            </FormControl>

                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ confirmPass: e.target.value }) } }}>
                                <InputLabel>Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="confirmPass"
                                    onChange={this.handleChange}
                                    // value={this.state.password}

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
                                    labelWidth={200}
                                />
                            </FormControl>

                            <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ phone_no: e.target.value }) } }}>
                                <InputLabel>Mobile Number</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type="text"
                                    name="mobile_no"
                                    onChange={this.handleChange}
                                    // value={this.state.password}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Icon
                                                aria-label="toggle email visibility"

                                            >
                                                <TextFieldsIcon />
                                            </Icon>
                                        </InputAdornment>
                                    }
                                    labelWidth={150}
                                />
                            </FormControl>









                            <FormControl className="mb-3">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" onChange={(e) => { { this.setState({ gender: e.target.value }) } }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup><br />
                                <Button color="primary" variant="contained" onClick={this.handleRegister}>Register</Button>
                            </FormControl>
                            {/* </form> */}
                        </div>



                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default RegisterPage
