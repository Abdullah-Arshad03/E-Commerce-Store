import React from "react";
import { useEffect } from "react";
import { useGetOrderByIdQuery , useGetPaypalClientIdQuery , usePayOrderMutation} from "../slices/ordersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, ListGroupItem ,Image ,Card} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {toast , Toaster} from 'react-hot-toast'

const OrderScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // the refech is the function, which we just call to refetch the new data.
  const { data, refetch, isLoading, error } = useGetOrderByIdQuery(orderId);

  const [payOrder , {isLoading : loadingPay}] = usePayOrderMutation()

  const [{isPending} , paypalDispatch] = usePayPalScriptReducer()

 const {data : paypal , isLoading : loadingPayPal , error : errorPayPal} = useGetPaypalClientIdQuery()

  const info = useSelector((state)=> state.auth)

  const {userInfo} = info

  // useEffect(()=>{
  //   if(!errorPayPal && !loadingPayPal && paypal.clientId) {
  //     const loadPayPalScript = async ()=>{
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value : {
  //           'clientId' : paypal.clientId,
  //           currency : 'USD'
  //         }
  //       })

  //       paypalDispatch({type : 'setLoadingStatus' , value : 'pending'})

  //     }
  //     if(data.order && !data.order.isPaid) {
  //       if (!window.paypal) {
  //         loadPayPalScript()

  //       }

  //     }
  //   }

  // }, [data, paypal,paypalDispatch, loadingPayPal, errorPayPal])


  return (
    <>
      {isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : error ? (
        <>
          <Message variant="danger">{error?.data?.message}</Message>
        </>
      ) : (
        <>
          <h2>Order - {orderId}</h2>
          <Row>
            <Col md={8}>
              {" "}
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3 className="mb-3">Shipping</h3>
                  <p>
                    <strong>Name: </strong> {data.order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {data.order.user.email}
                  </p>
                  <p>
                    <strong>Address: </strong>{" "}
                    {data.order.shippingAddress.address}{" "}
                    {data.order.shippingAddress.city},{" "}
                    {data.order.shippingAddress.postalCode}{" "}
                    {data.order.shippingAddress.country}
                  </p>
                  {data.order.isDelivered ? (
                    <>
                      <Message variant="success">
                        Delivered on {data.order.deliveredAt}
                      </Message>
                    </>
                  ) : (
                    <>
                      <Message variant="danger">Not Delivered</Message>
                    </>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Method: </strong> {data.order.paymentMethod}
                  </p>
                  {data.order.isPaid ? (
                    <>
                      <Message variant="success">
                        Paid on {data.order.paidAt}
                      </Message>
                    </>
                  ) : (
                    <>
                      <Message variant="danger">Not Paid</Message>
                    </>
                  )}
                </ListGroupItem>


                <ListGroupItem>
                    <h3>Order Items</h3>
                    {
                        data.order.orderItems.map((item, index)=>(
                            <ListGroupItem>
                            <Row>
                                <Col md={1}>
                                    <Image src={item.image}
                                    alt={item.name} fluid rounded></Image>
                                </Col>
                                <Col>
                                <Link to={`/products/${item.product}`}>

                                    <span style={{textDecorationLine : 'underline', color:'black'}}>{item.name}</span>
                                </Link>
                                </Col>
                                <Col className="fw-semibold"  md={4}>
                                    {item.qty} x ${item.price} = ${item.qty*item.price}
                                </Col>
                            </Row>
                            </ListGroupItem>
                        ))
                    }
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={4}>
          <Card>
            <ListGroup variant="flush" className="fw-semibold">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${data.order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${data.order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${data.order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${data.order.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              
            </ListGroup>
          </Card>
</Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
