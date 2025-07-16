const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

 paymentDate:{
        type:Date,

    },
    amountPaid:{
        type:Number,
        required:[true,'amount paid is required']

    },
     payee:{
                type:String,
                enum:["Akhilesh","Gautam","Siddharth"],
                trim:true,
                required:[true,'payee name is required']

            }
})

module.exports= mongoose.model("Payment",paymentSchema)