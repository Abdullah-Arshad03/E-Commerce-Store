const express = require('express')
const {protectRoute} = require('../middleware/authMiddleware')

const router = express.Router()
const productController = require('../controllers/productsController')

router.get('/'  ,productController.getProducts )
router.get('/:id' , productController.getProduct)


module.exports = router