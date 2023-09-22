const express = require("express");
const sendOTP = require("../controllers/otp");

function otpRoute() {
  const router = express.Router();

  router.post("/", sendOTP);

  return router;
}

export { otpRoute };
