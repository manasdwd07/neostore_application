import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Header from '../Header/Header';
import { getOrderDetails } from '../../api/api';
import { URL, getInvoiceOfOrder } from '../../api/api';


export class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: ''
        }

    }


    componentDidMount =  () => {
        
            if(localStorage.getItem('loginUserData')){ getOrderDetails()
            .then(res=>{
                
                this.setState({
                    orderDetails: res.data.product_details,
                })
            }) 
        .catch (error=> {
            console.log(error)
        })}
    }

    handleDownloadInvoice = async (data) => {
        
        
            await getInvoiceOfOrder(data)
            .then(res=>{
                window.open(`${URL}${res.data.receipt}`,'_blank')
            }).catch(err=>{
                alert('invoice error ',err);
                
            })

    }

    render() {
        const data1 = localStorage.getItem('loginUserData')
        const userData = JSON.parse(data1);
        return (
            <div>

                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                {userData ?
                    <div className="container m-4">
                        <div className="row">
                            <div className="col-12">
                                <h1>My Account</h1>
                            </div>


                        </div><hr />
                        <div className="row">
                            <div className="col-6 text-center">
                                <img src={userIcon} alt="userIcon" width="50%" style={{ borderRadius: "100%" }} />
                                <h4 className="text-danger mt-2">{userData.customer_details.first_name} {userData.customer_details.last_name}</h4>
                                <div className="mb-2"><Link to="/order"><Button variant="outlined" fullWidth><ReorderIcon /> &nbsp;Order</Button></Link></div>
                                <div className="mb-2"><Link to="/profile"><Button variant="outlined" fullWidth><PersonIcon /> &nbsp; Profile</Button></Link></div>
                                <div className="mb-2"><Link to="/address"><Button variant="outlined" fullWidth><MenuBookIcon /> &nbsp; Addresses</Button></Link></div>
                                <div className="mb-2"><Link to="/changePassword"><Button variant="outlined" fullWidth><SyncAltIcon /> &nbsp; Change Password</Button></Link></div>
                            </div>
                            <div className="col-6 mt-2">

                                <div className="container">

                                    {this.state.orderDetails.length=== 0 ?
                                        <div>
                                            <div className="text-center">
                                                <h1 className="font-weight-larger mb-5">No Orders Found</h1>
                                                <Link to="/products" className="btn btn-info">Go to Product Page</Link>
                                            </div>
                                        </div> :
                                        <div><h1 className="text-center">ORDERS</h1>
                                            {this.state.orderDetails ? this.state.orderDetails.map(el =>
                                                <div className="container card m-3" key={el._id}>
                                                    
                                                    <div className="row m-2">
                                                        <span style={{ fontSize: "large", color: "orange" }}>TRANSIT</span><span>&nbsp;Order by: {el._id}</span>
                                                        <div className="col-12"> <small className="text-warning">Placed on :{el.product_details[0].createdAt}</small></div>
                                                         <div className='col-12'><small className="text-success">Total cost :{el.product_details[0].total_cartCost}</small></div>
                                                    </div>
                                                    <hr />
                                                    <div className="row m-2">
                                                        <img src={URL + el.product_details[0].product_details[0].product_image} alt={el.product_details[0].product_details[0].product_name} width="50%" />
                                                    </div>
                                                    <hr />
                                                    <div className="row m-2" >
                                                        <button  onClick={(e)=>this.handleDownloadInvoice(el)} className="btn btn-primary">Download Invoice as PDF</button>
                                                    </div>
                                                </div>
                                            ) : <div className="text-center"><CircularProgress color="inherit" /></div>}
                                        </div>}


                                </div>

                            </div>
                        </div>
                    </div> : <div>
                        <div className="container text-center mt-5 mb-5">
                            <h5>Hi guest, sorry but you are not logged in..</h5>
                            <h5>Please Login to continue to orders Page</h5>
                            <Link to="/login" className="btn btn-warning m-4">Go to Login Page</Link>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default OrderPage
