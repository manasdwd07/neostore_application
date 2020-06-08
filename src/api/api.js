
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
const token=  userData ? userData.token:null;

// For adding data to cart
export const addToCartApi=(data)=>{
    return axios.post(`${URL}addProductToCartCheckout`,data,{ headers: {"Authorization" : `Bearer ${token}`} })
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

// For getting cart data
export const getCartDataApi=()=>{
    return axios.get(`${URL}getCartData`,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting user profile data
export const getProfileData=    ()=>{
    return axios.get(`${URL}getCustProfile`,{headers:{"Authorization":`Bearer ${token}`}})
}


// For getting customer address
export const getCustomerAddress=()=>{
    // return axios.get(`${URL}getCustAddress`)
    return axios.get(`${URL}getCustAddress`,{headers:{"Authorization":`Bearer ${token}`}})
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
export const editUserProfile=(data)=>{
    return axios.put(`${URL}profile`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting user orders
export const getUserOrders=()=>{
    return axios.get(`${URL}getOrderDetails`,{headers:{"Authorization":`Bearer ${token}`}})
}

// For deleting address
export const deleteAddress=(id)=>{
    return axios.delete(`${URL}deladdress/${id}`,{headers:{"Authorization":`Bearer ${token}`}})
}

// For editing customer address
export const editCustomerAddress=(data)=>{
    return axios.put(`${URL}updateAddress`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For updatind quantity in cart data
export const updateCartQuantity=(data)=>{
    return axios.post(`${URL}updateQuantityByCustId`,{headers:{"Authorization":`Bearer ${token}`}})
}

// For deleting cart data
export const deleteCartData=(id)=>{
    // return axios.delete(`${URL}deleteCustomerCart/${id}`,{headers:{"Authorization":`Bearer ${token}`}})
    return axios.delete(`${URL}deleteCustomerCart/${id}`,{headers:{"Authorization":`Bearer ${token}`}})
}

// for forgot password
export const forgotPassword=(email)=>{
    return axios.post(`${URL}forgotPassword`,email,{headers:{"Authorization":`Bearer ${token}`}})
}

// For recover password
export const recoverPassword=(data)=>{
    return axios.post(`${URL}recoverPassword`,data,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
}

// Footer Contact Form
export const  postContactForm=(data)=>{
    return axios.post(`${URL}contactUs`,data)
}

// For updating address
export const updateAddress=(data)=>{
    return axios.put(`${URL}updateAddress`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting order details
export const getOrderDetails=()=>{
    return axios.get(`${URL}getOrderDetails`,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting invoice of order
export const getInvoiceOfOrder=(data)=>{
    return axios.post(`${URL}getInvoiceOfOrder`,data,{headers:{"Authorization":`Bearer ${token}`}})
}

// For getting products by search text
export const getProductBySearchText=(text)=>{
    return axios.get(`${URL}getProductBySearchText/${text}`)
}