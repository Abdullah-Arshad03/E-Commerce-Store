const express = require('express')
const orderController = require('../controllers/orderController')
// const { OrderedBulkOperation } = require('mongodb')
const router = express.Router()
const {protectRoute , admin} = require('../middleware/authMiddleware')

router.post('/order' , protectRoute ,  orderController.myOrder)
router.get ('/orders' , protectRoute  ,  orderController.getMyOrders)
router.get('/order/:id' , protectRoute ,admin ,  orderController.getOrderById)
router.put('/:id/pay' ,protectRoute , orderController.updateOrderToPaid)
router.put ('/:id/deliver' , protectRoute , admin ,  orderController.updateOrderToDelivered)
router.get('/allOrders', protectRoute , admin ,orderController.getAllOrders )

module.exports = router  