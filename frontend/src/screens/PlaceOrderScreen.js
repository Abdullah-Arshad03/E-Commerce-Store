import React from "react";
import { useEffect } from "react"; 
// to check that if there will no Shipping Address we have to redirect to the address and if there is no payment method we have to redirect bakc to the payment method.
import { Link, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, List  } from "@mui/material";
import { Row, Col , ListGroup , Image, Card, ListGroupItem } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
 import { clearCartItems } from "../slices/cartSlice";
 import { useCreateOrderMutation } from "../slices/ordersApiSlice";
 import Loader from "../components/Loader";
 import Message from "../components/Message";


const PlaceOrderScreen = () =>{

    const navigate = useNavigate()
    const cart = useSelector((state)=> state.cart)
    useEffect(()=>{

        if(!cart.shippingAddress){
            navigate("/shipping")
        }
        else if(!cart.paymentMethod){
            navigate('/payment')
        }


    }, [cart.shippingAddress, cart.paymentMethod, navigate])

    return(<>
    <CheckoutSteps step1={true} step2={true} step3={true} step4={true}></CheckoutSteps>
    <Row>
        <Col md={8}> <ListGroup variant="flush">
            <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                    <strong>Address:  </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, { cart.shippingAddress.country}
                    </p>
            </ListGroupItem>

            <ListGroupItem>
           <h2>Payment Method</h2>
           <p>
             <strong>Payment Method: </strong>
             {
                cart.paymentMethod
             }

           </p>

            </ListGroupItem>



            
        </ListGroup>
        </Col>

       
        <Col md={4}>Column</Col>
    </Row>
        
    </>)
}

export default PlaceOrderScreen
