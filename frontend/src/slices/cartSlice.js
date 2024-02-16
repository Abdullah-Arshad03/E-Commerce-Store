import { createSlice } from "@reduxjs/toolkit";

// our items gonna be stored in the local storage so that when we leave the site we come back, and items should be in the cart

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : []}
 

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {}
})


