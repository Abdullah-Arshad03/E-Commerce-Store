const express = require('express')
const orderController = require('../controllers/orderController')
// const { OrderedBulkOperation } = require('mongodb')
const router = express.Router()


router.post('/order' , orderController.myOrder)
router.get ('/orders' , orderController.getMyOrders)
router.get('/order/:id' , orderController.getOrderById)
router.get('/paidOrder' , orderController.updateOrderToPaid)
router.get ('/delivered' , orderController.updateOrderToDelivered)
router.get('/allOrders', orderController.getAllOrders )

module.exports = router