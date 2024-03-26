import { apiSlice } from "./apiSlice";
import { ORDERS_URL ,PAYPAL_URL } from "../constants";
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
        // this get request provide order details
        getOrderById : builder.query({
           query : (orderId)=>({
            url : `${ORDERS_URL}/${orderId}`,
            method : 'GET'
           }),
           keepUnusedDataFor : 5
        }),

        payOrder : builder.mutation({
          query : ({orderId , details })=>({
            url : `${ORDERS_URL}/${orderId}/pay`, // this the route which we created at the backend
            method  : 'PUT',
            body : { ...details },
              
          })
        }), 

        getPaypalClientId : builder.query({
         query  : ()=>({
            url : `${PAYPAL_URL}`
         }),
         keepUnusedDataFor : 5
        }),


        LoggedInOrders : builder.query({
         query : ()=>({
             url : `${ORDERS_URL}/myorders`,
             method : 'GET'
         }),
         keepUnusedDataFor : 5
        })
        ,

        getOrderList : builder.query({
         query : ()=>({
            url : `${ORDERS_URL}/`,
            method : 'GET'
         }),
         keepUnusedDataFor : 5
        })

     })
})

export {orderApiSlice}

export const {useCreateOrderMutation , useGetOrderByIdQuery , useGetPaypalClientIdQuery , usePayOrderMutation , useLoggedInOrdersQuery , useGetOrderListQuery} = orderApiSlice