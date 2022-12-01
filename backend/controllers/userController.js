const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")


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

exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
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
            email:user.email,
            subject:"Ecommerce Password Reset",
            message
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

   
});

exports.resetPassword = catchAsyncErrors( async(req,res,next)=>{
    const resetPassword = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({
        resetPassword,
        resetPasswordTokenExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset token is invalid or expired",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password does not match",400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    resetPasswordTokenExpire = undefined;

    await user.save();
    sendToken(user,200,res);

})

exports.getUserDetails = catchAsyncErrors( async(req,res,next)=>{

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success:true,
        user
    })

})

exports.updateUserPassword = catchAsyncErrors( async(req,res,next)=>{
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatch = user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatch){
        return next( new ErrorHandler("Please Enter Valid Old Password",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password does not match",400))
    }

    user.password = req.body.newPassword

    await user.save();

    sendToken(user,200,res)
});

exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const updatedInfo = {
        email: req.body.email,
        name:req.body.name
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, updatedInfo, {
      new: true,
      runValidators: true,
    });
    
    sendToken(user,200,res)
  });

  exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find();
    const totalUsers = await User.countDocuments();
    res.status(200).json({
        success: true,
        totalUsers:totalUsers,
        user
    })
  });

  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User not found!!",400))
    }
    
    res.status(200).json({
        success: true,
        
        user
    })
  });
  exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const updatedInfo = {
        email: req.body.email,
        name:req.body.name,
        role:req.body.role
    }
  
    const user = await User.findByIdAndUpdate(req.params.id, updatedInfo, {
      new: true,
      runValidators: true,
    });
    if(!user){
        return next(new ErrorHandler("User not found!!",400))
    }
    res.status(200).json({
        success: true,
        
        user
    })
  });

  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    
  
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User not found!!",400))
    }

    await user.remove();
    res.status(200).json({
        success: true,
        message: `${user.name} was removed`,
    })
  });

  