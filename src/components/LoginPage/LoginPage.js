import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { checkLogin } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Icon
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FormHelperText from "@material-ui/core/FormHelperText";
import MailIcon from '@material-ui/icons/Mail';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';




export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false,
            showPassword: false,
            emailError: 'Enter email',
            passwordError: 'Enter password'

        }
    }

    // Below Handler for onSubmit in login page
    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.email === '') {
            this.setState({ emailError: 'Field cant be left blank' })
        }
        if (this.state.password === '') {
            this.setState({ passwordError: 'Field cant be left blank' })
        }


        let userInfo = {
            'email': `${this.state.email}`,
            'pass': `${this.state.password}`
        }

        await checkLogin(userInfo)
        .then((res) => {
            localStorage.setItem('loginUserData', JSON.stringify(res.data))
            sweetalert2.fire({
                "title": 'Login successful',
                'text': 'Enjoy NeoSTORE',
                "icon": 'success'
            })
            this.setState({ login: true })
            setTimeout(() => { this.props.history.push('/') }, 0)

        }

        )
            .catch(
                error => {
                    sweetalert2.fire({
                        "title": "Invalid credentials... Please Check again",
                        "text": "Oops.... I could'nt find you..",
                        "icon": "warning"
                    })

                }
            )




        // else {
        //     this.setState({
        //         emailError: 'Field cant be left blank',
        //         passwordError: 'Field cant be left blank'
        //     })
        // }
    }

    // Below Handler for showing/hiding passwords in input field
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

    // Response recieved by google on login
    responseGoogle = (response) => {
        console.log('google', response)
    }

    // Response recieved by facebook on login
    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        return (

            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="m-5">
                    <div className="row">
                        <div className="col-6">
                            <div className="row text-center">
                                <div className="col-12 m-2">
                                    <button className="btn btn-primary" style={{ width: "70%" }}>Login With facebook</button>
                                    {/* <FacebookLogin
                                        appId="1088597931155576"
                                        autoLoad={false}
                                        
                                        fields="name,email,picture"
                                        onClick={this.componentClicked}
                                        callback={this.responseFacebook} />
                                 */}

                                </div>
                                <div className="col-12 m-2">
                                <button className="btn-danger btn" style={{ width: '70%' }}>Login With Google</button>
                                    {/* <GoogleLogin
                                        clientId="529407280120-4nd4q9ls6d0pdop5htrq2hpjvap2qop4.apps.googleusercontent.com"
                                        buttonText="Login"
                                        render={props => <button className="btn-danger btn" onClick={props.onClick} style={{ width: '80%' }}>Login With Google</button>}
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}

                                    /> */}

                                    
                                </div>
                                <div className="col-12 m-2">
                                    <button className="btn btn-info" style={{ width: "70%" }}>Login with Twitter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2>Login to NeoSTORE</h2>
                                    <form noValidate autoComplete="off">
                                        <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => {

                                            this.setState({ email: e.target.value });
                                            if (e.target.value !== '') { this.setState({ emailError: '' }) }

                                        }}>
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
                                            <FormHelperText id="component-error-text" >{this.state.emailError}</FormHelperText>
                                        </FormControl>

                                        <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => {

                                            this.setState({ password: e.target.value });
                                            if (e.target.value !== '') {
                                                this.setState({
                                                    passwordError: ''
                                                })
                                            }

                                        }}>
                                            <InputLabel>Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                name="password"
                                                onChange={this.handleChange}
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
                                            <FormHelperText id="component-error-text">{this.state.passwordError}</FormHelperText>
                                        </FormControl> <br /><br />
                                        <Button color="secondary" variant="contained" onClick={(e) => this.handleSubmit(e)}>Login</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6 text-right">
                            <span><Link to="/register" className="btn">Register Now</Link></span>

                        </div>
                        <span className="">|</span>
                        <div className="col-5">
                            <Link to="/forgotPassword" className="btn">Forgot Password ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
