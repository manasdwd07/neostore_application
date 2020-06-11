import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../Header/Header';
import { getCustomerAddress, updateAddress, addToCartApi } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import { Link } from 'react-router-dom';

export class SelectAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userAddress: [],
            checked: false,
            id: '',
            show: false
        }

    }

    // For getting address details on component mount
    async componentDidMount() {
        if (localStorage.getItem('loginUserData')) {
            await getCustomerAddress()
            .then(res => {
                res.data.customer_address ?
                    this.setState({
                        userAddress: res.data.customer_address,

                    }) : this.setState({
                        userAddress: []
                    })

            }).catch(err => {
                sweetalert2.fire({
                    'title': 'Oops.. no address found',
                    'text': `You did not add any address, please add one ${err}`,
                    'icon': 'warning'
                })
            })
        }else
        {
            sweetalert2.fire({
                'text':'Hey guest, kindly login to proceed',
                'icon':'warning'
            })
        }
    }

    // For handling select address from selected address
    selectAddress = (el) => {
        const data = {
            'address': `${el.address}`,
            'address_id': `${el.address_id}`,
            'city': `${el.city}`,
            'country': `${el.country}`,
            'state': `${el.state}`,
            'isDeliveryAddress': true,
            'pincode': `${el.pincode}`,

        }
        updateAddress(data)
        .then(res => {
            this.setState({ show: true })
            alert('You Can Proceed to buy now')
        }).catch(err => {
            alert(`Oops... some error occured. Details : ${err}`)
        })



    }


    // Handler for radio input selection

    radioHandler = (e, id) => {
        !this.state.id ? this.setState({
            checked: !this.state.checked,
            id: id
        }) : this.setState({ id: id, checked: !this.state.checked })
    }

    // Proceed to checkout handler for onClick event
    proceedCheckout = async(e) => {
        e.preventDefault();
        const data = localStorage.getItem('cart') ? localStorage.getItem('cart') : [];

        const data1 = data ? JSON.parse(data) : []
        data1.push({ flag: 'checkout' })
        await addToCartApi(data1)
        .then(result => {

            localStorage.setItem('cart', [[]])
            this.props.history.push('/thanksPage')
            this.setState({ show: true })
        }).catch(err => {
            alert(`OOps.. some error occured. Details: ${err}`)
        })

    }

    render() {
        const steps = ['Cart', 'Delivery Address'];
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="container-fluid">
                    <div className="row">
                        <Stepper activeStep={1} style={{ width: "100%" }}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>
                <div className="container">

                    <div className="mt-4 mb-4" style={{ border: "1px groove", borderRadius: "5px" }}>
                        <div className="card-header"><h2>Addresses</h2></div>
                        {this.state.userAddress.length > 0 ? this.state.userAddress.map(el => {
                            return <div className="">
                                <div className=" card-body m-2" style={{ border: "1px groove", borderRadius: "5px" }}>
                                    <div className="row m-1">
                                        <div className="col-12">
                                            <span className="add">{el.address}
                                            </span>
                                        </div>

                                    </div>
                                    <div className="row m-1">
                                        <div className="col-11">
                                            <span className="city">{el.city}</span> <span className="pincode">{el.pincode}</span>
                                        </div>
                                    </div>
                                    <div className="row m-1">
                                        <div className="col-11">
                                            <span className="state">{el.state}</span> <span className="country">{el.country}</span>
                                        </div>

                                    </div>
                                    <div className="row m-1">
                                        <div className="col-2">
                                            <input type="checkbox" onChange={(e) => this.selectAddress(el)} />
                                        </div>
                                        <div className="col-10" >
                                            <Link to="/editAddress" onClick={localStorage.setItem('editAddress', JSON.stringify(el))} className="btn btn-primary px-3">Edit</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }) : <div className="text-center">
                                <h2>No address found</h2>

                            </div>}
                        <div className="col-12 mt-3 mb-2">
                            <Link to="/addAddress" className="btn btn-light">Add Address</Link>
                            <button className="btn" disabled={!this.state.show} onClick={(e) => this.proceedCheckout(e)}>Proceed to buy</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SelectAddress
