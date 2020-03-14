import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    changeHandler = (e) => {
        switch (e.target.name) {
            case 'firstName':
                if (e.target.value == '') {
                    document.getElementById('firstNameError').innerHTML = "Please Enter First Name"
                }
                else if (!e.target.value == NaN) {
                    document.getElementById('firstNameError').innerHTML = "Please Enter First Name in alphabets only"
                }
                else {
                    document.getElementById('firstNameError').innerHTML = "";
                }

        }

    }
    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-lg-6">
                        <button className="btn" style={{ width: "50px" }}> <GoogleLogin
                            clientId="206257001886-huhdn3bomsbobi025n76vo8qf6gdn8tk.apps.googleusercontent.com"
                            buttonText="Login"
                            cookiePolicy={'single_host_origin'}
                        /></button>
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
                            <form noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth /><br /><br />
                                <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth /><br /><br />
                                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth /><br /><br />
                                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth /><br /><br />
                                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth /><br /><br />
                                <TextField id="outlined-basic" label="Mobile No." variant="outlined" fullWidth /><br /><br />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1">
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                                        
                                    </RadioGroup><br/>
                                    <Button color="primary" variant="contained">Register</Button>
                                </FormControl>
                            </form>
                        </div>
                        


                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default RegisterPage
