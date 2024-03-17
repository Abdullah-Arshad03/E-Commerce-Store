import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// our items gonna be stored in the local storage so that when we leave the site we come back, and items should be in the cart

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] , shippingAddress : {} , paymentMethod : 'Paypal' };


// this below cartSlice is the reducers actually it will added in the store after exporting from here as an reducer function
const cartSlice = createSlice({
  name: "cart",
  initialState : initialState,
  reducers: {
    //these below all functions inside th reducers key is the actions and will be export as an actions i-e cartSlice.actions, and then for calling them in any component of the app we can use the useDispatch from the react-redux
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

     return updateCart(state);
    },

    removeFromCart : (state , action) =>{
      const prodId = action.payload

      state.cartItems = state.cartItems.filter((x)=>x._id !== prodId)

      return updateCart(state)
      
    }, 
    saveShippingAddress : ( state , action )=>{
        state.shippingAddress = action.payload

        return updateCart(state)
    },
    savePaymentMethod : (state , action) =>{
      state.paymentMethod = action.payload

      return updateCart(state)
    }

  },
});


// we have to export the addToCart reducer function as an action
// every function we created inside the reducer we have to export that function as an action separately
export {cartSlice}
export const { addToCart , removeFromCart , saveShippingAddress , savePaymentMethod } = cartSlice.actions;

