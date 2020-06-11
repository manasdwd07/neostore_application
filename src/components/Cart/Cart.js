import React, { Component } from 'react';
import cart from '../../assets/images/shoppingCart.png';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../Header/Header';
import { URL} from '../../api/api';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import {removeFromCart} from '../../actions/CartActions';


export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            total_cost:"",
            gst:"",
            orderTotal:""
            
            
        }
    }

    
     componentDidMount(){
        try{
            this.getCartData();
            
        }catch(error){
            alert('Error in getting data')
        }
    }

    // Getting cart products from local Storage

    getCartData=()=>{
        try{
            let result=localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : [] ;
            this.setState({
                cartData:result
            });

            let a =result.map((item=>{
                return item.total_productCost*item.quantity;
            }))

            let totalCost=a.reduce((val,nextVal)=>parseInt(totalCost)+parseInt(gstCost));
            let gstCost = parseInt(totalCost+0.05);
            let orderTotal=parseInt(totalCost)+parseInt()
            this.setState({
                total_cost:totalCost,
                gst:gstCost,
                orderTotal:orderTotal
            });
        }catch(error){
            // handle error here
            
        }
    }


    // Handler for delete Item from cart
   

    deleteItem=async (id)=>{
        try{
            Swal.fire({
                title:'Are you sure to delete this item ?',
                text:'This item will be deleted from your cart',
                icon:'warning',
                confirmButtonText:'Yeah sure'
            }).then(async(result)=>{

                let data=localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                :null;

                let cart=data.filter((item)=>{
                    return item._id!== id;

                });

                
                localStorage.setItem('cart',JSON.stringify(cart));
                this.props.removeFromCart(id);
                this.getCartData();
                Swal.fire({
                    text:'Product has been deleted from cart'
                })
            })
        } catch(error){
            console.log(error)
        }
    }

    // For Handling updating quantities in local Storage
    //   -------------------

    addOne = (id) => {
        const localCartData = JSON.parse(localStorage.getItem("cart"))
        const index = localCartData.findIndex(res=>{ return res._id === id  })
        if(localCartData[index].quantity>0 && localCartData[index].quantity<=9){
        localCartData[index].quantity=localCartData[index].quantity+1;
        localStorage.setItem('cart', JSON.stringify(localCartData));
        this.setState({ cartData: JSON.parse(localStorage.getItem("cart")) })
        
        }
    }

    subtractOne = (id) => {
        const localCartData = JSON.parse(localStorage.getItem("cart"))
        const index = localCartData.findIndex(res=>{ return res._id === id  })
        if(localCartData[index].quantity <= 1){
            window.confirm("Are you sure,to remove this item from cart")
            this.deleteItem(id);
            this.props.removeFromCart(id);
        }
        else if(localCartData[index].quantity > 1 && localCartData[index].quantity<=10){
            localCartData[index].quantity=localCartData[index].quantity-1;
            localStorage.setItem('cart', JSON.stringify(localCartData));
            this.setState({ cartData: JSON.parse(localStorage.getItem("cart")) })
            
        }
        
    }

    //   -----------------

      render() {
        const steps = ['Cart', 'Delivery Address'];    
        // const data1 = localStorage.getItem('loginUserData');


        // ------------------------------------
        let orderTotal = 0
        this.state.cartData !== null ? orderTotal = this.state.cartData
        .map(val => {return (val.product_cost * val.quantity)})
        .reduce((sum, product_cost) => {return Number(sum) + Number(product_cost)}, 0) : orderTotal = 0;
        
        const gst = Math.round(orderTotal / 100 * 5);
        const total = Number(gst) + Number(orderTotal) 

        // -------------------------------------

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

                        
                        {this.state.cartData.length>0 ? this.state.cartData.map(el =>
                            <div className="container mt-3 mb-2" key={el._id}>
                                {/* <img src={`${URL}${el.product_id.product_image}`}/>
                                    <p>{el.product_id.product_desc}</p> */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="row card-body">
                                                <div className="col-2">Product
                                                    <br/><br/>
                                                    <img src={`${URL}${el.product_id.product_image}`} alt='Product_Image_Not_Available' width="100%"/>
                                                </div>
                                                <div className="col-3">
                                                    <span style={{fontSize:"smaller"}}>{el.product_id.product_name}&nbsp;
                                                    
                                                    by {el.product_id.product_producer}<br/>Status: {el.product_id.product_stock > 0 ?<span style={{color:"green"}}>In stock</span>:<span style={{color:"red"}}>Not in stock</span>}</span>
                                                </div>
                                                <div className="col-3">Quantity
                                                    <br/><br/>
                                                    <span style={{fontSize:"smaller"}}><RemoveIcon onClick={()=>this.subtractOne(el._id)} fontSize="small"/> {el.quantity} <AddIcon onClick={()=>this.addOne(el._id)} fontSize="small"/></span>
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
                                        <p>Before proceed to checkout you must add some products to your shopping cart.
                                        <br />You will find lots of intresting products on our products page</p>
                                        <Link to="/products" className="btn btn-primary">Return to product page</Link>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {Array.isArray(this.state.cartData) ? 
                            <div className="col-4 mb-3">
                            <div className="container">
                                <div><h2>Review Order</h2></div>
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{orderTotal}</p>
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>GST(5%)</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{gst}</p>
                                    </div>
                                </div>
                                <hr/>
                                
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Order Total</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{total}</p>
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

const mapDispatchToProps=(dispatch)=>{
    return {
        removeFromCart:(id) =>{
            dispatch(removeFromCart(id))
        }
    }
}
export default connect(null,mapDispatchToProps)(Cart)
