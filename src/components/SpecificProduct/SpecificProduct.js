import React, { Component } from 'react';
import Header from '../Header/Header';
import { getSpecificProduct } from '../../api/api';
import { CircularProgress } from '@material-ui/core';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';



export class SpecificProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    async componentDidMount() {
        const productId = localStorage.getItem('specificProductId');
        console.log(('productId:-', productId));

        const specificProduct = await getSpecificProduct(productId);
        this.setState({
            data: specificProduct.data.product_details[0]
        })
        console.log('specific product data:- ', this.state.data);

    }
    render() {
        const productId = localStorage.getItem('specificProductId');
        const productData = this.state.data
        return (

            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                {this.state.data ?
                    <div className="container mt-5 mb-5">
                        {/* <div className="row">
                            <div className="col-6"> */}
                        {this.state.data.product_image ?
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <img src={`${URL}${productData.product_image}`} width="100%" />
                                    </div>
                                    <div className="col-6">
                                        <h1>{productData.product_name}</h1>
                                        <div>
                                            <StarRatingComponent
                                                value={productData.product_rating}
                                                editing={false}
                                                starCount={5}
                                                name='rating' />
                                        </div>
                                        <hr />
                                        <h6>Price :-  {productData.product_cost}</h6>
                                        <h6>Color :-  <span className="btn" style={{ backgroundColor: `${productData.color_id.color_code}` }}></span></h6>
                                        <h5 className="mt-3">Share&nbsp; <ShareIcon color="inherit" /></h5>
                                        
                                        <FacebookIcon color="primary"/>&nbsp;
                                        <EmailIcon color="secondary"/>&nbsp;
                                        <WhatsAppIcon color={"action "}/>&nbsp;
                                        <TwitterIcon color="primary"/>&nbsp;
                                        <InstagramIcon color={"error"}/>&nbsp;
                                        
                                        <div className="row mt-3" >
                                            <div className="col-4"><button className="btn btn-info">ADD TO CART</button></div>
                                            <div className="col-7"><button className="btn btn-warning">RATE PRODUCT</button></div>

                                        </div>
                                    </div>
                                </div>
                            </div>








                            : <div className="container text-center mt-5 mb-5"><CircularProgress color="inherit" /></div>}
                        {/* </div> */}

                        {/* </div> */}
                    </div> : <div className=" container text-center m-5">
                        <CircularProgress color="inherit" />
                    </div>}
            </div>
        )
    }
}

export default SpecificProduct
