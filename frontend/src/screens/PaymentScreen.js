import React from "react";
import { useState, useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector , useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, FormGroup, FormLabel , Col, FormCheck} from "react-bootstrap";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import { toast, Toaster } from "react-hot-toast";


const PaymentScreen =()=>{

const dispatch = useDispatch()
const navigate = useNavigate()

    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart
    const [paymentMethod , setPaymentMethod] = useState('Paypal')

const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
}

useEffect(()=>{
    console.log()
    if(shippingAddress.address === '' || shippingAddress.city === '' || shippingAddress.postalCode === '' || shippingAddress.country ===''){
        navigate('/shipping')
        toast.error('Please Fill All Feilds')
    }
    
}, [shippingAddress , navigate])

    return(<>
    <Toaster></Toaster>
    <FormContainer>
     <CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
     <h1>Payment Method</h1>

     <Form onSubmit={submitHandler}>
        <FormGroup>
            <FormLabel as='legend'>
                Select Method
            </FormLabel>
            <Col>
            <FormCheck

            type="radio"
            className="my-2"
            label= 'Paypal or Credit Card'
            id = 'Paypal'
            name="paymentMethod"
            value='Paypal'
            checked
            onChange={(e)=> setPaymentMethod(e.target.value)}

            >

            </FormCheck>
            
            </Col>

        </FormGroup>
        <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
        <Button
            className="buttonn"
            // variant="outlined"
             type="submit"
            //  disabled = {isLoading}
            style={{marginTop: "10px", color: 'black', border : '1px solid black', padding: '5px 20px' }}
          >
            Continue
          </Button>
    </div>
     </Form>
    </FormContainer>
    </>)
}


export default PaymentScreen