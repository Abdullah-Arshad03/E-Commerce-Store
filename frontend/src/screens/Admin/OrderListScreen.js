import React from "react";
import { useGetOrderListQuery } from "../../slices/ordersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import { Button } from "@mui/material";

const OrderListScreen = () => {
  const { data, isLoading, error } = useGetOrderListQuery();
  console.log(" this is the fetch orderlist", data);
  return (
    <>
      <h2 style={{marginBottom:'25px'}}>Orders</h2>
      {isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : error ? (
        <>
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        </>
      ) : (
        <>
          {/* striped hover responsive className="table-sm" */}
          <Table stripped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            {data.orders.map((order) => (
              <>
                <tbody>
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <>{order.paidAt.substring(0, 10)}</>
                      ) : (
                        <>
                          <FaTimes style={{color: 'red'}}></FaTimes>
                        </>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <>{order.deliveredAt.substring(0, 10)}</>
                      ) : (
                        <>
                          <FaTimes style={{color: 'red'}}></FaTimes>
                        </>
                      )}
                    </td>

                    <td>
                    <LinkContainer style={{color: 'black' , border : '1px solid black' ,padding: "3px 20px",}} to={`/order/${order._id }`}>
                          <Button
                            className="buttonn"
                          
                          >
                  Details

                          </Button>
                          </LinkContainer>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </Table>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
