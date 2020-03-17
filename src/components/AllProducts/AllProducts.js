import React,{Component} from 'react';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';

class AllProducts extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    openSpecificProduct=(data)=>{
        
    }
    render(){
        const images = this.props.data

        return (
            <div className="container">
                <div className="row" style={{ width: "100%" }}>
                    <h2 style={{ float: "left" }}>All Categories</h2>
                    <h2 style={{ marginLeft: "40%" }}>Sort By</h2>
                </div>

                <div className="row">
                    {images.map(el => {

                        return (
                            <div className="col-lg-4">
                                <div className="card" style={{ marginBottom: "5%" }}>
                                    <div><img className="card-img-top" src={`${URL}${el.product_image}`} height="150px" /></div><br />
                                    <div className="card-body">
                                        <div><a href="#" onClick={this.openSpecificProduct(el.product_id)} style={{ fontSize: 'smaller' }}>{el.product_name}</a></div><br />
                                        <div><i className="fa fa-rupee"></i>&nbsp;<span><b>{el.product_cost}</b></span></div><br />
                                        <div><button className="btn btn-danger">Add To Cart</button></div>
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
