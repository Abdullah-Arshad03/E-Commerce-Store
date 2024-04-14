import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Button } from "@mui/material";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast , Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useUpdateUserDetailMutation , useGetUserDetailsQuery , useGetUsersQuery } from "../../slices/userApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Admin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
 
 const {data : User , isLoading : userLoading , error , refetch} = useGetUserDetailsQuery(userId)
 const [updateUser , {isLoading : updateLoading}] = useUpdateUserDetailMutation()

  useEffect(() => {
    if (User &&  User.user) {
      setName(User.user.name);
      setEmail(User.user.email)
      setIsAdmin(User.user.isAdmin)
      console.log(User.user.isAdmin)
    }
  }, [User]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id :  userId ,
        name : name , 
        email : email ,
        isAdmin : Admin
      }).unwrap();
      refetch();
      console.log(res);
      toast.success("User is updated!");

    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };



  return (
    <>
    <Toaster></Toaster>
      <Link to="/admin/productlist">
        <Button className="buttonn" variant="outlined">
          Go Back
        </Button>
      </Link>

      <FormContainer>
        <h2>Update User</h2>

        {updateLoading && <Loader />}

        {userLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
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
              <FormLabel className="fw-semibold">Email</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>

           
            <FormGroup controlId="isAdmin" className="my-3">
              <FormCheck
                type="checkbox"
                label = 'Is Admin'
                checked = {Admin}
                onChange={(e) => 
                    {
                      setIsAdmin(e.target.checked) 
                    }
                }
              ></FormCheck>
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
                disabled={updateLoading}
                style={{
                  marginTop: "10px",
                  color: "black",
                  border: "1px solid black",
                  padding: "5px 20px",
                }}
              >
                Update Product
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
