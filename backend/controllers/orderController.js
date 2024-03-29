const Order = require("../models/orderModel");
const errorFunc = require("../utils/errorFunc");
const catchError = require("../utils/catchError");
// creating the new order in the database
exports.myOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentResult,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    errorFunc(400, "No Order Items!");
  } else {
    try {
      const order = new Order({
        user: req.user._id,
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),

        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        paymentResult: paymentResult,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });

      const createdOrder = await order.save();

      res.status(200).json({
        message: "order is successfully created",
        createdOrder: createdOrder,
      });
    } catch (error) {
      catchError(error, next);
    }
  }
};

exports.getMyOrders = async (req, res, next) => {
  //fetching the loggedin user's order
  try {
    console.log(req.user._id);
    const userId = req.user._id;
    const order = await Order.find({ user: userId });
    console.log("order of the loggedin user ", order);

    if (!order) {
      errorFunc(404, "Order not found");
    }

    res.status(200).json({
      message: "The order of loggedIn user",
      order: order,
    });
  } catch (error) {
    catchError(error, next);
  }
};

// the id is coming from the params
exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    // we also want to add the user's email and password inside order object received from the following query. so we use populate to populate the user key in the order and extract name and email from it.

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
      errorFunc(404, "Order not found!");
    }

    res.status(200).json({
      message: "Order by id is found",
      order: order,
    });
  } catch (error) {
    catchError(error, next);
  }
};

// Put request - as we are updating the status from false to the true. false is by default.

exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      errorFunc(404, "Order not found!");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    // this following paymentResult object data will come from the paypal
    order.paymentResult = {
      id: req.body.id,
      updateTime: req.body.updateTime,
      status: req.body.status,
      emailAddress: req.body.emailAddress,
    };

    const updatedOrder = order.save();

    res.status(200).json({
      message: " the order is upadated !",
      UpdatedOrder: updatedOrder,
    });
  } catch (error) {
    catchError(error, next);
  }
};

exports.updateOrderToDelivered = async (req, res, next) => {

  try {
    const orderId = req.params.id
    const order = await Order.findById(orderId)

    if(!order){
      errorFunc(404 , 'order not found!')
    }


    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.status(200).json({
      message : 'Delivery status updated',
      updatedOrder : updatedOrder
    })
    
  } catch (error) {
    
  }



  
};

// GET all orders it is admin route
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "_id name");
    if (!orders) {
      catchError(404, "Orders are not found!");
    }
    res.status(200).json({
      messsage: "All orders are grabbed!",
      orders: orders,
    });
  } catch (error) {
    catchError(error, next);
  }
};
