import express from "express";
import validateRequest from "../middlewares/validator";
import { authUserBodySchema, createUserBodySchema } from "../schemas/user"
const usersController = require("../controllers/users");

function userRoutes() {
  const router = express.Router();

  router
    .route("/")
    .get(usersController.getAllUsers)
    .post(validateRequest(createUserBodySchema), usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteuser);

  router.post('/auth', validateRequest(authUserBodySchema), usersController.loginUser)

  return router;
}

export { userRoutes };
