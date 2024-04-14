import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselCaption, CarouselItem, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import canon from '../assets/styles/canon.png'
import airpod from '../assets/styles/airpods.png'
import iphone from '../assets/styles/iphone11.png'


import { useTopProdsQuery } from '../slices/productApiSlice'


const ProductCarousel = () => {
  const {data , isLoading , error} = useTopProdsQuery()
  console.log(data)
  return (
   <>

   {isLoading? (<><Loader></Loader></>) : error ? (<><Message variant='danger'>{error?.data?.message || error.error}</Message></>) :
    (<>

     <Carousel pause='hover' className='bg-primary mb-4'>
      {data.prods.map((product)=>(
        
        <CarouselItem key={product._id} className='bg-dark'>
        <Link to={`/products/${product._id}`}>
          <Image src={`http://localhost:8000/${product.image}`} alt={product.name}></Image>
          {/* <Image src={airpod}  alt={product.name}></Image> */}
          

          <CarouselCaption className='carousel-caption'>
            <h3 className='text-center flex justify-center'>
              {product.name} (${product.price})
            </h3>

          </CarouselCaption>

        </Link>
        </CarouselItem>
        
        
      ))}


     </Carousel>

    </>)}
   
   </>
  )
}

export default ProductCarousel