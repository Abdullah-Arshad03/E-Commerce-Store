import React, { useEffect } from "react";
import { useGetOrderByIdQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, ListGroupItem, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast, Toaster } from 'react-hot-toast';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDeliverOrderMutation } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { orderId } = useParams();
  const { data, refetch, isLoading, error } = useGetOrderByIdQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
 const [ deliverOrder , { isLoading : loadingDeliver}] = useDeliverOrderMutation(orderId)
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal && !loadingPayPal && !errorPayPal && paypal.clientId) {
         paypalDispatch({
          type: 'resetOptions',
          value: {
            'clientId': paypal.clientId,
            currency: 'USD'
          }
        });
       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      }
    };

    loadPayPalScript();
  }, [loadingPayPal, errorPayPal, paypal, paypalDispatch]);

  async function onApproveTest(e) {
    e.preventDefault()
    try {
      await payOrder({ orderId, details: { id: orderId, updateTime: Date.now(), status: 'TestPay-Completed', emailAddress: userInfo.email } });
      refetch();
      toast.success('Payment Successful');
    } catch (error) {
      toast.error('Payment Failed');
    }
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment Successful!');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(dataa, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: data.order.totalPrice } }]
    }).then((orderId) => orderId);
  }

  function onError(error) {
    toast.error(error.message);
  }


  const onDeliverHandler = async(e) =>{
    e.preventDefault()

    try {
      const res = await deliverOrder(orderId).unwrap() 
      refetch()
      toast.success('Order Delivered!')
    } catch (error) {
      toast.error(error.data.message)
    }

  }
  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <h2>Order - {orderId}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3 className="mb-3">Shipping</h3>
                  <p><strong>Name: </strong>{data.order.user.name}</p>
                  <p><strong>Email: </strong>{data.order.user.email}</p>
                  <p><strong>Address: </strong>{data.order.shippingAddress.address} {data.order.shippingAddress.city}, {data.order.shippingAddress.postalCode} {data.order.shippingAddress.country}</p>
                  {data.order.isDelivered ? (
                    <Message variant="success">Delivered on {data.order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h3>Payment Method</h3>
                  <p><strong>Method: </strong>{data.order.paymentMethod}</p>
                  {data.order.isPaid ? (
                    <Message variant="success">Paid on {data.order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h3>Order Items</h3>
                  {data.order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={`http://localhost:8000/${item.image}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <p>
                            <Link to={`/products/${item.product}`}>
                              <span style={{ textDecorationLine: 'underline', color: 'black' }}>{item.name}</span>
                            </Link>
                          </p>
                        </Col>
                        <Col className="fw-semibold" md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush" className="fw-semibold">
                  <ListGroupItem><h2>Order Summary</h2></ListGroupItem>
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

                  {isPending && loadingPay ? (
                    <Loader />
                  ) : !data.order.isPaid ? (
                    <ListGroupItem>
                      <div>
                        <Button
                          className="buttonn"
                          onClick={onApproveTest}
                          style={{ marginTop: "10px", marginBottom: "15px", color: 'black', border: '1px solid black', padding: '5px 20px' }}
                        >
                          Test Pay Order
                        </Button>
                      </div>
                      <div>
                        {(!loadingPayPal && !isPending && !errorPayPal) && (
                          <PayPalButtons
                            onApprove={onApprove}
                            createOrder={createOrder}
                            onError={onError}
                          />
                        )}
                        {(loadingPayPal || isPending) && <Loader />}
                        {errorPayPal && <Message variant="danger">Failed to load PayPal SDK</Message>}
                      </div>
                    </ListGroupItem>
                  ) : (<><Message>Order is Paid!</Message></>)}

                  {loadingDeliver ? (<>
                  <Loader></Loader>
                  </>)  : (<></>)}


                  {
                    userInfo && userInfo.isAdmin && data.order.isPaid && !data.order.isDelivered ? (<>
                    <ListGroupItem>
                      <div style={{display :'flex' , justifyContent:'center' , alignItems : 'center'}}>
                    <Button
                          className="buttonn"
                          onClick={onDeliverHandler}
                          style={{ marginTop: "10px", marginBottom: "15px", color: 'black', border: '1px solid black', padding: '5px 20px' }}
                        >
                          Mark as Delivered
                        </Button>
                        </div>
                    </ListGroupItem>
                    </>) : (<></>)
                  }

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
