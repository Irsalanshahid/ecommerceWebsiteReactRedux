const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/orderModel");

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxprice,
    shippingPrice,
    totalprice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxprice,
    shippingPrice,
    totalprice,
    paidAt: Date.now(),
    user: req.user._id
  })
  res.status(200).json({
    success: true,
    order,
  });
});
