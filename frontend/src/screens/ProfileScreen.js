import React from "react";
import { useState , useEffect } from "react";
import {Table , Form , Button , Row , Col} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { UseDispatch , useDispatch, useSelector } from "react-redux";
import {toast, Toaster} from 'react-hot-toast'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useUserProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () =>{
      
    const [name , setName]  = useState("")
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')


    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=> state.auth)


    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }

    }, [userInfo.name , userInfo.email])

 const submitHandler = (e) =>{
    e.preventDefault()
    console.log('sumbitHandler')

 }
    return (<>
       <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                
            </Form>
        </Col>
        <Col md={9}></Col>

       </Row>
    </>)
}

export default ProfileScreen