import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import FormHelperText from "@material-ui/core/FormHelperText";
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
import Header from '../Header/Header';

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
            firstNameErrorText: '',
            lastNameErrorText: '',
            emailErrorText: '',
            passwordErrorText: '',
            confirmPassErrorText: '',
            phoneNoErrorText: '',
            genderErrorText: ''
        }
    }


    // Handler for onSubmit event on register form
    handleRegister = async (e) => {
        e.preventDefault();
        if(this.state.first_name=='' || this.state.last_name == '' || this.state.email=='' || this.state.pass == '' || this.state.confirmPass=='' || this.state.gender=='' || this.state.phone_no=='' ){
            this.setState({
                firstNameErrorText:'Field cant be empty',
                lastNameErrorText:'Field cant be empty',
                emailErrorText:'Field cant be empty',
                passwordErrorText:'Field cant be empty',
                confirmPassErrorText:'Field cant be empty',
                phoneNoErrorText:'Field cant be empty',
                genderErrorText:'Please select gender'

            })

        }
        
        if(this.state.firstNameErrorText==""&&this.state.lastNameErrorText==""&&this.state.emailErrorText==""&&this.state.passwordErrorText==''&&this.state.confirmPassErrorText==''&&this.state.phoneNoErrorText==''&&this.state.genderErrorText==""){
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
                    "title": "OOPS... Entries must be properly validated",
                    'icon': 'error'
                })
            })
        }
        else
        {
                        sweetalert2.fire({
                "title": 'OOPS... Not a validated form',
                'text': 'Please check the fields again',
                "icon": 'error'
            })

        }
    }

    // For handling onChange event in input fields
    handleChangeInput = (e) => {
        switch (e.target.name) {
            case 'first_name': this.setState({ first_name: e.target.value })
                this.handleFirstNameError(e);
                break;
            case 'last_name': this.setState({ last_name: e.target.value })
                this.handleLastNameError(e);
                break;
            case 'email': this.setState({ email: e.target.value })
                this.handleEmailError(e);
                break;
            case 'password': this.setState({ pass: e.target.value })
                this.handlePasswordError(e);
                break;
            case 'confirmPass': this.setState({ confirmPass: e.target.value })
                this.handleConfirmPasswordError(e);
                break;
            case 'mobile_no': this.setState({ phone_no: e.target.value })
                this.handlePhoneNoError(e);
                break;
            case 'gender1': this.setState({ gender: e.target.value })
                this.handleGenderError(e);
                break;
        }

    }

    // Below handlers for showing/hiding passwords in input field
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

    // Handle first name error
    handleFirstNameError = (e) => {
        const nameformat = /[^a-zA-z]/gi;
        if (e.target.value=="") {
            this.setState({ firstNameErrorText: 'Please enter name' })
        }
        else if (e.target.value.match(nameformat) !== null) {
            this.setState({ firstNameErrorText: 'Please Enter alphabets only' })
        }
        else {
            this.setState({ firstNameErrorText: '' })
        }
    }

    // Handle last name error
    handleLastNameError = (e)   => {
        const nameformat = /[^a-zA-z]/gi;
        if (e.target.value == "") {
            this.setState({ lastNameErrorText: 'Please enter name' })
        }
        else if (e.target.value.match(nameformat) !== null) {
            this.setState({ lastNameErrorText: 'Please Enter alphabets only' })
        }
        else {
            this.setState({ lastNameErrorText: '' })
        }
    }

    // Handle email error
    handleEmailError = (e) => {
            
        const mailformat = /^([a-zA-Z])+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (e.target.value == "") {
            this.setState({ emailErrorText: 'Please enter email id' })
        }
        else if ((e.target.value.match(mailformat)) == null) {
            this.setState({ emailErrorText: 'Invalid email... try again' })
        }

        else {
            this.setState({ emailErrorText: '' })
        }

    }

    // For handling password error
    handlePasswordError = (e) => {
        
        if (e.target.value == "") {
            this.setState({ passwordErrorText: 'Please enter your password' })
        }
        else {
            this.setState({ passwordErrorText: '' })
        }
    }

    // For handling confirm password error
    handleConfirmPasswordError=(e)=>{
        const passwordFormat = /^[A-Za-z]\w{7,11}$/;
        if(this.state.pass=="" && e.target.value==""){
            this.setState({confirmPassErrorText:'Please enter password first'})
        }
        else if (this.state.pass!==""&&e.target.value == "") {
            this.setState({confirmPassErrorText: 'Please enter your password again' })
        }
        else if ((e.target.value.match(passwordFormat)) == null) {
            this.setState({confirmPassErrorText: 'Password should be between 8-12 characters containing only alphanumeric values' })
        }
        else if(this.state.pass!==this.state.confirmPass){
            this.setState({confirmPassErrorText:'Confirm Password and password should be same'})
        }
        else {
            this.setState({confirmPassErrorText: '' })
        }
    }

    // For handling phone number errors
    handlePhoneNoError=(e)=>{
        const numberFormat = /[^0-9]/gi;
        if (e.target.value == "") {
            this.setState({phoneNoErrorText:'Please Enter your 10 digit phone number'})
        }
        else if(e.target.value.match(numberFormat)!==null){
            this.setState({phoneNoErrorText:'Enter numbers only'})
        }
    
        else if (e.target.value < 1000000000 || e.target.value > 9999999999) {
            this.setState({phoneNoErrorText:'Phone number should be exact 10 digits'})
        }
        else if (e.target.value != "" && !isNaN(e.target.value) && !(e.target.value < 1000000000 || e.target.value > 9999999999)) {
            this.setState({phoneNoErrorText:''})
        }
    }

    // Gender Selection error
    // handleGenderError=(e)=>{
    //     if(e.target.value==''){
    //         this.setState({genderErrorText:'Please select your gender'})
    //     }
    // }

    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />/>
                <div className="row">
                    <div className="col-lg-6 ">
                        <div className="btn mt-2 text-center" style={{marginLeft:"50%"}}>
                            <GoogleLogin
                                render={props => <button className="btn-danger btn" onClick={props.onClick} style={{ width: '100%' }}>Sign Up With Google</button>}
                                clientId="206257001886-huhdn3bomsbobi025n76vo8qf6gdn8tk.apps.googleusercontent.com"
                                 cookiePolicy={'single_host_origin'}
                            />,
                        </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                        <div className="btn btn-primary">
                            Sign Up with Facebook
                        </div>
                    </div>



                </div>
                <hr />
                <div className="card container" width="80%">

                    <div style={{ marginLeft: "30%", width: "50%" }}>
                        <div className="card-body container">
                            <h2>Register to NeoSTORE</h2><br /><br />

                                <FormControl className="mb-3" variant="outlined" error={this.state.firstNameErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>First Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="text"
                                        name="first_name"
                                        autoComplete="off"
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
                                    <FormHelperText id="component-error-text">{this.state.firstNameErrorText}</FormHelperText>
                                </FormControl>
                                <FormControl className="mb-3" variant="outlined" error={this.state.lastNameErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>Last Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="text"
                                        name="last_name"
                                        autoComplete="off"
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
                                <FormHelperText id="component-error-text">{this.state.lastNameErrorText}</FormHelperText>
                                </FormControl>

                                <FormControl className="mb-3" variant="outlined" error={this.state.emailErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>Email Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
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
                                    <FormHelperText id="component-error-text">{this.state.emailErrorText}</FormHelperText>
                                </FormControl>

                                <FormControl className="mb-3" variant="outlined" error={this.state.passwordErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"

                                        name="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        onChange={this.handleChange}
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
                                    <FormHelperText id="component-error-text">{this.state.passwordErrorText}</FormHelperText>
                                </FormControl>

                                <FormControl className="mb-3" variant="outlined" error={this.state.confirmPassErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        name="confirmPass"
                                        onChange={this.handleChange}
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
                                <FormHelperText id="component-error-text">{this.state.confirmPassErrorText}</FormHelperText>
                                </FormControl>

                                <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                    <InputLabel>Mobile Number</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type="text"
                                        name="mobile_no"
                                        onChange={this.handleChange}
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
                                    <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>
                                </FormControl>









                            <FormControl className="mb-3" error={this.state.genderErrorText ? true : false} onBlur={this.handleGenderError}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" onChange={this.handleChangeInput}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup><br />
                                <FormHelperText id="component-error-text">{this.state.genderErrorText}</FormHelperText>
                                <Button color="primary" variant="contained" onClick={this.handleRegister}>Register</Button>
                                
                            </FormControl>
                            
                        </div>



                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default RegisterPage
