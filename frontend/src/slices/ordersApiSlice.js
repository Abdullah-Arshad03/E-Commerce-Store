import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";
// import { getAllOrders } from "../../../backend/controllers/orderController";


const orderApiSlice = apiSlice.injectEndpoints({
     endpoints : (builder) =>({
        createOrder : builder.mutation({
            query : (data)=>({
                url : `${ORDERS_URL}/mine`,
                method : 'POST',
                body : {...data}
                
             })
        }), 
        getOrderById : builder.query({
           query : (orderId)=>({
            url : `${ORDERS_URL}/${orderId}`,
            method : 'GET'
           }),
           keepUnusedDataFor : 5
        })
     })
})

export {orderApiSlice}

export const {useCreateOrderMutation , useGetOrderByIdQuery} = orderApiSlice