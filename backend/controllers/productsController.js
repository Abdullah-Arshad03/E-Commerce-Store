const { default: mongoose } = require("mongoose");
const products = require("../data/products");
const Product =require('../models/productModel');
const catchError = require("../utils/catchError");
const errorFunc = require("../utils/errorFunc");

exports.getProducts = async(req, res, next) => {

  try {

    const itemsOnPage = 4 
    const page = req.query.pageNumber || 1
    const count = await Product.countDocuments()

   const products = await Product.find().skip(itemsOnPage * (page - 1)).limit(itemsOnPage)


   if(!products){
    const error = new Error('No Products Found!')
     error.statusCode = 404
     throw error
   }

   res.status(200).json({
    message : 'all products are fetched',
    products : products ,
    page : page, 
    pages : Math.ceil(count/itemsOnPage)

   })

    
  } catch (error) {

    if(!error.statusCode){
      error.statusCode = 500
    }
    next(error)  
  }



  
};

exports.getProduct = async(req, res, next) => {

  const prodId = req.params.id


  console.log('Request Headers:', req.headers);

  // Check if the 'cookie' header exists
  if (req.headers.cookie) {
    console.log('Cookie header exists. Cookies:', req.headers.cookie);
    // Parse the cookie header to see individual cookies
    const cookies = req.headers.cookie.split(';').map(cookie => cookie.trim());
    console.log('Individual Cookies:', cookies);
    // You can further process individual cookies if needed
  } else {
    console.log('No cookie header found in the request.');
  }

  try {
    
   const product =  await Product.findById(prodId)
   if(!product){
    const error = new Error('No Product Found!')
    error.statusCode = 404
    throw error
   }

   res.status(200).json({
    message : 'product fetched',
    product : product
    
   })

  } catch (error) {
    if(!error.statusCode){
      error.statusCode = 500
    }
    next(error)  
  }

};


exports.createProduct = async(req, res , next) =>{

  try {
    
  const product = new Product({
    name : 'Add Name' ,
    user : req.user._id,
    category : 'Add Category',
    image : '/images/sample.jgp',
    description : 'Add Description',
    brand : 'Place your Brand',
    price : 0,
    countInStock : 0,
    numReviews : 0,
    reviews : [{user : req.user._id , name : 'unknown ' , rating : Number(4.3) , comment : 'sample'}]
  })

  if(!product){
    errorFunc(404 , 'product not created in ')
  }

  await product.save()

  res.status(200).json({
    message : 'product successfully created!',
    product : product
  })

  } catch (error) {
    catchError(error , next)
    
  }
}


exports.updateProduct = async(req, res ,next)=>{
  const prodId = req.params.id
  console.log('this is id of the product which is going to be edit : ' , prodId)

  
    // const {name , price , category , brand , countInStock , image , description , numReviews} = req.body

    const updatedName = req.body.name
    console.log('this is ',updatedName)

    const updatedPrice= req.body.price
    console.log('this is updated price', updatedPrice)

    const updatedImage = req.body.image
    console.log('updated Image is: ', updatedImage)

    const updatedCategory = req.body.category
    console.log('category',updatedCategory)

    const updatedBrand = req.body.brand
    console.log('brand',updatedBrand)

    const updatedCountInStock = req.body.countInStock
    console.log('count',updatedCountInStock)

    const updatedDescription = req.body.description
    console.log('desp',updatedDescription)

    // const updatedNumReviews = req.body.numReviews
    // console.log(updatedNumReviews)


    try {

    const product = await Product.findById(prodId)
    console.log(product)

    if(!product){

      errorFunc(404 , 'Product not found!')
    }
         
    product.name = updatedName ,
    product.price = updatedPrice,
    product.image = updatedImage
    product.category = updatedCategory,
    product.brand = updatedBrand ,
    product.countInStock = updatedCountInStock,
    // product.image = image ,
    product.description = updatedDescription
    // product.numReviews = updatedNumReviews

    const updatedProduct = await product.save()
    console.log('updated : ' , updatedProduct)

    res.status(200).json({
      message : 'product is updated!',
      updatedProduct : updatedProduct
    })
  } catch (error) {
    catchError(error, next)
    
  }

}

exports.deleteProduct = async (req, res, next) => {
  console.log('in delete');
  try {
    const id = req.params.id;
    console.log('id of deleted product', id);
    const prod = await Product.findByIdAndDelete(id);

    if (!prod) {
      errorFunc(404, 'Product not found');
    }

    console.log('product is removeddd!!! ', prod);

    res.status(200).json({
      message: 'product deleted'
    });
  } catch (error) {
    catchError(error, next);
  }
};
 

// /api/products/:id/reviews
exports.createProductReview = async (req,res,next)=>{
  try {
      const {comment , rating} = req.body
      const prodId = req.params.id
      const product = await Product.findById(prodId)

      if(!product){
        errorFunc(404 , 'Product not found')
      }
      
      const alreadyReviewed = product.reviews.find((review)=> review.user.toString()=== req.user._id.toString())

      if(alreadyReviewed){
        errorFunc(400 , 'Product Already Reviewed!') // 400 is the client side 
      }

      const review = {
        name : req.user.name ,
        rating : Number(rating) ,
        comment ,
        user : req.user._id
      }
      // we created the reviews object now we have to push this in the reviews array present in the product object

      product.reviews.push(review)
      product.numReviews = product.reviews.length

      product.rating = product.reviews.reduce((acc,review)=> acc + review.rating, 0) / product.reviews.length


     const prodSaved =  await product.save()

      console.log(prodSaved)

      res.status(201).json({
        message : 'Review added'
      })



  } catch (error) {
    catchError(error, next)
  }

}

exports.topThreeProds = async (req,res ,next) =>{
  try {

    const products = await Product.find().sort({rating : -1}).limit(3)
  res.status(200).json({
    message : 'got top products',
    prods : products
  })
    
  } catch (error) {
    catchError(error,next)
  }
}