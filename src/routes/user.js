import express from "express";
const usersController = require("../controllers/users");

function userRoutes() {
  const router = express.Router();

  router
    .route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteuser);

  return router;
}

export { userRoutes };
