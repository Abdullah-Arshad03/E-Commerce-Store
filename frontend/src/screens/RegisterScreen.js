import { useState , useEffect } from "react";
import { Link , useLoaderData, useLocation , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Button } from "@mui/material/";

import FormContainer from "../components/FormContainer";
import {useRegisterMutation} from '../slices/authApiSlice'
import { setCredentials } from "../slices/authSlice";
import { toast , ToastContainer } from 'react-toastify';
import Loader from "../components/Loader";


const RegisterScreen = () => {

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  const [register , {isLoading , error}] = useRegisterMutation()
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
        toast.error('Password donot match!')
    }
    else{
        try {
     
            const res =  await register({name , email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res.user}))
            console.log("submit");
            navigate(redirect)
      
          } catch (error) {
            toast.error(`${error.data.message}`)
            console.log('this is the error',error)
          }
    }
  

  };

  return (
    <>
    <ToastContainer></ToastContainer>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>

        <FormGroup controlId="name" className="my-3">
            <FormLabel className="fw-semibold">Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="email" className="my-3">
            <FormLabel className="fw-semibold">Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="password" className="my-3">
            <FormLabel className="fw-semibold">Password</FormLabel>
            <FormControl
              type="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="confirmPassword" className="my-3">
            <FormLabel className="fw-semibold">Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          
   <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
          <Button
            className="buttonn"
            // variant="outlined"
             type="submit"
             disabled = {isLoading}
            style={{marginTop: "10px", color: 'black', border : '1px solid black', padding: '5px 20px' }}
          >
            Sign up
          </Button>
          </div>
      <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}> 
      
      {isLoading ? (<><Loader></Loader></>) : (<></>)}</div>

        </Form>
        <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
        <Row className="py-3">
          <Col>
            Already have an account ? <Link  style={{ color:'black'}}to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Sign in</Link>
          </Col>
        </Row>
        </div>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
