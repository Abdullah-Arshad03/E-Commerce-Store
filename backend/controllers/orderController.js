const Order = require("../models/orderModel");
const errorFunc = require('../utils/errorFunc')
const catchError  = require('../utils/catchError')
// creating the new order in the database
exports.myOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentResult ,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  
  } = req.body;


   if(orderItems && orderItems.length === 0){
    errorFunc(400 , 'No Order Items!')
   }else{

    try {

        const order = new Order({
            user : req.user._id,
            orderItems : orderItems.map((x)=>({
                ...x , 
                product : x._id ,
                _id : undefined
              })),
        
            shippingAddress : shippingAddress,
            paymentMethod: paymentMethod ,
            paymentResult: paymentResult,
            itemsPrice : itemsPrice, 
            shippingPrice: shippingPrice,
            taxPrice : taxPrice,
            totalPrice : totalPrice
        
           })
        
           const createdOrder = await order.save()
        
           res.status(200).json({
            message : 'order is successfully created' ,
            createdOrder : createdOrder
           })
        
    } catch (error) {
        catchError(error, next)
    }

}

};

exports.getMyOrders = async (req, res, next) => {
     
    //fetching the loggedin user's order
    try {
        const order = await Order.findById(req.user._id)
        console.log('order of the loggedin user ', order)
    
    
        if(!order){
            errorFunc(404 , 'Order not found')
        }
        
        
        res.status(200).json({
            message :'The order of loggedIn user' ,
            order : order
        })
    
    } catch (error) {
        catchError(error, next)
        
    }

};


// the id is coming from the params
exports.getOrderById = async (req, res, next) => {

    try {
        const orderId = req.params.id

        // we also want to add the user's email and password inside order object received from the following query. so we use populate to populate the user key in the order and extract name and email from it.

        const order = await Order.findById(orderId).populate('user' , 'name email')
    
        if(!order){
            errorFunc(404 , 'Order not found!')
        }
    
        res.status(200).json({
            message : 'Order by id is found', 
            order : order
        })
    } catch (error) {
        catchError(error , next)
    }
};

exports.updateOrderToPaid = async (req, res, next) => {
  res.send("update the order to the paid");
};

exports.updateOrderToDelivered = async (req, res, next) => {
  res.send("update the order to the delivered");
};

exports.getAllOrders = async (req, res, next) => {
  res.send("get All Orders");
};

