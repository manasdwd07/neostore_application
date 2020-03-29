import React, { Component } from 'react'
import Header from '../Header/Header';
import {Link} from 'react-router-dom';


export class ThankYou extends Component {
    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />

                <div className="text-success text-center container m-5">
                    <h1>THANKYOU , YOUR ORDER HAS BEEN PLACED SUCCESSFULLY</h1>
                    <Link to="/" className="btn btn-light">Return to Homepage</Link>
                </div>
            </div>
        )
    }
}

export default ThankYou
