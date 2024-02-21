import { Link , useNavigate } from "react-router-dom";
import {Row , Col, ListGroup, ListGroupItem , Image, Form, Button, Card, FormControl} from 'react-bootstrap';
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash} from 'react-icons/fa'
import { useState } from "react";



 
const CartScreen  = () =>{


    
    const navigate  = useNavigate()
    const dispatch = useDispatch()
 const {cartItems} = useSelector((state)=> state.cart)

 const [qty , setQty ] = useState()


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
            <ListGroupItem key={item._id}>
                <Row>
                    <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded></Image >
                    </Col>
                    <Col md={3}>
                       <Link to={`/product/${item._id}`} style={{ color: 'black', textDecorationColor:'gray'}}> <div > {item.name}</div></Link>
                    </Col>
                    <Col md={2}>
                        ${item.price}
                    </Col>
                    <Col md={2}>
                         <FormControl
                         as='select'
                         value={item.qty}
                         onChange={((e)=>{
                            // setQty(e.target.value)
                         })}
                         >
                            {
                                [...Array(item.countInStock).key()].map((x)=>{
                                    return (<>
                                    <option key={x+1} value={x+1}>
                                        {x+1}
                                    </option>
                                    </>)
                                })
                            }

                         </FormControl>
 
                    </Col>
                </Row>
            </ListGroupItem>

        ))
        }

    </ListGroup>





    )}
    
    
    
    </Col>
  </Row>

    </>)
}

export default CartScreen