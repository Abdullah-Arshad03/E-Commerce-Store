const express = require('express')

const router = express.Router()
const productController = require('../controllers/products')

router.get('/products' , productController.getProducts )
router.get('/product/:id' , productController.getProduct)


module.exports = router