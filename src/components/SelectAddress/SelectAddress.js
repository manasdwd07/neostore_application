import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../Header/Header';
import { getCustomerAddress,updateAddress, addToCartApi } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { RadioGroup,FormControl } from '@material-ui/core';
import { addToCart } from '../../actions/CartActions';


export class SelectAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userAddress: [],
            checked: false,
            id: ''
        }

    }

    componentDidMount() {
        const result = getCustomerAddress()
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
    }

    selectAddress = (el) => {
        const data={
            'address':`${el.address}`,
            'address_id':`${el.address_id}`,
            'city':`${el.city}`,
            'country':`${el.country}`,
            'state':`${el.state}`,
            'isDeliveryAddress':true,
            'pincode':`${el.pincode}`,

        }
        
        const result=updateAddress(data)
        .then(res=>{
            // alert('You can proceed to buy now')
            const data=localStorage.getItem('cart') ? localStorage.getItem('cart'):[];
            console.log('data in cart' , JSON.parse(data))
            
            const data1=data ? [{...JSON.parse(data),flag:'checkout'}]:[]

            const rest=addToCartApi(data1)
            .then(result=>{
                
                alert('You can proceed to buy now')
            }).catch(err=>{
                alert(`OOps.. some error occured. Details: ${err}`)
            })
        }).catch(err=>{
            alert(`Oops... some error occured. Details : ${err}`)
        })

        

    }

    radioHandler = (e, id) => {
        !this.state.id? this.setState({
            checked: !this.state.checked,
            id: id
        }) : this.setState({ id:id,checked:!this.state.checked })
    }

    proceedCheckout = (e) => {


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
                                            {/* <input type="radio"  name="select" value={Math.random}>Select</input>
                                            <option selected="selected">Select</option> */}
                                            {/* <input type="radio" onClick={(e)=>this.radioHandler(el.address_id)} checked={this.state.checked} value="select" id={el.address_id} />
                                            <label>Select</label> */}

                                            {/* <FormControl>
                                                <RadioGroup aria-label="gender" name="gender1" onChange={(e) => this.radioHandler(el.address_id)}>
                                                    <FormControlLabel value="select" control={<Radio />} label="Select" />
                                                </RadioGroup>
                                            </FormControl> */}
                                            
                                            <input type="checkbox" onChange={(e)=>this.selectAddress(el)}/>
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
                            <Link to="/thanksPage" className="btn btn-light" onClick={(e) => this.proceedCheckout(e)} >Proceed to buy</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SelectAddress
