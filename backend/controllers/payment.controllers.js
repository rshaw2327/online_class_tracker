const Payment = require("../models/payment.model")
const ApiFeatures = require("../utils/apifeature.js");

exports.createPayment=async(req,res,next)=>{
    const payment=await Payment.create(req.body)
    if(!payment){
        return res.status(500).json({
            success:false,
            message:"Cannot create a payment"
        })
    }
    return res.status(201).json({
        success:true,
        message:"payment created successfully",
        payment
    })
}

exports.getAllPayments=async(req,res,next)=>{
    console.log(req.query);
    const apiFeature = new ApiFeatures(Payment.find(),req.query).dateFilter(
        "paymentDate"
    )
    // const payment=await Payment.find()
    const payment = await apiFeature.query;
    if(!payment){
        return res.status(404).json({
            success:false,
            message:"cannot find payment"
        })
    }
    return res.status(200).json({
        success:true,
        message:"payment fetched successfully",
        payment

    })
}