import React from "react";
import { useEffect } from "react";
// to check that if there will no Shipping Address we have to redirect to the address and if there is no payment method we have to redirect bakc to the payment method.
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast , Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [placeOrder, { isLoading, error }] = useCreateOrderMutation();
  
  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {

    try {
        const res = await placeOrder({
            orderItems : cart.cartItems ,
            shippingAddress : {...cart.shippingAddress} ,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice,
        }).unwrap()
        console.log('order is placed!',res)
        // dispatch(clearCartItems())
        console.log('order is placed!')
        navigate(`/order/${res.createdOrder._id}`) // that is the id of the order document created in the database!
    } catch (error) {
       toast.error(error)
    }
  };

  return (
    <>
    <Toaster></Toaster>
      <CheckoutSteps
        step1={true}
        step2={true}
        step3={true}
        step4={true}
      ></CheckoutSteps>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <>
                  <Message>Your Cart is Empty</Message>
                </>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroupItem>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>

                          <Col>
                            <Link to={`/products/${item._id}`}>
                              <span
                                style={{
                                  color: "black",
                                  textDecorationLine: "underline",
                                }}
                              >
                                {item.name}
                              </span>
                            </Link>
                          </Col>

                          <Col md={4} className="fw-semibold">
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </>
              )}
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="buttonn"
                  type="submit"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  style={{
                    marginTop: "10px",
                    color: "black",
                    border: "1px solid black",
                    padding: "5px 20px",
                  }}
                >
                  Place Order
                </Button>
                {isLoading? (<><Loader></Loader></>) : (<></>)}
              </ListGroupItem>
            </ListGroup>
          </Card>


          <ListGroup variant="flush">
            <ListGroupItem>
              {error ? (
                <>
                  <Message>Unfortunately Ordered isnt Placed</Message>
                </>
              ) : (
                <></>
              )}
            </ListGroupItem>



          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
