
import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import {authSlice} from './slices/authSlice'
import {cartSlice} from './slices/cartSlice'



const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartSlice.reducer,
        auth : authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools : true
})

export default store