
import axios from 'axios';

import React from 'react';

// For getting Carousel Images on homepage
export const CarouselImages=()=> {
    
    return axios.get('http://180.149.241.208:3022/getAllCategories');
    
}

// Universal URL to be used elsewhere
export const URL="http://180.149.241.208:3022/";


// Gets popular products on home page
export const getPopularProducts=()=>{
    return axios.get(`${URL}defaultTopRatingProduct`);
}

// For getting all products in products page
export const getAllProducts=()=>{
    return axios.get(`${URL}commonProducts`);
}

// For getting list of categories
export const getAllCategories=()=>{
    return axios.get(`${URL}getAllCategories`);
}

// For getting list of colors
export const getAllColors=()=>{
    return axios.get(`${URL}getAllColors`);
}

// Checking user login or not
export const checkLogin=(data)=>{
    return axios.post(`${URL}login`,data);
}

// For registering user 
export const registerUser=(data)=>{
    return axios.post(`${URL}register`,data);
}

// For getting products by category
export const getProductByCategory=(data)=>{
    return axios.get(`${URL}getProductByCateg/${data}`)
}

// For getting products by color
export const getProductByColor=(data)=>{
    return axios.get(`${URL}getProductBycolor/${data}`)
}


// Getting token value from localStorage
const data1 = localStorage.getItem('loginUserData');
const userData = JSON.parse(data1);
const token=userData.token;


export const addToCartApi=(data)=>{
    return axios.post(`${URL}addDataToCart`,data,{ headers: {"Authorization" : `Bearer ${token}`} })
}

// For getting products by rating
export const getProductsByRating=()=>{
    return axios.get(`${URL}getAllProductsInHighestRating`)
}

// For Sorting products high to low price
export const getDescendingProducts=()=>{
    return axios.get(`${URL}getAllProductsInDescending`)
}

// For Sorting products low to high price
export const getAscendingProducts=()=>{
    return axios.get(`${URL}getAllProductsInAscending`)
}

// For getting product details
export const getSpecificProduct=(id)=>{
    return axios.get(`${URL}getProductByProdId/${id}`)
}

// For adding to cart
export const getCartDataApi=()=>{
    
}

// For getting user profile data
export const getProfileData=()=>{
    return axios.get(`${URL}getCustProfile`,{headers:{"Authorization":`Bearer ${token}`}})
}


// For getting customer address
export const getCustomerAddress=()=>{
    // return axios.get(`${URL}getCustAddress`)
    return axios.get('http://localhost:5000/data',{headers:{"Authorization":`Bearer ${token}`}})
}

// For adding address
export const addCustomerAddress=(data)=>{
    return axios.post(`${URL}address`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For reset password
export const resetPassword=(data)=>{
    return axios.post(`${URL}changePassword`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For editing customer profile
export const editProfile=(data)=>{
    return axios.post(`${URL}profile`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting user orders
export const getUserOrders=()=>{
    return axios.get(`${URL}getOrderDetails`,{headers:{"Authorization":`Bearer ${token}`}})
}

