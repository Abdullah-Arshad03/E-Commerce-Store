import React from "react";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import { FaTimes, FaEdit , FaTrash, FaTheRedYeti } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Row ,Col , Button, Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateProductMutation } from "../../slices/productApiSlice";
import {toast, Toaster} from 'react-hot-toast'
import {useLoaderData, useNavigate} from 'react-router-dom'
import { useDeleteProductMutation } from "../../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";


const ProductListScreen = () =>{

    const {pageNumber} = useParams()
    const navigate = useNavigate()
    const {data , refetch , isLoading , error} = useGetProductsQuery({pageNumber})
    const [createProd , {isLoading : createProdLoading}] = useCreateProductMutation()
    console.log('these are the products: ',data )

    const [deleteProd , {isLoading : deleteLoading}] = useDeleteProductMutation()


    const onDeleteHandler = async(id) =>{
        if(window.confirm('Are You Sure, You Want To Delete')) {

        try {
            console.log('this is the id', id)
           const res = await deleteProd(id)
           refetch()
            console.log('deleted : ', res)
            navigate('/')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
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
      {deleteLoading? (<><Loader></Loader></>) : (<></>)}

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
                <th></th>
                <th></th>
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

               <td> <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                        <FaEdit></FaEdit>
                    </Button>
                </LinkContainer>
                </td>
                <td>
                <Button onClick={()=>{
                    onDeleteHandler(product._id)
                }} variant="light" style={{ border : '1px solid black' , marginBottom : '5px' }} >
                    <FaTrash style={{color : 'black' }} ></FaTrash>
                </Button>
                </td>
            </tr>

            </>))
          }
        </tbody>


     </Table>
     <Paginate page={data.page} pages={data.pages} isAdmin={true}></Paginate>



     </>)}
    </>)
}

export default ProductListScreen