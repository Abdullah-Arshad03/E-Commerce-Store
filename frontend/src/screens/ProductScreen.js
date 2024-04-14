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
import { useDispatch ,useSelector} from "react-redux";
import Message from "../components/Message";
import { Button } from "@mui/material";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useGetProductDetailsQuery , useCreateReviewMutation } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { useState } from "react";
import {toast , Toaster} from "react-hot-toast";
import { Form , FormGroup , FormLabel} from "react-bootstrap";

const ProductScreen = () => {
  const { id } = useParams();

  const [qty , setQty] = useState(1)
  const [rating , setRating] = useState(0)
  const [comment , setComment] = useState('')

  const { data , isLoading, error , refetch } = useGetProductDetailsQuery(id);
  const [createReview, {isLoading : reviewLoading}] = useCreateReviewMutation()

  console.log(data)


  console.log("This is the id of the product", id);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userInfo} = useSelector((state)=> state.auth)

  const addToCartHandler = () =>{
    console.log("clicked value", qty)
 
    dispatch(addToCart({...data.product , qty : Number(qty)  }))
    navigate('/cart')
  }
  

  const submitHandler = async(e) =>{
    e.preventDefault()
    try {
      const res = await createReview({id : id  , rating , comment}).unwrap()
      console.log(res)
      refetch()
      toast.success('review added!')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }

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
              <Image src={`http://localhost:8000/${data.product.image}`} alt={data.product.name} fluid></Image>
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem style={{ color: "#2F4F4F" }}>
                  <h3>{data.product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={data.product.rating} text={`${data.product.numReviews} reviews`}/> 
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

          <Row className="review ">
            <Col md={6}>
               <h2 className="my-5">Reviews</h2>
               {data.product.reviews.length === 0 ? (<><Message>No Reviews</Message></>) : (<></>)}
               <ListGroup variant="flush">
                {
                  data.product.reviews.map((review)=>(
                    <>
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0,10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                    </>
                  ))
                }

                {/* // now adding, add comment section  */}
                <ListGroupItem>
                  <h3>Write a Customer Review</h3>
                  {reviewLoading? (<><Loader></Loader></>) : (<></>)}

                  {userInfo ? (<>
                  <Form onSubmit={submitHandler}>

                    <FormGroup controlId='rating' className='my-2'>
                      <FormLabel className="fw-semibold">Rating</FormLabel>

                      <FormControl
                      as='select'
                      value={rating}
                      onChange = {(e)=> setRating(Number(e.target.value))}
                      >
                        <option value=''> Select ...</option>
                        <option value='1'> 1 - Poor</option>
                        <option value='2'> 2 - Fair</option>
                        <option value='3'> 3 - Good</option>
                        <option value='4'> 4 - Very Good</option>
                        <option value='5'> 5 - Excellent</option>

                        
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="comment" className="my-2">

                      <FormLabel>Comment</FormLabel>
                      <FormControl
                      as='textarea'
                      row = '3'
                      value = {comment}
                      onChange={(e)=> setComment(e.target.value)}
                      >

                      </FormControl>

                    </FormGroup>

                    <Button
            className="buttonn"
            // variant="outlined"
             type="submit"
             disabled = {reviewLoading}
            style={{marginTop: "10px", color: 'black', border : '1px solid black', padding: '5px 20px' }}
          >
            Submit
          </Button>
                  </Form>
                  
                  </>) : (<><Message>Please <Link className="text-dark" to='/login'>Sign in</Link> to write a review</Message></>)}

                </ListGroupItem>

               </ListGroup>
            </Col>
          </Row>

        </>
      )}
    </>
  );
};

export default ProductScreen;
