import express from "express";
import { getMathRoutes } from "./math";
import { userRoutes } from "./user";
import { otpRoute } from "./otp";

function getRoutes() {
  const router = express.Router();
  router.use("/math", getMathRoutes());
  router.use("/user", userRoutes());
  router.use("/verify-email", otpRoute());
  return router;
}

export { getRoutes };
