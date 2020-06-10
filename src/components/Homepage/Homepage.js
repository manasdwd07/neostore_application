import React, { Component } from 'react';
import Header from '../Header/Header';
import { CarouselImages, getAllProducts,getCartDataApi } from '../../api/api';
import CarouselSlider from '../Carousel/CarouselSlider';
import PopularProducts from '../PopularProducts/PopularProducts';
import { getPopularProducts } from '../../api/api';
import Footer from '../Footer/Footer';
import { addToCartApi } from '../../api/api';
import sweetalert2 from 'sweetalert2';
import Swal from 'sweetalert2';
import { addToCart, searchProductId } from '../../actions/CartActions';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselImages: [],
            products: []
        }
    }

    // For getting carousel images on component mount

    async componentDidMount() {
        const images = await CarouselImages();
        this.setState({
            carouselImages: images.data.category_details
        })


        // For getting popular products on homepage
        const data = await getPopularProducts();
        this.setState({
            products: data.data.product_details
        })

        let cart = await getCartDataApi();
        let finalData = cart.data.product_details ? cart.data.product_details.map((item) => {
            item._id = item.product_id._id;
            return item
        }):[];
        localStorage.setItem("cart", JSON.stringify(finalData));
        localStorage.setItem("cart_count", finalData.length);

    }


    


    render() {
        

        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <br />
                <br />
                {this.state.carouselImages ? <CarouselSlider data={this.state.carouselImages} />:<CircularProgress color='primary'/>}
                <br />
                <br />
                {this.state.products ? <PopularProducts data={this.state.products} />:<CircularProgress color='primary'/>}
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
