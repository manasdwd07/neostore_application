import React, { Component } from 'react';
import Header from '../Header/Header';
import {CarouselImages, getAllProducts} from '../../api/api';
import CarouselSlider from '../Carousel/CarouselSlider';
import PopularProducts from '../PopularProducts/PopularProducts';
import {getPopularProducts} from '../../api/api';
import Footer from '../Footer/Footer';


class Homepage extends Component {
    constructor(props){
        super(props);
        this.state={
            carouselImages:[],
            products:[]
        }
    }

     async componentDidMount(){
        const images= await CarouselImages();
        console.log("images..... ",images.data.category_details);
        this.setState({
            carouselImages:images.data.category_details
        })
        
        

        const data = await getPopularProducts();
        this.setState({
            products: data.data.product_details
        })

       
    }

    render() {

        return (
            <div>
                
                <br/>
                <br/>
                <CarouselSlider data={this.state.carouselImages}/>
                <br/>
                <br/>
                <PopularProducts data={this.state.products}/>
                
            </div>
        )
    }
}

export default Homepage
