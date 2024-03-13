import { useState } from "react";
import { Link } from "react-router-dom";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
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

          <Button
            className="buttonn"
            // variant="outlined"
             type="submit"
            style={{marginTop: "10px", color: 'black', border : '1px solid black', padding: '5px 20px' }}
          >
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer ? <Link  style={{ color:'black'}}to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
