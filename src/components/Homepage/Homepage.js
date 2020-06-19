import React, { Component } from 'react';
import Header from '../Header/Header';
import { CarouselImages } from '../../api/api';
import CarouselSlider from '../Carousel/CarouselSlider';
import PopularProducts from '../PopularProducts/PopularProducts';
import { getPopularProducts } from '../../api/api';
import { addToCart } from '../../actions/CartActions';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselImages: [],
            products: [],
            count:0
        }
    }

    // For getting carousel images on component mount

    async componentDidMount() {
        const images = await CarouselImages();
        this.setState({
            carouselImages: images.data.category_details
        })
        // if (localStorage.getItem('loginUserData')) {
        //     let cart = await getCartDataApi()


        //     //Converting into common format of product details 
        //     let finalData = cart.data.product_details ? cart.data.product_details.map((item) => {
        //         item._id = item.product_id._id;
        //         return item
        //     }) : [];


        //     localStorage.setItem("cart", JSON.stringify(finalData));
        //     localStorage.setItem("cart_count", finalData.length);
        // }


        const count=localStorage.getItem('cart').length
        this.setState({count:count})        
        // For getting popular products on homepage
        const data = await getPopularProducts();
        this.setState({
            products: data.data.product_details
        })

        // let cart = await getCartDataApi()
        // cart.then(res=>{
        //     let finalData = res.data.product_details ? res.data.product_details.map((item) => {
        //         item._id = item.product_id._id;
        //         return item
        //     }):[];
        //     localStorage.setItem("cart", JSON.stringify(finalData));
        //     localStorage.setItem("cart_count", finalData.length);
        // }).catch(err=>{
        //     alert(err)
        // })


    }

    componentDidUpdate(){
        
    }

    

    



    

    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <br />
                <br />
                {this.state.carouselImages ? <CarouselSlider data={this.state.carouselImages} /> : <CircularProgress color='primary' />}
                <br />
                <br />
                {this.state.products ? <PopularProducts data={this.state.products} /> : <CircularProgress color='primary' />}
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



export default connect(null, mapDispatchToProps)(Homepage)
