const express = require("express");
const verifyEmail = require("../controllers/verifyEmail");

function otpRoute() {
  const router = express.Router();

  router.post("/", verifyEmail);

  return router;
}

export { otpRoute };
