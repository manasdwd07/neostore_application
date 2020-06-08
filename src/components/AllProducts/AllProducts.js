import React, { Component } from 'react';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import { addToCartApi } from '../../api/api';
import { Link } from 'react-router-dom';
import sweetalert2 from 'sweetalert2';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { addToCart, searchProductId } from '../../actions/CartActions';



class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cartCount: 0
        }
    }

    componentDidMount=()=>{
        const count=localStorage.getItem('cart')
        if(count){
            this.setState({cartCount:count.length})
        }
    }


    specificProduct = (id) => {
        console.log('productIdChipkaya:-', id);
        this.setState({
            id: id
        })
        localStorage.setItem('specificProductId', id);

    }



    // ----------------------------------
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
                localStorage.getItem('cart'.length)


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
                    localStorage.getItem('cart'.length)
                    this.setState({ cartCount: 1 });
                    Swal.fire({
                        'title': 'Product added to cart successfully',
                        "icon": 'success'
                    });

                    localStorage.getItem('cart'.length);
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
            console.log(error);
        }
    };
    // -----------------------------------




    render() {
        const images = this.props.data
        console.log('popproductsprops', this.props)

        return (
            <div className="container">


                <div className="row">
                    {images.map(el => {

                        return (
                            <div className="col-lg-4">
                                <div className="card" style={{ marginBottom: "5%" }}>
                                    <div><img className="card-img-top" src={`${URL}${el.product_image}`} height="150px" /></div><br />
                                    <div className="card-body">
                                        <div onClick={(id) => this.specificProduct(el._id)}><Link to="/specificProduct" style={{ fontSize: 'smaller' }}>{el.product_name}</Link></div><br />
                                        <div><i className="fa fa-rupee"></i>&nbsp;<span><b>{el.product_cost}</b></span></div><br />
                                        <div><button onClick={() => this.addToCart(el._id, el)} className="btn btn-danger">Add To Cart</button></div>
                                        <div>
                                            <StarRatingComponent
                                                value={el.product_rating}
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

export default connect(null, mapDispatchToProps)(AllProducts)
