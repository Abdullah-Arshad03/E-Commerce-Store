import React from "react";
import {Link , useNavigate , useParams} from 'react-router-dom'
import {Form , Button} from 'react-bootstrap'
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {toast , Toaser} from 'react-hot-toast'
import { useUpdateProductMutation } from "../../slices/productApiSlice";


const UpdateProductScreen = () =>{
    const {id : prodId} = useParams()

    return(<>



    
    </>)
}

export default updateProductScreen