const Attendance = require("../models/attendance.model.js");
const ApiFeatures = require("../utils/apifeature.js");

exports.createAttendanceSheet = async (req, res, next) => {
  const attendance = await Attendance.create(req.body);
  if (!attendance) {
    return res.status(500).json({
      success: false,
      message: "cannot create attendance sheet",
    });
  }
  return res.status(201).json({
    success: true,
    message: "attendance sheet created successfully",
    attendance,
  });
};

exports.getAttendanceSheet = async (req, res, next) => {
  console.log(req.query);
  const apiFeature = new ApiFeatures(Attendance.find(), req.query).dateFilter(
    "dateAndTime"
  );
  // const attendance = await Attendance.find()
  const attendance = await apiFeature.query;
  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: "cannot get the attendance sheet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "attendance fetched successfully",
    attendance,
  });
};
