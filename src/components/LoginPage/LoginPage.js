import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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
import MailIcon from '@material-ui/icons/Mail';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';


export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false,
            showPassword:false

        }
    }
    handleSubmit = async () => {
        let userInfo = {
            'email': `${this.state.email}`,
            'pass': `${this.state.password}`
        }
        console.log(userInfo);

        const result = await checkLogin(userInfo)
            .then((res) => {
                localStorage.setItem('loginUserData', JSON.stringify(res.data))
                console.log('response in login', res);
                

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
                    console.log('error in login', error);

                    sweetalert2.fire({
                        "title": "Invalid credentials... Please Check again",
                        "text": "Oops.... I could'nt find you..",
                        "icon": "warning"
                    })

                }
            )
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
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="m-5">
                    <div className="row">
                        <div className="col-6">
                            <div className="row text-right">
                                <div className="col-12 mb-2">
                                    <button className="btn btn-primary" style={{ width: "80%" }}>Login With facebook</button>


                                </div>
                                <div className="col-12 mb-2">
                                    <button className="btn btn-warning" style={{ width: "80%" }}>Login with Google</button>
                                </div>
                                <div className="col-12 mb-2">
                                    <button className="btn btn-info" style={{ width: "80%" }}>Login with Twitter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2>Login to NeoSTORE</h2>
                                    <form noValidate autoComplete="off">
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

                                        <FormControl className="mb-3" variant="outlined" fullWidth onChange={(e) => { { this.setState({ password: e.target.value }) } }}>
                                            <InputLabel>Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type="text"
                                                name="password"
                                                onChange={this.handleChange}
                                                // value={this.state.password}
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
                                        </FormControl> <br /><br />
                                        <Button color="secondary" variant="contained" onClick={this.handleSubmit}>Login</Button>
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
