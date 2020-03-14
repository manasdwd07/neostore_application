import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

export class LoginPage extends Component {
    render() {
        return (
            <div className="m-5">
                <div className="row">
                    <div className="col-6">
                        <div className="row text-right">
                            <div className="col-12 mb-2">
                                <button className="btn btn-primary" style={{width:"80%"}}>Login With facebook</button>


                            </div>
                            <div className="col-12 mb-2">
                                <button className="btn btn-warning"style={{width:"80%"}}>Login with Google</button>
                            </div>
                            <div className="col-12 mb-2">
                                <button className="btn btn-info" style={{width:"80%"}}>Login with Twitter</button>
                            </div> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                            <h2>Login to NeoSTORE</h2>
                        <form noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth /><br /><br />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth /><br /><br />
                            <Button color="secondary" variant="contained">Login</Button>
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6 text-right">
                        <span><a href="#">Register Now </a></span>
                        
                    </div>
                    <span className="">|</span>
                    <div className="col-5">
                    <a href="#">Forgotten</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
