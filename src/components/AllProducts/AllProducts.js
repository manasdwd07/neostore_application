import React,{Component} from 'react';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import {addToCartApi} from '../../api/api';
import {Link} from 'react-router-dom';
import sweetalert2 from 'sweetalert2';


class AllProducts extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            cartCount:0
        }
    }
    
    
    specificProduct=(id)=>{
        console.log('productIdChipkaya:-',id);
        this.setState({
            id:id
        })
       localStorage.setItem('specificProductId',id);
        
    }

    addToCart=async (id)=>{
        const postData=[{
            '_id':`${id}`,
            'product_id':`${id}`,
            'quantity':`1`},{
            'flag':'logout'
        }]

        const data=await addToCartApi(postData)
        .then(async (res)=>{
            // this.setState({cartCount:this.state.cartCount+1});
            // console.log(this.state.cartCount)
            // localStorage.setItem('cart_count',this.state.cartCount)
            sweetalert2.fire({
                "title": 'Added to cart',
                'text': 'Item added to cart successfully',
                "icon": 'success'
            })
            this.setState({cartCount:this.state.cartCount+1});
            console.log(this.state.cartCount)
            localStorage.setItem('cart_count',this.state.cartCount)
           
        })
        .catch((err)=>{
            sweetalert2.fire({
                "title": 'Action denied',
                'text': 'Item already added to cart',
                "icon": 'warning'
            })
        })

    }

    
   
    render(){
        const images = this.props.data

        return (
            <div className="container">
                

                <div className="row">
                    {images.map(el => {
                        
                        return (
                            <div className="col-lg-4">
                                <div className="card" style={{ marginBottom: "5%" }}>
                                    <div><img className="card-img-top" src={`${URL}${el.product_image}`} height="150px" /></div><br />
                                    <div className="card-body">
                                        <div onClick={(id)=>this.specificProduct(el._id)}><Link to="/specificProduct"  style={{ fontSize: 'smaller' }}>{el.product_name}</Link></div><br />
                                        <div><i className="fa fa-rupee"></i>&nbsp;<span><b>{el.product_cost}</b></span></div><br />
                                        <div><button onClick={(id)=>this.addToCart(el._id)} className="btn btn-danger">Add To Cart</button></div>
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

export default AllProducts
