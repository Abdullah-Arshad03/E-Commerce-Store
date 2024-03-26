import React from "react";
import { useState, useEffect } from "react";

import {
  Table,
  Form,
  FormGroup,
  FormLabel,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@mui/material";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useUserProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useLoggedInOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
  const { data: loggedInOrders, isLoading, error } = useLoggedInOrdersQuery();
  console.log("these are the loggedInOrders", loggedInOrders);

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sumbitHandler");
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-2">
              <FormLabel className="fw-semibold">Username</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="email" className="my-2">
              <FormLabel className="fw-semibold">Email</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="password" className="my-2">
              <FormLabel className="fw-semibold">Password</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="confirmPassword" className="my-2">
              <FormLabel className="fw-semibold">confirmPassword</FormLabel>
              <FormControl
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                className="buttonn"
                // variant="outlined"
                type="submit"
                //  disabled = {isLoading}
                style={{
                  marginTop: "15px",
                  color: "black",
                  border: "1px solid black",
                  padding: "5px 20px",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={9}>
          <h2>My Orders</h2>

          {isLoading ? (
            <>
              <Loader></Loader>
            </>
          ) : error ? (
            <>
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            </>
          ) : (
            <>
              <Table striped hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>

                <tbody>
                  {loggedInOrders.order.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <>{order.paidAt.substring(0, 10)}</>
                        ) : (
                          <>
                            <FaTimes style={{ color: "red" }}></FaTimes>
                          </>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <>{order.deliveredAt.substring(0, 10)}</>
                        ) : (
                          <>
                            <FaTimes style={{ color: "red" }}></FaTimes>
                          </>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id }`}>
                          <Button
                            className="buttonn"
                            style={{
                              marginTop: "10px",
                              color: "black",
                              border: "1px solid black",
                              padding: "5px 20px",
                            }}
                          >
                  Details

                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
