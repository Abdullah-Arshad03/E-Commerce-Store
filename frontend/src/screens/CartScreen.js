import { Link , useNavigate } from "react-router-dom";
import {Row , Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";

 
import { FaTrash} from 'react-icons/fa'



 
const CartScreen  = () =>{
    const navigate  = useNavigate()
    const dispatch = useDispatch()
 const {cartItems} = useSelector((state)=> state.cart)

    return (<>
  <Row>
    <Col md={8}>
    <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>

   { cartItems.length === 0 ? (
    <Message>
        Your Cart is Empty <Link to ='/'>Go Back</Link>
    </Message>
   ) : (
    <ListGroup variant="flush">


        {
        cartItems.map((item)=>(
            <ListGroup.Item key={item._id}>
                <Row>
                    <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded></Image >
                    </Col>

                    
                </Row>
            </ListGroup.Item>

        ))
        }

    </ListGroup>





    )}
    
    
    
    </Col>
  </Row>

    </>)
}

export default CartScreen