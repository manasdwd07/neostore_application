import React, { Component } from 'react';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import { addToCart} from '../../actions/CartActions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';




class PopularProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    // -----------------------------------
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
                        'title': 'Data added successfully',
                        "icon": 'success'
                    });
                }
            }

        } catch (error) {
            Swal.fire({
                title: "Already added to cart",
                text: `Please check cart: ${error}`,
                icon: "warning",
                timer: 2000
            });
        }
    };

    specificProduct = (id) => {

        this.setState({
            id: id
        })
        localStorage.setItem('specificProductId', id);

    }

    // --------------------------------------
    render() {
        const productData = this.props.data;
        return (

            <div className="container-fluid">
                <h4 className="text-center">Popular Products</h4>
                <div className="text-center">
                    <Link to="/products" className="btn">View All</Link>
                </div>
                <br />

                <div className="row" >

                    {productData.map(el => {
                        return (
                            <div className="col-lg-3 text-center" key={el._id} style={{ width: "20%", paddingBottom: "20px" }}>
                                <div className="card" >
                                    <img className="card-img-top" src={`${URL}${el.DashboardProducts[0].product_image}`} alt="product_card_image" height="150px" width="auto" />
                                    <div className="card-body">
                                        <div onClick={(id) => this.specificProduct(el.DashboardProducts[0]._id)}><Link to='/specificProduct' className="card-title btn btn-light">{el.DashboardProducts[0].product_name}</Link></div>
                                        <br />
                                        <div><i className="fa fa-rupee"></i>&nbsp;<span><b className="text-center">{el.DashboardProducts[0].product_cost}</b></span></div>
                                        <br />
                                        <button onClick={() => this.addToCart(el.DashboardProducts[0].product_id, el.DashboardProducts[0])} className="btn btn-danger">Add To Cart</button>
                                        <div>
                                            <StarRatingComponent
                                                value={Number(el.DashboardProducts[0].product_rating)}
                                                editing={false}
                                                starCount={5}
                                                name='rating' />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        )
    }


}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => {
            dispatch(addToCart(id));
        }
    };
};

export default connect(null, mapDispatchToProps)(PopularProducts)