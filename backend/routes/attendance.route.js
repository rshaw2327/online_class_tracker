const express = require("express");
const {
  createAttendanceSheet,getAttendanceSheet
} = require("../controllers/attendance.controllers");

const router = express.Router();
router.route("/createAttendanceSheet").post(createAttendanceSheet);
router.route("/getAttendanceSheet").get(getAttendanceSheet)

module.exports = router;
