const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    dateAndTime:{
        type:Date,
        required:[true,"please enter date and time"],
    },
    totalHoursStudied:{
        type:Number,
        required:[true,"hours required"],
        

    },
    remainingClasses:{
        type:Number,
    
    },
    instructorName:{
        type:String,
        enum:['Gautam','Akhilesh','Siddharth'],
        required:[true,'instructor name is required'],
    },
})

module.exports= mongoose.model("Attendance",attendanceSchema)
