export const initialState={
    items:[],
    addedItems:[],
    cartCount:0,
    searchProductId:0
}

const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            return{...state,cartCount:state.cartCount+1}
        case 'REMOVE_FROM_CART':
            return{...state,cartCount:state.cartCount-1}
        case 'REMOVE_ITEM_FROM_CART':
            let itemToRemove=state.addedItems.find(item=>action.id === item.id)
            let newItems=state.addedItems.filter(item=>action.id!==item.id)

            let Total=state.total - (itemToRemove.price*itemToRemove.quantity)
            return {...state,addedItems:newItems,total:Total}
        case 'ADD_QUANTITY':
                let addedItem = state.items.find(item=> item.id === action.id)
                addedItem.quantity += 1 
                let newTotal = state.total + addedItem.price
                return{
                    ...state,
                    total: newTotal
                }
        case 'SUBTRACT_QUANTITY':
                let addedItem1 = state.items.find(item=> item.id === action.id) 
                //if the qt == 0 then it should be removed
                if(addedItem1.quantity === 1){
                    let new_items = state.addedItems.filter(item=>item.id !== action.id)
                    let newTotal = state.total - addedItem1.price
                    return{
                        ...state,
                        addedItems: new_items,
                        total: newTotal
                    }
                }
                else {
                    addedItem.quantity -= 1
                    let newTotal = state.total - addedItem.price
                    return{
                        ...state,
                        total: newTotal
                    }
                }
                
        default:return {...state}
    }   
}

export default cartReducer