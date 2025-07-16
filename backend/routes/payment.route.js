const express = require("express");
const {
  createPayment,getAllPayments
} = require("../controllers/payment.controllers");

const router = express.Router();
router.route("/createPayment").post(createPayment);
router.route("/getAllPayments").get(getAllPayments);


module.exports = router;
