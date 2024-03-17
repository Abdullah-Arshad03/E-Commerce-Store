const Order = require('../models/orderModel')


exports.myOrder = async(req, res , next) =>{
    res.send('my order')
}

exports.getMyOrders = async(req, res , next) =>{
    res.send('get My orders')
}


exports.getOrderById = async(req, res , next) =>{
    res.send('get Order by id')
}

exports.updateOrderToPaid = async(req, res , next) =>{
    res.send('update the order to the paid')
}

exports.updateOrderToDelivered = async(req, res , next) =>{
    res.send('update the order to the delivered')
}

exports.getAllOrders= async(req, res , next) =>{
    res.send('get All Orders')
}