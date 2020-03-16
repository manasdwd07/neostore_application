
import axios from 'axios';

import React from 'react';

export const CarouselImages=()=> {
    
    return axios.get('http://180.149.241.208:3022/getAllCategories');
    
    
}
export const URL="http://180.149.241.208:3022/";

export const getPopularProducts=()=>{
    return axios.get(`${URL}defaultTopRatingProduct`);
}

export const getAllProducts=()=>{
    return axios.get(`${URL}commonProducts`);
}

export const getAllCategories=()=>{
    return axios.get(`${URL}getAllCategories`);
}

export const getAllColors=()=>{
    return axios.get(`${URL}getAllColors`);
}

export const checkLogin=(data)=>{
    return axios.post(`${URL}login`,data);
}

export const registerUser=(data)=>{
    return axios.post(`${URL}register`,data);
}