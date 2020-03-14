import React from 'react';
import {URL} from '../../api/api';
import Carousel from 'react-bootstrap/Carousel';

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
                        />
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default CarouselSlider;

