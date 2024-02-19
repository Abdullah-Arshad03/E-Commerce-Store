import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// our items gonna be stored in the local storage so that when we leave the site we come back, and items should be in the cart

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : []}




export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart : (state , action)=>{
                
            const item = action.payload

            const existItem = state.cartItems.find((x)=> x._id === item._id)

            if(!existItem){
                state.cartItems = [...state.cartItems , item ]
            }
            
            updateCart(state)
         
        }
    }
})


// we have to export the addToCart reducer function as an action


// every function we created inside the reducer we have to export that function as an action separately 

export const { addToCart } = cartSlice.actions