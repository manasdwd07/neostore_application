import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import cart from '../../assets/images/shoppingCart.png';
import { height } from '@material-ui/system';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../Header/Header';
import { getCartDataApi } from '../../api/api';


export class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            cartData:[]
        }
    }
    
    async componentDidMount() {
        const getCartData = await getCartDataApi()
    }
    render() {
        const steps = ['Cart', 'Delivery Address'];
        const data1 = localStorage.getItem('loginUserData');


        return (
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row">
                            <Stepper alternativeLabel style={{ width: "100%" }}>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>

                        <div>
                            {/* Here add ternary operator to conditionally render if cart is empty or not */}
                            
                            <div className="row mt-5">
                                <div className="text-center mb-4" style={{ marginLeft: "27%" }}>
                                    <img src={cart} alt="img" height="30%" />
                                    <div className="text-center mt-4">
                                        <h3>YOUR CART IS CURRENTLY EMPTY</h3>
                                        <p>Before proceed to checkout you must add some products to you shopping cart.
                                        <br />You will find lots of intresting products on our products page</p>
                                        <Link to="/products" className="btn btn-primary">Return to product page</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart
