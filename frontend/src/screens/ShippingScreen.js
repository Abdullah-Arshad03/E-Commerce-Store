import React from "react";
import FormContainer from "../components/FormContainer";
import { useState  } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Button } from "@mui/material";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ()=>{


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {shippingAddress} = useSelector((state)=> state.cart)

    const [address , setAddress]  = useState(shippingAddress?.address || '') 
    const [city , setCity] = useState(shippingAddress?.city || '')
    const [postalCode , setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country , setCountry] = useState(shippingAddress?.country || '')


    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address , city , postalCode , country}))
        navigate('/payment')
        console.log('shipping submit') 
    }

    return(<>
  <FormContainer>
    <CheckoutSteps step1={true} step2={true}></CheckoutSteps>
    <h1 style={{marginBottom: '20px'}}>Shipping</h1>

    <Form onSubmit={submitHandler}>
        <FormGroup  controlId="Address" className="my-2">
            <FormLabel  className="fw-semibold">
                Address
            </FormLabel>
            <FormControl
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e)=>{
                setAddress(e.target.value)
            }}
          
             ></FormControl>
        </FormGroup>

        <FormGroup  controlId="City" className="my-2">
            <FormLabel  className="fw-semibold">
                City
            </FormLabel>
            <FormControl
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e)=>{
                setCity(e.target.value)
            }}
          
             ></FormControl>
        </FormGroup>
        <FormGroup  controlId="postalCode" className="my-2">
            <FormLabel className="fw-semibold">
                Postal Code
            </FormLabel>
            <FormControl
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e)=>{
                setPostalCode(e.target.value)
            }}
          
             ></FormControl>
        </FormGroup>
        <FormGroup  controlId="Country" className="my-2">
            <FormLabel  className="fw-semibold">
                Country
            </FormLabel>
            <FormControl
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e)=>{
                setCountry(e.target.value)
            }}
          
             ></FormControl>
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

export default ShippingScreen
