import React from "react";

import {useParams} from 'react-router-dom';
import { products } from "../products";


const ProductScreen = () => {
    const {id } = useParams()

 const product = products.find((p)=>{
    return p._id === id
})

console.log(product)

console.log('This is the id of the product', id)

return(<>
  <h1>This is the Product Screeen</h1>
</>)
  

}

export default ProductScreen