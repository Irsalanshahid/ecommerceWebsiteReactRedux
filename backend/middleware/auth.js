const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    //console.log(token);
    if(!token){
        return next(new ErrorHandler("Please Login",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    
    next();
});
exports.authorizeRoles = (...Roles) =>{
    console.log(Roles)
    return (req,res,next)=>{
        console.log(!Roles.includes(req.user.role))
        if(!Roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:"${req.user.role}"is not authenticated for this process`,403))
        }
        next();
    }

}