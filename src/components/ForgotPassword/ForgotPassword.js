import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link, FormControl } from '@material-ui/core';
import { forgotPassword } from '../../api/api';
import sweetalert2 from 'sweetalert2';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErr: ''
        }

    }

    changeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
        console.log(`email:${this.state.email}`)
    }

    submitHandler = async (e) => {
        const mailformat = /^([a-zA-Z])+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        e.preventDefault();
        if(this.state.email==""){
            this.setState({emailErr:"Please enter email Id"})
        }
        else if(this.state.email.match(mailformat)==null){
            this.setState({emailErr:'Invalid email id'})
        }
        else{
            this.setState({emailErr:""})
        }
        if (this.state.emailErr == '') {
            const data = {
                "email": `${this.state.email}`
            }
            const result = await forgotPassword(data)
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    sweetalert2.fire({
                        'text': 'Code has been sent'
                    })
                    setTimeout(() => { this.props.history.push('/recoverPassword') }, 2000)
                }).catch((err) => {
                    sweetalert2.fire({
                        'text': `Some error occured ${err}`
                    })
                })
        }
        else {
            
            sweetalert2.fire({
                'text': 'Please enter email id correctly'

            })
        }
    }

    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="card form-group m-5">
                    <div className="card-header"><h1 className="text-center">Recover Password</h1></div>
                    <hr />
                    <div className="card-body">
                        {/* <FormControl error={this.state.emailErr?true:false}> */}
                            <input type="text" className="form-control" placeholder="Enter your email" onChange={(e) => this.changeHandler(e)} />
                            <span className="form-helper-text text-danger">{this.state.emailErr}</span><br/>
                            <button type="submit" onClick={(e) => this.submitHandler(e)} className="btn btn-primary m-3">Submit</button>
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
