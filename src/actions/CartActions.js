// Initiate Cart Count with 0
export const cartCount=cartCount=>{
    return {
        type:'INITIAL_CART_COUNT',
        cartCount
    };
};


// For adding to cart
export const addToCart=()=>{
    return {
        type : 'ADD_TO_CART'
    };
};

// For Removing Item from cart
export const removeFromCart = () =>{
    return {
        type: 'REMOVE_FROM_CART'
    };
};



// For Adding quantity in cart
export const AddQuantity=id=>{
    return {
        type:'ADD_QUANTITY',
        id
    };
};


// For subtracting quantity from cart
export const subtactQuantity=id=>{
    return{
        type:'SUBTRACT_QUANTITY',
        id
    };
};

