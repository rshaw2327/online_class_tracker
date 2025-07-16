// import all routes and use them

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")


const whitelist=["http://127.0.0.1:5502","http://127.0.0.1:5501"] 
const corsOptions={
  origin:function(origin,callback){
    if(!origin || whitelist.includes(origin)){
      callback(null,true)

    }else{
      callback(new Error("not allowed by cors"))
    }


  },
  credentials:true,
  methods:["GET","POST","DELETE","PUT","PATCH"],
//   allowedHeaders:["Content-Type"]
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// routes imports

const attendance=require("./routes/attendance.route")
const payment=require("./routes/payment.route")



// routes use

app.use("/api/v1/attendance",attendance)
app.use("/api/v1/payment",payment)


module.exports=app;