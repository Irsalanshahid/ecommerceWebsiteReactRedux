const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeature = require("../middleware/apiFeature");

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeature.query;
  res.status(200).json({
    success: true,
    productCount,
    product,
  });
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.productDelete = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: `Product ${product.name} was removed`,
  });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});



exports.createProductReviews = catchAsyncErrors(async (req, res, next) => {
  const {rating,comment,productId} = req.body;

  const review = {
    user: req.user._id,
    name:req.user.name,
    rating: Number(rating),
    comment
  }
  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const isReviewd = product.reviews.find(
    (rev)=>rev.user.toString() === req.user._id.toString()
  )
  
  if(isReviewd){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString() === req.user.id.toString()){
        rev.rating = rating;
        rev.comment = comment;
      }
    })
  }else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg=0;
  product.reviews.forEach((rev)=> {avg+=rev.rating});

product.ratings = avg/product.reviews.length;

await product.save({validateBeforeSave:false});
  res.status(200).json({
    success: true,
  });
});


exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  //console.log(req.query)
  let product = await Product.findById(req.query.id);
  //console.log(product)
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString());
console.log(reviews)
let avg=0;
reviews.forEach((rev)=> {avg+=rev.rating});
//console.log(avg)
 let ratings = 0;
 if(reviews.length > 0){
  ratings = avg/reviews.length;
 }
 
 const numOfReviews = reviews.length;

 //console.log(ratings)
 await Product.findByIdAndUpdate(req.query.productId, {reviews,ratings,numOfReviews}, {
   new: true,
   runValidators: true,
 });
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
