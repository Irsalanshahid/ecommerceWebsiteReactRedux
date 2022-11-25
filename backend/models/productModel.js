const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        default: 0
    },
    rating:{
        type:Number,
        default: 0
    },
    images:[{
        public_id:{
            type:String,
            reqired:true
        },
        url:{
            type:String,
            reqired:true
        }
}],
category:{
    type:String,
    required:[true,"Please Enter Category"]
},
stock:{
    type:Number,
    required:[true,"Please Enter Stock Status"],
    default: 0
},
numOfReviews:{
    type:Number,
    default: 0
},
reviews:[{
    name:{
        type:String,
        reqired:true
    },
    rating:{
        type:Number,
        reqired:true
    },
    comment:{
        type:String,
    }
}],
user:{
    type:mongoose.Schema.ObjectId,
    ref: "users",
    required: true
},
createdAt:{
    type:Date,
    default : Date.now
}
})

module.exports = mongoose.model("products",productSchema)