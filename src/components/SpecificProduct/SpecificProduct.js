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
import Swal from 'sweetalert2';
import { addToCart } from '../../actions/CartActions';
import { connect } from 'react-redux';
import Rating from "@material-ui/lab/Rating";
import './ProductCard.css';
import ReactImageMagnify from 'react-image-magnify';


class SpecificProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            cartCount: 0,
            showDetail:true
        }
    }

    // For gettting product details on component mounting
    async componentDidMount() {
        const productId = localStorage.getItem('specificProductId');

        const specificProduct = await getSpecificProduct(productId);
        this.setState({
            data: specificProduct.data.product_details[0]
        })

    }

    // Add to cart handler
    addToCart = async (id, data) => {
        this.props.addToCart(id);

        try {
            let finalData = {
                _id: data._id,
                product_id: data,
                product_cost: data.product_cost,
                total_productCost: data.product_cost,
                quantity: 1
            };
            let cartData = localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart"))
                : null;
            if (cartData === null) {
                let tempData = [];
                tempData.push(finalData);
                localStorage.setItem("cart", JSON.stringify(tempData));
                Swal.fire({
                    'title': 'Product added to cart successfully',
                    "icon": 'success'
                });
                localStorage.getItem('cart'.length)
            } else {
                let existed_item = cartData.find(item => id === item._id);
                if (existed_item) {
                    Swal.fire({
                        'title': 'Product already exists in cart',
                        "icon": 'warning'
                    });
                } else {
                    cartData.push(finalData);
                    localStorage.setItem("cart", JSON.stringify(cartData));
                    Swal.fire({
                        'title': 'Product added to cart successfully',
                        "icon": 'success'
                    });
                    localStorage.getItem('cart'.length)
                    this.setState({ cartCount: this.state.cartCount + 1 })
                }
            }

        } catch (error) {
            Swal.fire({
                title: "Already added to cart",
                text: "Please check cart",
                icon: "warning",
                timer: 2000
            });
        }
    };

    render() {
        // const productId = localStorage.getItem('specificProductId');
        const productData = this.state.data
        return (

            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                {this.state.data ?
                    <div className="container mt-5 mb-5">
                        {this.state.data.product_image ?
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 text-left" onMouseEnter={()=>{this.setState({showDetail:false})}} onMouseLeave={()=>{this.setState({showDetail:true})}}>
                                        <ReactImageMagnify
                                            {...{
                                                smallImage: {
                                                    alt: "product",
                                                    src: URL + productData.product_image,
                                                    width: 450,
                                                    height: 300
                                                },
                                                largeImage: {
                                                    src: URL + productData.product_image,
                                                    width: 2000,
                                                    height: 4000,
                                                },
                                            }}
                                        />
                                        <div className="d-flex justify-content-around pt-2 pb-2">
                                            {this.state.data.subImages_id.product_subImages.map((item) => {
                                                return (
                                                    <div>
                                                        <img
                                                            src={
                                                                URL + item
                                                            }
                                                            alt="sofa"
                                                            style={{ width: "80px", height: "50px" }}
                                                            onClick={() =>
                                                                this.setState({
                                                                    mainImage: item,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {this.state.showDetail===true ? <div className="col-6">
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

                                        <FacebookIcon color="primary" />&nbsp;
                                        <EmailIcon color="secondary" />&nbsp;
                                        <WhatsAppIcon color={"action "} />&nbsp;
                                        <TwitterIcon color="primary" />&nbsp;
                                        <InstagramIcon color={"error"} />&nbsp;

                                        <div className="row mt-3" >
                                            <div className="col-4"><button className="btn btn-info" onClick={() => this.addToCart(productData.product_id, productData)}>ADD TO CART</button></div>
                                            
                                            <div className="col-7">
                                                <button
                                                    className="btn btn-warning m-1"
                                                    disabled={localStorage.getItem("loginUserData") ? false : true}
                                                    data-toggle="modal"
                                                    data-target="#myModal"
                                                >
                                                    GIVE RATING
                                             </button>
                                            </div>
                                        </div>


                                        
                                        <div class="modal fade" id="myModal">
                                            <div class="modal-dialog modal-sm modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Rating</h4>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            &times;
                                                        </button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <Rating name="read-only" onChange={this.handleRating} />
                                                    </div>

                                                    <div class="modal-footer text-center">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary"
                                                            onClick={this.handleRatingSubmit}
                                                            disabled={false}
                                                            data-dismiss="modal"
                                                        >
                                                            Give Rating
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>:null}
                                </div>
                            </div>








                            : <div className="container text-center mt-5 mb-5"><CircularProgress color="inherit" /></div>}
                        
                    </div> : <div className=" container text-center m-5">
                        <CircularProgress color="inherit" />
                    </div>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => {
            dispatch(addToCart(id));
        }
    }
}

export default connect(null, mapDispatchToProps)(SpecificProduct)
