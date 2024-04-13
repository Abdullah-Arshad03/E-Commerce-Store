import React from "react";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Table } from "react-bootstrap";
import { FaTimes  , FaTrash , FaEdit , FaCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import { Button } from "@mui/material";

const UserListScreen = () => {
  const { data , refetch , isLoading, error } = useGetUsersQuery();
  console.log(" this is the fetch orderlist", data);

  const deleteHandler = async()=>{

  }
  return (
    <>
      <h2 style={{marginBottom:'25px'}}>Users</h2>
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
        {/* striped hover responsive className="table-sm" */}
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {data.users.map((user) => (
            <>
              <tbody>
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}></a> {user.email}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <>
                        {" "}
                        <FaCheck style={{ color: "green" }}></FaCheck>
                      </>
                    ) : (
                      <>
                        <FaTimes style={{ color: "red" }}></FaTimes>
                      </>
                    )}
                  </td>

                  <td>
                    <LinkContainer
                      style={{
                        color: "black",
                        border: "1px solid black",
                        padding: "3px 20px",
                      }}
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <Button className="buttonn">
                        <FaEdit></FaEdit>
                      </Button>
                    </LinkContainer>
                    
                  </td>
                  <td>
                  <Button onClick={()=>{
                    // deleteHandler(product._id)
                }} variant="light" style={{ border : '1px solid black' , marginBottom : '5px' }} >
                    <FaTrash style={{color : 'black' }} ></FaTrash>
                </Button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </>
      )}
    </>
  );
};

export default UserListScreen;
