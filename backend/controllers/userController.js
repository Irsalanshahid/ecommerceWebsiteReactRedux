const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");


exports.createUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample id",
            url:"sample url"
        }
    })
    sendToken(user,200,res);
})

exports.loginUser = catchAsyncErrors( async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next( new ErrorHandler("Please Enter Email and Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next( new ErrorHandler("Please Enter valid Email",400));
    }
    const isPasswordMatch = user.comparePassword(password);
    if(!isPasswordMatch){
        return next( new ErrorHandler("Please Enter Valid Password",400));
    }
    sendToken(user,200,res);
});

exports.logoutUser = catchAsyncErrors( async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

exports.forgotPassword = catchAsyncErrors( async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    
    if(!user){
        return next( new ErrorHandler("User not found with this email Id",400));
    }

    const resetToken = user.getResetToken();

    

    await user.save({validateBeforeSave:false});
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

   const message = `Please reset your password with following link:\n\n${resetUrl}\n\n
   If you have not attempted to reset your password then ignore this email`;

   try {
        await sendEmail({
            
        });
        res.status(200).json({
            success:true,
            message:`Reset Link sent to ${user.email}`
        })
   } catch (error) {
    user.resetPasswordToken = undefined;
    resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500))
   }

    res.status(200).json({
        resetUrl
    })
});