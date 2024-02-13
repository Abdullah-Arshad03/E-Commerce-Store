import React from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import { Button } from "@mui/material";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";

const ProductScreen = () => {
  const { id } = useParams();

  const { data , isLoading, error } = useGetProductDetailsQuery(id);
  console.log(data)


  console.log("This is the id of the product", id);

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
          <div>{error?.data?.message || error.message}</div>
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
