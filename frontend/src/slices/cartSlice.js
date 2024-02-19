import { createSlice } from "@reduxjs/toolkit";

// our items gonna be stored in the local storage so that when we leave the site we come back, and items should be in the cart

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : []}


const addDecimals = (num) =>{
    return( Math.round(num * 100)/100 ).toFixed(2)
}
 

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

            // calculate the ItemsPrice

            state.itemsPrice = addDecimals( state.cartItems.reduce((accumulator, item)=>{
                return accumulator + item.price * item.qty
            }, 0))

            console.log(' this is the price of the items : ' , state.itemsPrice)


            // calculate the shippingPrice
            
            // calculate the taxPrice
            // calculate the totalPrice

        }
    }
})


