import React from "react";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import { FaTimes, FaEdit , FaTrash, FaTheRedYeti } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Row ,Col , Button, Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateProductMutation } from "../../slices/productApiSlice";
import {toast, Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const ProductListScreen = () =>{

    const navigate = useNavigate()
    const {data , refetch , isLoading , error} = useGetProductsQuery()
    const [createProd , {isLoading : createProdLoading}] = useCreateProductMutation()
    console.log('these are the products: ',data )

    const onDeleteHandler = () =>{
        
    }

     const createProductHandler = async()=> {
        if(window.confirm('Are you sure you want to create new product?')){
            try {
                const res = await createProd()
                refetch()
    
            } catch (error) {
                toast.error(error)
            }
    
        }
     }

    //  const updateProductHandler = ()=>{
    //     navigate('/product/${}')
        
    //  }
    return(<>
    

 <Toaster></Toaster>
       <Row className= "align-items-center">
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className="text-end">
            <Button onClick={createProductHandler} className='m-3 btn-sm bg-black border-black'>
                <FaEdit></FaEdit> Create product 
            </Button>
        </Col>
       </Row>
       {createProdLoading ? (<><Loader></Loader></>) : (<></>)}


       {isLoading ? (<>
     <Loader></Loader>

     </>) : error ? (<>
     <Message variant='danger'>{error?.data?.message || error.error}</Message>

     </>) : (<>

     <Table striped hover responsive className="table-sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
            </tr>
        </thead>

        <tbody>
          {
            data.products.map((product)=>(<>
            <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                        <FaEdit></FaEdit>
                    </Button>
                </LinkContainer>
                <Button onClick={onDeleteHandler} variant="light" style={{ border : '1px solid black' , marginBottom : '5px' }} >
                    <FaTrash style={{color : 'black' }} ></FaTrash>
                </Button>
            </tr>

            </>))
          }
        </tbody>


     </Table>



     </>)}
    </>)
}

export default ProductListScreen