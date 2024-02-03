import React from "react";
import { Container , Row , Col} from "react-bootstrap";

const Footer = ()=>{

    const Year = new Date().getFullYear()
    return(<>
   <footer>
    <Container>
        <Row>
            <Col className="text-center py-3">
            <p style={{fontWeight:'600'}}> E-ProStore &copy; {Year} </p>
            </Col>
        </Row>
    </Container>
   </footer>
    </>)
}
export default Footer