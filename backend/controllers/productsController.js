const products = require("../data/products");
const Product =require('../models/productModel')

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
