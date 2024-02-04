import React from "react";
import { Card , Container} from "react-bootstrap";}

const Product = ({product}) =>{
return(<>
        <Container>
            <Card>
                <a href={`product/${product._id}`}>
                <Card.Img src={product.image} variant="top"/>
                </a>
            </Card>
        </Container>
</>)
}

export default Product