import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import cart from '../../assets/images/shoppingCart.png';
import { height } from '@material-ui/system';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../Header/Header';
import { URL, getCartDataApi,updateCartQuantity, deleteCartData } from '../../api/api';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import sweetalert2 from 'sweetalert2';


export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            subtotalCost:0,
            totalCost:0,
            
        }
    }

    async componentDidMount() {
        const getCartData = await getCartDataApi()
            .then(async res => {
                 this.setState({
                    cartData: res.data.product_details
                })
                if(res.data.product_details.length){let pc = res.data.product_details.map(item => {
                    return item.total_productCost ;
                  });
                  let totalCost = pc.reduce(
                    (value, nextvalue) => parseInt(value) + parseInt(nextvalue)
                  );
                  let gstCost=parseInt(totalCost*.05);
                  let  orderTotal=parseInt(totalCost)+parseInt(gstCost)
                  this.setState({
                    subtotalCost: totalCost,
                    gst:gstCost,
                    totalCost:orderTotal
                  });}
            }).catch(err=>{
                alert(`Error: ${err}`)
            })
    }

    subtractOne=async(id,quantity)=>{
        const data={
            'product_id':`${id}`,
            'quantity':`${quantity>=1?quantity-1:quantity}`
        }
        const result= await updateCartQuantity(data)
    }

    addOne= async (id,quantity)=>{
        const data={
            'product_id':`${id}`,
            'quantity':`${quantity>=1?quantity+1:quantity}`
        }
        const result=await updateCartQuantity(data)
    }

    deleteItem=async (id)=>{
        const result=await deleteCartData(id)
        .then(async res=>{
            
            sweetalert2.fire({
                'title':'Item deleted successfully',
                'icon':'success'
            })
            localStorage.setItem('cart_count',localStorage.getItem('cart_count')-1)
            // localStorage.getItem('cart_count')<=0 ? localStorage.setItem('cart_count',0):localStorage.getItem('cart_count')
            getCartDataApi()
            .then(res=>{
                this.setState({
                    cartData:res.data.product_details
                })
            })
            
        }).catch(err=>{
            sweetalert2.fire({
                'title':'Some error occured',
                'text':`Details of error ${err}`
            })
        })
    }




  

    render() {
        const steps = ['Cart', 'Delivery Address'];    
        const data1 = localStorage.getItem('loginUserData');


        return (
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row">
                            <Stepper activeStep={0} style={{ width: "100%" }}>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>

                    <div className="row">
                        <div className="col-8">

                        
                        {this.state.cartData ? this.state.cartData.map(el =>
                            <div className="container mt-3 mb-2">
                                {/* <img src={`${URL}${el.product_id.product_image}`}/>
                                    <p>{el.product_id.product_desc}</p> */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="row card-body">
                                                <div className="col-2">Product
                                                    <br/><br/>
                                                    <img src={`${URL}${el.product_id.product_image}`} width="100%"/>
                                                </div>
                                                <div className="col-3">
                                                    <span style={{fontSize:"smaller"}}>{el.product_id.product_name}&nbsp;
                                                    
                                                    by {el.product_id.product_producer}<br/>Status: {el.product_id.product_stock > 0 ?<span style={{color:"green"}}>In stock</span>:<span style={{color:"red"}}>Not in stock</span>}</span>
                                                </div>
                                                <div className="col-3">Quantity
                                                    <br/><br/>
                                                    <span style={{fontSize:"smaller"}}><RemoveIcon onClick={()=>this.subtractOne(el.product_id,el.quantity)} fontSize="small"/> {el.quantity} <AddIcon onClick={this.addOne(el.product_id,el.quantity)} fontSize="small"/></span>
                                                </div>
                                                <div className="col-2">Price
                                                <br/><br/>
                                                {el.product_cost}
                                                </div>
                                                <div className="col-2">Total
                                                <br/><br/>
                                                <span>{el.product_cost*el.quantity}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{float:"right"}}> <DeleteForeverSharpIcon onClick={(id)=>this.deleteItem(el.product_id.product_id)} color="error"/></span></span>
                                                </div>
                                                
                                            
                                            <hr/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                   

                                </div>


                            </div>) :

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
                            </div>}
                        </div>
                        {this.state.cartData ? 
                            <div className="col-4 mb-3">
                            <div className="container">
                                <div><h2>Review Order</h2></div>
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{this.state.subtotalCost}</p>
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>GST(5%)</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{this.state.gst}</p>
                                    </div>
                                </div>
                                <hr/>
                                
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Order Total</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{this.state.totalCost}</p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <Link to="/selectAddress" className="btn btn-primary" onClick={this.proceedToBuyHandler} style={{width:"100%"}}>Proceed to Buy</Link>
                        </div>:null}
                    </div>
                            

                    </div>
                </div>
            </div>
        )
    }
}

export default Cart
