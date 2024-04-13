const { default: mongoose } = require("mongoose");
const products = require("../data/products");
const Product =require('../models/productModel');
const catchError = require("../utils/catchError");
const errorFunc = require("../utils/errorFunc");

exports.getProducts = async(req, res, next) => {

  try {

   const products = await Product.find()

   if(!products){
    const error = new Error('No Products Found!')
     error.statusCode = 404
     throw error
   }

   res.status(200).json({
    message : 'all products are fetched',
    products : products

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
    name : 'sample name' ,
    user : req.user._id,
    category : 'sample category',
    image : '/images/sample.jgp',
    description : 'sample description',
    brand : 'sample brand',
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

