import React, { Component } from 'react';
import { URL } from '../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import {Link} from 'react-router-dom';




export const PopularProducts = (props) => {
                                            

    const productData = props.data;
    


    return (
        
        <div className="container-fluid">
            {console.log("Product data  getting", productData)}
            <h4 className="text-center">Popular Products</h4>
            <div className="text-center">
                <Link to="/products" className="btn">View All</Link>
            </div>
            <br/>

            <div className="row" >

                {productData.map(el => {
                    return (
                        <div className="col-lg-3 text-center" style={{ width: "20%",paddingBottom:"20px" }}>
                            <div className="card" >
                                <img className="card-img-top" src={`${URL}${el.DashboardProducts[0].product_image}`} alt="card image" height="150px" width="auto"/>
                                <div className="card-body">
                                    <div><a href="#" className="card-title">{el.DashboardProducts[0].product_name}</a></div>
                                    <br/>
                                    <div><i className="fa fa-rupee"></i>&nbsp;<span><b clasName="text-center">{el.DashboardProducts[0].product_cost}</b></span></div>
                                    <br/>
                                    <button className="btn btn-danger">Add To Cart</button>
                                    <div>
                                        <StarRatingComponent 
                                            value={el.DashboardProducts[0].product_rating}
                                            editing={false}
                                            starCount={5}
                                            name='rating'/>
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

export default PopularProducts

