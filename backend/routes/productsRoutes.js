const express = require('express')
const {protectRoute , admin} = require('../middleware/authMiddleware')

const router = express.Router()
const productController = require('../controllers/productsController')

router.get('/'  ,productController.getProducts )
router.get('/:id' , productController.getProduct)
router.post('/createproduct',protectRoute, admin , productController.createProduct)
router.put ('/product/:id', protectRoute, admin, productController.updateProduct)

module.exports = router