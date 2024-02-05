import React from "react";
import { Row , Col} from "react-bootstrap";
import { Container } from "react-bootstrap";
import {products} from '../products.js'
import Product from "../components/Product.js";

const HomeScreen = () =>{
    return(<>
    <Container>
    
      <h1 style={{color:'#2F4F4F'}}>Lastest Products:</h1>

      <Row>
      {products.map((product)=>(
       
        <Col sm={12} md={6} lg={4} xl={3} style={{marginBottom:'20px'}}>
             <Product product={product}/>
        </Col>
      
      ))}
      </Row>
  
      </Container>
      
    </>)
}

export default HomeScreen