import React from 'react';
import {URL} from '../../api/api';
import Carousel from 'react-bootstrap/Carousel';
import sweetalert2 from 'sweetalert2';
import {withRouter} from 'react-router-dom';

// Functional Component which obtains the carousel slides
const CarouselSlider = props => {
   
    return (
        
        <Carousel>
            {props.data.map((item, i) => {
                return (
                    
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={URL + item.product_image}
                            alt={item.category_name}
                            key={i}
                            height="500px"
                            onClick={()=>{
                                sweetalert2.fire({
                                    'text':'Getting products ready for you in 2 seconds',
                                    'icon':'success'
                                });
                                setTimeout(()=>{
                                    props.history.push(`/products/${item.category_id}`)
                                    // props.history.push(`/products/${item.category_id}`)
                                },1000) 
                            }
                            }

                        />
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default withRouter(CarouselSlider) ;

