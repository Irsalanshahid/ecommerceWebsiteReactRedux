const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
name:{
    type:String,
    required:[true,"Please Enter Your Name"],
    minLength:[3,"Name must be more than three Characters long"],
    maxLength:[30,"Name cannot be more than thirty Characters long"],
},
email:{
    type:String,
    required:[true,"Please Enter Email Id"],
    validate:[validator.isEmail,"Please Enter Valid Email Id"],
    unique:false
},
password:{
    type:String,
    required:[true,"Please Enter Password"],
    minLength:[8,"Password must be Eight Characters long"],
    select:false
},
avatar:{
        public_id:{
            type:String,
            reqired:true
        },
        url:{
            type:String,
            reqired:true
        }
}
,
role:{
    type:String,
    default:"user"
},
resetPasswordToken:String,
resetPasswordExpire:Date
})
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next;
    }

    this.password = await bcrypt.hash(this.password,5)
})
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE })
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model("users",userSchema);