import React from "react";
import { Row , Col} from "react-bootstrap";
import { Container } from "react-bootstrap";
import {products} from '../products.js'

const HomeScreen = () =>{
    return(<>
    
      <h1>Lastest Products:</h1>
      <Container>
      <Row>
      {products.map((product)=>(
        <Col sm={12} md={6} lg={4} xl={3}>
          <h4>{product.name}</h4>
        </Col>
      ))}
      </Row>
      </Container>
    
      
    </>)
}

export default HomeScreen