import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { addToCart , removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart );
  const {userInfo} = useSelector((state)=> state.auth)

  const [qty, setQty] = useState(1);

  const addtoCartHandler = async (product , qty) => {
    dispatch(addToCart({...product , qty : qty}))
  }

  const removeFromCartHandler = async ( prodId)=>{
        dispatch(removeFromCart(prodId))
  }
  
  const checkOutHandler = () =>{
  if(userInfo){
    navigate('/shipping')     
    }
    else{
    navigate('/login?redirect=/shipping')
  }
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "25px" }}>Shopping Cart</h1>


          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty <Link to="/" style={{color:'black' , textDecoration:'none' , textDecorationLine:'underline'}}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">

              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/products/${item._id}`}
                        style={{ color: "black", textDecorationColor: "gray" }}
                      >
                        {" "}
                        <div> {item.name}</div>
                      </Link>
                    </Col>
                    <Col style={{fontWeight: 'bold'}} md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                            addtoCartHandler (item , Number(e.target.value))
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <>
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            </>
                          );
                        })}
                      </FormControl>
                    </Col>
                    <Col md ={2}>
                      <Button type="button" variant="light" onClick={()=>{
                        removeFromCartHandler( item._id)
                      }}>
                        <FaTrash > </FaTrash>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card style={{marginTop: '10px'}}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce(
                    (acc, item) => Number(acc) + Number(item.qty),
                    0
                  )}
                  ) items
                </h2>

                <b >${cartItems.reduce((acc,item)=> acc + item.price * item.qty , 0).toFixed(2)}</b>

              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button"
                    className="btn btn-dark"
                    disabled={cartItems.length === 0} 
                    onClick={checkOutHandler}
                    >
                      
                        Proceed to Checkout
                </Button>

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
