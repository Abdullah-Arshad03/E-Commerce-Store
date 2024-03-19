const express = require('express')
const orderController = require('../controllers/orderController')
// const { OrderedBulkOperation } = require('mongodb')
const router = express.Router()
const {protectRoute , admin} = require('../middleware/authMiddleware')

router.post('/mine' , protectRoute ,  orderController.myOrder)
router.get ('/myorders' , protectRoute  ,  orderController.getMyOrders)
router.put('/:id/pay' ,protectRoute , orderController.updateOrderToPaid)
router.get('/:id' , protectRoute ,admin ,  orderController.getOrderById) // admin route
router.put ('/:id/deliver' , protectRoute , admin ,  orderController.updateOrderToDelivered) // admin route
router.get('/allOrders', protectRoute , admin ,orderController.getAllOrders ) // admin route

module.exports = router  