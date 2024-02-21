import React from "react";
import { useParams , useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Container,
  FormControl,
} from "react-bootstrap";
import { useDispatch} from "react-redux";
import Message from "../components/Message";
import { Button } from "@mui/material";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { useState } from "react";

const ProductScreen = () => {
  const { id } = useParams();

  const [qty , setQty] = useState(1)

  const { data , isLoading, error } = useGetProductDetailsQuery(id);
  console.log(data)


  console.log("This is the id of the product", id);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = () =>{
    console.log("clicked value", qty)
 
    dispatch(addToCart({...data.product , qty : Number(qty)  }))
    navigate('/cart')
  }

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }} 
          >
            <Loader />
          </div>
        </>
      ) : error ? (
        <>
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
        </>
      ) : (
        <>
          <Link to="/">
            <Button className="buttonn" variant="outlined">
              Go Back
            </Button>
          </Link>
          <Row className="mt-3">
            <Col md={5}>
              <Image src={data.product.image} alt={data.product.name} fluid></Image>
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem style={{ color: "#2F4F4F" }}>
                  <h3>{data.product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={data.product.rating} text={data.product.numReviews} />
                </ListGroupItem>
                <ListGroupItem>
                  <h5> price: ${data.product.price}</h5>
                </ListGroupItem>
                <ListGroupItem>
                  <b>Description: </b> {data.product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <Row style={{ color: "#2F4F4F" }}>
                      <Col>Price :</Col>
                      <Col>
                        <strong>${data.product.price} </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row style={{ color: "#2F4F4F" }}>
                      <Col>Status :</Col>
                      <Col>
                        {data.product.countInStock > 0 ? (
                          <>
                            <strong>In Stock</strong>
                          </>
                        ) : (
                          <>
                            <strong>Out of Stock</strong>
                          </>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {data.product.countInStock > 0 ? (<>
                  <ListGroupItem>
                    <Row>
                      <Col>Qty : </Col>
                      <Col>
                      <FormControl as='select'  onChange={((e) =>{
                        const quantity = e.target.value
                        console.log('this is the skldjf' , quantity)
                        setQty(quantity)
                      })}>

                        {
                           [...Array(data.product.countInStock).keys()].map((x)=>{
                            return ( <>
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                            </>  )
                           })
                        }

                      </FormControl>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  </>) : (<></>) }

                  <ListGroupItem>
                    <Row as="div" className="pt-2 pb-2">
                      <Container className=" text-center ">
                        <Button
                          variant="outlined"
                          style={{
                            backgroundColor: "#2F4F4F",
                            color: "white",
                            border: "none",
                          }}
                          disabled={data.product.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </Container>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
