import React from "react";
import { useGetOrderListQuery } from "../../slices/ordersApiSlice";
import { useSelector , useDispatch} from "react-redux";

const OrderListScreen = () =>{


    // const {data , isLoading , error} = useGetOrderListQuery()
    // console.log(' this is the fetch orderlist' , data)
    return(<>
    <h2>Order List Screen</h2>
    </>)
}

export default OrderListScreen