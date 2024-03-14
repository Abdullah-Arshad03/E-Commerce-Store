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
import {useLoginMutation} from '../slices/authApiSlice'
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'


const LoginScreen = () => {

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  const [login , {isLoading , error}] = useLoginMutation()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // this following statement is like hitting the post api and after successfully it hits, 
      // we get the response in the res variable and obviously after posting the data into the database
      // we want to call the setCredentials func from our authSlice, to set the userInfo ( we get after 
      // successfully making the post request) , in our frontEnd, in the Redux.
      const res =  await login({email, password})
      console.log(res)
      dispatch(setCredentials({...res}))
      navigate(redirect)
      
      
    } catch (error) {
      toast.error(error?.data?.message || error.error)
      console.log(error)
    }

    console.log("submit");
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
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
   <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
          <Button
            className="buttonn"
            // variant="outlined"
             type="submit"
            style={{marginTop: "10px", color: 'black', border : '1px solid black', padding: '5px 20px' }}
          >
            Sign In
          </Button>
          </div>
        </Form>
        <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
        <Row className="py-3">
          <Col>
            New Customer ? <Link  style={{ color:'black'}}to="/register">Register</Link>
          </Col>
        </Row>
        </div>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
