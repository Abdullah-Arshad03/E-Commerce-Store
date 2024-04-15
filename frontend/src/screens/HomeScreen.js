import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Product from "../components/Product.js";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel.js";
const HomeScreen = () => {

  const {pageNumber} = useParams()
  console.log('here is the pageNumber',pageNumber)

  const { data , isLoading, error } = useGetProductsQuery({pageNumber});

  console.log('here is the data',data)


   

  return (
    <>
    <ProductCarousel></ProductCarousel>
      <Container>
        {isLoading ? (
          <>
          <Container>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }} 
          >
            <Loader />
          </div>
            </Container>
          </>
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
          
            <h1 style={{ color: "#2F4F4F" }}>Lastest Products:</h1>

            <Row>
              {data.
              products.map((product) => (<>
             

                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ marginBottom: "20px" }}
                >
                  <Product product={product} image = {product.image}/>
                </Col>
              </>))}
            </Row>
            <Paginate page={data.page} pages={data.pages}></Paginate>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
